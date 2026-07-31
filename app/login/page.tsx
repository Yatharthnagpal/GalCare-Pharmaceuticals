"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useAuth } from "@/lib/auth-context";
import { ShieldCheck, Mail, Lock, Phone, User, Building2, ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/motion-primitives";

export default function LoginPage() {
  const { login, signup, user, logout } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [interest, setInterest] = useState("Third Party Manufacturing");
  const [consent, setConsent] = useState(true);
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{ phone?: string; email?: string; fullName?: string }>({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      const errs: typeof errors = {};
      if (!fullName.trim()) errs.fullName = "Full Name is required";
      if (!email.trim()) errs.email = "Email Address is required";
      if (!phone.trim()) errs.phone = "Phone Number is required for business contact";

      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }

      signup({
        fullName,
        email,
        phone,
        company: company || "Pharma Client",
        interest,
        consent,
      });
      setSuccess(true);
    } else {
      const identifier = email || phone;
      if (!identifier.trim()) {
        setErrors({ email: "Please enter your Email or Phone number" });
        return;
      }
      login(identifier);
      setSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex items-center">
        <div className="bg-card border border-border rounded-[2.5rem] shadow-soft overflow-hidden grid grid-cols-1 lg:grid-cols-2 w-full">
          {/* Left Branding Side */}
          <div className="bg-primary p-8 lg:p-14 text-primary-foreground relative overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-green-950 z-0 pointer-events-none" />

            <Reveal className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-white backdrop-blur-md mb-6">
                <ShieldCheck className="size-4" /> B2B Manufacturing & Distribution Portal
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
                Partner Portal & Lead Network
              </h1>
              <p className="text-primary-foreground/80 text-base md:text-lg max-w-md leading-relaxed">
                Access custom WHO-GMP product catalogs, third-party manufacturing quotes, and direct sales manager assistance.
              </p>
            </Reveal>

            <div className="relative z-10 space-y-6 mt-12">
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
                <p className="text-sm font-semibold">Why Register Your Business?</p>
                <p className="text-xs text-primary-foreground/75 mt-1 leading-relaxed">
                  Even before requesting a formal quote, registering allows our B2B team to send custom pricing, cold sample batches, and molecule updates tailored to your company.
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-primary-foreground/70 border-t border-white/10 pt-4">
                <span>WHO-GMP Certified</span>
                <span>•</span>
                <span>42+ Export Markets</span>
                <span>•</span>
                <span>100% Quality Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Form Side */}
          <div className="p-8 lg:p-14 bg-card flex flex-col justify-center">
            {user || success ? (
              <Reveal className="text-center py-8 space-y-6">
                <div className="grid size-20 place-items-center rounded-full bg-primary/10 text-primary mx-auto">
                  <CheckCircle2 className="size-10" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">Welcome, {user?.fullName || "Partner"}!</h2>
                <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
                  Your B2B account is active. Your primary phone (<span className="font-semibold text-foreground">{user?.phone}</span>) and email (<span className="font-semibold text-foreground">{user?.email}</span>) have been synced with our sales team.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <a
                    href="/divisions/third-party-manufacturing"
                    className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all text-sm"
                  >
                    View Manufacturing Capacities
                  </a>
                  <button
                    onClick={logout}
                    className="px-6 py-3 border border-border text-foreground font-semibold rounded-xl hover:bg-muted transition-all text-sm"
                  >
                    Sign Out
                  </button>
                </div>
              </Reveal>
            ) : (
              <Reveal>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {isSignUp ? "Create Partner Account" : "Sign In to B2B Portal"}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      {isSignUp
                        ? "Enter your contact details to receive catalogs & cold quotes."
                        : "Access your saved inquiries & direct support."}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {isSignUp && (
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@company.com"
                          className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {isSignUp && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1">
                          Company Name
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                          <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Pharma Company"
                            className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1">
                          Primary Interest
                        </label>
                        <select
                          value={interest}
                          onChange={(e) => setInterest(e.target.value)}
                          className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                          <option value="Third Party Manufacturing">3rd Party Manufacturing</option>
                          <option value="Dermatology Range">Dermatology Range</option>
                          <option value="Neuropsychiatric Range">Neuropsychiatric Range</option>
                          <option value="Bulk Molecule Orders">Bulk Molecule Orders</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {!isSignUp && (
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                    </div>
                  )}

                  {isSignUp && (
                    <div className="flex items-start gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="consent-page"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-1 rounded border-border text-primary focus:ring-primary"
                      />
                      <label htmlFor="consent-page" className="text-xs text-muted-foreground leading-snug">
                        I agree to allow Galcare sales team to contact me via email or phone call with manufacturing details and business proposals.
                      </label>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group mt-4 shadow-glow"
                  >
                    {isSignUp ? "Register Lead Account" : "Sign In"}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </Reveal>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
