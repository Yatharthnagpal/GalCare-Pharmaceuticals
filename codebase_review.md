# GalCare Pharmaceuticals — Codebase Review & Implementation Roadmap

> **Last Updated:** 2026-08-12  
> **Status:** Phase 1, Phase 2, Phase 3 & Phase 4 **Completed & Build Verified** (`✓ Compiled successfully (33/33 routes)`)

> [!IMPORTANT]
> **Primary Domain Replacement Directive:**  
> This new Next.js web application is configured to **replace Galcare's existing website on `https://galcare.com/`**.
> All canonical URLs, sitemap routes (`/sitemap.xml`), robots.txt (`/robots.txt`), OpenGraph meta cards, and API proxies default to `https://galcare.com`.

> [!IMPORTANT]
> **Essential Core Feature Directive:**  
> **Login, Signin / User Registration, Email Authentication (Email/Password + Verification), and the Client Dashboard are MANDATORY CORE FEATURES** of Galcare. They are built into the UI architecture and fully integrated with server authentication endpoints.  

> [!TIP]
> **Existing WordPress & Registered Domain Integration:**  
> Galcare Pharmaceuticals **already owns an active WordPress website on their registered domain**. This Next.js web application connects directly to their existing WordPress REST API (`/wp-json/wp/v2/`), allowing Galcare's team to manage form submissions, news, and job listings inside their familiar `/wp-admin` dashboard with **₹0 additional server hosting cost**.

> [!NOTE]
> **User Schedule & Design Refresh Notes (To be completed afterwards):**
> 1. **Client Dashboard UI Design**: Redesign and layout revamp of [app/dashboard/page.tsx](file:///c:/Users/Yatharth%20nagpal/Desktop/Galcare/app/dashboard/page.tsx) will be updated afterwards.
> 2. **Product Images Asset Update**: Updating full high-res product image assets in [products-db.ts](file:///c:/Users/Yatharth%20nagpal/Desktop/Galcare/lib/products-db.ts) will be updated afterwards.
> 3. **Partners Section Design Update**: UI design and layout update for [components/sections/partners.tsx](file:///c:/Users/Yatharth%20nagpal/Desktop/Galcare/components/sections/partners.tsx) will be updated afterwards.

---

## 🏗️ Architecture Overview

| Layer | Technology | Version | Details |
|-------|-----------|---------|---------|
| Project Name | `galcare-web` | 0.1.0 | Official package identifier |
| Target Production Domain | `https://galcare.com` | — | Replaces current legacy site |
| Framework | Next.js (App Router) | 16.2.6 | React 19 Server & Client Components |
| Language | TypeScript | 5.7.3 | Strict type definitions |
| Styling | Tailwind CSS v4 + shadcn/ui | 4.2.0 | Custom design system & glassmorphism |
| Animations | Motion (`motion/react`) | 12.42.0 | Smooth page & component micro-interactions |
| Scroll | Lenis Smooth Scroll | 1.3.25 | Inertial smooth scrolling wrapper |
| Icons | Lucide React | 1.16.0 | Modern vector icon suite |
| Analytics | Vercel Analytics + GA4 | 1.6.1 | Web vitals, GA4, and user tracking |
| Package Manager | pnpm / npm | 11.9.0 | Fast, space-efficient dependency management |
| Hosting | Vercel | Free Tier | Edge network deployment |

---

## 📁 Project Structure Summary

```
Galcare/
├── app/                          # Next.js App Router pages & metadata
│   ├── layout.tsx                # Root layout (fonts, theme, auth, scroll, WhatsApp, GA4)
│   ├── page.tsx                  # Homepage (hero, overview, products, CTA, testimonials, news)
│   ├── template.tsx              # Page transition animations
│   ├── globals.css               # Design tokens, glassmorphism, custom scrollbar
│   ├── not-found.tsx             # Branded 404 error page
│   ├── error.tsx                 # Global error boundary page
│   ├── sitemap.ts                # Dynamic XML sitemap generator (https://galcare.com/sitemap.xml)
│   ├── robots.ts                 # Search engine crawler configuration (https://galcare.com/robots.txt)
│   ├── api/                      # Server API Proxy Routes
│   │   ├── auth/                 # Login & Registration authentication endpoints
│   │   ├── contact/              # Contact form submission API
│   │   ├── careers/apply/        # Job application submission API
│   │   ├── quotes/               # 3rd party manufacturing quotation API
│   │   └── enquiries/            # Product inquiry submission API
│   ├── login/                    # Login page [ESSENTIAL CORE]
│   ├── signup/ & register/       # Registration & Signup pages [ESSENTIAL CORE]
│   ├── dashboard/                # User client portal dashboard [ESSENTIAL CORE - Connected to APIs]
│   ├── about/                    # About Galcare + sub-pages
│   ├── products/                 # Products catalog [Product images update planned afterwards]
│   ├── divisions/                # Division sub-pages (Dermatology, 3rd-Party)
│   ├── careers/                  # Careers overview + apply flow
│   ├── contact/                  # Contact form & info
│   ├── news/                     # News listing + detail pages
│   └── quality/                  # Quality assurance page
├── components/
│   ├── navbar.tsx                # Responsive navbar with User Sign-In & Profile Dropdown
│   ├── auth-modal.tsx            # Modal flow for Login & Registration [ESSENTIAL CORE]
│   ├── footer.tsx                # Site-wide footer with real social URLs & matching categories
│   ├── ai-assistant.tsx          # "Aria" AI chatbot (keyword & recommendation engine)
│   ├── whatsapp-button.tsx       # Floating WhatsApp Business quick chat trigger
│   └── sections/                 # Homepage section components (13 files)
├── docs/                         # Project documentation & specifications
│   └── specs/                    # PRDs, prompts, and architectural specs
├── lib/
│   ├── wordpress.ts              # WP REST API Client Helper
│   ├── auth-context.tsx          # Auth state & session management [ESSENTIAL CORE]
│   ├── site-data.ts              # Static data (nav, stats, testimonials, news, jobs)
│   └── products-db.ts            # Complete product catalog (50+ SKUs)
└── public/
    ├── galcare-logo.png/svg      # Brand logos (light & dark)
    └── products/                 # SKU-specific product images
```

---

## ✅ What's Working Well

### 1. **Production Domain Readiness (`https://galcare.com`)**
- Configured to directly replace `https://galcare.com` with automated XML sitemap generation ([app/sitemap.ts](file:///c:/Users/Yatharth%20nagpal/Desktop/Galcare/app/sitemap.ts)) and crawler instructions ([app/robots.ts](file:///c:/Users/Yatharth%20nagpal/Desktop/Galcare/app/robots.ts)).
- Canonical OpenGraph and Twitter Card metadata configured for social media sharing.

### 2. **Instant Support & SEO Boost**
- **Floating WhatsApp Business Trigger**: Built interactive animated WhatsApp floating button ([components/whatsapp-button.tsx](file:///c:/Users/Yatharth%20nagpal/Desktop/Galcare/components/whatsapp-button.tsx)) with ping badge and pre-filled inquiry text.
- **Google Analytics 4 (GA4)**: Added GA4 tracking script integration configured via `NEXT_PUBLIC_GA_ID` env variable.
- **Google Search Console Verification**: Added verification metadata tag support configured via `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.

### 3. **Essential Authentication & User Flow (MANDATORY CORE)**
- **Login & Registration UI**: Full user sign-up and Sign-In modal/page flows ([auth-modal.tsx](file:///c:/Users/Yatharth%20nagpal/Desktop/Galcare/components/auth-modal.tsx)).
- **Email Authentication Server Endpoints**: Server routes `/api/auth/login` and `/api/auth/register` integrated into `lib/auth-context.tsx`.
- **Client Dashboard**: Dedicated user area ([app/dashboard/page.tsx](file:///c:/Users/Yatharth%20nagpal/Desktop/Galcare/app/dashboard/page.tsx)) filtering real-time inquiry history, job applications, and manufacturing quote statuses.

### 4. **Form APIs & WordPress REST Integration**
- **Server API Proxies**: Form submissions on Contact, Apply, Third-Party Manufacturing, and Product detail pages post to `/api/...` endpoints and forward payloads to Galcare's WordPress REST API (`/wp-json/wp/v2/`).

---

## 📊 Technical Debt & Issue Tracker

### 🟢 Recently Resolved (Phases 1, 2, 3 & 4 Completed)

| # | Item | Solution Implemented | Verified Files / Routes |
|---|------|----------------------|-------------------------|
| 1 | **Production Domain Target** | Set `https://galcare.com` as primary production URL | `app/sitemap.ts`, `app/robots.ts`, `app/layout.tsx` |
| 2 | **Floating WhatsApp Business Button** | Built interactive floating WhatsApp button with ping animation | [components/whatsapp-button.tsx](file:///c:/Users/Yatharth%20nagpal/Desktop/Galcare/components/whatsapp-button.tsx) |
| 3 | **Google Analytics 4 (GA4) Tag** | Added GA4 script integration in root layout | [app/layout.tsx](file:///c:/Users/Yatharth%20nagpal/Desktop/Galcare/app/layout.tsx) |
| 4 | **Form Submission API Routes** | Created server routes `/api/contact`, `/api/careers/apply`, `/api/quotes`, `/api/enquiries` | `/api/...` |
| 5 | **WordPress REST API Integration** | Created `lib/wordpress.ts` with offline fallback handling | [lib/wordpress.ts](file:///c:/Users/Yatharth%20nagpal/Desktop/Galcare/lib/wordpress.ts) |
| 6 | **Production Email Authentication** | Built `/api/auth/login` and `/api/auth/register` server endpoints | `/api/auth/...` |
| 7 | **Client Dashboard Data Sync** | Connected `/dashboard` to filter submissions matching user email | [app/dashboard/page.tsx](file:///c:/Users/Yatharth%20nagpal/Desktop/Galcare/app/dashboard/page.tsx) |
| 8 | **Handover Configuration Template** | Created `.env.example` to document environment variables | [.env.example](file:///c:/Users/Yatharth%20nagpal/Desktop/Galcare/.env.example) |

---

## 💰 Budget & Architecture Philosophy

> [!IMPORTANT]
> **Zero Recurring Cost Target (₹0/month) & Existing WordPress Domain**  
> The backend architecture connects to Galcare's **existing WordPress website on their registered domain** via WP REST API. Content managers manage everything inside their familiar `/wp-admin` dashboard.

| Concern | Solution | Monthly Cost | Integration Note |
|---------|----------|--------------|------------------|
| Target Production URL | `https://galcare.com` | — | Replaces legacy website |
| Frontend Hosting | Vercel Free Tier (100GB bandwidth) | **₹0** | Easily transferred to Galcare's Vercel account |
| CMS & Form Backend | Existing Headless WordPress (WP REST API) | **₹0** | Connects to Galcare's registered WP domain |
| User Authentication | Server Email Auth (Email/Password + Verification) | **₹0** | Configured via `NEXTAUTH_SECRET` env variable |
| Email Notifications | Resend Free Tier (100 emails/day) / WP Mail | **₹0** | Configured via `RESEND_API_KEY` env variable |
| Instant Support | WhatsApp Business Button | **₹0** | Configured via company phone number |
| Analytics | Vercel Analytics + Google Analytics 4 | **₹0** | Configured via `NEXT_PUBLIC_GA_ID` |
| **Total Monthly Recurring Cost** | | **₹0/month** | 100% Zero Added Overhead |
