export const FOUNDATION_SUPPORT_MIN_CENTS = 500;
export const FOUNDATION_SUPPORT_MAX_CENTS = 2_500_000;

export function isValidFoundationSupportAmount(amountCents: number) {
  return Number.isInteger(amountCents) && amountCents >= FOUNDATION_SUPPORT_MIN_CENTS && amountCents <= FOUNDATION_SUPPORT_MAX_CENTS;
}

export function foundationSupportAmountMessage() {
  return `Please enter a whole-dollar voluntary-support amount between $${FOUNDATION_SUPPORT_MIN_CENTS / 100} and $${FOUNDATION_SUPPORT_MAX_CENTS / 100}.`;
}
