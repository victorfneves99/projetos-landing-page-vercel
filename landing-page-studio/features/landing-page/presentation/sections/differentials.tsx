import { DIFFERENTIALS } from '../../content/content'

export function DifferentialsSection() {
  return (
    <section className="border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="border-b border-border py-10">
          <p className="text-xs tracking-widest uppercase text-muted-foreground">02 — Diferencial</p>
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          <div className="py-16 md:py-24 md:border-r border-border md:pr-16 flex flex-col justify-center">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground text-balance">
              Qualidade que se vê no <span className="text-accent">primeiro olhar.</span>
            </h2>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-sm">
              Não terceirizamos, não usamos templates prontos. Cada projeto é concebido do zero para refletir a identidade única do seu negócio.
            </p>
          </div>

          <div className="md:pl-16 py-10 md:py-24 grid grid-cols-1 gap-0 divide-y divide-border">
            {DIFFERENTIALS.map((item, index) => (
              <div key={item.title} className="py-6 flex items-start gap-4">
                <span className="text-accent font-mono text-xs mt-1 shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">{item.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
