"use client"

import Link from "next/link"
import { AdaptiveImage } from "@/components/ui/adaptive-image"
import { Globe, Share2, MessageCircle, Rss } from "lucide-react"
import { NAV_LINKS } from "@/lib/site-data"

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Research", href: "/research" },
      { label: "Manufacturing", href: "/facilities" },
      { label: "News & Media", href: "/news" },
      { label: "Careers Portal", href: "/careers" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Acne Care", href: "/products?category=Acne+Care" },
      { label: "Anti-Ageing & Brightening", href: "/products?category=Anti-Ageing+%26+Brightening" },
      { label: "Sun Protection", href: "/products?category=Sun+Protection" },
      { label: "Hair Care", href: "/products?category=Hair+Care" },
      { label: "Skin Infections & Anti-Fungal", href: "/products?category=Skin+Infections+%26+Anti-Fungal" },
      { label: "Skin Therapy & Wellness", href: "/products?category=Skin+Therapy+%26+Wellness" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Quality Assurance", href: "/quality" },
      { label: "Certifications", href: "/certifications" },
      { label: "Publications", href: "/research" },
      { label: "CSR Initiatives", href: "/about" },
    ],
  },
]

const socials = [
  { Icon: Globe, label: "LinkedIn", href: "https://www.linkedin.com/company/galcare-pharmaceuticals" },
  { Icon: Share2, label: "X (Twitter)", href: "https://x.com/galcarepharma" },
  { Icon: MessageCircle, label: "Facebook", href: "https://facebook.com/galcarepharma" },
  { Icon: Rss, label: "Blog", href: "/news" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-8 md:py-10 md:px-6">
        <div className="grid gap-6 md:gap-8 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link href="/">
              <AdaptiveImage
                src="/galcare-logo.png"
                alt="Galcare"
                width={160}
                height={44}
                className="h-9 w-auto dark:hidden"
              />
              <AdaptiveImage
                src="/galcare-logo-dark.svg"
                alt="Galcare"
                width={160}
                height={44}
                className="h-9 w-auto hidden dark:block"
              />
            </Link>
            <p className="mt-3 max-w-xs text-xs sm:text-sm leading-relaxed text-muted-foreground">
              Specialty dermatology formulations engineered for excellence. Founded in 2008 by Devkant Bhardwaj, trusted across 26 states in India.
            </p>
            <div className="mt-4 flex gap-2">
              {socials.map(({ Icon, label, href }) =>
                href.startsWith("http") ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-9 place-items-center rounded-xl border border-border text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <Icon className="size-4" />
                  </a>
                ) : (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    className="grid size-9 place-items-center rounded-xl border border-border text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <Icon className="size-4" />
                  </Link>
                )
              )}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-xs sm:text-sm text-muted-foreground transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs sm:text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Galcare. All rights reserved.
          </p>
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2" aria-label="Footer">
            {NAV_LINKS.slice(0, 6).map((l) => (
              <Link key={l.label} href={l.href || l.children?.[0]?.href || "#"} className="text-xs sm:text-sm text-muted-foreground hover:text-primary">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
