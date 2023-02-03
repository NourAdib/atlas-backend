import { SetMetadata } from '@nestjs/common';
import { SubscriptionPlan } from '../constants/subscription-plan.enum';

export const SUBSCRIPTION_PLANS_KEY = 'subscription_plans';
export const SubscriptionPlans = (...subscription_plans: SubscriptionPlan[]) =>
  SetMetadata(SUBSCRIPTION_PLANS_KEY, subscription_plans);
