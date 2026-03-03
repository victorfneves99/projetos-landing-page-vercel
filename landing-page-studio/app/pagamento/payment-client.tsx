'use client'

import { Loader2 } from 'lucide-react'
import { useState } from 'react'

import { PAYMENT_PLAN_LIST, type PlanId } from '@/lib/payments/plans'

export function PaymentClient() {
  const [pendingPlan, setPendingPlan] = useState<PlanId | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleCheckout = async (planId: PlanId) => {
    try {
      setPendingPlan(planId)
      setErrorMessage(null)

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      })

      const payload = (await response.json()) as { url?: string; error?: string }

      if (!response.ok || !payload.url) {
        setErrorMessage(payload.error ?? 'Nao foi possivel iniciar o checkout.')
        setPendingPlan(null)
        return
      }

      window.location.href = payload.url
    } catch {
      setErrorMessage('Falha de conexao ao iniciar checkout.')
      setPendingPlan(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {PAYMENT_PLAN_LIST.map((plan) => {
          const isPending = pendingPlan === plan.id

          return (
            <article
              key={plan.id}
              className="rounded-xl border border-border bg-card p-6 text-card-foreground"
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{plan.name}</p>
              <p className="mt-3 text-3xl font-serif text-foreground">
                R$ {(plan.amountInCents / 100).toLocaleString('pt-BR')}
              </p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{plan.description}</p>
              <button
                type="button"
                onClick={() => handleCheckout(plan.id)}
                disabled={Boolean(pendingPlan)}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-3 text-xs uppercase tracking-widest text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Redirecionando...
                  </>
                ) : (
                  'Pagar com Stripe'
                )}
              </button>
            </article>
          )
        })}
      </div>

      {errorMessage ? (
        <p className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {errorMessage}
        </p>
      ) : null}
    </div>
  )
}
