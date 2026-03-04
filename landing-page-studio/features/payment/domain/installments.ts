export const MAX_INSTALLMENTS = 12
export const MIN_TOTAL_FOR_INSTALLMENTS_IN_CENTS = 1000
export const MIN_INSTALLMENT_AMOUNT_IN_CENTS = 500

export function getMaxInstallmentsForAmount(amountInCents: number) {
  if (!Number.isFinite(amountInCents) || amountInCents <= 0) {
    return 1
  }

  if (amountInCents < MIN_TOTAL_FOR_INSTALLMENTS_IN_CENTS) {
    return 1
  }

  const maxByInstallmentValue = Math.floor(amountInCents / MIN_INSTALLMENT_AMOUNT_IN_CENTS)
  return Math.max(1, Math.min(MAX_INSTALLMENTS, maxByInstallmentValue))
}

export function isValidInstallments(value: unknown, amountInCents?: number) {
  const installments = Number(value)
  const maxAllowed =
    typeof amountInCents === 'number' ? getMaxInstallmentsForAmount(amountInCents) : MAX_INSTALLMENTS

  return Number.isInteger(installments) && installments >= 1 && installments <= maxAllowed
}
