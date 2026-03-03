import Link from 'next/link'

export const metadata = {
  title: 'Pagamento confirmado | PaPaco Desgin',
}

export default function PagamentoSucessoPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-3xl px-6 py-20 text-center md:px-12">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Mercado Pago</p>
        <h1 className="mt-4 font-serif text-4xl md:text-6xl">Pagamento confirmado</h1>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          Recebemos seu pagamento com sucesso. Em breve entraremos em contato para iniciar seu projeto.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-md border border-border px-5 py-3 text-xs uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Ir para home
          </Link>
          <Link
            href="/pagamento"
            className="inline-flex items-center rounded-md bg-accent px-5 py-3 text-xs uppercase tracking-widest text-accent-foreground transition-opacity hover:opacity-90"
          >
            Novo pagamento
          </Link>
        </div>
      </section>
    </main>
  )
}
