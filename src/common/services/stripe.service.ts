import * as dotenv from 'dotenv';
dotenv.config();
import Stripe from 'stripe';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StripeService {
  private stripe = new Stripe(process.env?.STRIPE_TEST_KEY, {
    apiVersion: '2022-11-15'
  });

  async deleteCustomer(customerId: string): Promise<void> {
    await this.stripe.customers.del(customerId);
  }
}
