export const MAX_INSTALLMENTS = 12

export function isValidInstallments(value: unknown) {
  const installments = Number(value)

  return Number.isInteger(installments) && installments >= 1 && installments <= MAX_INSTALLMENTS
}
