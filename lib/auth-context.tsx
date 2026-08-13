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
  role?: "user" | "doctor" | "distributor" | "admin";
  consent: boolean;
}

export interface UserJobApp {
  id: string;
  userEmail: string;
  userName: string;
  jobTitle: string;
  department: string;
  phone: string;
  experience: string;
  resume: string;
  date: string;
  status: "Incomplete - Pending Processing" | "Under Review" | "Interview Scheduled" | "Accepted" | "Rejected";
}

export interface User3rdPartyQuote {
  id: string;
  userEmail: string;
  userName: string;
  companyName: string;
  phone: string;
  requirements: string;
  message: string;
  date: string;
  status: "Submitted - Under Review" | "Quote Generated" | "Proposal Sent" | "Contract Finalized" | "Rejected";
}

export interface UserEnquiry {
  id: string;
  userEmail: string;
  userName: string;
  productName: string;
  message: string;
  date: string;
  status: "Received - In Review" | "Proposal Ready" | "Resolved";
}

interface AuthContextType {
  user: UserLead | null;
  isAuthModalOpen: boolean;
  authMode: "login" | "signup";
  authPromptMessage: string | null;
  openAuthModal: (mode?: "login" | "signup", promptMessage?: string) => void;
  closeAuthModal: () => void;
  requireAuth: (action: () => void, promptMessage?: string) => boolean;
  signup: (data: Omit<UserLead, "id" | "createdAt" | "status">) => void;
  login: (emailOrPhone: string) => boolean;
  logout: () => void;
  capturedLeads: UserLead[];
  updateLeadStatus: (id: string, status: UserLead["status"]) => void;
  
  // User Dashboard Submission Items
  userJobApps: UserJobApp[];
  user3rdPartyQuotes: User3rdPartyQuote[];
  userEnquiries: UserEnquiry[];
  addJobApplication: (app: Omit<UserJobApp, "id" | "date" | "status">) => void;
  add3rdPartyQuote: (quote: Omit<User3rdPartyQuote, "id" | "date" | "status">) => void;
  addEnquiry: (enquiry: Omit<UserEnquiry, "id" | "date" | "status">) => void;
  updateUserJobAppStatus: (id: string, status: UserJobApp["status"]) => void;
  updateUser3rdPartyStatus: (id: string, status: User3rdPartyQuote["status"]) => void;
  updateUserEnquiryStatus: (id: string, status: UserEnquiry["status"]) => void;
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
];

const INITIAL_JOB_APPS: UserJobApp[] = [
  {
    id: "app-101",
    userEmail: "alexander@apexpharma.com",
    userName: "Alexander Wright",
    jobTitle: "Senior Formulation Scientist",
    department: "R&D",
    phone: "+1 (555) 234-5678",
    experience: "6 Years",
    resume: "https://drive.google.com/sample-resume",
    date: "2026-07-30",
    status: "Incomplete - Pending Processing",
  },
];

const INITIAL_3RD_PARTY_QUOTES: User3rdPartyQuote[] = [
  {
    id: "quote-101",
    userEmail: "alexander@apexpharma.com",
    userName: "Alexander Wright",
    companyName: "Apex Healthcare Ltd",
    phone: "+1 (555) 234-5678",
    requirements: "Tablets & Ointments",
    message: "Requirement for 50,000 units batch production.",
    date: "2026-07-30",
    status: "Submitted - Under Review",
  },
];

const INITIAL_ENQUIRIES: UserEnquiry[] = [
  {
    id: "enq-101",
    userEmail: "client@pharmacorp.com",
    userName: "General Client",
    productName: "Galmol 500 Paracetamol",
    message: "Inquiring about bulk distributor pricing for domestic supply.",
    date: "2026-07-30",
    status: "Received - In Review",
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserLead | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const [authPromptMessage, setAuthPromptMessage] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const [capturedLeads, setCapturedLeads] = useState<UserLead[]>(INITIAL_LEADS);
  const [userJobApps, setUserJobApps] = useState<UserJobApp[]>(INITIAL_JOB_APPS);
  const [user3rdPartyQuotes, setUser3rdPartyQuotes] = useState<User3rdPartyQuote[]>(INITIAL_3RD_PARTY_QUOTES);
  const [userEnquiries, setUserEnquiries] = useState<UserEnquiry[]>(INITIAL_ENQUIRIES);

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

    // Load job apps
    const savedApps = localStorage.getItem("galcare_user_job_apps");
    if (savedApps) {
      try {
        setUserJobApps(JSON.parse(savedApps));
      } catch (e) {
        console.error("Failed to parse job apps", e);
      }
    } else {
      localStorage.setItem("galcare_user_job_apps", JSON.stringify(INITIAL_JOB_APPS));
    }

    // Load 3rd party quotes
    const savedQuotes = localStorage.getItem("galcare_user_quotes");
    if (savedQuotes) {
      try {
        setUser3rdPartyQuotes(JSON.parse(savedQuotes));
      } catch (e) {
        console.error("Failed to parse 3rd party quotes", e);
      }
    } else {
      localStorage.setItem("galcare_user_quotes", JSON.stringify(INITIAL_3RD_PARTY_QUOTES));
    }

    // Load enquiries
    const savedEnquiries = localStorage.getItem("galcare_user_enquiries");
    if (savedEnquiries) {
      try {
        setUserEnquiries(JSON.parse(savedEnquiries));
      } catch (e) {
        console.error("Failed to parse user enquiries", e);
      }
    } else {
      localStorage.setItem("galcare_user_enquiries", JSON.stringify(INITIAL_ENQUIRIES));
    }
  }, []);

  const openAuthModal = (mode: "login" | "signup" = "signup", promptMessage?: string) => {
    setAuthMode(mode);
    setAuthPromptMessage(promptMessage || null);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthPromptMessage(null);
  };

  const requireAuth = (action: () => void, promptMessage?: string): boolean => {
    if (user) {
      action();
      return true;
    }
    setPendingAction(() => action);
    openAuthModal("signup", promptMessage || "Please sign in or create an account to proceed with your submission.");
    return false;
  };

  const signup = async (data: Omit<UserLead, "id" | "createdAt" | "status">) => {
    const newLead: UserLead = {
      ...data,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      status: "New (Uncontacted)",
    };

    try {
      await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    } catch (e) {
      console.warn("Failed to call register API route", e)
    }

    setUser(newLead);
    localStorage.setItem("galcare_active_user", JSON.stringify(newLead));

    const updatedLeads = [newLead, ...capturedLeads];
    setCapturedLeads(updatedLeads);
    localStorage.setItem("galcare_captured_leads", JSON.stringify(updatedLeads));
    closeAuthModal();

    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const login = (emailOrPhone: string): boolean => {
    const existing = capturedLeads.find(
      (l) => l.email.toLowerCase() === emailOrPhone.toLowerCase() || l.phone === emailOrPhone
    );

    fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailOrPhone }),
    }).catch((e) => console.warn("Failed to call login API route", e))

    if (existing) {
      setUser(existing);
      localStorage.setItem("galcare_active_user", JSON.stringify(existing));
      closeAuthModal();
      if (pendingAction) {
        pendingAction();
        setPendingAction(null);
      }
      return true;
    }

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

    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
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

  const addJobApplication = (appData: Omit<UserJobApp, "id" | "date" | "status">) => {
    const newApp: UserJobApp = {
      ...appData,
      id: `app-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      status: "Incomplete - Pending Processing",
    };

    const updated = [newApp, ...userJobApps];
    setUserJobApps(updated);
    localStorage.setItem("galcare_user_job_apps", JSON.stringify(updated));

    // Automatically sync with WordPress API route
    fetch("/api/careers/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: appData.userName,
        email: appData.userEmail,
        phone: appData.phone,
        jobTitle: appData.jobTitle,
        experience: appData.experience,
        resume: appData.resume,
      }),
    }).catch((e) => console.warn("[WP SYNC] Failed to sync job application to WordPress:", e));
  };

  const add3rdPartyQuote = (quoteData: Omit<User3rdPartyQuote, "id" | "date" | "status">) => {
    const newQuote: User3rdPartyQuote = {
      ...quoteData,
      id: `quote-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      status: "Submitted - Under Review",
    };

    const updated = [newQuote, ...user3rdPartyQuotes];
    setUser3rdPartyQuotes(updated);
    localStorage.setItem("galcare_user_quotes", JSON.stringify(updated));

    // Automatically sync with WordPress API route
    fetch("/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: quoteData.userName,
        email: quoteData.userEmail,
        phone: quoteData.phone,
        company: quoteData.companyName,
        requirements: quoteData.requirements,
        message: quoteData.message,
      }),
    }).catch((e) => console.warn("[WP SYNC] Failed to sync 3rd party quote to WordPress:", e));
  };

  const addEnquiry = (enquiryData: Omit<UserEnquiry, "id" | "date" | "status">) => {
    const newEnquiry: UserEnquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      status: "Received - In Review",
    };

    const updated = [newEnquiry, ...userEnquiries];
    setUserEnquiries(updated);
    localStorage.setItem("galcare_user_enquiries", JSON.stringify(updated));

    // Automatically sync with WordPress API route
    fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: enquiryData.userName,
        email: enquiryData.userEmail,
        productName: enquiryData.productName,
        message: enquiryData.message,
      }),
    }).catch((e) => console.warn("[WP SYNC] Failed to sync enquiry to WordPress:", e));
  };

  const updateUserJobAppStatus = (id: string, status: UserJobApp["status"]) => {
    const updated = userJobApps.map((a) => (a.id === id ? { ...a, status } : a));
    setUserJobApps(updated);
    localStorage.setItem("galcare_user_job_apps", JSON.stringify(updated));
  };

  const updateUser3rdPartyStatus = (id: string, status: User3rdPartyQuote["status"]) => {
    const updated = user3rdPartyQuotes.map((q) => (q.id === id ? { ...q, status } : q));
    setUser3rdPartyQuotes(updated);
    localStorage.setItem("galcare_user_quotes", JSON.stringify(updated));
  };

  const updateUserEnquiryStatus = (id: string, status: UserEnquiry["status"]) => {
    const updated = userEnquiries.map((e) => (e.id === id ? { ...e, status } : e));
    setUserEnquiries(updated);
    localStorage.setItem("galcare_user_enquiries", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthModalOpen,
        authMode,
        authPromptMessage,
        openAuthModal,
        closeAuthModal,
        requireAuth,
        signup,
        login,
        logout,
        capturedLeads,
        updateLeadStatus,
        userJobApps,
        user3rdPartyQuotes,
        userEnquiries,
        addJobApplication,
        add3rdPartyQuote,
        addEnquiry,
        updateUserJobAppStatus,
        updateUser3rdPartyStatus,
        updateUserEnquiryStatus,
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
