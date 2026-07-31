"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CheckCircle2, Factory, Globe2, Award, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion-primitives";

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    phone: "",
    email: "",
    requirements: "Tablets",
    message: "",
  });
  const [errors, setErrors] = useState<{ phone?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone) {
      setErrors({ phone: "Phone Number is required" });
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-card border border-border rounded-[2rem] shadow-soft overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side */}
          <div className="bg-primary p-8 lg:p-12 text-primary-foreground relative overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-green-900/90 z-0 pointer-events-none"></div>

            <Reveal className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Partner With Galcare
              </h1>
              <p className="text-primary-foreground/80 text-lg max-w-md mb-12">
                Join our global network of pharmaceutical distribution. Quality
                you can trust, partnerships that grow.
              </p>
            </Reveal>

            <div className="relative z-10 space-y-8 mt-auto">
              <Reveal delay={0.1} className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-2xl glass-strong">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">WHO-GMP Certified</h3>
                  <p className="text-primary-foreground/70 text-sm">
                    International quality standards
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.2} className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-2xl glass-strong">
                  <Globe2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">42+ Countries</h3>
                  <p className="text-primary-foreground/70 text-sm">
                    Global presence and distribution
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.3} className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-2xl glass-strong">
                  <Factory className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">
                    16+ Years Experience
                  </h3>
                  <p className="text-primary-foreground/70 text-sm">
                    Trusted manufacturing legacy
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Side */}
          <div className="p-8 lg:p-12 bg-card">
            {submitted ? (
              <Reveal className="h-full flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">
                  Thank You!
                </h2>
                <p className="text-muted-foreground max-w-sm">
                  Your registration has been received. Our partnership team will
                  contact you shortly to discuss next steps.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 px-6 py-3 bg-secondary text-secondary-foreground rounded-2xl hover:bg-secondary/80 transition-colors font-medium"
                >
                  Submit Another Inquiry
                </button>
              </Reveal>
            ) : (
              <Reveal>
                <h2 className="text-2xl font-bold mb-6 text-foreground">
                  Registration Details
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            companyName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="Pharma Co."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className={`w-full px-4 py-3 bg-background border rounded-xl focus:outline-none focus:ring-2 transition-all ${errors.phone ? "border-red-500 focus:ring-red-500/50" : "border-border focus:ring-primary/50"}`}
                        placeholder="+1 (555) 000-0000"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">
                      Requirements
                    </label>
                    <select
                      value={formData.requirements}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          requirements: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
                    >
                      <option value="Tablets">Tablets</option>
                      <option value="Creams/Ointments">Creams/Ointments</option>
                      <option value="Capsules">Capsules</option>
                      <option value="Syrups/Suspensions">
                        Syrups/Suspensions
                      </option>
                      <option value="Serums/Lotions">Serums/Lotions</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                      placeholder="Tell us about your requirements..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group"
                  >
                    Register Interest
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
