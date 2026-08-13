"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Lock, Mail, Phone, User, ShieldCheck, ArrowRight, CheckCircle2, Eye, EyeOff, KeyRound, RefreshCw, Smartphone } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export function AuthModal() {
  const { isAuthModalOpen, authMode, authPromptMessage, closeAuthModal, signup, login, openAuthModal } = useAuth();

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // OTP Verification states
  const [step, setStep] = useState<"form" | "otp_signup" | "otp_login">("form");
  const [loginMethod, setLoginMethod] = useState<"password" | "otp">("password");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [demoOtp, setDemoOtp] = useState("482910");
  const [resendTimer, setResendTimer] = useState(30);
  const [isResendActive, setIsResendActive] = useState(false);

  const [errors, setErrors] = useState<{ phone?: string; email?: string; fullName?: string; password?: string; otp?: string }>({});
  const [successMsg, setSuccessMsg] = useState(false);

  // Countdown timer for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResendActive && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setIsResendActive(false);
    }
    return () => clearInterval(interval);
  }, [isResendActive, resendTimer]);

  const startOtpTimer = () => {
    setResendTimer(30);
    setIsResendActive(true);
    // Generate a fresh random 6 digit OTP for realistic demo
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setDemoOtp(generated);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { phone?: string; email?: string; fullName?: string; password?: string } = {};

    if (!fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!email.trim()) newErrors.email = "Email Address is required";
    if (!phone.trim()) newErrors.phone = "Mobile Number is required";
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (confirmPassword && password !== confirmPassword) {
      newErrors.password = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    startOtpTimer();
    setOtpDigits(["", "", "", "", "", ""]);
    setStep("otp_signup");
  };

  const handleVerifySignupOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otpDigits.join("");
    if (enteredOtp.length < 6) {
      setErrors({ otp: "Please enter the 6-digit OTP code" });
      return;
    }

    setErrors({});
    signup({
      fullName,
      email,
      phone,
      company: "Client Partner",
      interest: "General Practice",
      consent: true,
    });

    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setStep("form");
    }, 2000);
  };

  const handleSendLoginOtp = () => {
    const identifier = email || phone;
    if (!identifier.trim()) {
      setErrors({ email: "Please enter your Email or Mobile number first" });
      return;
    }
    setErrors({});
    startOtpTimer();
    setOtpDigits(["", "", "", "", "", ""]);
    setStep("otp_login");
  };

  const handleVerifyLoginOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otpDigits.join("");
    if (enteredOtp.length < 6) {
      setErrors({ otp: "Please enter the 6-digit OTP code" });
      return;
    }

    setErrors({});
    login(email || phone);
    setStep("form");
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const identifier = email || phone;
    if (!identifier.trim()) {
      setErrors({ email: "Please enter your Email or Mobile number" });
      return;
    }
    if (loginMethod === "password" && !password.trim()) {
      setErrors({ password: "Please enter your password" });
      return;
    }

    setErrors({});
    login(identifier);
    setStep("form");
  };

  const handleOtpInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Pasting full OTP
      const pasted = value.slice(0, 6).split("");
      const newDigits = [...otpDigits];
      pasted.forEach((char, i) => {
        if (i < 6) newDigits[i] = char;
      });
      setOtpDigits(newDigits);
      return;
    }

    const newDigits = [...otpDigits];
    newDigits[index] = value;
    setOtpDigits(newDigits);

    // Auto-focus next input field
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const autofillDemoOtp = () => {
    setOtpDigits(demoOtp.split(""));
    setErrors({});
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
          className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-border bg-muted/30 px-6 py-4">
            <div className="flex items-center gap-2.5">
              <div className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <span className="font-bold text-foreground text-sm sm:text-base block">Galcare Client Portal</span>
                <span className="text-[11px] text-muted-foreground block">Verified Secure Access</span>
              </div>
            </div>
            <button
              onClick={() => {
                setStep("form");
                closeAuthModal();
              }}
              className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="p-6">
            {authPromptMessage && step === "form" && (
              <div className="mb-4 p-3 rounded-2xl bg-primary/10 border border-primary/20 text-xs font-semibold text-primary flex items-center gap-2">
                <ShieldCheck className="size-4 shrink-0" />
                <span>{authPromptMessage}</span>
              </div>
            )}

            {/* Mode Switcher Tabs */}
            {step === "form" && (
              <div className="flex rounded-2xl bg-muted p-1 border border-border/50 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setErrors({});
                    openAuthModal("login");
                  }}
                  className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                    authMode === "login"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setErrors({});
                    openAuthModal("signup");
                  }}
                  className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                    authMode === "signup"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Create Account
                </button>
              </div>
            )}

            {successMsg ? (
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                <div className="grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle2 className="size-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Mobile & Email Verified!</h3>
                <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                  Your Galcare partner account is successfully verified and created. You are now signed in.
                </p>
              </div>
            ) : step === "otp_signup" || step === "otp_login" ? (
              /* OTP VERIFICATION STEP */
              <form onSubmit={step === "otp_signup" ? handleVerifySignupOtp : handleVerifyLoginOtp} className="space-y-5 py-2">
                <div className="text-center">
                  <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary mb-3">
                    <KeyRound className="size-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Verify OTP Code</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    We sent a 6-digit OTP code to <strong className="text-foreground">{phone || "+91 98765 43210"}</strong> and <strong className="text-foreground">{email || "your email"}</strong>
                  </p>
                </div>

                {/* Verification Code Banner */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-primary/10 border border-primary/20 text-xs text-primary">
                  <div className="flex items-center gap-2">
                    <Smartphone className="size-4 shrink-0" />
                    <span>Verification Code: <strong className="font-mono text-sm tracking-wider">{demoOtp}</strong></span>
                  </div>
                  <button
                    type="button"
                    onClick={autofillDemoOtp}
                    className="font-bold underline text-[11px] hover:text-primary-dark"
                  >
                    Auto Fill Code
                  </button>
                </div>

                {/* 6 Digit Input Boxes */}
                <div className="flex justify-center gap-2 sm:gap-2.5 my-4">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      maxLength={6}
                      value={digit}
                      onChange={(e) => handleOtpInputChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="size-11 sm:size-12 rounded-xl border border-border bg-background text-center text-lg font-bold font-mono focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  ))}
                </div>
                {errors.otp && <p className="text-xs text-red-500 text-center font-medium">{errors.otp}</p>}

                {/* Resend Timer & Actions */}
                <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                  <button
                    type="button"
                    onClick={() => setStep("form")}
                    className="hover:underline font-medium"
                  >
                    &larr; Change Details
                  </button>

                  <button
                    type="button"
                    disabled={isResendActive}
                    onClick={startOtpTimer}
                    className={`inline-flex items-center gap-1 font-semibold ${
                      isResendActive ? "text-muted-foreground cursor-not-allowed" : "text-primary hover:underline"
                    }`}
                  >
                    <RefreshCw className={`size-3 ${isResendActive ? "animate-spin" : ""}`} />
                    {isResendActive ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
                  </button>
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs sm:text-sm font-bold text-primary-foreground shadow-glow transition-all hover:bg-primary/95"
                >
                  Verify & Continue <ArrowRight className="size-4" />
                </button>
              </form>
            ) : authMode === "login" ? (
              /* SIGN IN FORM */
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Email Address or Mobile Number
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
                      placeholder="doctor@galcare.com or +91 98765 43210"
                      className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                {/* Login Method Toggle: Password or Mobile OTP */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-muted-foreground font-semibold">Sign in using:</span>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setLoginMethod("password")}
                      className={`font-semibold ${loginMethod === "password" ? "text-primary underline" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      Password
                    </button>
                    <span className="text-muted-foreground/30">•</span>
                    <button
                      type="button"
                      onClick={() => setLoginMethod("otp")}
                      className={`font-semibold ${loginMethod === "otp" ? "text-primary underline" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      OTP Code
                    </button>
                  </div>
                </div>

                {loginMethod === "password" ? (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-foreground">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => alert("Password reset OTP sent to your email & mobile.")}
                        className="text-[11px] font-semibold text-primary hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-border bg-background pl-10 pr-10 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                  </div>
                ) : (
                  <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-xs text-primary flex items-center justify-between">
                    <span>We will send a 6-digit OTP code to verify your mobile/email.</span>
                    <button
                      type="button"
                      onClick={handleSendLoginOtp}
                      className="px-3 py-1.5 rounded-xl bg-primary text-primary-foreground font-bold shrink-0 ml-2"
                    >
                      Get OTP
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="remember"
                    defaultChecked
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <label htmlFor="remember" className="text-xs text-muted-foreground font-medium">
                    Keep me signed in on this device
                  </label>
                </div>

                {loginMethod === "password" && (
                  <button
                    type="submit"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs sm:text-sm font-bold text-primary-foreground shadow-glow transition-all hover:bg-primary/95"
                  >
                    Sign In to Account <ArrowRight className="size-4" />
                  </button>
                )}
              </form>
            ) : (
              /* CREATE ACCOUNT / SIGN UP FORM */
              <form onSubmit={handleSignupSubmit} className="space-y-3.5">
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
                      placeholder="Dr. Ananya Sharma"
                      className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
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
                        placeholder="ananya@clinic.com"
                        className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create password"
                        className="w-full rounded-xl border border-border bg-background pl-10 pr-10 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"
                        className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                </div>
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}

                <button
                  type="submit"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs sm:text-sm font-bold text-primary-foreground shadow-glow transition-all hover:bg-primary/95"
                >
                  Send OTP & Verify Account <ArrowRight className="size-4" />
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
