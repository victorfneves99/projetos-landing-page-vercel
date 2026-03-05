import Image from 'next/image'
import Link from 'next/link'
import { ThemeToggle } from '../theme-toggle'

import { NAV_ITEMS } from '../../content/content'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <Link href="#top" className="flex items-center gap-3">
          <Image
            src="/testimonials/papaco_cabeca.png"
            alt="Logo PaPaco Design"
            width={48}
            height={48}
            className="h-12 w-12 rounded-full border border-accent/40 object-cover shadow-[0_0_0_3px_rgba(244,114,182,0.15)]"
            priority
          />
          <span className="text-base font-semibold tracking-[0.16em] uppercase">
            <span className="text-foreground">PaPaco</span>{' '}
            <span className="text-accent">Design</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative text-xs tracking-widest uppercase text-muted-foreground transition-colors duration-200 hover:text-foreground after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="#contato"
            className="text-xs tracking-widest uppercase border border-foreground/20 hover:border-accent hover:text-accent px-4 py-2 transition-all duration-200"
          >
            Orçamento
          </Link>
        </div>
      </nav>
    </header>
  )
}
