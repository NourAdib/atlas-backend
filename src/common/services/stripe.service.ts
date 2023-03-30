import * as dotenv from 'dotenv';
dotenv.config();
import Stripe from 'stripe';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StripeService {
  /**
   * Stripe instance
   */
  private stripe = new Stripe(process.env?.STRIPE_TEST_KEY, {
    apiVersion: '2022-11-15'
  });

  /**
   * Delete a customer from Stripe
   * @param customerId the id of the customer
   */
  async deleteCustomer(customerId: string): Promise<void> {
    await this.stripe.customers.del(customerId);
  }
}
