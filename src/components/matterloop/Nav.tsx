import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

const links = [
  { label: "Platform", href: "dashboard" },
  { label: "Capabilities", href: "capabilities" },
  { label: "Team", href: "team" },
  { label: "Pricing", href: "pricing" },
  { label: "Contact", href: "contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // 1. Calculate and set actual header height as CSS variable
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty("--header-offset", `${height}px`);
      }
    };
    
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    
    // 2. Performant Scroll Spying via getBoundingClientRect
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Edge case: if scrolled to the absolute bottom, activate the last visible section
      if (Math.ceil(scrollPosition + windowHeight) >= documentHeight - 20) {
        for (let i = links.length - 1; i >= 0; i--) {
          if (document.getElementById(links[i].href)) {
            setActiveSection(links[i].href);
            return;
          }
        }
      }

      let current = "";
      for (const link of links) {
        const el = document.getElementById(link.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the section's top has reached the middle of the viewport
          if (rect.top <= windowHeight / 2.5) {
            current = link.href;
          }
        }
      }
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-xl"
    >
      <nav aria-label="Global" className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:gap-4 sm:px-8 sm:py-3.5 lg:grid-cols-[auto_1fr_auto]">
        <a href="/#top" className="flex items-center shrink-0" aria-label="MatterLoop Home">
          <img
            src="/logo.png"
            alt="MatterLoop logo"
            className="h-9 sm:h-12 w-auto max-w-[140px] sm:max-w-[200px] shrink-0 object-contain"
          />
        </a>

        <div className="items-center justify-center hidden gap-7 lg:flex">
          {links.map((l) => {
            const isActive = activeSection === l.href;
            return (
              <a
                key={l.label}
                href={`/#${l.href}`}
                aria-current={isActive ? "page" : undefined}
                className={`relative text-sm font-medium transition-colors hover:text-cyan ${
                  isActive ? "text-cyan font-bold" : "text-muted-foreground"
                }`}
              >
                {l.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-cyan"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        <div className="items-center hidden gap-3 lg:flex">
          <Link
            to="/Product"
            className="px-4 py-2 text-sm font-semibold transition-all border rounded-lg border-cyan/50 text-cyan hover:bg-cyan/10 hover:glow-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
          >
            Metrava
          </Link>
        </div>

        <button
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="p-2 border rounded-lg justify-self-end border-border text-foreground lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-surface lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 py-3.5 sm:px-5 sm:py-4">
              {links.map((l) => {
                const isActive = activeSection === l.href;
                return (
                  <a
                    key={l.label}
                    href={`/#${l.href}`}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`rounded-lg px-2.5 py-2 text-sm font-medium hover:bg-surface-2 hover:text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan ${
                      isActive ? "text-cyan font-bold bg-surface-2" : "text-muted-foreground"
                    }`}
                  >
                    {l.label}
                  </a>
                );
              })}
              <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-2.5 mt-3">
                <Link
                  to="/Product"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-center border rounded-lg border-cyan/50 text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                >
                  Metrava
                </Link>
                <a
                  href="/#pricing"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-center rounded-lg bg-cyan text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                >
                  Book Demo
                </a>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
