'use client'

import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 320)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Voltar ao topo"
      className={`fixed bottom-6 right-6 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-accent hover:text-accent ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  )
}
