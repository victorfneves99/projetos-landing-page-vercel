export function PapacoParallaxSection() {
  return (
    <section className="relative border-b border-border overflow-hidden">
      <div className="relative h-[34vh] min-h-[220px] sm:min-h-[240px]">
        <div className="absolute inset-0 bg-[url('/testimonials/camisa_papaco.png')] bg-center bg-no-repeat bg-contain md:bg-fixed opacity-70" />
        <div className="absolute inset-0 bg-background/35" />
      </div>
    </section>
  )
}
