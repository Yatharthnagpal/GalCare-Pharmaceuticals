"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { Bot, X, Send, Mic, MicOff, Sparkles, ExternalLink } from "lucide-react"
import { PRODUCTS, PRODUCT_CATEGORIES, THERAPEUTIC_AREAS, NEWS, JOBS } from "@/lib/site-data"
import { cn } from "@/lib/utils"

interface Message {
  role: "user" | "assistant"
  content: string
}

const SUGGESTIONS = [
  "Products for acne & spots",
  "Third-Party Contract Manufacturing",
  "Dermatology division portfolio",
  "WHO-GMP Quality & Certifications",
  "Become a global distributor",
  "Connect with a medical expert",
]

function renderLineTokens(line: string) {
  const regex = /(\*\*\[.*?\]\(.*?\)\*\*)|(\[.*?\]\(.*?\))|(\*\*.*?\*\*)/g
  const parts = line.split(regex)

  return parts.map((part, idx) => {
    if (!part) return null

    // Bold containing link: **[text](url)**
    const boldLinkMatch = part.match(/^\*\*\[(.*?)\]\((.*?)\)\*\*$/)
    if (boldLinkMatch) {
      const [, text, url] = boldLinkMatch
      return (
        <Link
          key={idx}
          href={url}
          className="inline-flex items-center gap-1 font-semibold text-primary underline underline-offset-2 transition-colors hover:text-teal"
        >
          {text}
          <ExternalLink className="inline-block size-3 opacity-70" />
        </Link>
      )
    }

    // Standard link: [text](url)
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/)
    if (linkMatch) {
      const [, text, url] = linkMatch
      return (
        <Link
          key={idx}
          href={url}
          className="inline-flex items-center gap-1 font-medium text-primary underline underline-offset-2 transition-colors hover:text-teal"
        >
          {text}
        </Link>
      )
    }

    // Bold: **text**
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      )
    }

    return part
  })
}

function renderFormattedContent(text: string) {
  const lines = text.split("\n")
  return lines.map((line, lineIdx) => (
    <span key={lineIdx} className="block min-h-[1.25em]">
      {renderLineTokens(line)}
    </span>
  ))
}

function generateReply(input: string): string {
  const q = input.toLowerCase().trim()

  if (!q) {
    return "How may I assist you with Galcare's pharmaceutical formulations or services today?"
  }

  // 1. Greetings
  if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)[\s!.]*$/i.test(q)) {
    return `Hello! Welcome to Galcare Pharmaceuticals. I am Aria, your AI Assistant.\n\nI can help you explore:\n• **[Dermatology Product Catalog](/products)**\n• **[Third-Party Contract Manufacturing](/divisions/third-party-manufacturing)**\n• **[WHO-GMP Quality Standards](/quality)**\n• **[Global Distribution & Partnerships](/contact)**\n\nHow can I help you today?`
  }

  // 2. Product Search by Name / Brand
  const exactBrandMatches = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      q.includes(p.name.toLowerCase()) ||
      p.id.toLowerCase().includes(q) ||
      p.name.toLowerCase().split(" ")[0] === q
  )

  if (exactBrandMatches.length > 0) {
    const main = exactBrandMatches[0]
    let reply = `Here are details on **[${main.name}](/products/${main.id})**:\n\n`
    reply += `• **Category:** ${main.category}\n`
    if (main.tagline) reply += `• **Overview:** ${main.tagline}\n`
    reply += `• **Description:** ${main.description}\n`
    if (main.ingredients && main.ingredients.length > 0) {
      reply += `• **Active Ingredients:** ${main.ingredients.join(", ")}\n`
    }
    if (main.benefits && main.benefits.length > 0) {
      reply += `• **Key Benefits:** ${main.benefits.join(", ")}\n`
    }
    if (main.indications && main.indications.length > 0) {
      reply += `• **Indications:** ${main.indications.join(", ")}\n`
    }
    if (main.strength || main.packaging) {
      reply += `• **Packaging & Form:** ${main.dosageForm || "Formulation"} (${main.strength || ""}, ${main.packaging || ""})\n`
    }
    if (main.storage) {
      reply += `• **Storage:** ${main.storage}\n`
    }

    if (exactBrandMatches.length > 1) {
      const otherLinks = exactBrandMatches
        .slice(1, 4)
        .map((p) => `[${p.name}](/products/${p.id})`)
        .join(", ")
      reply += `\n*Also available in this product range:* ${otherLinks}.`
    }

    reply += `\n\n👉 **[View Product Page](/products/${main.id})** | **[Inquire / Connect](/contact)**`
    return reply
  }

  // 3. Category / Indication / Symptom Search
  const categoryMatch = PRODUCT_CATEGORIES.find((cat) => q.includes(cat.toLowerCase()))
  const therapeuticMatch = THERAPEUTIC_AREAS.find((area) => q.includes(area.title.toLowerCase()))

  const keywordCategoryMap: Record<string, string> = {
    acne: "Acne Care",
    pimple: "Acne Care",
    breakout: "Acne Care",
    sunscreen: "Sunscreen",
    sunblock: "Sunscreen",
    photoprotection: "Sunscreen",
    uv: "Sunscreen",
    pigmentation: "Hyperpigmentation & Skin Radiance",
    melasma: "Hyperpigmentation & Skin Radiance",
    spot: "Hyperpigmentation & Skin Radiance",
    dark: "Hyperpigmentation & Skin Radiance",
    radiance: "Hyperpigmentation & Skin Radiance",
    brightening: "Hyperpigmentation & Skin Radiance",
    hair: "Hair Care",
    alopecia: "Hair Care",
    dandruff: "Hair Care",
    hairfall: "Hair Care",
    baldness: "Hair Care",
    ageing: "Facial Rejuvenation & Anti-Ageing",
    aging: "Facial Rejuvenation & Anti-Ageing",
    wrinkle: "Facial Rejuvenation & Anti-Ageing",
    exfoliat: "Facial Rejuvenation & Anti-Ageing",
    glycolic: "Facial Rejuvenation & Anti-Ageing",
    fungal: "Anti-Fungal & Anti-Bacterial",
    bacterial: "Anti-Fungal & Anti-Bacterial",
    infection: "Anti-Fungal & Anti-Bacterial",
    itch: "Anti-Allergic & Anti-Itch",
    allergy: "Anti-Allergic & Anti-Itch",
    allergic: "Anti-Allergic & Anti-Itch",
    moisturizer: "Moisturizers",
    dryness: "Moisturizers",
    hydration: "Moisturizers",
    viral: "Anti-Viral",
    herpes: "Anti-Viral",
    vitiligo: "Topical Immunosuppressants (Vitiligo & Dermatitis)",
    psoriasis: "Oral Immunosuppressants (Psoriasis & Dermatitis)",
    scabies: "Anti-Scabies & Head Lice",
    lice: "Anti-Scabies & Head Lice",
  }

  let matchedCatName: string | null = categoryMatch || null
  if (!matchedCatName && therapeuticMatch) {
    matchedCatName = therapeuticMatch.title
  }
  if (!matchedCatName) {
    for (const [kw, cat] of Object.entries(keywordCategoryMap)) {
      if (q.includes(kw)) {
        matchedCatName = cat
        break
      }
    }
  }

  if (matchedCatName) {
    const productsInCat = PRODUCTS.filter(
      (p) =>
        p.category.toLowerCase().includes(matchedCatName!.toLowerCase()) ||
        matchedCatName!.toLowerCase().includes(p.category.toLowerCase()) ||
        (p.indications && p.indications.some((ind) => ind.toLowerCase().includes(matchedCatName!.toLowerCase())))
    )

    if (productsInCat.length > 0) {
      let reply = `Galcare offers specialized formulations for **${matchedCatName}**:\n\n`
      productsInCat.slice(0, 4).forEach((p) => {
        reply += `• **[${p.name}](/products/${p.id})** (${p.dosageForm || "Topical"})\n  ${p.tagline} — Ingredients: ${p.ingredients.slice(0, 3).join(", ")}.\n`
      })
      if (productsInCat.length > 4) {
        reply += `\n*Plus ${productsInCat.length - 4} more specialized formulations in this category.*`
      }
      reply += `\n\n👉 **[Browse Full Product Catalog](/products)**`
      return reply
    }
  }

  // 4. Ingredient-Based Search
  const ingredientMatch = PRODUCTS.filter((p) =>
    p.ingredients.some((ing) => q.includes(ing.toLowerCase().trim()) || ing.toLowerCase().includes(q))
  )

  if (ingredientMatch.length > 0) {
    let reply = `Here are Galcare formulations containing your requested active ingredient:\n\n`
    ingredientMatch.slice(0, 4).forEach((p) => {
      reply += `• **[${p.name}](/products/${p.id})**: ${p.tagline} (${p.ingredients.join(", ")})\n`
    })
    reply += `\nOur clinical R&D ensures targeted drug delivery and dermal tolerance.\n\n👉 **[Explore Product Catalog](/products)**`
    return reply
  }

  // 5. Third-Party / Contract Manufacturing Intent
  if (
    q.includes("third party") ||
    q.includes("third-party") ||
    q.includes("contract manufacturing") ||
    q.includes("oem") ||
    q.includes("private label") ||
    q.includes("custom formulation") ||
    q.includes("manufacturing service")
  ) {
    return `**[Third-Party Manufacturing Services](/divisions/third-party-manufacturing)**\n\nWe provide end-to-end pharmaceutical contract manufacturing backed by our WHO-GMP certified facility in Rajasthan:\n\n• **Dosage Capabilities:** Tablets, Capsules, Creams, Ointments, Gels, Serums, Lotions, and Cleansers.\n• **R&D & Formulation:** Custom formulation development, stability testing (ICH guidelines), & analytical validation.\n• **Packaging:** Aluminum tubes, airless pumps, blister packs, and custom unit doses.\n• **Regulatory Support:** CTD/eCTD dossier documentation and compliance across 26 Indian states & export hubs.\n• **Quality Assurance:** 100% batch release testing via HPLC, GC, and microbiological labs.\n\n👉 **[Explore Manufacturing Division](/divisions/third-party-manufacturing)**\n👉 **[View Facilities & Infrastructure](/facilities)**\n👉 **[Submit RFQ Inquiry](/contact)**`
  }


  // 7. Dermatology Division Intent
  if (q.includes("dermatology") || q.includes("dermaceutical") || q.includes("skin division")) {
    return `**[Dermatology Division](/divisions/dermatology)**\n\nOur Dermatology Division encompasses 180+ evidence-based dermaceutical products designed in collaboration with leading dermatologists:\n\n• **Key Segments:** Hyperpigmentation, Acne Therapeutics, Photoprotection, Hair Growth, Anti-Ageing AHAs, and Immunosuppressive Therapies.\n• **Clinical Rigor:** Formulated for optimal dermal penetration with superior skin tolerance.\n• **Pan-India Reach:** Prescribed by 30,000+ dermatologists across 26 states in India.\n\n👉 **[Explore Dermatology Division](/divisions/dermatology)**\n👉 **[View All Products](/products)**`
  }

  // 8. Quality, Certifications & Manufacturing Facilities
  if (
    q.includes("quality") ||
    q.includes("certif") ||
    q.includes("who-gmp") ||
    q.includes("gmp") ||
    q.includes("iso") ||
    q.includes("facility") ||
    q.includes("factory") ||
    q.includes("lab") ||
    q.includes("testing") ||
    q.includes("r&d") ||
    q.includes("research")
  ) {
    return `**Quality Assurance & Manufacturing Standards**\n\nAt Galcare, quality is integrated into every step:\n\n• **Certifications:** WHO-GMP Certified, ISO 9001:2015, and GLP compliant laboratories.\n• **R&D Facilities:** Dedicated research facilities specializing in drug delivery systems, photostability, and barrier repair.\n• **Quality Control:** Advanced HPLC, Gas Chromatography, UV Spectroscopy, and ICH stability chambers.\n• **Standards:** Zero-defect batch release protocol with Certificate of Analysis (COA) for every batch.\n\n👉 **[Quality Assurance Details](/quality)**\n👉 **[Our Manufacturing Facilities](/facilities)**\n👉 **[View Certifications](/certifications)**`
  }

  // 9. Global Export & Distributor Inquiries
  if (
    q.includes("distributor") ||
    q.includes("partner") ||
    q.includes("export") ||
    q.includes("franchise") ||
    q.includes("dealer") ||
    q.includes("global") ||
    q.includes("country") ||
    q.includes("international")
  ) {
    return `**Global Distribution & Partnerships**\n\nGalcare operates across **42+ countries**, supplying premium pharmaceutical formulations worldwide.\n\n• **Partner Benefits:** Exclusive territorial rights, marketing collateral support, competitive pricing, and regulatory dossier assistance.\n• **Response Guarantee:** Our international business team responds to all genuine partner inquiries within 48 business hours.\n\n👉 **[Submit Partnership Inquiry](/contact)**\n👉 **[About Galcare Global](/about)**`
  }


  // 11. Careers & Job Openings
  if (
    q.includes("career") ||
    q.includes("job") ||
    q.includes("vacancy") ||
    q.includes("hiring") ||
    q.includes("work") ||
    q.includes("opening") ||
    q.includes("apply")
  ) {
    const jobList = JOBS.map((j) => `• **${j.title}** (${j.department} — ${j.location}, ${j.type})`).join("\n")
    return `**Careers at Galcare**\n\nJoin our team of scientific innovators and healthcare leaders! Current openings include:\n\n${jobList}\n\n👉 **[Visit Careers Portal](/careers)**`
  }

  // 12. News, Awards & Events
  if (
    q.includes("news") ||
    q.includes("award") ||
    q.includes("event") ||
    q.includes("update") ||
    q.includes("press") ||
    q.includes("latest")
  ) {
    const newsList = NEWS.map((n) => `• **${n.title}** (${n.date}) — ${n.excerpt}`).join("\n")
    return `**Latest Galcare News & Highlights**\n\n${newsList}\n\n👉 **[Read All Press Releases](/news)**`
  }

  // 13. Company Profile / About Us
  if (
    q.includes("about") ||
    q.includes("company") ||
    q.includes("who are you") ||
    q.includes("galcare") ||
    q.includes("history") ||
    q.includes("overview")
  ) {
    return `**About Galcare Pharmaceuticals**\n\nGalcare is a premium pharmaceutical company with **16+ years of excellence**, operating across 42+ countries.\n\n• **Core Divisions:** Dermatology and Third-Party Contract Manufacturing.\n• **Scale:** Trusted by 30,000+ doctors, offering 68+ active products and 180+ formulations.\n• **Commitment:** Scientific innovation, WHO-GMP certified manufacturing, and ethical healthcare.\n\n👉 **[Learn More About Us](/about)**\n👉 **[Our Research & R&D](/research)**`
  }

  // 14. Contact Information
  if (
    q.includes("contact") ||
    q.includes("address") ||
    q.includes("phone") ||
    q.includes("email") ||
    q.includes("location") ||
    q.includes("office") ||
    q.includes("support")
  ) {
    return `**Contact Galcare Support**\n\nWe are here to help:\n\n• **General Enquiries:** contact@galcare.com\n• **Business Partnerships:** partner@galcare.com\n• **SLA:** Commercial inquiries answered within 24-48 business hours.\n\n👉 **[Open Interactive Contact Form](/contact)**`
  }

  // Default intelligent fallback
  return `Thank you for reaching out to Galcare Assistant!\n\nI can help you with:\n1. **[Product Catalog](/products)**: Search by product name, active ingredient, or skin concern.\n2. **[Third-Party Manufacturing](/divisions/third-party-manufacturing)**: Request contract manufacturing details & WHO-GMP facility specs.\n3. **[Our Divisions](/divisions/dermatology)**: Learn about our Dermatology division.\n4. **[Global Partnerships](/contact)**: Become an international distributor or business partner.\n\nWhat would you like to explore?`
}

export function AIAssistant() {
  return null
}
