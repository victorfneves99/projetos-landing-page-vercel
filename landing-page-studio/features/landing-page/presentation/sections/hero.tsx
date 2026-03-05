import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { HERO_STATS } from '../../content/content'

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-end pt-10 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          <div className="md:col-span-12 border-t border-border pt-12 pb-6">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-8">
              Design & Desenvolvimento Web — 2025
            </p>
          </div>

          <div className="md:col-span-8 pb-24">
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-none text-balance text-foreground">
              Seu negócio, <em className="not-italic text-accent">digital</em> e preciso.
            </h1>
          </div>

          <div className="md:col-span-4 md:border-l border-border pb-24 md:pl-12 flex flex-col justify-end gap-8">
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Criamos landing pages, sistemas web e websites que convertem — com design de agência premium e entrega ágil.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="#servicos"
                className="group inline-flex items-center gap-3 text-sm text-foreground hover:text-accent transition-colors duration-200"
              >
                Ver serviços
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="#contato"
                className="inline-flex items-center justify-center bg-accent text-accent-foreground text-xs tracking-widest uppercase px-6 py-3 hover:opacity-90 transition-opacity duration-200 w-fit"
              >
                Solicitar orçamento
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border grid grid-cols-3 md:grid-cols-3">
          {HERO_STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={`py-6 ${index !== 0 ? 'border-l border-border px-6 md:px-10' : ''}`}
            >
              <p className="text-2xl md:text-3xl font-serif text-foreground">{stat.num}</p>
              <p className="text-xs text-muted-foreground mt-1 tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
