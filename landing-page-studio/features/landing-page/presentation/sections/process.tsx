import { PROCESS_STEPS } from '../../content/content'

export function ProcessSection() {
  return (
    <section id="processo" className="border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="border-b border-border py-10">
          <p className="text-xs tracking-widest uppercase text-muted-foreground">04 — Processo</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {PROCESS_STEPS.map((item) => (
            <div key={item.step} className="p-8 md:p-10 flex flex-col gap-6">
              <span className="font-serif text-accent text-4xl">{item.step}</span>
              <div>
                <p className="text-sm font-medium text-foreground mb-2">{item.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
