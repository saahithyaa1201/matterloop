import React from "react";
import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

function XIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function YouTubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z" />
    </svg>
  );
}

function CrunchbaseIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <mask id="cb-mask">
        <rect width="64" height="64" fill="white" />
        <path d="M23.7 36.725a7.065 7.065 0 1 1 .082-5.819h5.477a12.322 12.322 0 1 0 0 5.819h-5.477zM46.526 21.459h-.904a12.16 12.16 0 0 0-6.024 2.122V9.862H34.6v35.283h5.025v-1.287a12.322 12.322 0 1 0 6.9-22.4m7.064 13.198v.22a7 7 0 0 1-.191.862 7 7 0 0 1-.343.89v.11a7.1 7.1 0 0 1-4.942 3.874l-.671.11h-.15a7 7 0 0 1-.767 0 7 7 0 0 1-.959-.069h-.219a7 7 0 0 1-1.794-.547h-.136a7 7 0 0 1-1.589-1.068 7.1 7.1 0 0 1-1.246-1.493 7 7 0 0 1-.451-.876 7.02 7.02 0 0 1 .082-5.819 7.08 7.08 0 0 1 5.668-4.011 7 7 0 0 1 .726 0 7.08 7.08 0 0 1 6.982 6.873 7 7 0 0 1 0 .944" fill="black" />
      </mask>
      <rect width="64" height="64" rx="14" fill="currentColor" mask="url(#cb-mask)" />
    </svg>
  );
}

function F6SIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <mask id="f6s-mask">
        <rect width="64" height="64" fill="white" />
        <g transform="translate(6, 6) scale(0.065)" fill="black">
          <polygon points="156.9,180.1 293.7,180.1 293.7,237.9 210.7,237.9 210.7,362.8 260.5,362.8 260.5,420.6 210.7,420.6 210.7,619.9 152.9,619.9 152.9,180.1" />
          <path d="m 372.4,237.9 v 124.9 h 68.5 c 16.6,0 31.1,14.5 31.1,31 v 194.7 c 0,16.7 -14.5,31.4 -31.1,31.4 h -95 c -16.6,0 -31.1,-14.3 -31.1,-30.6 V 212.3 c 0,-16.8 14.4,-32.2 30.3,-32.2 h 95.9 c 16.6,0 31.1,14.5 31.1,31 v 76.6 h -57.8 v -49.8 z m 0,182.7 v 141.5 h 41.9 V 420.6 Z" />
          <path d="m 647.1,283.7 h -57.8 v -49.8 h -41.9 v 124.9 l 69.1,0 c 16.4,0 30.5,19.7 30.5,35.8 v 189.7 c 0,16.8 -14.3,31.6 -30.5,31.6 h -92.9 c -16.3,0 -30.5,-14.4 -30.5,-30.7 v -110 l 54.3,-0.1 v 83 h 41.9 V 420.6 l -65.7,0 c -16.2,0 -30.5,-14.6 -30.5,-31.1 V 211.3 c 0,-16.6 14.3,-31.2 30.5,-31.2 h 92.9 c 16.3,0 30.5,14.6 30.5,31.2 z" />
        </g>
      </mask>
      <rect width="64" height="64" rx="14" fill="currentColor" mask="url(#f6s-mask)" />
    </svg>
  );
}

interface FooterLink {
  label: string;
  href: string;
  isRoute?: boolean;
  isExternal?: boolean;
  icon?: React.ReactNode;
}

interface FooterGroup {
  title: string;
  links: FooterLink[];
}

const groups: FooterGroup[] = [
  {
    title: "Platform",
    links: [
      { label: "Overview", href: "/#top" },
      { label: "Live Dashboard", href: "/#dashboard" },
      { label: "Capabilities", href: "/#capabilities" },
      { label: "Metrava Platform", href: "/Product", isRoute: true },
      { label: "Pricing & Plans", href: "/#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Team & Leadership", href: "/#team" },
      { label: "Contact Us", href: "/#contact" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Profiles",
    links: [
      {
        label: "F6S",
        href: "https://www.f6s.com/matterloop",
        isExternal: true,
        icon: <F6SIcon className="h-4 w-4 shrink-0 rounded-[3px]" />,
      },
      {
        label: "Crunchbase",
        href: "https://www.crunchbase.com/organization/matterloop",
        isExternal: true,
        icon: <CrunchbaseIcon className="w-4 h-4 shrink-0" />,
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/matterloop1",
        isExternal: true,
        icon: <LinkedInIcon className="w-4 h-4 shrink-0" />,
      },
    ],
  },
];

const socialLinks = [
  {
    name: "X",
    href: "https://x.com/Matterloopqy",
    icon: <XIcon className="w-4 h-4" />,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/Matterloop/",
    icon: <FacebookIcon className="w-4 h-4" />,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@Matterloop-s6u",
    icon: <YouTubeIcon className="w-4 h-4" />,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="px-4 py-12 pb-24 mx-auto max-w-7xl sm:pb-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <div className="flex items-center">
              <Link
                to="/"
                aria-label="MatterLoop Home"
                className="inline-block transition-opacity hover:opacity-80"
              >
                <img
                  src="/logo.png"
                  alt="MatterLoop logo"
                  className="h-8 sm:h-10 w-auto max-w-[140px] object-contain"
                />
              </Link>
            </div>
            <p className="max-w-sm mt-4 text-sm leading-relaxed text-muted-foreground">
              From physical assets to intelligent action, make every operational moment count.
            </p>

            {/* Social Media Links */}
            <div className="mt-5 flex items-center gap-2.5 sm:gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`MatterLoop on ${s.name}`}
                  className="inline-flex items-center justify-center transition-all border rounded-lg h-9 w-9 border-border bg-surface/60 text-muted-foreground hover:border-cyan/50 hover:bg-cyan/10 hover:text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-green/40 bg-green/10 px-3 py-1.5 font-mono text-[11px] text-green">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-green" />
              All Systems Operational
            </span>
          </div>

          <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-8 sm:grid-cols-3">
            {groups.map((g) => (
              <div key={g.title}>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan">
                  {g.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      {l.isRoute ? (
                        <Link
                          to={l.href}
                          className="inline-flex items-center gap-2 text-sm transition-colors text-muted-foreground hover:text-cyan"
                        >
                          {l.icon}
                          <span>{l.label}</span>
                        </Link>
                      ) : (
                        <a
                          href={l.href}
                          target={l.isExternal ? "_blank" : undefined}
                          rel={l.isExternal ? "noopener noreferrer" : undefined}
                          className="inline-flex items-center gap-2 text-sm transition-colors group text-muted-foreground hover:text-cyan"
                        >
                          {l.icon}
                          <span>{l.label}</span>
                          {l.isExternal && (
                            <ExternalLink className="h-3 w-3 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan" />
                          )}
                        </a>
                      )}
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
          <div className="flex flex-wrap gap-3.5 sm:gap-5">
            <Link
              to="/privacy-policy"
              className="text-xs transition-colors text-muted-foreground hover:text-cyan"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-and-conditions"
              className="text-xs transition-colors text-muted-foreground hover:text-cyan"
            >
              Terms & Conditions
            </Link>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-cookie-preferences"))}
              className="p-0 m-0 text-xs transition-colors bg-transparent border-none cursor-pointer text-muted-foreground hover:text-cyan"
            >
              Cookie Preferences
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
