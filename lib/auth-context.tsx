"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserLead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  interest?: string;
  createdAt: string;
  status: "New (Uncontacted)" | "Cold Emailed" | "Called" | "Converted";
  consent: boolean;
}

interface AuthContextType {
  user: UserLead | null;
  isAuthModalOpen: boolean;
  authMode: "login" | "signup";
  openAuthModal: (mode?: "login" | "signup") => void;
  closeAuthModal: () => void;
  signup: (data: Omit<UserLead, "id" | "createdAt" | "status">) => void;
  login: (emailOrPhone: string) => boolean;
  logout: () => void;
  capturedLeads: UserLead[];
  updateLeadStatus: (id: string, status: UserLead["status"]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const INITIAL_LEADS: UserLead[] = [
  {
    id: "lead-1",
    fullName: "Alexander Wright",
    email: "alexander@apexpharma.com",
    phone: "+1 (555) 234-5678",
    company: "Apex Healthcare Ltd",
    interest: "Third Party Manufacturing",
    createdAt: "2026-07-30",
    status: "New (Uncontacted)",
    consent: true,
  },
  {
    id: "lead-2",
    fullName: "Dr. Kavita Sharma",
    email: "kavita@skinclinics.in",
    phone: "+91 98200 11223",
    company: "Skin & Care Clinics",
    interest: "Dermatology Products",
    createdAt: "2026-07-29",
    status: "Cold Emailed",
    consent: true,
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserLead | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const [capturedLeads, setCapturedLeads] = useState<UserLead[]>(INITIAL_LEADS);

  useEffect(() => {
    // Load session user
    const savedUser = localStorage.getItem("galcare_active_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }

    // Load captured leads list
    const savedLeads = localStorage.getItem("galcare_captured_leads");
    if (savedLeads) {
      try {
        setCapturedLeads(JSON.parse(savedLeads));
      } catch (e) {
        console.error("Failed to parse captured leads", e);
      }
    } else {
      localStorage.setItem("galcare_captured_leads", JSON.stringify(INITIAL_LEADS));
    }
  }, []);

  const openAuthModal = (mode: "login" | "signup" = "signup") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const signup = (data: Omit<UserLead, "id" | "createdAt" | "status">) => {
    const newLead: UserLead = {
      ...data,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      status: "New (Uncontacted)",
    };

    setUser(newLead);
    localStorage.setItem("galcare_active_user", JSON.stringify(newLead));

    const updatedLeads = [newLead, ...capturedLeads];
    setCapturedLeads(updatedLeads);
    localStorage.setItem("galcare_captured_leads", JSON.stringify(updatedLeads));
    closeAuthModal();
  };

  const login = (emailOrPhone: string): boolean => {
    const existing = capturedLeads.find(
      (l) => l.email.toLowerCase() === emailOrPhone.toLowerCase() || l.phone === emailOrPhone
    );

    if (existing) {
      setUser(existing);
      localStorage.setItem("galcare_active_user", JSON.stringify(existing));
      closeAuthModal();
      return true;
    }

    // If user not found in leads, create a quick session for demo
    const quickUser: UserLead = {
      id: `user-${Date.now()}`,
      fullName: emailOrPhone.includes("@") ? emailOrPhone.split("@")[0] : "Client Partner",
      email: emailOrPhone.includes("@") ? emailOrPhone : `${emailOrPhone}@partner.com`,
      phone: emailOrPhone.includes("@") ? "+1 (555) 000-1122" : emailOrPhone,
      company: "Pharmaceutical Partner",
      interest: "Third Party Manufacturing",
      createdAt: new Date().toISOString().split("T")[0],
      status: "New (Uncontacted)",
      consent: true,
    };

    setUser(quickUser);
    localStorage.setItem("galcare_active_user", JSON.stringify(quickUser));

    const updatedLeads = [quickUser, ...capturedLeads];
    setCapturedLeads(updatedLeads);
    localStorage.setItem("galcare_captured_leads", JSON.stringify(updatedLeads));
    closeAuthModal();
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("galcare_active_user");
  };

  const updateLeadStatus = (id: string, status: UserLead["status"]) => {
    const updated = capturedLeads.map((lead) =>
      lead.id === id ? { ...lead, status } : lead
    );
    setCapturedLeads(updated);
    localStorage.setItem("galcare_captured_leads", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthModalOpen,
        authMode,
        openAuthModal,
        closeAuthModal,
        signup,
        login,
        logout,
        capturedLeads,
        updateLeadStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
