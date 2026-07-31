"use client";

import { Edit2, Image as ImageIcon, ShieldCheck, Settings } from "lucide-react";

export default function AdminThirdPartyPage() {
  const sections = [
    {
      title: "Manufacturing Capabilities",
      description:
        "Manage the list of manufacturing formats (Tablets, Capsules, Syrups, etc.) and their specific production capacities.",
      icon: Settings,
    },
    {
      title: "Certifications",
      description:
        "Update company certifications, ISO standards, and WHO-GMP status displayed on the third-party page.",
      icon: ShieldCheck,
    },
    {
      title: "Partner Logos",
      description:
        "Manage the carousel of client and partner logos to showcase manufacturing relationships.",
      icon: ImageIcon,
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

              <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 transition-colors font-medium">
                <Edit2 className="w-4 h-4" /> Edit Section
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
