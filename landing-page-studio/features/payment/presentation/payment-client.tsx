'use client'

import { Loader2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { getMaxInstallmentsForAmount } from '@/features/payment/domain/installments'
import {
  PAYMENT_PLAN_LIST,
  type PaymentPlan,
  type PlanId,
} from '@/features/payment/domain/plans'

declare global {
  interface Window {
    MercadoPago?: new (publicKey: string, options?: { locale?: string }) => {
      bricks: () => {
        create: (
          brickType: 'cardPayment',
          containerId: string,
          settings: Record<string, unknown>,
        ) => Promise<{ unmount?: () => void }>
      }
    }
  }
}

type BrickSubmitPayload = {
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

const BRICK_SCRIPT_ID = 'mercadopago-sdk-js'
const BRICK_CONTAINER_ID = 'cardPaymentBrick_container'

async function ensureMercadoPagoScript() {
  if (typeof window === 'undefined') return
  if (window.MercadoPago) return

  await new Promise<void>((resolve, reject) => {
    const current = document.getElementById(BRICK_SCRIPT_ID)

    if (current) {
      current.addEventListener('load', () => resolve(), { once: true })
      current.addEventListener('error', () => reject(new Error('Falha ao carregar SDK.')), {
        once: true,
      })
      return
    }

    const script = document.createElement('script')
    script.id = BRICK_SCRIPT_ID
    script.src = 'https://sdk.mercadopago.com/js/v2'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Falha ao carregar SDK do Mercado Pago.'))
    document.head.appendChild(script)
  })
}

type PaymentClientProps = {
  publicKey?: string
}

export function PaymentClient({ publicKey }: PaymentClientProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>('landing')
  const [isBrickLoading, setIsBrickLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const selectedPlan = useMemo<PaymentPlan>(
    () => PAYMENT_PLAN_LIST.find((plan) => plan.id === selectedPlanId) ?? PAYMENT_PLAN_LIST[0],
    [selectedPlanId],
  )
  const maxInstallmentsForSelectedPlan = useMemo(
    () => getMaxInstallmentsForAmount(selectedPlan.amountInCents),
    [selectedPlan.amountInCents],
  )

  useEffect(() => {
    let brickController: { unmount?: () => void } | null = null
    let cancelled = false

    const mountBrick = async () => {
      if (!publicKey) {
        setErrorMessage('MERCADOPAGO_PUBLIC_KEY nao configurada.')
        setIsBrickLoading(false)
        return
      }

      setIsBrickLoading(true)
      setErrorMessage(null)

      try {
        await ensureMercadoPagoScript()
        if (cancelled || !window.MercadoPago) return

        const mp = new window.MercadoPago(publicKey, { locale: 'pt-BR' })
        const bricksBuilder = mp.bricks()

        brickController = await bricksBuilder.create('cardPayment', BRICK_CONTAINER_ID, {
          initialization: {
            amount: selectedPlan.amountInCents / 100,
          },
          customization: {
            visual: {
              style: {
                theme: 'dark',
              },
            },
            paymentMethods: {
              maxInstallments: maxInstallmentsForSelectedPlan,
            },
          },
          callbacks: {
            onReady: () => {
              if (!cancelled) setIsBrickLoading(false)
            },
            onSubmit: async (formData: BrickSubmitPayload) => {
              const response = await fetch('/api/mercadopago/payment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  planId: selectedPlan.id,
                  ...formData,
                }),
              })

              const payload = (await response.json()) as {
                id?: string | number
                status?: string
                status_detail?: string
                error?: string
              }

              if (!response.ok) {
                setErrorMessage(payload.error ?? 'Nao foi possivel processar o pagamento.')
                throw new Error(payload.error ?? 'Erro no pagamento')
              }

              if (payload.status === 'approved') {
                window.location.href = `/pagamento/sucesso?payment_id=${payload.id ?? ''}`
                return
              }

              if (payload.status === 'rejected' || payload.status === 'cancelled') {
                window.location.href = `/pagamento/cancelado?payment_id=${payload.id ?? ''}`
                return
              }

              window.location.href = `/pagamento/sucesso?status=${payload.status ?? 'pending'}&payment_id=${payload.id ?? ''}`
            },
            onError: (error: unknown) => {
              if (!cancelled) {
                setIsBrickLoading(false)
                setErrorMessage('Erro no formulario de pagamento. Verifique os dados e tente novamente.')
                console.error(error)
              }
            },
          },
        })
      } catch (error) {
        if (!cancelled) {
          setErrorMessage('Nao foi possivel carregar o checkout de cartao do Mercado Pago.')
          setIsBrickLoading(false)
          console.error(error)
        }
      }
    }

    mountBrick()

    return () => {
      cancelled = true
      brickController?.unmount?.()
    }
  }, [publicKey, selectedPlan.id, selectedPlan.amountInCents, maxInstallmentsForSelectedPlan])

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        {PAYMENT_PLAN_LIST.map((plan) => {
          const isSelected = selectedPlan.id === plan.id

          return (
            <article
              key={plan.id}
              className={`rounded-xl border p-6 transition-colors ${
                isSelected
                  ? 'border-accent bg-accent/5'
                  : 'border-border bg-card text-card-foreground'
              }`}
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{plan.name}</p>
              <p className="mt-3 text-3xl font-serif text-foreground">
                R$ {(plan.amountInCents / 100).toLocaleString('pt-BR')}
              </p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{plan.description}</p>

              <button
                type="button"
                onClick={() => setSelectedPlanId(plan.id)}
                className={`mt-6 inline-flex w-full items-center justify-center rounded-md px-4 py-3 text-xs uppercase tracking-widest transition-colors ${
                  isSelected
                    ? 'bg-accent text-accent-foreground'
                    : 'border border-border text-foreground hover:border-accent hover:text-accent'
                }`}
              >
                {isSelected ? 'Plano selecionado' : 'Selecionar plano'}
              </button>
            </article>
          )
        })}
      </div>

      <section className="rounded-xl border border-border bg-card p-5 md:p-7">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Checkout Transparente</p>
          <h2 className="mt-2 font-serif text-2xl md:text-3xl text-foreground">
            Pagamento com cartao - {selectedPlan.name}
          </h2>
          {maxInstallmentsForSelectedPlan > 1 ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Voce pode pagar a vista ou em ate {maxInstallmentsForSelectedPlan}x no cartao.
            </p>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              Parcelamento nao disponivel para este valor. Escolha um valor maior para habilitar parcelas.
            </p>
          )}
          <p className="mt-1 text-xs text-muted-foreground/80">
            As opcoes de parcela aparecem apos informar um cartao de credito valido.
          </p>
        </div>

        {isBrickLoading ? (
          <div className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Carregando checkout...
          </div>
        ) : null}

        <div id={BRICK_CONTAINER_ID} />
      </section>

      {errorMessage ? (
        <p className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {errorMessage}
        </p>
      ) : null}
    </div>
  )
}
