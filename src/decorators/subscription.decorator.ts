import { SetMetadata } from '@nestjs/common';
import { SubscriptionPlan } from '../constants/subscription-plan.enum';
/**
 * SUBSCRIPTION_PLANS_KEY is the key used to store the subscription plans in the metadata
 */
export const SUBSCRIPTION_PLANS_KEY = 'subscription_plans';
/**
 * @param subscription_plans the subscription plans to be stored in the metadata
 * @returns checks if the subscription plans are a part of the SubscriptionPlan enum
 */
export const SubscriptionPlans = (...subscription_plans: SubscriptionPlan[]) =>
  SetMetadata(SUBSCRIPTION_PLANS_KEY, subscription_plans);
