"use client"

import Image from "next/image"
import { Globe, Share2, MessageCircle, Rss } from "lucide-react"
import { NAV_LINKS } from "@/lib/site-data"

const columns = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Research", href: "/research" },
      { label: "Manufacturing", href: "/facilities" },
      { label: "News", href: "/news" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Prescription", href: "/products?category=Prescription" },
      { label: "Cosmetic", href: "/products?category=Cosmetic" },
      { label: "Sunscreen", href: "/products?category=Sunscreen" },
      { label: "Hair Care", href: "/products?category=Hair%20Care" },
      { label: "Antifungal", href: "/products?category=Antifungal" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Downloads Center", href: "/quality" },
      { label: "Media Gallery", href: "/news" },
      { label: "Publications", href: "/research" },
      { label: "Investor Relations", href: "/about" },
      { label: "CSR", href: "/about" },
    ],
  },
]

const socials = [
  { Icon: Globe, label: "LinkedIn", href: "https://linkedin.com" },
  { Icon: Share2, label: "X (Twitter)", href: "https://x.com" },
  { Icon: MessageCircle, label: "Facebook", href: "https://facebook.com" },
  { Icon: Rss, label: "Blog", href: "/news" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Image
              src="/galcare-logo.png"
              alt="Galcare"
              width={160}
              height={44}
              className="h-10 w-auto logo-adaptive"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Premium skincare and pharmaceutical solutions backed by science, trusted by dermatologists worldwide.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-xl border border-border text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Galcare. All rights reserved.
          </p>
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2" aria-label="Footer">
            {NAV_LINKS.slice(0, 6).map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-primary">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
