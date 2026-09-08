import { Link } from "@tanstack/react-router";

const groups = [
  { title: "Platform", links: ["Overview", "Live Dashboard", "Capabilities", "Integrations"] },
  { title: "Developers", links: ["API Docs", "Telemetry Stream", "SDKs", "Status"] },
  { title: "Company", links: ["Team", "Careers", "Press", "Contact"] },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <div className="flex items-center">
              <img src="/logo.svg" alt="MatterLoop logo" className="h-20 w-auto object-contain sm:h-24" />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
             From physical assets to intelligent action, make every operational moment count.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-green/40 bg-green/10 px-3 py-1.5 font-mono text-[11px] text-green">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-green" />
              All Systems Operational
            </span>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {groups.map((g) => (
              <div key={g.title}>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan">
                  {g.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {g.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#top"
                        className="text-sm text-muted-foreground transition-colors hover:text-cyan"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-4 border-t border-border pt-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <p className="font-mono text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} MatterLoop.net — All rights reserved.
          </p>
          <div className="flex flex-wrap gap-5">
            <Link to="/privacy-policy" className="text-xs text-muted-foreground transition-colors hover:text-cyan">
              Privacy
            </Link>
            <Link to="/terms-and-conditions" className="text-xs text-muted-foreground transition-colors hover:text-cyan">
              Terms
            </Link>
            <a href="#top" className="text-xs text-muted-foreground transition-colors hover:text-cyan">
              Security
            </a>
            <a href="#top" className="text-xs text-muted-foreground transition-colors hover:text-cyan">
              DPA
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
