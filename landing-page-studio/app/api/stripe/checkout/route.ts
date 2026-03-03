import { NextResponse } from 'next/server'

import { PAYMENT_PLANS } from '@/lib/payments/plans'

type StripeCheckoutResponse = {
  id: string
  url: string
}

type CheckoutBody = {
  planId?: keyof typeof PAYMENT_PLANS
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutBody
    const planId = body.planId

    if (!planId || !(planId in PAYMENT_PLANS)) {
      return NextResponse.json({ error: 'Plano invalido.' }, { status: 400 })
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: 'STRIPE_SECRET_KEY nao configurada no servidor.' },
        { status: 500 },
      )
    }

    const plan = PAYMENT_PLANS[planId]
    const origin = new URL(request.url).origin

    const params = new URLSearchParams({
      mode: 'payment',
      success_url: `${origin}/pagamento/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pagamento/cancelado`,
      'line_items[0][quantity]': '1',
      'line_items[0][price_data][currency]': 'brl',
      'line_items[0][price_data][unit_amount]': String(plan.amountInCents),
      'line_items[0][price_data][product_data][name]': plan.name,
      'line_items[0][price_data][product_data][description]': plan.description,
      'metadata[plan_id]': plan.id,
    })

    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
      cache: 'no-store',
    })

    const data = (await stripeResponse.json()) as
      | StripeCheckoutResponse
      | { error?: { message?: string } }

    if (!stripeResponse.ok || !('url' in data)) {
      return NextResponse.json(
        {
          error:
            'Erro ao criar sessao de pagamento na Stripe.' +
            (data && 'error' in data && data.error?.message ? ` ${data.error.message}` : ''),
        },
        { status: 500 },
      )
    }

    return NextResponse.json({ url: data.url })
  } catch {
    return NextResponse.json({ error: 'Falha inesperada ao iniciar checkout.' }, { status: 500 })
  }
}
