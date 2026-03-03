import Link from "next/link";

import { NAV_ITEMS } from "../../constants/content";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-widest uppercase text-foreground">
            Studio<span className="text-accent">.</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          href="#contato"
          className="text-xs tracking-widest uppercase border border-foreground/20 hover:border-accent hover:text-accent px-4 py-2 transition-all duration-200"
        >
          Orçamento
        </Link>
      </nav>
    </header>
  );
}
