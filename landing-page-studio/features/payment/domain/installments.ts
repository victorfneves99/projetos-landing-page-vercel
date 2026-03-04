export const MAX_INSTALLMENTS = 12
export const MIN_TOTAL_FOR_INSTALLMENTS_IN_CENTS = 1000

export function getMaxInstallmentsForAmount(amountInCents: number) {
  if (!Number.isFinite(amountInCents) || amountInCents <= 0) {
    return 1
  }

  if (amountInCents < MIN_TOTAL_FOR_INSTALLMENTS_IN_CENTS) {
    return 1
  }

  return MAX_INSTALLMENTS
}

export function isValidInstallments(value: unknown, amountInCents?: number) {
  const installments = Number(value)
  const maxAllowed =
    typeof amountInCents === 'number' ? getMaxInstallmentsForAmount(amountInCents) : MAX_INSTALLMENTS

  return Number.isInteger(installments) && installments >= 1 && installments <= maxAllowed
}
