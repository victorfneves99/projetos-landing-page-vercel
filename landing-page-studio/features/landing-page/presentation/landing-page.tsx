import { CtaSection } from './sections/cta'
import { DifferentialsSection } from './sections/differentials'
import { Footer } from './sections/footer'
import { Header } from './sections/header'
import { HeroSection } from './sections/hero'
import { PapacoParallaxSection } from './sections/papaco-parallax'
import { ProcessSection } from './sections/process'
import { ServicesSection } from './sections/services'
import { TestimonialsSection } from './sections/testimonials'
import { ScrollToTop } from './scroll-to-top'

export function LandingPage() {
  return (
    <main className="bg-background text-foreground font-sans">
      <div id="top" />
      <Header />
      <HeroSection />
      <ServicesSection />
      <PapacoParallaxSection />
      <DifferentialsSection />
      <TestimonialsSection />
      <ProcessSection />
      <CtaSection />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
