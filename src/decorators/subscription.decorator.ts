import { SetMetadata } from '@nestjs/common';
import { SubscriptionPlan } from '../constants/subscription-plan.enum';

/**
 * Subscription Plans Decorator
 * @description This decorator is used to set the subscription plans for a route
 * @param subscription_plans the subscription plans to set
 */
export const SUBSCRIPTION_PLANS_KEY = 'subscription_plans';
export const SubscriptionPlans = (...subscription_plans: SubscriptionPlan[]) =>
  SetMetadata(SUBSCRIPTION_PLANS_KEY, subscription_plans);
