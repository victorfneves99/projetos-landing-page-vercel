export type PlanId = 'landing' | 'website' | 'sistema'

export type PaymentPlan = {
  id: PlanId
  name: string
  description: string
  amountInCents: number
}

export const PAYMENT_PLANS: Record<PlanId, PaymentPlan> = {
  landing: {
    id: 'landing',
    name: 'Landing Page',
    description: 'Projeto focado em conversao com 1 pagina principal.',
    amountInCents: 100,
  },
  website: {
    id: 'website',
    name: 'Website Institucional',
    description: 'Site completo para apresentar sua empresa e servicos.',
    amountInCents: 100,
  },
  sistema: {
    id: 'sistema',
    name: 'Sistema Web',
    description: 'Aplicacao personalizada para processos internos e externos.',
    amountInCents: 100,
  },
}

export const PAYMENT_PLAN_LIST = Object.values(PAYMENT_PLANS)
