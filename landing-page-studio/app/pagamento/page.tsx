import Link from 'next/link'

import { PaymentClient } from './payment-client'

export const metadata = {
  title: 'Pagamento | PaPaco Desgin',
  description: 'Escolha um plano e conclua seu pagamento de forma segura pelo Mercado Pago.',
}

export default function PagamentoPage() {
  const publicKey = process.env.MERCADOPAGO_PUBLIC_KEY

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Checkout Transparente Mercado Pago</p>
            <h1 className="mt-3 font-serif text-4xl md:text-6xl">Pagamento</h1>
            <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
              Selecione o tipo de projeto, avance para o checkout transparente com cartao do Mercado Pago e conclua o pagamento.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center rounded-md border border-border px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          >
            Voltar para home
          </Link>
        </div>

        <PaymentClient publicKey={publicKey} />
      </section>
    </main>
  )
}
