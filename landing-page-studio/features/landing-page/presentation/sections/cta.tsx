import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { sendEmail } from '@/features/landing-page/infrastructure/email/send-email'

export function CtaSection() {
  return (
    <section id="contato" className="border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36">
        <div className="max-w-3xl">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-8">
            05 — Vamos conversar
          </p>

          <h2 className="font-serif text-5xl md:text-7xl leading-none text-foreground mb-10 text-balance">
            Pronto para começar seu projeto?
          </h2>

          <form action={sendEmail} className="flex flex-col gap-4">
            <input
              name="name"
              placeholder="Seu nome"
              required
              className="border p-4 bg-transparent"
            />

            <input
              name="email"
              type="email"
              placeholder="Seu email"
              required
              className="border p-4 bg-transparent"
            />

            <textarea
              name="message"
              placeholder="Sua mensagem"
              required
              className="border p-4 bg-transparent"
            />

            <button
              type="submit"
              className="inline-flex items-center gap-3 bg-accent border text-accent-foreground text-xs tracking-widest uppercase px-8 py-4 hover:border-foreground transition-colors duration-200 cursor-pointer"
            >
              Enviar e-mail
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/5531975058596"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-border text-foreground text-xs tracking-widest uppercase px-8 py-4 hover:border-foreground transition-colors duration-200"
            >
              WhatsApp
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <Link
              href="/pagamento"
              className="inline-flex items-center gap-3 border border-accent text-accent text-xs tracking-widest uppercase px-8 py-4 hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
            >
              Ir para pagamento
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
