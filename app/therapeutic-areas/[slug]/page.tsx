"use client"

import { use, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { Reveal } from "@/components/motion-primitives"
import { PRODUCTS } from "@/lib/site-data"
import { ArrowLeft, ChevronRight, CheckCircle2, ShieldAlert, Sparkles, Activity, FileText, Send, Microscope } from "lucide-react"

interface TreatmentStep {
  number: string
  title: string
  action: string
  desc: React.ReactNode
  image: string
}

// Rich database of therapeutic area clinical details
const THERAPEUTIC_DETAILS: Record<string, {
  title: string
  subtitle: string
  overview: string
  pathophysiology: string
  symptoms: string[]
  approach: string
  mechanisms: { title: string; desc: string }[]
  relatedProductIds: string[]
  image: string
  alt: string
  steps: TreatmentStep[]
}> = {
  "acne": {
    title: "Acne Vulgaris",
    subtitle: "Targeted follicular keratinization and anti-microbial treatments.",
    overview: "Acne is a complex inflammatory condition of the pilosebaceous units, affecting up to 85% of adolescents and young adults. It is characterized by comedones, papules, pustules, and in severe cases, nodulocystic lesions.",
    pathophysiology: "The pathogenesis involves four primary factors: sebum overproduction driven by androgens, follicular hyperkeratinization leading to microcomedone formation, colonization of the follicle by Cutibacterium acnes (formerly Propionibacterium acnes), and subsequent inflammatory responses mediated by follicular rupture.",
    symptoms: [
      "Open and closed comedones (blackheads and whiteheads)",
      "Inflammatory papules and pustules",
      "Deep, painful nodular or cystic lesions",
      "Erythematous post-inflammatory hyperpigmentation (PIH)"
    ],
    approach: "Galcare's approach merges comedolytic retinoids (like Adapalene) with well-tolerated anti-inflammatory agents (like Niacinamide) and sebum-regulating salts (like Zinc PCA) to target all four pathogenic pathways simultaneously while minimizing barrier dryness.",
    mechanisms: [
      { title: "Comedolysis", desc: "Normalization of follicular desquamation to prevent microcomedone clogging." },
      { title: "Anti-microbial Defense", desc: "Reducing follicular C. acnes load without generating antibiotic resistance." },
      { title: "Sebum Modulation", desc: "Direct inhibition of excessive lipid synthesis in sebaceous glands." }
    ],
    relatedProductIds: ["clarigel-forte"],
    image: "/images/placeholders/area-acne.png",
    alt: "Acne treatment dermocosmetics",
    steps: [
      {
        number: "01",
        title: "Follicular Sebum Emulsification",
        action: "Syndet Cleansing with Zinc PCA & 1% Salicylic Acid",
        desc: <>Wash the face using a soap-free syndet wash formulated at pH 5.5. Wet skin with lukewarm water (approx. 30°C) to soft-melt superficial sebum without stripping the lipid barrier. Apply wash and massage gently in circular patterns for exactly 60 seconds, concentrating on the T-zone. This allows salicylic acid to penetrate the lipophilic follicles, dissolve desmosomes, and clear dead keratinocytes.</>,
        image: "/images/treatments/step-cleanse.png"
      },
      {
        number: "02",
        title: "Microcomedone Target & Anti-Bacterial Care",
        action: "Acne Active Treatment",
        desc: <>After patting the face completely dry with a clean towel, wait 10 minutes to reduce skin sensitivity. Apply a pea-sized amount of <Link href="/products/clarigel-forte" className="text-primary font-bold hover:underline">ClariGel Forte Gel (Adapalene 0.1% w/w, Niacinamide 4% w/w, Zinc PCA 1% w/w)</Link> directly to active breakouts and comedones at night. Avoid rubbing and let the gel self-absorb. Use strictly at night, as retinoids are photolabile and undergo decomposition under UV light.</>,
        image: "/images/treatments/step-treat.png"
      },
      {
        number: "03",
        title: "Epidermal Hydration & Non-Comedogenic Shielding",
        action: "Daily Protection",
        desc: <>In the morning, apply a lightweight, non-comedogenic barrier repair lotion containing Ceramide NP and Hyaluronic Acid to prevent Trans-Epidermal Water Loss (TEWL) caused by retinoid adaptation. Follow with a generous layer of <Link href="/products/shieldsun-spf50" className="text-primary font-bold hover:underline">ShieldSun SPF 50+ PA++++ (Tinosorb S, Octyl Methoxycinnamate, Vitamin E, Hyaluronic Acid)</Link> to prevent UV-induced post-inflammatory hyperpigmentation (PIH).</>,
        image: "/images/treatments/step-protect.png"
      }
    ]
  },
  "psoriasis": {
    title: "Psoriasis",
    subtitle: "Chronic autoimmune dermatosis and epidermal proliferation regulation.",
    overview: "Psoriasis is a chronic systemic immune-mediated inflammatory skin condition characterized by hyperproliferation of keratinocytes, leading to plaque formation, scaling, and erythema.",
    pathophysiology: "Driven by an overactive innate and adaptive immune response, specifically the IL-23/T-helper 17 (Th17) pathway. Dendritic cell activation releases cytokines that trigger Th17 cells, resulting in a rapid epidermal turnover rate reduced from the normal 28 days to just 3 to 5 days.",
    symptoms: [
      "Well-demarcated erythematous plaques covered with silvery scales",
      "Auspitz sign (pinpoint bleeding upon scale removal)",
      "Pruritus, skin tightness, and painful fissures",
      "Nail pitting and subungual hyperkeratosis"
    ],
    approach: "We focus on formulation safety and deep epidermal hydration. Emollients rich in physiological lipids and barrier stabilizers (such as our Ceramide complex) act as critical adjunctive therapy, rebuilding the intercellular cement disrupted by chronic scaling.",
    mechanisms: [
      { title: "Epidermal Barrier Rebuilding", desc: "Replenishing ceramides to reduce transepidermal water loss (TEWL)." },
      { title: "Soothing Desquamation", desc: "Softening and descaling plaques to relieve skin tension and itching." },
      { title: "Anti-inflammatory Support", desc: "Reducing skin sensitivity to external triggers." }
    ],
    relatedProductIds: ["ceraveil-moist"],
    image: "/images/placeholders/area-psoriasis.png",
    alt: "Silicon/emollient gel for psoriasis scales",
    steps: [
      {
        number: "01",
        title: "Keratolytic Plaque Softening",
        action: "Urea & Salicylic Acid Bath Preparation",
        desc: <>Wash the affected areas with a gentle keratolytic formulation containing 2% Salicylic Acid. Soak the area for 3-5 minutes. The acidic pH facilitates the hydrolytic breakdown of the hyper-keratinized skin plaques, softening the thick, silver scale buildup and prepping the epidermal tissue for active anti-proliferative topical absorption.</>,
        image: "/images/treatments/step-cleanse.png"
      },
      {
        number: "02",
        title: "Anti-Proliferative Cellular Targeting",
        action: "Corticosteroid & Calcitriol Combination Therapy",
        desc: <>Apply a thin film of active topical steroid or vitamin D analogue (Calcitriol) directly onto the softened psoriasis plaques. Spread gently along the direction of hair growth to prevent folliculitis. The active molecules inhibit T-cell activation and downregulate the IL-23/IL-17 cytokine loop, slowing down the rapid 3-day epidermal turnover cycle back to a healthy 28-day rate.</>,
        image: "/images/treatments/step-treat.png"
      },
      {
        number: "03",
        title: "Intercellular Cement Reconstruction",
        action: "Physiological Lipid Replenishment",
        desc: <>Within three minutes post-wash, apply a rich physiological lipid emollient like <Link href="/products/ceraveil-moist" className="text-primary font-bold hover:underline">CeraVeil Moisturizer Cream (Ceramide NP, Ceramide AP, Ceramide EOP, Hyaluronic Acid, Panthenol)</Link> generously. Psoriatic skin lacks essential ceramides, causing severe scaling and moisture leakage. Reapplying lipids locks down hydration, prevents skin splitting or cracking, and builds a protective shield against secondary irritants.</>,
        image: "/images/treatments/step-protect.png"
      }
    ]
  },
  "vitiligo": {
    title: "Vitiligo",
    subtitle: "Repigmentation pathways and melanocyte protection.",
    overview: "Vitiligo is an acquired, chronic depigmenting disorder characterized by the progressive loss of functional epidermal melanocytes, resulting in chalky-white macules and patches.",
    pathophysiology: "Melanocyte depletion occurs through autoimmune destruction, elevated oxidative stress causing cellular damage, impaired melanocyte adhesion, and genetic susceptibility. Systemic or localized inflammation triggers CD8+ T-cell attack on melanocytes.",
    symptoms: [
      "Depigmenting, well-defined white patches on the skin",
      "Poliosis (premature graying of hair, eyebrows, or eyelashes)",
      "Symmetrical distribution, frequently on face, hands, and body folds",
      "Sensitivity of depigmented patches to sunburn"
    ],
    approach: "Galcare's R&D focuses on formulations designed to protect melanocytes from oxidative damage, while our depigmenting agents manage and blend surrounding borders, creating an even, uniform aesthetic transition.",
    mechanisms: [
      { title: "Melanocyte Shielding", desc: "Topical antioxidants that neutralize free radical buildup in the epidermal unit." },
      { title: "Pigmentation Blending", desc: "Modifying peripheral hyperpigmentation to reduce contrast differences." },
      { title: "Soothing Base", desc: "Restoring the dry barrier surrounding depigmented skin." }
    ],
    relatedProductIds: ["lumina-cream", "shieldsun-spf50"],
    image: "/images/placeholders/area-vitiligo.png",
    alt: "Melanocyte protection therapy",
    steps: [
      {
        number: "01",
        title: "Epidermal Anti-Oxidant Priming",
        action: "pH Balanced Botanical Extract Cleansing",
        desc: <>Wash the skin with an ultra-mild, soap-free cleanser. Depigmented skin lacks active melanocytes and is highly susceptible to local environmental oxidative stresses. Ensure the water is cool, and avoid abrasive scrubs or friction which can induce Koebnerization (the spread of vitiligo to sites of mechanical trauma).</>,
        image: "/images/treatments/step-cleanse.png"
      },
      {
        number: "02",
        title: "Melanocyte Restoration & Immunomodulation",
        action: "Topical Calcineurin Inhibitors (Tacrolimus 0.1%)",
        desc: <>Apply a thin layer of topical calcineurin inhibitor (such as Tacrolimus 0.1%) directly to the chalky-white patches. This blocks T-lymphocyte activation and stops the autoimmune destruction of functional melanocytes. Over a 12-week cycle, this promotes the migration of melanocyte stem cells from the hair follicle bulge back to the basal epidermis.</>,
        image: "/images/treatments/step-treat.png"
      },
      {
        number: "03",
        title: "Strict UV Defense & Border Blending",
        action: "PA++++ Mineral Sunscreen & Active Depigmentation",
        desc: <>Apply <Link href="/products/shieldsun-spf50" className="text-primary font-bold hover:underline">ShieldSun SPF 50+ PA++++ (Tinosorb S, Octyl Methoxycinnamate, Vitamin E, Hyaluronic Acid)</Link> broad-spectrum mineral sunscreen every 3 hours during daylight to protect depigmented patches. In the evening, apply <Link href="/products/lumina-cream" className="text-primary font-bold hover:underline">Lumina Brightening Cream (Alpha Arbutin 2% w/w, Kojic Acid 2% w/w, Tranexamic Acid 3% w/w)</Link> to the surrounding hyperpigmented borders to minimize contrast difference and create a uniform visual transition.</>,
        image: "/images/treatments/step-protect.png"
      }
    ]
  },
  "hair-loss": {
    title: "Androgenetic Alopecia & Thinning",
    subtitle: "Follicular reactivation and anagen phase support.",
    overview: "Hair loss is a widespread concern, primarily presenting as androgenetic alopecia (pattern baldness) or telogen effluvium. It results in a gradual reduction of active follicle count and hair density.",
    pathophysiology: "Androgenetic alopecia involves dihydrotestosterone (DHT) binding to androgen receptors in susceptible hair follicles, leading to follicle miniaturization, a shortened anagen (growth) phase, and an elongated telogen (resting) phase.",
    symptoms: [
      "Gradual thinning of hair on the crown and temples",
      "Receding hairline in a characteristic pattern",
      "Increased daily hair shedding during brushing or washing",
      "Miniaturized, fine, and short vellus-like hairs"
    ],
    approach: "We utilize non-hormonal, peptide-rich botanical complexes (like Redensyl 3%) and trace mineral peptide solutions (like Copper Peptides) that stimulate hair follicle stem cells, improve local microcirculation, and anchor follicles securely in the scalp.",
    mechanisms: [
      { title: "Follicle Stem Cell Activation", desc: "Triggering ORSc stem cells to initiate a new anagen cycle." },
      { title: "DHT Deflection", desc: "Reducing local factors that miniaturize hair fibers." },
      { title: "Vascular Nourishment", desc: "Enhancing blood supply to the dermal papillae for thicker growth." }
    ],
    relatedProductIds: ["regrowth-serum"],
    image: "/images/placeholders/area-hairloss.png",
    alt: "Scalp and hair follicle care",
    steps: [
      {
        number: "01",
        title: "Follicular Unclogging & Scalp De-seeding",
        action: "Peptide-Infused Clarifying Cleansing",
        desc: <>Wet hair thoroughly and massage a peptide/biotin clarifying wash directly into the scalp for 2 minutes. Rinse with lukewarm water. This removes dry sebum plugs, DHT residues, and dead skin cells around the follicular infundibulum, preparing a clean, unblocked environment for target serum absorption.</>,
        image: "/images/treatments/step-cleanse.png"
      },
      {
        number: "02",
        title: "Dermal Papillae Reactivation",
        action: "Active Peptide Therapy",
        desc: <>Part the hair to expose the scalp in thinning zones. Apply 1ml of <Link href="/products/regrowth-serum" className="text-primary font-bold hover:underline">ReGrowth Peptide Serum (Redensyl 3% w/v, Procapil 2% w/v, Biotin, Copper Peptides)</Link> directly onto the dry scalp twice daily. The active peptides and Redensyl stimulate the outer root sheath (ORS) stem cells, extending the active anagen growth phase and deflecting local dihydrotestosterone (DHT) signals that cause follicle shrinkage.</>,
        image: "/images/treatments/step-treat.png"
      },
      {
        number: "03",
        title: "Vasodilation & Micro-Circulatory Massage",
        action: "Localized Dermal Circulation Stimulation",
        desc: <>Perform a gentle, firm circular massage using your fingertips for 3 minutes immediately after serum application. Do not scratch or use nails. This physical action induces localized vasodilation, increasing blood circulation to the hair bulb and ensuring vital oxygen and active peptide molecules are fully absorbed by the follicle roots.</>,
        image: "/images/treatments/step-protect.png"
      }
    ]
  },
  "atopic-dermatitis": {
    title: "Atopic Dermatitis (Eczema)",
    subtitle: "Lipid-replenishing barrier repair and anti-pruritic care.",
    overview: "Atopic Dermatitis is a chronic, relapsing, pruritic inflammatory skin disease that typically begins in childhood and is associated with a personal or family history of atopic allergy conditions.",
    pathophysiology: "Key elements include epidermal barrier dysfunction (often due to filaggrin gene mutations), immune dysregulation (Th2-skewed response leading to cytokine production), and altered skin microbiome (Staphylococcus aureus colonization).",
    symptoms: [
      "Severe pruritus (itching) that worsens at night",
      "Erythematous, dry, scaly patches on flexural surfaces",
      "Lichenification (thickened, leathery skin) from chronic scratching",
      "Weeping, crusting, and secondary bacterial infections"
    ],
    approach: "Galcare targets eczema through advanced Multi-Lamellar Emulsions (MLE) matching the skin's lipid ratio (Ceramides + Fatty Acids + Cholesterol). This repairs the lipid mortar between cells, instantly lowering itching and lowering allergen entry.",
    mechanisms: [
      { title: "Ceramide Replacement", desc: "Delivering bio-identical lipids to seal structural gaps in the stratum corneum." },
      { title: "Transepidermal Relief", desc: "Forming an invisible, breathing micro-occlusive barrier to trap hydration." },
      { title: "Soothe Sensitivity", desc: "Alleviating the neurological itch-scratch loop." }
    ],
    relatedProductIds: ["ceraveil-moist"],
    image: "/images/placeholders/area-dermatitis.png",
    alt: "Epidermal barrier repair hydration",
    steps: [
      {
        number: "01",
        title: "Physiological Cleansing Syndet",
        action: "Soap-Free Multi-Lamellar Oil Wash",
        desc: <>Cleanse face and body with a soap-free, physiological pH lipid syndet to avoid stripping the already compromised skin barrier. Avoid hot water, which strips natural lipids. Gently pat the skin dry with a soft cloth, leaving the skin slightly damp to maximize the absorption of subsequent topical barrier repairs.</>,
        image: "/images/treatments/step-cleanse.png"
      },
      {
        number: "02",
        title: "Cytokine Downregulation",
        action: "Anti-Inflammatory Cream Application",
        desc: <>Apply active anti-inflammatory creams or immunomodulators directly to red, itchy, or lichenified eczema patches. This blocks Th2-mediated cytokine pathways, providing immediate relief from pruritus and preventing secondary Staphylococcus aureus colonization by breaking the itch-scratch loop.</>,
        image: "/images/treatments/step-treat.png"
      },
      {
        number: "03",
        title: "Epidermal Mortar Reconstruction",
        action: "Ceramide Matrix Replenishment",
        desc: <>Within 3 minutes of drying, apply a thick layer of <Link href="/products/ceraveil-moist" className="text-primary font-bold hover:underline">CeraVeil Moisturizer Cream (Ceramide NP, Ceramide AP, Ceramide EOP, Hyaluronic Acid, Panthenol)</Link> over all dry skin zones. The Ceramide complex mimics the natural stratum corneum lipid sheets, restoring the intracellular barrier matrix, sealing microscopic cracks, and lowering TEWL.</>,
        image: "/images/treatments/step-protect.png"
      }
    ]
  },
  "fungal-infection": {
    title: "Cutaneous Fungal Infections",
    subtitle: "Broad-spectrum topical antimycotics targeting fungal ergosterol synthesis.",
    overview: "Superficial fungal infections are common diseases of the keratinized tissues of the skin, nails, and hair. They are caused by dermatophytes (Tinea), yeasts (Candida, Malassezia), and molds.",
    pathophysiology: "Fungi secrete keratinases that digest keratin, allowing colonization of the stratum corneum. The host immune response results in inflammation, scaling, and typical annular lesions.",
    symptoms: [
      "Annular (ring-like) red patches with raised, active borders",
      "Pruritus, scaling, peeling, and localized burning sensations",
      "Interdigital maceration and cracking (e.g., Athlete's foot)",
      "Discolored, thickened, or crumbling nail plates"
    ],
    approach: "Our formulation strategy leverages luliconazole (1%), a highly lipophilic imidazole that inhibits the synthesis of ergosterol (an essential component of fungal cell membranes), providing once-daily cure rates.",
    mechanisms: [
      { title: "Ergosterol Synthesis Block", desc: "Inhibiting lanosterol demethylase to disrupt fungal cell membrane structure." },
      { title: "High Lipophilicity", desc: "Binding securely to skin lipids to establish a long-lasting reservoir of active drug." },
      { title: "Anti-pruritic Infusion", desc: "Menthol-infused cooling bases to instantly relieve severe fungal itching." }
    ],
    relatedProductIds: ["fungiclear-cream"],
    image: "/images/placeholders/area-fungal.png",
    alt: "Topical antimycotic formulation",
    steps: [
      {
        number: "01",
        title: "Antimicrobial Cleansing & Moisture Removal",
        action: "pH Balanced Antiseptic Wash",
        desc: <>Wash the infected skin area with an antiseptic cleanser. Fungi thrive in moisture and humidity. Dry the area completely using a clean, dry towel (do not share this towel to avoid transmission). Ensure the skin is 100% moisture-free before applying any topical therapies.</>,
        image: "/images/treatments/step-cleanse.png"
      },
      {
        number: "02",
        title: "Ergosterol Synthesis Blockade",
        action: "Fungal Active Elimination",
        desc: <>Apply a thin layer of <Link href="/products/fungiclear-cream" className="text-primary font-bold hover:underline">FungiClear Cream (Luliconazole 1.0% w/w, Aloe Vera extract, Menthol 0.5% w/w)</Link> over the affected skin once daily, extending at least 1 inch beyond the active, raised border. The active imidazole binds to keratin lipids and halts the synthesis of ergosterol (disrupting the fungal cell membrane), killing the dermatophytes with a single daily application.</>,
        image: "/images/treatments/step-treat.png"
      },
      {
        number: "03",
        title: "Environmental Barrier Isolation",
        action: "Dry Hygiene & Secondary Infection Shield",
        desc: <>Dust the area with a dry absorbent powder if sweating. Wear loose, breathable cotton clothes. Maintain this dry isolation protocol for at least 7 days after the visual symptoms have cleared to eradicate deep-seated fungal spores and prevent recurrence.</>,
        image: "/images/treatments/step-protect.png"
      }
    ]
  },
  "rosacea": {
    title: "Rosacea",
    subtitle: "Vascular reactivity reduction and epidermal barrier stabilization.",
    overview: "Rosacea is a chronic inflammatory cutaneous disorder primarily affecting the central face, most common in fair-skinned middle-aged adults.",
    pathophysiology: "Rosacea involves neurovascular dysregulation (exaggerated flushing response to heat, alcohol, spicy foods), an overactive innate immune response (elevated cathelicidin peptides), and Demodex folliculorum mite proliferation triggering inflammatory cascades.",
    symptoms: [
      "Persistent central facial erythema (redness)",
      "Frequent flushing and transient telangiectasia (visible blood vessels)",
      "Inflammatory papules and pustules without comedones",
      "Burning, stinging, and localized edema"
    ],
    approach: "Galcare prioritizes ultra-mild, fragrance-free barriers. We recommend physical hybrid SPF 50+ photoprotection to deflect trigger UV rays and ceramide-rich creams to restore the sensitive neurovascular skin barrier.",
    mechanisms: [
      { title: "UV Deflection", desc: "Blocking solar radiation which triggers facial vasodilation." },
      { title: "Neuro-soothing Hydration", desc: "Strengthening the skin barrier to protect hyper-reactive blood vessels." },
      { title: "Anti-erythema Base", desc: "Calming visual redness through cooling, non-irritating lipid complexes." }
    ],
    relatedProductIds: ["shieldsun-spf50", "ceraveil-moist"],
    image: "/images/placeholders/area-rosacea.png",
    alt: "Rosacea facial calming care",
    steps: [
      {
        number: "01",
        title: "Ultra-Mild Vasoconstrictive Cleansing",
        action: "Soap-Free Fragrance-Free Soothing Wash",
        desc: <>Wash the face once daily with cool or lukewarm water (approx. 20°C) and a soap-free soothing wash. Avoid any scrubbing, facial brushes, or textured washcloths. The mechanical friction can rupture superficial capillaries and trigger a facial flushing episode.</>,
        image: "/images/treatments/step-cleanse.png"
      },
      {
        number: "02",
        title: "Vascular Calming Active",
        action: "Anti-Redness Calming Gel",
        desc: <>Apply a thin layer of soothing active gel to the central face. The formula reduces local capillary hyper-reactivity, stabilizes vascular endothelial cells, and targets Demodex mite colonization, reducing persistent redness and papulopustular flares.</>,
        image: "/images/treatments/step-treat.png"
      },
      {
        number: "03",
        title: "Physical Barrier Shield",
        action: "Neuro-Vascular Protection",
        desc: <>Apply a generous layer of <Link href="/products/shieldsun-spf50" className="text-primary font-bold hover:underline">ShieldSun SPF 50+ PA++++ (Tinosorb S, Octyl Methoxycinnamate, Vitamin E, Hyaluronic Acid)</Link> daily. UV radiation is the primary trigger of rosacea flareups, and strict UV shielding prevents vascular leakages and cellular heat stress. Reapply as needed.</>,
        image: "/images/treatments/step-protect.png"
      }
    ]
  },
  "hyperpigmentation": {
    title: "Hyperpigmentation & Melasma",
    subtitle: "Multi-pathway tyrosinase inhibition and pigment transfer blocking.",
    overview: "Hyperpigmentation presents as uneven dark patches on the skin, occurring as melasma, sun spots, or post-inflammatory hyperpigmentation (PIH) following acne or injury.",
    pathophysiology: "UV exposure or inflammation stimulates melanocytes to upregulate the tyrosinase enzyme, causing overproduction of melanin and its subsequent transfer via melanosomes to surrounding keratinocytes.",
    symptoms: [
      "Symmetrical brown or gray-brown patches on face (melasma)",
      "Flat, dark brown circular macules (lentigines or sun spots)",
      "Dark spots remaining at the site of healed acne lesions (PIH)",
      "Dull, uneven overall skin tone"
    ],
    approach: "Our Lumina cream combines three distinct pigment-regulating actives: Alpha Arbutin & Kojic Acid to inhibit tyrosinase activity, and Tranexamic Acid to block inflammatory pathways that trigger melanocyte hyperactivity.",
    mechanisms: [
      { title: "Tyrosinase Inhibition", desc: "Blocking the rate-limiting enzyme in melanin production pathways." },
      { title: "Inflammatory Blockade", desc: "Disrupting keratinocyte-melanocyte signaling to halt pigmentation production." },
      { title: "Cellular Turnover Support", desc: "Gently dispersing pre-existing melanin clusters for rapid brightening." }
    ],
    relatedProductIds: ["lumina-cream"],
    image: "/images/placeholders/area-pigmentation.png",
    alt: "Depigmenting and evening skin tone",
    steps: [
      {
        number: "01",
        title: "AHA Exfoliation & Pathway Priming",
        action: "Fruit Acid Glycolic/Lactic Cleanse",
        desc: <>Use a gentle AHA prep wash to dissolve the desmosomes of the outer stratum corneum. This increases cellular turnover, helping to disperse pre-existing superficial melanin clusters and priming the skin for maximum active serum absorption.</>,
        image: "/images/treatments/step-cleanse.png"
      },
      {
        number: "02",
        title: "Multi-Pathway Melanin Inhibition",
        action: "Depigmenting Application",
        desc: <>Apply a thin layer of <Link href="/products/lumina-cream" className="text-primary font-bold hover:underline">Lumina Brightening Cream (Alpha Arbutin 2% w/w, Kojic Acid 2% w/w, Tranexamic Acid 3% w/w)</Link> directly to pigmented patches (melasma, PIH, or sunspots) twice daily to competitively inhibit the tyrosinase enzyme and block pigment transfer.</>,
        image: "/images/treatments/step-treat.png"
      },
      {
        number: "03",
        title: "Daily Tyrosinase Shield",
        action: "Daily UV Blocker",
        desc: <>Strictly apply <Link href="/products/shieldsun-spf50" className="text-primary font-bold hover:underline">ShieldSun SPF 50+ PA++++ (Tinosorb S, Octyl Methoxycinnamate, Vitamin E, Hyaluronic Acid)</Link> every morning. UV rays are the primary trigger for melanocyte reactivation. Even minimal UV exposure will upregulate tyrosinase, reversing treatment progress. Reapply every 3 hours during direct outdoor exposure.</>,
        image: "/images/treatments/step-protect.png"
      }
    ]
  }
}

export default function TherapeuticAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const slug = resolvedParams.slug.toLowerCase()

  const area = useMemo(() => {
    return THERAPEUTIC_DETAILS[slug] || null
  }, [slug])

  const products = useMemo(() => {
    if (!area) return []
    return PRODUCTS.filter((p) => area.relatedProductIds.includes(p.id))
  }, [area])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialty: "Dermatologist",
    message: ""
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (!area) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center">
          <ShieldAlert className="size-16 text-destructive animate-pulse" />
          <h2 className="mt-4 text-2xl font-bold">Therapeutic Area Not Found</h2>
          <p className="mt-2 text-muted-foreground">The requested condition could not be located in our research scope.</p>
          <Link href="/" className="mt-6 rounded-xl bg-primary text-primary-foreground px-6 py-2.5 font-semibold">
            Back to Home
          </Link>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 bg-muted/20">
        {/* Navigation Breadcrumb */}
        <section className="py-4 border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 md:px-6 flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              <ArrowLeft className="size-4" /> Back to Home
            </Link>
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <Link href="/" className="hover:text-foreground">Home</Link>
              <ChevronRight className="size-3" />
              <span className="text-foreground">{area.title}</span>
            </div>
          </div>
        </section>

        {/* Hero Section with Split Layout */}
        <section className="relative overflow-hidden py-16">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute right-1/4 top-10 h-[300px] w-[600px] rounded-full bg-primary/10 blur-[100px]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <Reveal>
                <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
                  Therapeutic Area Profile
                </span>
                <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground">
                  Clinical Overview of <span className="text-gradient">{area.title}</span>
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground font-medium">
                  {area.subtitle}
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {area.overview}
                </p>
              </Reveal>
              <Reveal>
                <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] border border-border bg-muted shadow-soft">
                  <Image
                    src={area.image}
                    alt={area.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Pathophysiology & Science Detail Grid */}
        <section className="py-12 bg-card border-y border-border">
          <div className="mx-auto max-w-7xl px-4 md:px-6 grid gap-12 lg:grid-cols-2 items-start">
            <Reveal className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                  <Microscope className="size-5 text-primary" /> Pathogenesis & Cellular Factors
                </h2>
                <p className="mt-4 text-sm md:text-base leading-relaxed text-muted-foreground">
                  {area.pathophysiology}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground">Common Diagnostic Symptoms</h3>
                <ul className="mt-4 space-y-3">
                  {area.symptoms.map((sym, index) => (
                    <li key={index} className="flex gap-2 items-start text-sm text-muted-foreground font-medium">
                      <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                      <span>{sym}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                  <Activity className="size-5 text-primary" /> The Galcare Treatment Rationale
                </h2>
                <p className="mt-4 text-sm md:text-base leading-relaxed text-muted-foreground">
                  {area.approach}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-1 mt-6">
                {area.mechanisms.map((mech, index) => (
                  <div key={index} className="rounded-2xl border border-border bg-muted/30 p-5">
                    <h4 className="font-bold text-base text-foreground flex items-center gap-2">
                      <span className="size-2 rounded-full bg-primary" />
                      {mech.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{mech.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Clinical Treatment Pathway Timeline */}
        <section className="py-20 bg-muted/30 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="max-w-2xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Clinical Treatment Regimen</h2>
              <p className="mt-3 text-base text-muted-foreground">
                A chronologically sequenced, medically advanced 3-step timeline engineered by Galcare clinical researchers to maximize bio-availability.
              </p>
            </Reveal>

            <div className="grid gap-12 lg:grid-cols-12 items-start">
              {/* Left Column: Sticky Rationale */}
              <div className="lg:col-span-5 lg:sticky lg:top-36 space-y-6">
                <Reveal>
                  <div className="rounded-3xl border border-border bg-card p-6 md:p-10 shadow-soft">
                    <h3 className="text-2xl font-bold text-foreground tracking-tight">Scientific Progression</h3>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                      Dermatological treatments succeed when the right molecules are applied in the correct sequence. Our clinical protocol follows a strict three-phase pathway:
                    </p>
                    
                    <div className="mt-8 space-y-6">
                      <div className="flex gap-4 items-start">
                        <span className="size-8 rounded-lg bg-primary/10 text-primary font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">I</span>
                        <div>
                          <h4 className="text-base font-bold uppercase text-foreground">Phase 1: Priming</h4>
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">Emulsifying excess sebum, dissolving desmosomes, and clearing keratin blockages.</p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-start">
                        <span className="size-8 rounded-lg bg-primary/10 text-primary font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">II</span>
                        <div>
                          <h4 className="text-base font-bold uppercase text-foreground">Phase 2: Bio-Targeting</h4>
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">Delivering highly concentrated active compounds to regulate target cell receptor pathways.</p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-start">
                        <span className="size-8 rounded-lg bg-primary/10 text-primary font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">III</span>
                        <div>
                          <h4 className="text-base font-bold uppercase text-foreground">Phase 3: Stabilization</h4>
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">Replenishing physiological lipids and shielding the basal layer from UV radiation flareups.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Right Column: Vertical Timeline */}
              <div className="lg:col-span-7 relative pl-6 md:pl-10">
                {/* Vertical connecting line */}
                <div className="absolute left-[20px] md:left-[30px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-primary via-teal to-accent border-dashed border-l border-primary/20" />

                <div className="space-y-12">
                  {area.steps.map((step, idx) => (
                    <Reveal key={step.number} delay={idx * 0.1}>
                      <div className="relative flex gap-6 md:gap-8 items-start group">
                        
                        {/* Timeline Bullet Node with Ring Glow */}
                        <div className="absolute -left-[31px] md:-left-[41px] z-10 size-8 md:size-10 rounded-full border-2 border-primary bg-card flex items-center justify-center font-bold text-xs text-primary shadow-glow group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                          {step.number}
                        </div>

                        {/* Step Card with Vertical layout (Image on top, Content below) */}
                        <div className="flex-1 rounded-[2rem] border border-border bg-card overflow-hidden shadow-soft group-hover:border-primary/45 group-hover:shadow-glow transition-all duration-300 flex flex-col">
                          {/* Image Box */}
                          <div className="relative aspect-[21/9] bg-muted w-full min-h-[110px] sm:min-h-[140px]">
                            <Image
                              src={step.image}
                              alt={step.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>

                          {/* Content Box */}
                          <div className="p-6 md:p-8 flex flex-col justify-center flex-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                              {step.action}
                            </span>
                            <h3 className="text-xl font-bold mt-1 text-foreground">{step.title}</h3>
                            <div className="text-xs md:text-sm text-muted-foreground mt-3 leading-relaxed">
                              {step.desc}
                            </div>
                          </div>
                        </div>

                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recommended Formulations */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight">Recommended Formulations</h2>
              <p className="mt-2 text-muted-foreground">
                Dermatologist-recommended clinical products mapped to this therapeutic segment.
              </p>
            </Reveal>

            {products.length === 0 ? (
              <div className="mt-8 rounded-3xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
                <p className="text-sm font-semibold">Related pipeline formulations are in research phase.</p>
                <Link href="/products" className="mt-4 inline-block text-xs font-bold text-primary underline">
                  View entire catalogue
                </Link>
              </div>
            ) : (
              <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((p, i) => (
                  <Reveal key={p.id} delay={i * 0.05}>
                    <div className="group flex h-full flex-col justify-between overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-soft hover:border-primary/45 hover:shadow-glow transition-all">
                      <div className="relative aspect-square bg-muted overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          className="object-contain p-6 transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6 md:p-8 flex flex-col flex-1 justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                            {p.category}
                          </span>
                          <h3 className="text-xl font-bold mt-1 text-foreground">{p.name}</h3>
                          <p className="text-xs font-semibold text-muted-foreground mt-0.5">{p.genericName}</p>
                          <p className="text-sm text-muted-foreground mt-3 leading-relaxed line-clamp-3">
                            {p.description}
                          </p>
                        </div>
                        <div className="mt-8 pt-4 border-t border-border flex items-center justify-between">
                          <span className="text-xs text-muted-foreground font-semibold">Form: {p.dosageForm}</span>
                          <Link
                            href={`/products/${p.id}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                          >
                            Details & Specifications →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Clinical inquiry form */}
        <section className="py-12 bg-muted/40">
          <div className="mx-auto max-w-3xl px-4 md:px-6">
            <Reveal>
              <div className="rounded-[2.5rem] border border-border bg-card p-6 md:p-12 shadow-soft">
                <div className="text-center max-w-xl mx-auto">
                  <FileText className="mx-auto size-12 text-primary bg-primary/10 p-2.5 rounded-2xl" />
                  <h2 className="mt-4 text-2xl font-bold tracking-tight">Clinical Inquiry & Samples</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Are you a licensed healthcare professional? Request research dossiers, product monographs, or clinical samples for {area.title}.
                  </p>
                </div>

                {submitted ? (
                  <div className="mt-8 rounded-2xl bg-primary/10 p-6 text-center text-primary">
                    <CheckCircle2 className="mx-auto size-12" />
                    <h4 className="mt-4 font-bold text-lg">Inquiry Submitted Successfully</h4>
                    <p className="mt-2 text-sm text-primary/80">
                      Thank you. A medical liaison representative will contact you with product monographs and licensing validation parameters shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Full Name</label>
                        <input
                          type="text"
                          required
                          className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-transparent focus:outline-primary"
                          placeholder="Dr. John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Email Address</label>
                        <input
                          type="email"
                          required
                          className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-transparent focus:outline-primary"
                          placeholder="doctor@hospital.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">Specialty / Professional Title</label>
                      <select
                        className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-card focus:outline-primary"
                        value={formData.specialty}
                        onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                      >
                        <option>Dermatologist</option>
                        <option>Psychiatrist</option>
                        <option>General Practitioner</option>
                        <option>Pharmacist / Retailer</option>
                        <option>Distributor / Importer</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">Inquiry Details</label>
                      <textarea
                        rows={4}
                        required
                        className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-transparent focus:outline-primary resize-none"
                        placeholder="State your registration credentials or clinic details and request files/samples here..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-glow hover:bg-primary/95 transition-colors"
                    >
                      <Send className="size-4" /> Request Dossier & Samples
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <AIAssistant />
    </>
  )
}
