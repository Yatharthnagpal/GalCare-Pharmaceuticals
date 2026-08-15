"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CheckCircle2, Factory, Globe2, Award, ShieldCheck, FileSpreadsheet, Send } from "lucide-react";
import { Reveal } from "@/components/motion-primitives";
import { useAuth } from "@/lib/auth-context";

export default function RegisterPage() {
  const { user, openAuthModal, add3rdPartyQuote } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const hasPromptedRef = useRef(false);
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    phone: "",
    email: "",
    dosageForm: "Dermatological Creams & Ointments",
    batchVolume: "10,000 - 50,000 units (Commercial)",
    packagingType: "Alu-Alu / Blister Packaging",
    message: "",
  });
  const [errors, setErrors] = useState<{ phone?: string }>({});

  // Ensure user is signed in on page load / mount (only prompt once)
  useEffect(() => {
    if (!user && !hasPromptedRef.current) {
      hasPromptedRef.current = true;
      openAuthModal("login", "Please sign in to access the 3rd party manufacturing quotation portal.");
    } else if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.fullName || "",
        companyName: prev.companyName || user.company || "",
        phone: prev.phone || user.phone || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user, openAuthModal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      openAuthModal("login", "Please sign in to submit your manufacturing quotation request.");
      return;
    }

    if (!formData.phone && !user?.phone) {
      setErrors({ phone: "Phone Number is required" });
      return;
    }
    setErrors({});

    const processSubmission = async () => {
      const requirements = `${formData.dosageForm} | Qty: ${formData.batchVolume} | Packaging: ${formData.packagingType}`;

      try {
        await fetch("/api/quotes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.fullName || user.fullName,
            email: formData.email || user.email,
            phone: formData.phone || user.phone,
            company: formData.companyName || user.company || "Pharmaceutical Partner",
            requirements,
            message: formData.message,
          }),
        });
      } catch (err) {
        console.error("Failed to submit manufacturing quote", err);
      }

      add3rdPartyQuote({
        userEmail: user.email || formData.email,
        userName: formData.fullName || user.fullName,
        companyName: formData.companyName || user.company || "Pharmaceutical Partner",
        phone: formData.phone || user.phone || "",
        requirements,
        message: formData.message || "Requesting WHO-GMP manufacturing quotation.",
      });
      setSubmitted(true);
    };

    processSubmission();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 sm:pt-28 pb-8 sm:pb-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Page Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
          <span className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary">
            3rd Party Contract Manufacturing
          </span>
          <h1 className="mt-2.5 sm:mt-4 text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Get an Instant Manufacturing Quote
          </h1>
          <p className="mt-2 sm:mt-3 text-xs sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            Submit your formulation specifications and batch volume requirements for WHO-GMP certified contract manufacturing in India.
          </p>
        </Reveal>

        <div className="bg-card border border-border rounded-2xl sm:rounded-[2.5rem] shadow-soft overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Side Info Panel */}
          <div className="lg:col-span-5 bg-primary p-5 sm:p-8 lg:p-12 text-primary-foreground relative overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary to-emerald-950 z-0 pointer-events-none" />

            <Reveal className="relative z-10">
              <h2 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-3">
                WHO-GMP Facility Specs
              </h2>
              <p className="text-primary-foreground/80 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-8">
                Galcare operates high-speed automated manufacturing lines for solid orals, topicals, and cosmeceuticals with full CTD dossier support.
              </p>
            </Reveal>

            <div className="relative z-10 space-y-3.5 sm:space-y-6">
              <Reveal delay={0.1} className="flex items-start gap-3 sm:gap-4">
                <div className="bg-white/10 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl shrink-0">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-lg">WHO-GMP & ISO Certified</h3>
                  <p className="text-primary-foreground/70 text-[11px] sm:text-sm mt-0.5">
                    Strict DCGI and GLP compliant batch release
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2} className="flex items-start gap-3 sm:gap-4">
                <div className="bg-white/10 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl shrink-0">
                  <Factory className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-lg">Turnkey Contract Production</h3>
                  <p className="text-primary-foreground/70 text-[11px] sm:text-sm mt-0.5">
                    From R&D formulation to custom box packaging
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.3} className="flex items-start gap-3 sm:gap-4">
                <div className="bg-white/10 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl shrink-0">
                  <Globe2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-lg">26 Indian States & Export Hubs</h3>
                  <p className="text-primary-foreground/70 text-[11px] sm:text-sm mt-0.5">
                    Seamless logistics and pan-India delivery
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.4} className="flex items-start gap-3 sm:gap-4">
                <div className="bg-white/10 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl shrink-0">
                  <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-lg">24-Hour Quote Response</h3>
                  <p className="text-primary-foreground/70 text-[11px] sm:text-sm mt-0.5">
                    Track quote status in your Client Portal Dashboard
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="relative z-10 mt-6 sm:mt-10 pt-4 sm:pt-6 border-t border-white/15">
              <p className="text-[11px] sm:text-xs text-primary-foreground/70">
                Need technical assistance? Contact our BD desk at{" "}
                <span className="font-semibold text-white">bd@galcare.com</span>
              </p>
            </div>
          </div>

          {/* Right Side Form Panel */}
          <div className="lg:col-span-7 p-5 sm:p-8 lg:p-12 bg-card">
            {submitted ? (
              <Reveal className="h-full flex flex-col items-center justify-center text-center space-y-6 py-8 sm:py-12">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Quotation Request Submitted!
                </h2>
                <p className="text-muted-foreground max-w-md text-xs sm:text-sm leading-relaxed">
                  Thank you! Your manufacturing specifications have been submitted to Galcare Business Development. You can monitor quotation generation and proposal files in your portal dashboard.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full sm:w-auto">
                  <Link
                    href="/dashboard"
                    className="px-5 py-3 bg-primary text-primary-foreground rounded-xl sm:rounded-2xl font-bold shadow-glow text-xs sm:text-sm text-center hover:bg-primary/95 transition-all"
                  >
                    Track Quote in Portal Dashboard
                  </Link>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-3 bg-secondary text-secondary-foreground rounded-xl sm:rounded-2xl hover:bg-secondary/80 transition-colors font-semibold text-xs sm:text-sm"
                  >
                    Submit Another Specification
                  </button>
                </div>
              </Reveal>
            ) : (
              <Reveal>
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                      Manufacturer Quote Request
                    </h2>
                    <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">
                      Fill out your product requirements to receive an official commercial quote.
                    </p>
                  </div>
                  <FileSpreadsheet className="w-8 h-8 text-primary/80 hidden sm:block" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-xs sm:text-sm transition-all"
                        placeholder="Yatharth Nagpal"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Company / Brand Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) =>
                          setFormData({ ...formData, companyName: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-xs sm:text-sm transition-all"
                        placeholder="Pharma Corp Inc."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className={`w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-background border rounded-xl focus:outline-none focus:ring-2 text-xs sm:text-sm transition-all ${
                          errors.phone
                            ? "border-red-500 focus:ring-red-500/50"
                            : "border-border focus:ring-primary/50"
                        }`}
                        placeholder="+91 989999 99999"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-xs sm:text-sm transition-all"
                        placeholder="yatharth@galcare.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Dosage Form / Category
                      </label>
                      <select
                        value={formData.dosageForm}
                        onChange={(e) =>
                          setFormData({ ...formData, dosageForm: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-xs sm:text-sm transition-all"
                      >
                        <option value="Dermatological Creams & Ointments">
                          Dermatological Creams & Ointments
                        </option>
                        <option value="Solid Oral Tablets & Capsules">
                          Solid Oral Tablets & Capsules
                        </option>
                        <option value="Liquid Suspensions & Syrups">
                          Liquid Suspensions & Syrups
                        </option>
                        <option value="Cosmeceutical Serums & Hair Lotions">
                          Cosmeceutical Serums & Hair Lotions
                        </option>
                        <option value="Custom API Formulation / Other">
                          Custom API Formulation / Other
                        </option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Estimated Batch Volume
                      </label>
                      <select
                        value={formData.batchVolume}
                        onChange={(e) =>
                          setFormData({ ...formData, batchVolume: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-xs sm:text-sm transition-all"
                      >
                        <option value="1,000 - 5,000 units (Pilot Trial)">
                          1,000 - 5,000 units (Pilot Trial)
                        </option>
                        <option value="10,000 - 50,000 units (Commercial)">
                          10,000 - 50,000 units (Commercial)
                        </option>
                        <option value="50,000+ units (High Volume Scale)">
                          50,000+ units (High Volume Scale)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Packaging Style
                    </label>
                    <select
                      value={formData.packagingType}
                      onChange={(e) =>
                        setFormData({ ...formData, packagingType: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-xs sm:text-sm transition-all"
                    >
                      <option value="Alu-Alu / Blister Packaging">
                        Alu-Alu / Blister Packaging
                      </option>
                      <option value="Airless Pump / Laminated Tube">
                        Airless Pump / Laminated Tube
                      </option>
                      <option value="Amber Glass Bottle / HDPE Container">
                        Amber Glass Bottle / HDPE Container
                      </option>
                      <option value="Custom Box Packaging & Primary Unit">
                        Custom Box Packaging & Primary Unit
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Formulation Details & Specifications
                    </label>
                    <textarea
                      rows={2.5 as any}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-xs sm:text-sm transition-all resize-none"
                      placeholder="Specify active ingredients, target launch dates, or CTD dossier support requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 sm:py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-glow hover:bg-primary/95 transition-all flex items-center justify-center gap-2 group text-sm sm:text-base cursor-pointer"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" /> Request Official Quotation
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
