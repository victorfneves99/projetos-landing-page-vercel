import { MercadoPagoConfig, Preference } from 'mercadopago'

import { PAYMENT_PLANS, type PlanId } from '@/lib/payments/plans'

export async function createMercadoPagoPreference(options: {
  planId: PlanId
  origin: string
}) {
  const accessToken =
    process.env.MERCADOPAGO_ACCESS_TOKEN ?? process.env.MERCADO_PAGO_ACCESS_TOKEN

  if (!accessToken) {
    throw new Error(
      'MERCADOPAGO_ACCESS_TOKEN (ou MERCADO_PAGO_ACCESS_TOKEN) nao configurada no servidor.',
    )
  }

  const client = new MercadoPagoConfig({ accessToken })
  const preference = new Preference(client)
  const plan = PAYMENT_PLANS[options.planId]
  const isLocalhost =
    options.origin.includes('localhost') || options.origin.includes('127.0.0.1')

  const result = await preference.create({
    body: {
      items: [
        {
          id: `plan_${plan.id}`,
          title: plan.name,
          description: plan.description,
          quantity: 1,
          currency_id: 'BRL',
          unit_price: plan.amountInCents / 100,
        },
      ],
      back_urls: {
        success: `${options.origin}/pagamento/sucesso`,
        pending: `${options.origin}/pagamento/sucesso`,
        failure: `${options.origin}/pagamento/cancelado`,
      },
      // Em ambiente local o Mercado Pago pode rejeitar auto_return com back_urls localhost.
      ...(isLocalhost ? {} : { auto_return: 'approved' as const }),
      external_reference: `plan_${plan.id}`,
      metadata: {
        plan_id: plan.id,
      },
      notification_url: process.env.MERCADOPAGO_WEBHOOK_URL,
    },
  })

  const checkoutUrl = process.env.MERCADOPAGO_USE_SANDBOX === 'true'
    ? result.sandbox_init_point ?? result.init_point
    : result.init_point ?? result.sandbox_init_point

  if (!checkoutUrl) {
    throw new Error('Mercado Pago nao retornou URL de checkout.')
  }

  return {
    id: result.id,
    url: checkoutUrl,
  }
}
