import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Platform", href: "#platform" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Pricing", href: "#pricing" },
  { label: "Team", href: "#team" },
  { label: "API Docs", href: "#api" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5 sm:px-8 lg:grid-cols-[auto_1fr_auto]">
        <a href="#top" className="flex min-w-0 items-center">
          <img
            src="/logo.png"
            alt="MatterLoop logo"
            className="h-10 w-auto object-contain sm:h-12"
          />
        </a>

        <nav className="hidden items-center justify-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-cyan"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#dashboard"
            className="rounded-lg border border-cyan/50 px-4 py-2 text-sm font-semibold text-cyan transition-all hover:bg-cyan/10 hover:glow-border"
          >
            Metrava
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="justify-self-end rounded-lg border border-border p-2 text-foreground lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-surface lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2.5 text-sm font-medium text-muted-foreground hover:bg-surface-2 hover:text-cyan"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-3">
                <a
                  href="#dashboard"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-cyan/50 px-4 py-2 text-center text-sm font-semibold text-cyan"
                >
                  Launch App
                </a>
                <a
                  href="#pricing"
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-cyan px-4 py-2 text-center text-sm font-semibold text-primary-foreground"
                >
                  Book Demo
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
