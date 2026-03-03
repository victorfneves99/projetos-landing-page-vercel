import Link from 'next/link'

import { NAV_ITEMS } from '../../constants/content'

export function Footer() {
  return (
    <footer className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <span className="text-sm font-semibold tracking-[0.16em] uppercase">
        <span className="text-foreground">PaPaco</span>{' '}
        <span className="text-accent">Desgin</span>
      </span>
      <p className="text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} PaPaco Desgin. Todos os direitos reservados.
      </p>
      <div className="flex gap-6">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 tracking-wide"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </footer>
  )
}
