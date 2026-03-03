import { ArrowUpRight } from 'lucide-react'

import { SERVICES } from '../../constants/content'

export function ServicesSection() {
  return (
    <section id="servicos" className="border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="border-b border-border py-10 flex items-end justify-between">
          <p className="text-xs tracking-widest uppercase text-muted-foreground">01 — Serviços</p>
          <p className="hidden md:block text-xs text-muted-foreground">O que fazemos por você</p>
        </div>

        {SERVICES.map((service, index) => (
          <div
            key={service.id}
            className={`grid md:grid-cols-12 group hover:bg-secondary/30 transition-colors duration-300 ${
              index < SERVICES.length - 1 ? 'border-b border-border' : ''
            }`}
          >
            <div className="md:col-span-1 border-r border-border flex items-start justify-center pt-10 pb-10">
              <span className="text-xs font-mono text-muted-foreground rotate-90 tracking-widest mt-4 select-none">
                {service.id}
              </span>
            </div>
            <div className="md:col-span-5 border-r border-border p-8 md:p-12 flex flex-col justify-between gap-8">
              <h3 className="font-serif text-5xl md:text-6xl text-foreground leading-none whitespace-pre-line">
                {service.title}
              </h3>
              <a
                href="#contato"
                className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-accent hover:gap-4 transition-all duration-200"
              >
                Solicitar <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="md:col-span-6 p-8 md:p-12 flex flex-col justify-between gap-8">
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">{service.description}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {service.tags.map((tag) => (
                  <span key={tag} className="text-xs border border-border px-3 py-1 text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
