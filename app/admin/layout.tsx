"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Newspaper,
  Factory,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { name: "Dashboard", href: "/admin/leads", icon: LayoutDashboard },
  { name: "Leads", href: "/admin/leads", icon: Users },
  { name: "Careers", href: "/admin/careers", icon: Briefcase },
  { name: "Newsroom", href: "/admin/newsroom", icon: Newspaper },
  { name: "Third Party", href: "/admin/third-party", icon: Factory },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (pathname === "/admin") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card">
        <span className="font-bold text-xl text-primary">Galcare Admin</span>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-foreground"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${mobileMenuOpen ? "block" : "hidden"} md:block w-full md:w-64 bg-card border-r border-border flex-shrink-0 z-20`}
      >
        <div className="h-full flex flex-col p-4">
          <div className="hidden md:block mb-8 mt-4 px-4">
            <span className="font-bold text-2xl text-primary">
              Galcare Admin
            </span>
          </div>

          <nav className="flex-1 space-y-2">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-4 border-t border-border">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Back to Website
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
