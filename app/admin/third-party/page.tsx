"use client";

import { Edit2, Image as ImageIcon, ShieldCheck, Settings } from "lucide-react";
import Link from "next/link";

export default function AdminThirdPartyPage() {
  const sections = [
    {
      title: "Manufacturing Capabilities",
      description:
        "Manage the list of manufacturing formats (Tablets, Capsules, Syrups, etc.) and their specific production capacities.",
      icon: Settings,
      href: "/admin/third-party/manufacturing",
    },
    {
      title: "Partner Logos",
      description:
        "Manage the 12 partner logo slots rendered on the homepage partner ecosystem section.",
      icon: ImageIcon,
      href: "/admin/third-party/partners",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Third Party Manufacturing
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage content for the third-party manufacturing services page
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((sec, i) => {
          const Icon = sec.icon;
          return (
            <div
              key={i}
              className="bg-card border border-border p-6 rounded-2xl shadow-soft flex flex-col"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {sec.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-6 flex-grow">
                {sec.description}
              </p>

              <Link 
                href={sec.href}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 transition-colors font-medium"
              >
                <Edit2 className="w-4 h-4" /> Edit Section
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
