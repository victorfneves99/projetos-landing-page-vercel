import { CtaSection } from './sections/cta'
import { DifferentialsSection } from './sections/differentials'
import { Footer } from './sections/footer'
import { Header } from './sections/header'
import { HeroSection } from './sections/hero'
import { ProcessSection } from './sections/process'
import { ServicesSection } from './sections/services'
import { TestimonialsSection } from './sections/testimonials'

export function LandingPage() {
  return (
    <main className="bg-background text-foreground font-sans">
      <div id="top" />
      <Header />
      <HeroSection />
      <ServicesSection />
      <DifferentialsSection />
      <TestimonialsSection />
      <ProcessSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
