const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_API_KEY);

/**
 * Stripe subscription statuses
 */
export const SUBSCRIPTION_STATUSES = {
  ACTIVE: 'active',
  UNPAID: 'unpaid',
  CANCELED: 'canceled',
  TRIALING: 'trialing',
  INCOMPLETE: 'incomplete',
  INCOMPLETE_EXPIRED: 'incomplete_expired',
  PAST_DUE: 'past_due',
};

const getSubscriptionStatus = (selectedSubscription: any) => selectedSubscription.status;

export const canUpdateSubscription = async (subId: string) => {
  const selectedSubscription = await stripe.subscriptions.retrieve(subId);
  const subscriptionStatus = getSubscriptionStatus(selectedSubscription);
  if (
    subscriptionStatus &&
    (subscriptionStatus === SUBSCRIPTION_STATUSES.CANCELED ||
      subscriptionStatus === SUBSCRIPTION_STATUSES.INCOMPLETE_EXPIRED)
  ) {
    return false;
  }
  return true;
};
