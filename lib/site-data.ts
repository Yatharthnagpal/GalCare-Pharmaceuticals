export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Research", href: "/research" },
  { label: "Manufacturing", href: "/facilities" },
  { label: "Quality", href: "/quality" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
]

export type ProductCategory =
  | "Prescription"
  | "Cosmetic"
  | "Hair Care"
  | "Acne"
  | "Pigmentation"
  | "Sunscreen"
  | "Antifungal"

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Prescription",
  "Cosmetic",
  "Hair Care",
  "Acne",
  "Pigmentation",
  "Sunscreen",
  "Antifungal",
]

export interface Product {
  id: string
  name: string
  category: ProductCategory
  tagline: string
  description: string
  image: string
  ingredients: string[]
  benefits: string[]
  genericName?: string
  division?: string
  dosageForm?: string
  strength?: string
  composition?: string
  packaging?: string
  storage?: string
  indications?: string[]
}

export const PRODUCTS: Product[] = [
  {
    id: "clarigel-forte",
    name: "ClariGel Forte",
    category: "Acne",
    tagline: "Advanced anti-acne therapy",
    description: "A dermatologist-grade gel that targets active breakouts while calming inflammation and preventing recurrence.",
    image: "/products/acne-gel.png",
    ingredients: ["Adapalene 0.1%", "Niacinamide", "Zinc PCA"],
    benefits: ["Clears active acne", "Reduces post-acne marks", "Non-comedogenic"],
    genericName: "Adapalene & Niacinamide Gel",
    division: "Dermatology",
    dosageForm: "Gel",
    strength: "15g",
    composition: "Adapalene 0.1% w/w, Niacinamide 4% w/w, Zinc PCA 1% w/w",
    packaging: "15g Laminated Tube",
    storage: "Store below 25°C. Do not freeze.",
    indications: ["Acne vulgaris", "Comedones", "Post-acne inflammation"]
  },
  {
    id: "shieldsun-spf50",
    name: "ShieldSun SPF 50+",
    category: "Sunscreen",
    tagline: "Broad-spectrum photoprotection",
    description: "Ultra-light hybrid sunscreen offering PA++++ protection with a matte, transparent finish for daily wear.",
    image: "/products/sunscreen.png",
    ingredients: ["Tinosorb S", "Vitamin E", "Hyaluronic Acid"],
    benefits: ["UVA + UVB defense", "No white cast", "Sweat resistant"],
    genericName: "Sunscreen Gel SPF 50+ PA++++",
    division: "Dermatology",
    dosageForm: "Cream/Gel",
    strength: "50g",
    composition: "Tinosorb S, Octyl Methoxycinnamate, Vitamin E, Hyaluronic Acid",
    packaging: "50g Airless Pump Bottle",
    storage: "Store below 30°C. Protect from direct sunlight.",
    indications: ["Broad-spectrum UV protection", "Sunburn prevention", "Anti-aging defense"]
  },
  {
    id: "regrowth-serum",
    name: "ReGrowth Peptide Serum",
    category: "Hair Care",
    tagline: "Clinically-backed hair density",
    description: "A leave-on scalp serum formulated with redensyl and peptides to reduce shedding and support new growth.",
    image: "/products/hair-serum.png",
    ingredients: ["Redensyl 3%", "Biotin", "Copper Peptides"],
    benefits: ["Reduces hair fall", "Boosts density", "Strengthens follicles"],
    genericName: "Redensyl & Peptides Scalp Serum",
    division: "Dermatology",
    dosageForm: "Serum",
    strength: "60ml",
    composition: "Redensyl 3% w/v, Procapil 2% w/v, Biotin, Copper Peptides",
    packaging: "60ml Dropper Bottle",
    storage: "Store below 25°C. Keep away from heat.",
    indications: ["Hair shedding", "Pattern hair loss", "Thinning hair"]
  },
  {
    id: "lumina-cream",
    name: "Lumina Brightening Cream",
    category: "Pigmentation",
    tagline: "Even tone, luminous skin",
    description: "A targeted depigmenting cream that fades melasma and dark spots while restoring an even, radiant complexion.",
    image: "/products/pigmentation-cream.png",
    ingredients: ["Alpha Arbutin", "Kojic Acid", "Tranexamic Acid"],
    benefits: ["Fades dark spots", "Evens skin tone", "Antioxidant rich"],
    genericName: "Kojic Acid & Tranexamic Acid Cream",
    division: "Dermatology",
    dosageForm: "Cream",
    strength: "20g",
    composition: "Alpha Arbutin 2% w/w, Kojic Acid 2% w/w, Tranexamic Acid 3% w/w",
    packaging: "20g Laminated Tube",
    storage: "Store below 25°C. Do not freeze.",
    indications: ["Melasma", "Chloasma", "Post-inflammatory hyperpigmentation", "Dark spots"]
  },
  {
    id: "ceraveil-moist",
    name: "CeraVeil Moisturizer",
    category: "Cosmetic",
    tagline: "Barrier-repair hydration",
    description: "A ceramide-rich moisturizer that restores the skin barrier and locks in hydration for 24 hours.",
    image: "/products/moisturizer.png",
    ingredients: ["Ceramide Complex", "Hyaluronic Acid", "Panthenol"],
    benefits: ["24h hydration", "Restores barrier", "Fragrance-free"],
    genericName: "Ceramide & Hyaluronic Acid Skin Repair Cream",
    division: "Dermatology",
    dosageForm: "Cream",
    strength: "100g",
    composition: "Ceramide NP, Ceramide AP, Ceramide EOP, Hyaluronic Acid, Panthenol",
    packaging: "100g Tub Container",
    storage: "Store below 25°C. Keep container tightly closed.",
    indications: ["Dry skin", "Impaired skin barrier", "Atopic eczema support", "Post-procedure healing"]
  },
  {
    id: "fungiclear-cream",
    name: "FungiClear Cream",
    category: "Antifungal",
    tagline: "Fast antifungal relief",
    description: "A broad-spectrum topical antifungal that relieves itching and clears infection at the source.",
    image: "/products/antifungal.png",
    ingredients: ["Luliconazole 1%", "Aloe Vera", "Menthol"],
    benefits: ["Broad-spectrum action", "Soothes itching", "Once-daily use"],
    genericName: "Luliconazole Cream 1% w/w",
    division: "Dermatology",
    dosageForm: "Cream",
    strength: "30g",
    composition: "Luliconazole 1.0% w/w, Aloe Vera extract, Menthol 0.5% w/w",
    packaging: "30g Tube",
    storage: "Store below 25°C. Do not freeze.",
    indications: ["Tinea pedis (athlete's foot)", "Tinea cruris (jock itch)", "Tinea corporis (ringworm)"]
  },
  {
    id: "gabasoft-nt",
    name: "GabaSoft NT",
    category: "Prescription",
    tagline: "Neuropathic pain relief",
    description: "A synergic formulation of Gabapentin and Nortriptyline for chronic nerve discomfort.",
    image: "/lab.png",
    ingredients: ["Gabapentin", "Nortriptyline"],
    benefits: ["Reduces nerve pain", "Improves sleep quality", "Restores mobility"],
    genericName: "Gabapentin & Nortriptyline Tablets",
    division: "Neuropsychiatric",
    dosageForm: "Tablets",
    strength: "300mg/10mg",
    composition: "Gabapentin 300mg, Nortriptyline Hydrochloride 10mg",
    packaging: "10x10 Strip Packaging",
    storage: "Store below 30°C. Protect from moisture.",
    indications: ["Diabetic neuropathy", "Post-herpetic neuralgia", "Fibromyalgia chronic pain"]
  },
  {
    id: "sertalin-50",
    name: "Sertalin 50",
    category: "Prescription",
    tagline: "Advanced SSRI antidepressant",
    description: "Highly selective serotonin reuptake inhibitor to treat depression and obsessive states.",
    image: "/lab.png",
    ingredients: ["Sertraline"],
    benefits: ["Balances mood", "Reduces panic triggers", "Well-tolerated profile"],
    genericName: "Sertraline Hydrochloride Tablets",
    division: "Neuropsychiatric",
    dosageForm: "Tablets",
    strength: "50mg",
    composition: "Sertraline Hydrochloride equivalent to Sertraline 50mg",
    packaging: "10x10 Alu-Alu Blister",
    storage: "Store below 25°C. Protect from light.",
    indications: ["Major Depressive Disorder", "Panic Disorder", "Obsessive Compulsive Disorder"]
  },
  {
    id: "neurocit-500",
    name: "NeuroCit 500",
    category: "Prescription",
    tagline: "Cognitive health & neuroprotection",
    description: "Citicoline formula supporting cognitive memory recall and post-stroke neural recovery.",
    image: "/lab.png",
    ingredients: ["Citicoline"],
    benefits: ["Supports memory function", "Enhances cell membranes", "Speeds neural repair"],
    genericName: "Citicoline Tablets USP",
    division: "Neuropsychiatric",
    dosageForm: "Tablets",
    strength: "500mg",
    composition: "Citicoline Sodium equivalent to Citicoline 500mg",
    packaging: "10x10 Alu-Alu Pack",
    storage: "Store in a dry place. Protect from heat.",
    indications: ["Cerebrovascular disorders", "Cognitive decline", "Head injury rehab support"]
  }
]

export interface TherapeuticArea {
  title: string
  description: string
  icon: string
}

export const THERAPEUTIC_AREAS: TherapeuticArea[] = [
  { title: "Acne", description: "Comprehensive care for mild to severe acne.", icon: "Sparkles" },
  { title: "Psoriasis", description: "Targeted therapies for chronic plaque psoriasis.", icon: "Layers" },
  { title: "Vitiligo", description: "Repigmentation and immune-modulating solutions.", icon: "CircleDot" },
  { title: "Hair Loss", description: "Evidence-based regimens for androgenetic alopecia.", icon: "Wind" },
  { title: "Atopic Dermatitis", description: "Barrier repair and anti-inflammatory relief.", icon: "ShieldCheck" },
  { title: "Fungal Infection", description: "Broad-spectrum topical antifungal therapy.", icon: "Bug" },
  { title: "Rosacea", description: "Calming solutions for redness and flushing.", icon: "Flame" },
  { title: "Hyperpigmentation", description: "Depigmenting and tone-correcting actives.", icon: "Palette" },
]

export interface Stat {
  value: number
  suffix: string
  label: string
}

export const STATS: Stat[] = [
  { value: 16, suffix: "+", label: "Years of Experience" },
  { value: 42, suffix: "", label: "Countries Served" },
  { value: 30, suffix: "K+", label: "Doctors Trust Us" },
  { value: 180, suffix: "+", label: "Product Portfolio" },
]

export interface WhyUs {
  title: string
  description: string
  icon: string
}

export const WHY_US: WhyUs[] = [
  { title: "Scientific Research", description: "Dedicated R&D driving next-generation dermatology.", icon: "FlaskConical" },
  { title: "WHO-GMP Manufacturing", description: "State-of-the-art, globally certified facilities.", icon: "Factory" },
  { title: "Quality Control", description: "Rigorous multi-stage testing on every batch.", icon: "BadgeCheck" },
  { title: "Global Standards", description: "Compliance with international regulatory norms.", icon: "Globe2" },
  { title: "Continuous Innovation", description: "Investing in molecules and delivery systems.", icon: "Lightbulb" },
  { title: "Trusted by Dermatologists", description: "Prescribed by specialists across 42 countries.", icon: "Stethoscope" },
]

export interface Testimonial {
  name: string
  role: string
  quote: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Dr. Ananya Rao",
    role: "Consultant Dermatologist",
    quote:
      "Galcare's formulations consistently deliver clinical results. Their sunscreen and acne range are staples in my practice.",
  },
  {
    name: "Marcus Feld",
    role: "Distribution Partner, EU",
    quote:
      "Reliable supply, impeccable quality documentation, and genuine innovation. A pharmaceutical partner we trust.",
  },
  {
    name: "Priya Menon",
    role: "Patient",
    quote:
      "After years of struggling with pigmentation, Lumina finally gave me visible, lasting results. Truly life-changing.",
  },
  {
    name: "Dr. Samuel Okoye",
    role: "Chief of Dermatology",
    quote:
      "The scientific rigor behind every product is evident. Galcare sets the benchmark for dermatological excellence.",
  },
]

export interface NewsItem {
  title: string
  category: string
  date: string
  excerpt: string
}

export const NEWS: NewsItem[] = [
  {
    title: "Galcare launches next-gen biomimetic sunscreen line",
    category: "Product Launch",
    date: "May 2026",
    excerpt: "Our new photostable filter system delivers superior protection with an invisible finish.",
  },
  {
    title: "Recognized at the Global Dermatology Innovation Awards",
    category: "Award",
    date: "Mar 2026",
    excerpt: "Honored for breakthrough work in barrier-repair and pigmentation science.",
  },
  {
    title: "Galcare at the World Congress of Dermatology 2026",
    category: "Event",
    date: "Feb 2026",
    excerpt: "Presenting clinical data across acne, psoriasis, and hair-loss therapeutics.",
  },
]

export interface Job {
  title: string
  department: string
  location: string
  type: string
}

export const JOBS: Job[] = [
  { title: "Senior Formulation Scientist", department: "R&D", location: "Bengaluru", type: "Full-time" },
  { title: "Regulatory Affairs Manager", department: "Quality", location: "Mumbai", type: "Full-time" },
  { title: "Medical Representative", department: "Sales", location: "Remote", type: "Full-time" },
  { title: "Clinical Research Associate", department: "R&D", location: "Hyderabad", type: "Full-time" },
]
