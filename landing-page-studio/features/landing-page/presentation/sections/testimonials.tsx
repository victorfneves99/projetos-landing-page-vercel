import Image from 'next/image'

import { TESTIMONIALS } from '../../content/content'

export function TestimonialsSection() {
  return (
    <section className="border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="border-b border-border py-10 flex items-end justify-between">
          <p className="text-xs tracking-widest uppercase text-muted-foreground">03 — Depoimentos</p>
          <p className="hidden md:block text-xs text-muted-foreground">O que nossos clientes dizem</p>
        </div>

        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.author} className="p-8 md:p-12 flex flex-col justify-between gap-10">
              <div>
                <span className="font-serif text-4xl text-accent leading-none select-none">"</span>
                <p className="text-sm text-foreground leading-relaxed mt-3">{testimonial.quote}</p>
              </div>
              <div className="border-t border-border pt-6 flex items-center gap-4">
                <div className="relative w-11 h-11 shrink-0 overflow-hidden rounded-full border border-border">
                  <Image
                    src={testimonial.img}
                    alt={`Foto de ${testimonial.author}`}
                    fill
                    className="object-cover object-top"
                    sizes="44px"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground leading-tight">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
