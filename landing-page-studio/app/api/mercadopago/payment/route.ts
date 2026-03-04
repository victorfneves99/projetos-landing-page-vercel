import { randomUUID } from 'node:crypto'

import { MercadoPagoConfig, Payment } from 'mercadopago'
import { NextResponse } from 'next/server'

import {
  getMaxInstallmentsForAmount,
  isValidInstallments,
} from '@/features/payment/domain/installments'
import { PAYMENT_PLANS } from '@/features/payment/domain/plans'

type PaymentBody = {
  planId?: keyof typeof PAYMENT_PLANS
  token?: string
  payment_method_id?: string
  issuer_id?: string | number | null
  installments?: number | string
  payer?: {
    email?: string
    identification?: {
      type?: string
      number?: string
    }
  }
}

export async function POST(request: Request) {
  try {
    const accessToken =
      process.env.MERCADOPAGO_ACCESS_TOKEN ?? process.env.MERCADO_PAGO_ACCESS_TOKEN

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Token do Mercado Pago nao configurado no servidor.' },
        { status: 500 },
      )
    }

    const body = (await request.json()) as PaymentBody
    const planId = body.planId

    if (!planId || !(planId in PAYMENT_PLANS)) {
      return NextResponse.json({ error: 'Plano invalido.' }, { status: 400 })
    }

    if (!body.token || !body.payment_method_id || !body.installments || !body.payer?.email) {
      return NextResponse.json(
        { error: 'Dados de pagamento incompletos.' },
        { status: 400 },
      )
    }

    const plan = PAYMENT_PLANS[planId]
    const maxInstallmentsForPlan = getMaxInstallmentsForAmount(plan.amountInCents)
    const installments = Number(body.installments)

    if (!isValidInstallments(installments, plan.amountInCents)) {
      return NextResponse.json(
        { error: `Parcelamento invalido. Escolha entre 1 e ${maxInstallmentsForPlan}x.` },
        { status: 400 },
      )
    }

    const client = new MercadoPagoConfig({ accessToken })
    const payment = new Payment(client)

    const result = await payment.create({
      body: {
        transaction_amount: plan.amountInCents / 100,
        token: body.token,
        description: plan.name,
        installments,
        payment_method_id: body.payment_method_id,
        issuer_id: body.issuer_id ? Number(body.issuer_id) : undefined,
        payer: {
          email: body.payer.email,
          identification:
            body.payer.identification?.type && body.payer.identification?.number
              ? {
                  type: body.payer.identification.type,
                  number: body.payer.identification.number,
                }
              : undefined,
        },
        external_reference: `plan_${plan.id}`,
        metadata: {
          plan_id: plan.id,
        },
      },
      requestOptions: {
        idempotencyKey: randomUUID(),
      },
    })

    return NextResponse.json({
      id: result.id,
      status: result.status,
      status_detail: result.status_detail,
    })
  } catch (error) {
    console.error('MercadoPago payment error:', error)

    const fallbackMessage = 'Falha ao processar pagamento.'
    let status = 500
    let message = fallbackMessage
    let details: string | undefined

    if (error && typeof error === 'object') {
      const err = error as {
        message?: string
        status?: number
        cause?: unknown
      }

      if (typeof err.status === 'number' && err.status >= 400 && err.status < 600) {
        status = err.status
      }

      if (typeof err.message === 'string' && err.message.trim().length > 0) {
        message = err.message
      }

      if (Array.isArray(err.cause) && err.cause.length > 0) {
        const firstCause = err.cause[0] as Record<string, unknown>
        const causeMessage =
          (typeof firstCause?.description === 'string' && firstCause.description) ||
          (typeof firstCause?.message === 'string' && firstCause.message) ||
          (typeof firstCause?.code === 'string' && firstCause.code)

        if (causeMessage) {
          details = causeMessage
          message = `${message} - ${causeMessage}`
        }
      }
    }

    return NextResponse.json({ error: message, details }, { status })
  }
}
