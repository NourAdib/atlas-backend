import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import Stripe from 'stripe';
import * as dotenv from 'dotenv';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { SubscriptionPlan } from 'src/constants/subscription-plan.enum';
import { NotificationService } from '../notification/notification.service';
dotenv.config();

@Injectable()
export class PaymentService {
  private stripe = new Stripe(process.env?.STRIPE_TEST_KEY, {
    apiVersion: '2022-11-15'
  });

  private endpointSecret = process.env?.STRIPE_WEBHOOK_SECRET;

  private url = '10.6.130.39';

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly notificationService: NotificationService
  ) {}

  async subscribe(user: User): Promise<string> {
    const dbUser = await this.userRepository.findOne({ where: { id: user.id } });

    if (!dbUser) {
      throw new NotFoundException('User not found');
    }

    let newUser = false;
    let customer: Stripe.Customer;

    if (dbUser.subscriptionPlan === SubscriptionPlan.Basic && dbUser.hasStripAccount === false) {
      customer = await this.stripe.customers.create({
        email: dbUser.email,
        name: `${dbUser.firstName} ${dbUser.lastName}`,
        phone: dbUser.phoneNumber
      });

      newUser = true;

      await this.userRepository.update(dbUser.id, {
        stripeCustomerId: customer.id,
        hasStripAccount: true
      });
    }

    if (dbUser.subscriptionPlan === SubscriptionPlan.Premium && dbUser.hasStripAccount === true) {
      throw new BadRequestException('User already has an active subscription');
    }

    const session = await this.stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer: newUser ? customer.id : dbUser.stripeCustomerId,
      currency: 'aed',
      line_items: [
        {
          price: 'price_1MThM0B4qQTC27uczOVeMOlz',
          quantity: 1
        }
      ],
      success_url: `http://${this.url}:3000/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://${this.url}:3000/payment/cancel?session_id={CHECKOUT_SESSION_ID}`
    });

    return session.url;
  }

  async unsubscribe(user: User): Promise<UpdateResult> {
    const dbUser = await this.userRepository.findOne({ where: { id: user.id } });

    if (!dbUser) {
      throw new NotFoundException('User not found');
    }

    if (
      !(dbUser.subscriptionPlan === SubscriptionPlan.Premium && dbUser.hasStripAccount === true)
    ) {
      throw new BadRequestException("User doesn't have an active subscription");
    }

    const subscriptions = await this.stripe.subscriptions.list({
      customer: dbUser.stripeCustomerId
    });

    for (let i = 0; i < subscriptions.data.length; i++) {
      await this.stripe.subscriptions.del(subscriptions.data[i].id);
    }

    return this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ subscriptionPlan: SubscriptionPlan.Basic })
      .where('id = :id', { id: dbUser.id })
      .execute();
  }

  async paymentSuccess(sessionId: string): Promise<UpdateResult> {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId);
    const customer = await this.stripe.customers.retrieve(session.customer as string);

    return this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ subscriptionPlan: SubscriptionPlan.Premium })
      .where('stripeCustomerId = :stripeCustomerId', { stripeCustomerId: customer.id })
      .execute();
  }

  async paymentCancel(sessionId: string): Promise<UpdateResult> {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId);
    const customer = await this.stripe.customers.retrieve(session.customer as string);

    return this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ subscriptionPlan: SubscriptionPlan.Basic })
      .where('stripeCustomerId = :stripeCustomerId', { stripeCustomerId: customer.id })
      .execute();
  }

  async invoicingWebHook(stripeSignature: any, body: any) {
    let event;
    try {
      event = this.stripe.webhooks.constructEvent(body, stripeSignature, this.endpointSecret);
    } catch (err) {
      return new BadRequestException(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'invoice.payment_succeeded':
        const paymentSuccessedEvent = event.data.object;

        const successCustomer = await this.stripe.customers.retrieve(
          paymentSuccessedEvent.customer as string
        );

        const successUser = await this.userRepository.findOne({
          where: { stripeCustomerId: successCustomer.id }
        });

        if (!successUser) {
          return;
        }

        this.userRepository.update(successUser.id, { subscriptionPlan: SubscriptionPlan.Premium });

        this.notificationService
          .sendNotificationToOne('Payment Successful', 'Thank you for your payment', successUser.id)
          .catch((err) => {
            console.log(err);
          });
        break;
      case 'invoice.payment_failed':
        const paymentFailedEvent = event.data.object;

        const failCustomer = await this.stripe.customers.retrieve(
          paymentFailedEvent.customer as string
        );

        const failUser = await this.userRepository.findOne({
          where: { stripeCustomerId: failCustomer.id }
        });

        if (!failUser) {
          return;
        }

        this.userRepository.update(failUser.id, { subscriptionPlan: SubscriptionPlan.Basic });

        this.notificationService
          .sendNotificationToOne(
            'Payment Unsuccessful',
            'There was an error in your payment',
            failUser.id
          )
          .catch((err) => {
            console.log(err);
          });
        break;
      case 'customer.subscription.deleted':
        const subscriptionDeletedEvent = event.data.object;

        const deletedCustomer = await this.stripe.customers.retrieve(
          subscriptionDeletedEvent.customer as string
        );

        const deletedUser = await this.userRepository.findOne({
          where: { stripeCustomerId: deletedCustomer.id }
        });

        if (!deletedUser) {
          return;
        }

        this.userRepository.update(deletedUser.id, { subscriptionPlan: SubscriptionPlan.Basic });

        this.notificationService
          .sendNotificationToOne(
            'Unsubscribed Successfully',
            'We are sorry to see you go',
            deletedUser.id
          )
          .catch((err) => {
            console.log(err);
          });
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }
}
