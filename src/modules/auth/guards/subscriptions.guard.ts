import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SubscriptionPlan } from '../../../constants/subscription-plan.enum';
import { SUBSCRIPTION_PLANS_KEY } from '../../../decorators/subscription.decorator';

/**
 * SubscriptionsGuard checks if the user has the required subscription plans
 */
@Injectable()
export class SubscriptionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredSubscriptions = this.reflector.getAllAndOverride<SubscriptionPlan[]>(
      SUBSCRIPTION_PLANS_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredSubscriptions) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredSubscriptions.some((subscriptionPlan) =>
      user.subscriptionPlan?.includes(subscriptionPlan)
    );
  }
}
