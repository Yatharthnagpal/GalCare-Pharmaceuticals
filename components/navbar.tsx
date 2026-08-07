"use client"

import { useEffect, useState } from "react"
import { AdaptiveImage } from "@/components/ui/adaptive-image"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, Moon, Sun, MessageCircle, ChevronDown, User, LogOut } from "lucide-react"
import { NAV_LINKS } from "@/lib/site-data"
import { useTheme } from "@/components/theme-provider"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [userDropdown, setUserDropdown] = useState(false)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [hoveredDesktopItem, setHoveredDesktopItem] = useState<string | null>(null)
  const { theme, toggleTheme } = useTheme()
  const { user, openAuthModal, logout } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const toggleExpand = (label: string) => {
    setExpandedItem((prev) => (prev === label ? null : label))
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border shadow-soft" : "bg-transparent"
      )}
      style={{ transform: "translate3d(0, 0, 100px)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 transition-all duration-300">
        <a href="/" className="flex items-center gap-2" aria-label="Galcare home">
          <AdaptiveImage
            src="/galcare-logo.png"
            alt="Galcare"
            width={150}
            height={40}
            className="h-9 w-auto dark:hidden"
            priority
          />
          <AdaptiveImage
            src="/galcare-logo-dark.svg"
            alt="Galcare"
            width={150}
            height={40}
            className="h-9 w-auto hidden dark:block"
            priority
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <div 
              key={link.label} 
              className="relative group"
              onMouseEnter={() => setHoveredDesktopItem(link.label)}
              onMouseLeave={() => setHoveredDesktopItem(null)}
            >
              {link.href ? (
                <a
                  href={link.href}
                  className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-accent hover:text-foreground"
                >
                  {link.label}
                </a>
              ) : (
                <button
                  className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-accent hover:text-foreground"
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown className={cn("size-4 transition-transform duration-200", hoveredDesktopItem === link.label && "rotate-180")} />
                  )}
                </button>
              )}

              {/* Desktop Dropdown */}
              {link.children && (
                <AnimatePresence>
                  {hoveredDesktopItem === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full pt-2"
                    >
                      <div className="flex w-48 flex-col rounded-2xl bg-card/90 backdrop-blur-xl border border-border p-2 shadow-soft">
                        {link.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-accent hover:text-foreground"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid size-10 place-items-center rounded-xl border border-border bg-card/60 text-foreground transition-colors hover:bg-accent backdrop-blur-sm"
          >
            {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="hidden items-center gap-2 rounded-xl border border-border bg-card/80 px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent sm:flex"
              >
                <div className="grid size-6 place-items-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[100px] truncate">{user.fullName}</span>
                <ChevronDown className="size-3.5 text-muted-foreground" />
              </button>

              <AnimatePresence>
                {userDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-border bg-card p-2 shadow-soft backdrop-blur-xl z-50"
                  >
                    <div className="px-3 py-2 border-b border-border/50">
                      <p className="text-xs font-bold text-foreground truncate">{user.fullName}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <a
                      href="/dashboard"
                      onClick={() => setUserDropdown(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-foreground/80 hover:bg-accent"
                    >
                      <User className="size-3.5 text-primary" /> My Client Dashboard
                    </a>
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdown(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-500/10"
                    >
                      <LogOut className="size-3.5" /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal("signup")}
              className="hidden items-center gap-1.5 rounded-xl border border-border bg-card/80 px-3.5 py-2 text-sm font-semibold text-foreground transition-all hover:bg-accent sm:flex"
            >
              <User className="size-4 text-primary" />
              Sign In
            </button>
          )}

          <a
            href="/divisions/third-party-manufacturing"
            className="hidden items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5 sm:flex"
          >
            <MessageCircle className="size-4" />
            Partner With Us
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="grid size-10 place-items-center rounded-xl border border-border bg-card/60 text-foreground xl:hidden backdrop-blur-sm"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mb-4 rounded-2xl glass-strong p-3 shadow-soft xl:hidden border border-border"
          >
            <nav className="grid gap-1" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                  {link.children ? (
                    <div>
                      <button
                        onClick={() => toggleExpand(link.label)}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                      >
                        {link.label}
                        <ChevronDown className={cn("size-4 transition-transform duration-200", expandedItem === link.label && "rotate-180")} />
                      </button>
                      <AnimatePresence>
                        {expandedItem === link.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-1 pl-4 pt-1 pb-2">
                              {link.children.map((child) => (
                                <a
                                  key={child.label}
                                  href={child.href}
                                  onClick={() => setOpen(false)}
                                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-accent hover:text-foreground"
                                >
                                  {child.label}
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex w-full rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  )}
                </div>
              ))}
              <a
                href="/divisions/third-party-manufacturing"
                onClick={() => setOpen(false)}
                className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
              >
                <MessageCircle className="size-4" />
                Partner With Us
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
