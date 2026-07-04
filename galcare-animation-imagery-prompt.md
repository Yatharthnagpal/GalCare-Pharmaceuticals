# Prompt: Add Human-Centric Imagery & Skincare Animations to Galcare Website

## Context
This is for the existing Next.js website deployed at:
`https://galcare-pharmaceuticals.vercel.app/`

The site currently looks clinical/pharma-only (logo, product bottles, lab shots,
manufacturing facility photos). It is missing **human interaction imagery** —
real people (mostly women, some men) actually applying skincare, touching their
face, smiling with clear skin, dermatologist consultations, etc. It also feels
static. The goal is to make the site feel warm, aspirational, and alive through
motion + relatable human photography, while keeping the premium/clinical
dermatology credibility intact.

Do NOT generate or attach any images yourself. Only add placeholder image slots
(with clearly named `alt` text and a `src` pointing to a placeholder path like
`/images/placeholders/hero-woman-applying-serum.jpg`) so real photography/AI
images can be dropped in later. Focus entirely on layout, animation, and
structure changes.

---

## 1. Hero Section (Home Page)
- Keep the existing headline ("Innovation in Dermatology. Trusted by Healthcare
  Professionals.") and CTA buttons, but restructure the hero into a **split
  layout**: text + stats on the left, a large lifestyle image/video slot on the
  right showing a **woman applying serum/cream to her face, smiling, in soft
  natural light**.
- Add a subtle **Ken Burns effect** (slow zoom/pan, 15–20s loop) on the hero
  image using CSS `@keyframes` or Framer Motion `animate` with `scale` and
  `x/y` transforms.
- Animate the headline and subtext with a staggered **fade-up on load**
  (Framer Motion `initial={{opacity:0, y:20}}` → `animate={{opacity:1, y:0}}`,
  staggerChildren ~0.15s).
- Animate the stat badges ("WHO-GMP Certified", "30K+ Doctors Trust Us") with a
  **count-up number animation** when they scroll into view (use
  `react-countup` or a custom `useInView` + `requestAnimationFrame` counter).
- Add a floating/parallax secondary image chip near the hero (e.g., a
  close-up of hands applying moisturizer) that moves slightly slower than
  scroll speed for a parallax depth effect.

## 2. Featured Products Section
- Behind/around the product grid, insert **lifestyle inserts every 3 product
  cards** — a wide image slot of a person using a related product category
  (e.g., a woman applying sunscreen outdoors for "ShieldSun SPF 50+", someone
  massaging scalp serum into hair for "ReGrowth Peptide Serum", a person
  patting brightening cream onto cheeks for "Lumina Brightening Cream").
- Add a **hover-tilt / 3D card effect** on product cards (subtle
  `rotateX`/`rotateY` following cursor position, max ±6deg, using
  `framer-motion`'s `useMotionValue` + `useTransform`, or a lightweight
  vanilla-tilt style implementation).
- Add a **scroll-reveal** animation: cards fade + slide up into view with a
  small stagger as the user scrolls (IntersectionObserver-based, threshold
  0.2).
- On category filter change ("All / Prescription / Cosmetic / Hair Care..."),
  animate the grid re-shuffle with a **FLIP animation** (Framer Motion
  `layout` prop on each card) instead of an instant re-render.

## 3. Core Business Divisions Section
- Replace/augment the current static division images (lab.png, hero-serum.png,
  manufacturing.png) with **image + human overlay** treatment: each division
  card gets a background image slot PLUS a smaller circular inset photo of a
  person relevant to that division (e.g., Dermatology Division → a woman
  touching her clear skin / dermatologist examining a patient's skin under a
  lamp).
- Animate each card with a **gradient overlay wipe on hover** (dark gradient
  slides up from 40% to 90% opacity) revealing more of the description text.
- Add a slow **cross-fade image carousel** (3–4s per slide, ~800ms fade
  transition) behind each division card cycling between a product shot and a
  human/lifestyle shot, using CSS opacity transitions or Framer Motion
  `AnimatePresence`.

## 4. "A Quarter Century" Timeline Section
- Convert the year milestones (2001, 2009, 2016, 2024) into a **horizontal
  animated timeline** with a progress line that draws itself (SVG `stroke-
  dashoffset` animation) as the user scrolls through the section.
- Each milestone node should have a small circular image slot (e.g., archival-
  style photo of a scientist/founder in a lab, a dermatologist consulting a
  patient) that pops in with a scale+fade animation when its node becomes
  active.
- Animate the counters (Years of Experience, Countries Served, Doctors Trust
  Us, Product Portfolio) with the same count-up-on-scroll behavior as the
  hero stats.

## 5. Newsroom / Latest Launches Section
- Add a background lifestyle image slot per news card (e.g., a woman testing
  the new sunscreen line outdoors for "Galcare launches next-gen biomimetic
  sunscreen line").
- Cards animate in with a **staggered slide-in from alternating left/right**
  as they enter viewport.
- Add a subtle image **zoom-on-hover** (scale 1 → 1.05, 400ms ease-out) for
  each news card's image slot.

## 6. Therapeutic Areas Section (Acne, Psoriasis, Vitiligo, etc.)
- Currently text-only icon cards — add a small **before/after style circular
  photo slot** per condition (e.g., person applying acne treatment, close-up
  of hand applying anti-pigmentation cream) that fades in on hover, replacing
  or sitting beside the icon.
- Animate the grid with a **masonry-style staggered fade-in** on scroll.

## 7. Manufacturing Section
- Keep the WHO-GMP facility image but add a smaller inset showing a **quality
  control technician inspecting a product** (human presence in an otherwise
  purely industrial section) to humanize the process.
- Animate the 4-step process (R&D & Formulation → Precision Production →
  Quality Testing → Global Distribution) as a **horizontal step animation**:
  each step's icon/image scales up and its connecting line fills in
  sequentially as the section scrolls into view.

## 8. Research & Development Section
- Add a human element to the 4-step Discovery → Formulation → Clinical
  Validation → Launch & Monitor flow: an image slot of a **researcher/
  dermatologist reviewing results on a tablet or examining a patient's skin**.
- Animate each step number with a **rotating/flipping counter** reveal as it
  scrolls into view.

## 9. Testimonials Section
- Add a **circular headshot placeholder image** next to Dr. Ananya Rao's
  quote (currently text-only).
- If more testimonials are added later, implement an **auto-playing
  testimonial carousel** with smooth horizontal slide transitions (autoplay
  every 6s, pause on hover, swipeable on mobile) using Framer Motion
  `AnimatePresence` with `mode="wait"`.

## 10. Contact Section
- Add a friendly lifestyle image slot beside the contact form (e.g., a
  dermatologist smiling while writing on a clipboard, or a customer service
  representative on a call) to make the form feel more human and less
  corporate.
- Animate the form fields with a light **focus-glow transition** (border
  color + subtle box-shadow animate over 200ms on focus).

## 11. General Site-Wide Motion Guidelines
- Use **Framer Motion** (already common in Next.js/shadcn stacks) for
  React-based animations; fall back to CSS `@keyframes`/`transition` for
  simple hover/scale effects to keep performance high.
- All scroll-triggered animations should use `IntersectionObserver` /
  `useInView` with `once: true` (or `triggerOnce`) so animations don't replay
  distractingly on every scroll pass.
- Respect `prefers-reduced-motion`: wrap animations so they are disabled or
  reduced to simple fades for users with that OS setting enabled.
- Keep animation durations between 200ms–600ms for micro-interactions (hover,
  focus, button clicks) and 600ms–1200ms for section reveals — nothing should
  feel sluggish.
- Add a smooth **page transition fade** between routes (Home, Products,
  About, Research, etc.) using Next.js App Router layout transitions or
  Framer Motion's `AnimatePresence` at the layout level.
- Add a subtle **cursor-follow glow or gradient blob** in the hero background
  for extra polish on desktop (disable on mobile/touch devices).

## 12. Image Placeholder Naming Convention
When inserting image slots, use descriptive placeholder paths and alt text so
they're easy to swap later, for example:
- `/images/placeholders/hero-woman-applying-serum.jpg` — alt: "Woman applying
  serum to face"
- `/images/placeholders/sunscreen-outdoor-application.jpg` — alt: "Woman
  applying sunscreen outdoors"
- `/images/placeholders/scalp-serum-massage.jpg` — alt: "Person massaging
  hair serum into scalp"
- `/images/placeholders/dermatologist-consultation.jpg` — alt: "Dermatologist
  consulting with patient"
- `/images/placeholders/qc-technician-inspection.jpg` — alt: "Quality control
  technician inspecting product"
- `/images/placeholders/testimonial-doctor-headshot.jpg` — alt: "Dr. Ananya
  Rao headshot"

## Deliverable
Update the existing Next.js codebase (components under the current page
structure — hero, product grid, divisions, timeline, newsroom, therapeutic
areas, manufacturing, R&D, testimonials, contact) to:
1. Add the image placeholder slots described above with correct alt text.
2. Implement the animation behaviors described above.
3. Keep all existing content, copy, and product data unchanged — this is a
   visual/motion/imagery enhancement pass only, not a content or IA change.
