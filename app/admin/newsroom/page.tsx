"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, UploadCloud } from "lucide-react";
import { NEWS } from "@/lib/site-data";
import Image from "next/image";

export default function AdminNewsroomPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Newsroom Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage articles, announcements, and events
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Article
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border p-6 rounded-2xl shadow-soft">
          <h3 className="text-muted-foreground text-sm font-medium">
            Total Articles
          </h3>
          <p className="text-4xl font-bold mt-2 text-primary">{NEWS.length}</p>
        </div>
        <div className="bg-card border border-border p-6 rounded-2xl shadow-soft">
          <h3 className="text-muted-foreground text-sm font-medium">
            Categories
          </h3>
          <p className="text-4xl font-bold mt-2 text-foreground">3</p>
          <p className="text-sm text-muted-foreground mt-1">
            Award, Product Launch, Event
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {NEWS.map((item, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-2xl shadow-soft overflow-hidden group"
          >
            <div className="relative h-48 w-full bg-secondary">
              <Image
                src={item.image || "/images/placeholders/sunscreen-testing.png"}
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button className="p-3 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition-colors">
                  <Edit2 className="w-5 h-5" />
                </button>
                <button className="p-3 bg-red-500/80 hover:bg-red-500 text-white rounded-full backdrop-blur-md transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold px-2 py-1 bg-secondary text-secondary-foreground rounded-md">
                  {item.category}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.date}
                </span>
              </div>
              <h3 className="font-bold text-foreground line-clamp-2 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.excerpt}
              </p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl shadow-glow w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-border flex-shrink-0">
              <h2 className="text-xl font-bold text-foreground">
                Add New Article
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsModalOpen(false);
              }}
              className="p-6 overflow-y-auto space-y-5"
            >
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Article Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-background border border-border rounded-xl"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Category</label>
                  <select className="w-full px-4 py-2 bg-background border border-border rounded-xl">
                    <option>Award</option>
                    <option>Product Launch</option>
                    <option>Event</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 bg-background border border-border rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Featured Image</label>
                <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-secondary/50 transition-colors">
                  <UploadCloud className="w-10 h-10 text-muted-foreground mb-3" />
                  <p className="text-sm font-medium text-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Excerpt</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 bg-background border border-border rounded-xl resize-none"
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-muted-foreground hover:text-foreground font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
