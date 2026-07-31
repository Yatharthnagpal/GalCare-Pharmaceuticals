"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Lock, Mail, Phone, User, Building2, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export function AuthModal() {
  const { isAuthModalOpen, authMode, closeAuthModal, signup, login, openAuthModal } = useAuth();

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [interest, setInterest] = useState("Third Party Manufacturing");
  const [consent, setConsent] = useState(true);
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{ phone?: string; email?: string; fullName?: string } >({});
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { phone?: string; email?: string; fullName?: string } = {};

    if (!fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!email.trim()) newErrors.email = "Email Address is required";
    if (!phone.trim()) newErrors.phone = "Phone Number is required for business followup";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    signup({
      fullName,
      email,
      phone,
      company: company || "Independent B2B Partner",
      interest,
      consent,
    });

    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
    }, 2000);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const identifier = email || phone;
    if (!identifier.trim()) {
      setErrors({ email: "Please enter your Email or Phone number" });
      return;
    }
    setErrors({});
    login(identifier);
  };

  if (!isAuthModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-border bg-muted/40 px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="grid size-8 place-items-center rounded-xl bg-primary/10 text-primary">
                <ShieldCheck className="size-4" />
              </div>
              <span className="font-bold text-foreground">Galcare B2B Portal</span>
            </div>
            <button
              onClick={closeAuthModal}
              className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="p-6">
            {/* Mode Switcher */}
            <div className="flex rounded-2xl bg-muted p-1 border border-border/50 mb-6">
              <button
                type="button"
                onClick={() => openAuthModal("signup")}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                  authMode === "signup"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sign Up (B2B Partner)
              </button>
              <button
                type="button"
                onClick={() => openAuthModal("login")}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                  authMode === "login"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sign In
              </button>
            </div>

            {successMsg ? (
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                <div className="grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle2 className="size-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Welcome to Galcare!</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Your B2B account has been created. Our team will follow up via email or phone with custom manufacturing catalogs.
                </p>
              </div>
            ) : authMode === "signup" ? (
              /* SIGN UP FORM */
              <form onSubmit={handleSignupSubmit} className="space-y-4">
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
                      placeholder="Dr. Sarah Jenkins"
                      className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                        placeholder="sarah@pharmaclinic.com"
                        className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
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
                        placeholder="+1 (555) 345-6789"
                        className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Company / Clinic Name
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Apex Health"
                        className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Primary Business Interest
                    </label>
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="Third Party Manufacturing">3rd Party Manufacturing</option>
                      <option value="Dermatology Distribution">Dermatology Distribution</option>
                      <option value="Neuropsychiatric Division">Neuropsychiatric Division</option>
                      <option value="Bulk Molecule Sourcing">Bulk Molecule Sourcing</option>
                      <option value="Global Export Opportunities">Global Export Opportunities</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 rounded border-border text-primary focus:ring-primary"
                  />
                  <label htmlFor="consent" className="text-xs text-muted-foreground leading-snug">
                    I agree to allow Galcare to contact me via cold email or phone call with product catalogs and manufacturing quotes.
                  </label>
                </div>

                <button
                  type="submit"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:bg-primary/95"
                >
                  Create Partner Account <ArrowRight className="size-4" />
                </button>
              </form>
            ) : (
              /* SIGN IN FORM */
              <form onSubmit={handleLoginSubmit} className="space-y-4 py-2">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Email Address or Phone Number
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      value={email || phone}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setPhone(e.target.value);
                      }}
                      placeholder="alexander@apexpharma.com or +1 (555)..."
                      className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

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
                      className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:bg-primary/95"
                >
                  Sign In <ArrowRight className="size-4" />
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
