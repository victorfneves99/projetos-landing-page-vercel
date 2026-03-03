import Link from 'next/link'

export const metadata = {
  title: 'Pagamento cancelado | PaPaco Desgin',
}

export default function PagamentoCanceladoPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-3xl px-6 py-20 text-center md:px-12">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Stripe</p>
        <h1 className="mt-4 font-serif text-4xl md:text-6xl">Pagamento cancelado</h1>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          O pagamento nao foi concluido. Se quiser, voce pode tentar novamente agora.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/pagamento"
            className="inline-flex items-center rounded-md bg-accent px-5 py-3 text-xs uppercase tracking-widest text-accent-foreground transition-opacity hover:opacity-90"
          >
            Tentar novamente
          </Link>
          <Link
            href="/"
            className="inline-flex items-center rounded-md border border-border px-5 py-3 text-xs uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Voltar para home
          </Link>
        </div>
      </section>
    </main>
  )
}
