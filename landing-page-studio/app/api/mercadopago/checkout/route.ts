import { NextResponse } from 'next/server'

import { createMercadoPagoPreference } from '@/lib/payments/mercadopago'
import { PAYMENT_PLANS } from '@/lib/payments/plans'

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

    const origin = new URL(request.url).origin
    const preference = await createMercadoPagoPreference({ planId, origin })

    return NextResponse.json({ url: preference.url, preferenceId: preference.id })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao criar pagamento'

    console.error(error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url)
    const planId = searchParams.get('planId') as keyof typeof PAYMENT_PLANS | null

    if (!planId || !(planId in PAYMENT_PLANS)) {
      return NextResponse.json({ error: 'Plano invalido.' }, { status: 400 })
    }

    const preference = await createMercadoPagoPreference({ planId, origin })
    return NextResponse.redirect(preference.url)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao criar pagamento'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
