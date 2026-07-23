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
  "Neuropsychiatric division portfolio",
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
    return `Hello! Welcome to Galcare Pharmaceuticals. I am Aria, your AI Assistant.\n\nI can help you explore:\n• **[Dermatology & Neuropsychiatric Catalog](/products)**\n• **[Third-Party Contract Manufacturing](/divisions/third-party-manufacturing)**\n• **[WHO-GMP Quality Standards](/quality)**\n• **[Global Distribution & Partnerships](/contact)**\n• **[Doctor & Medical Support](/contact)**\n\nHow can I help you today?`
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
    return `**[Third-Party Manufacturing Services](/divisions/third-party-manufacturing)**\n\nWe provide end-to-end pharmaceutical contract manufacturing backed by WHO-GMP certified infrastructure:\n\n• **Dosage Capabilities:** Tablets, Capsules, Creams, Ointments, Gels, Serums, Lotions, and Cleansers.\n• **R&D & Formulation:** Custom formulation development, stability testing (ICH guidelines), & analytical validation.\n• **Packaging:** Aluminum tubes, airless pumps, blister packs, and custom unit doses.\n• **Regulatory Support:** CTD/eCTD dossier documentation and export compliance for 42+ countries.\n• **Quality Assurance:** 100% batch release testing via HPLC, GC, and microbiological labs.\n\n👉 **[Explore Manufacturing Division](/divisions/third-party-manufacturing)**\n👉 **[View Facilities & Infrastructure](/facilities)**\n👉 **[Submit RFQ Inquiry](/contact)**`
  }

  // 6. Neuropsychiatric Division Intent
  if (
    q.includes("neuro") ||
    q.includes("psychiatry") ||
    q.includes("psychiatric") ||
    q.includes("cns") ||
    q.includes("brain") ||
    q.includes("neurological") ||
    q.includes("mental health")
  ) {
    return `**[Neuropsychiatric Division](/divisions/neuropsychiatric)**\n\nGalcare is a trusted leader in neurological and psychiatric healthcare formulations, delivering high-purity Central Nervous System (CNS) therapies:\n\n• **Therapeutic Focus:** Management of mood disorders, anxiety, cognitive health, neuro-degenerative conditions, and sleep architecture.\n• **Formulation Excellence:** High-precision dosing, bio-equivalent active compounds, and strict CNS purity standards.\n• **Doctor Trust:** Prescribed by leading psychiatrists and neurologists nationwide.\n\n👉 **[Explore Neuropsychiatric Division](/divisions/neuropsychiatric)**\n👉 **[Request Product Catalog](/contact)**`
  }

  // 7. Dermatology Division Intent
  if (q.includes("dermatology") || q.includes("dermaceutical") || q.includes("skin division")) {
    return `**[Dermatology Division](/divisions/dermatology)**\n\nOur Dermatology Division encompasses 180+ evidence-based dermaceutical products designed in collaboration with leading dermatologists:\n\n• **Key Segments:** Hyperpigmentation, Acne Therapeutics, Photoprotection, Hair Growth, Anti-Ageing AHAs, and Immunosuppressive Therapies.\n• **Clinical Rigor:** Formulated for optimal dermal penetration with superior skin tolerance.\n• **Global Footprint:** Prescribed by 30,000+ dermatologists across 42 countries.\n\n👉 **[Explore Dermatology Division](/divisions/dermatology)**\n👉 **[View All Products](/products)**`
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

  // 10. Doctor / Expert Consultation Intent
  if (
    q.includes("doctor") ||
    q.includes("connect") ||
    q.includes("expert") ||
    q.includes("dermatologist") ||
    q.includes("physician") ||
    q.includes("medical") ||
    q.includes("consult")
  ) {
    return `**Medical & Expert Consultation Support**\n\nGalcare collaborates closely with medical professionals:\n\n• **For Healthcare Professionals:** Request product samples, clinical dossiers, or schedule a consultation with our Medical Representative.\n• **For Patients:** Consult your dermatologist or healthcare practitioner for personalized prescription guidance.\n\n👉 **[Contact Medical Liaison Team](/contact)**`
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
    return `**About Galcare Pharmaceuticals**\n\nGalcare is a premium pharmaceutical company with **16+ years of excellence**, operating across 42+ countries.\n\n• **Core Divisions:** Dermatology, Neuropsychiatric, and Third-Party Contract Manufacturing.\n• **Scale:** Trusted by 30,000+ doctors, offering 68+ active products and 180+ formulations.\n• **Commitment:** Scientific innovation, WHO-GMP certified manufacturing, and ethical healthcare.\n\n👉 **[Learn More About Us](/about)**\n👉 **[Our Research & R&D](/research)**`
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
  return `Thank you for reaching out to Galcare Assistant!\n\nI can help you with:\n1. **[Product Catalog](/products)**: Search by product name, active ingredient, or skin concern.\n2. **[Third-Party Manufacturing](/divisions/third-party-manufacturing)**: Request contract manufacturing details & WHO-GMP facility specs.\n3. **[Our Divisions](/divisions/dermatology)**: Learn about Dermatology and Neuropsychiatric portfolios.\n4. **[Global Partnerships](/contact)**: Become an international distributor or business partner.\n5. **[Medical Support](/contact)**: Connect with our medical team or request samples.\n\nWhat would you like to explore?`
}

export function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const [listening, setListening] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Aria, your Galcare AI Assistant. I can recommend formulations across [Dermatology](/divisions/dermatology) & [Neuropsychiatric](/divisions/neuropsychiatric) divisions, detail our [Third-Party Contract Manufacturing](/divisions/third-party-manufacturing), explain ingredients, or connect you with [healthcare experts](/contact). How can I help you today?",
    },
  ])

  const scrollRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, typing, open])

  const send = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setMessages((m) => [...m, { role: "user", content: trimmed }])
    setInput("")
    setTyping(true)
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", content: generateReply(trimmed) }])
      setTyping(false)
    }, 600)
  }

  const toggleVoice = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SR) {
      send("Voice input isn't supported in this browser.")
      return
    }
    if (listening) {
      recognitionRef.current?.stop()
      setListening(false)
      return
    }
    const recognition = new SR()
    recognition.lang = "en-US"
    recognition.interimResults = false
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript
      setInput(transcript)
      setListening(false)
    }
    recognition.onerror = () => setListening(false)
    recognition.onend = () => setListening(false)
    recognitionRef.current = recognition
    recognition.start()
    setListening(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !(e.nativeEvent as any).isComposing && e.keyCode !== 229) {
      e.preventDefault()
      send(input)
    }
  }

  return (
    <>
      {/* launcher */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open AI assistant"
        className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-glow"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="size-6" />
            </motion.span>
          ) : (
            <motion.span key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Bot className="size-6" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 flex size-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
            <span className="relative inline-flex size-3.5 rounded-full bg-teal" />
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-5 z-50 flex h-[580px] max-h-[calc(100vh-7rem)] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-[1.75rem] glass-strong shadow-soft border border-border"
          >
            {/* header */}
            <div className="flex items-center gap-3 border-b border-border bg-gradient-to-r from-primary to-accent2 px-5 py-4 text-primary-foreground">
              <div className="grid size-10 place-items-center rounded-xl bg-primary-foreground/15">
                <Sparkles className="size-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold leading-tight">Aria · Galcare AI Assistant</p>
                <p className="flex items-center gap-1.5 text-xs text-primary-foreground/80">
                  <span className="size-1.5 rounded-full bg-teal" /> Online now
                </p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-lg p-1.5 hover:bg-primary-foreground/15">
                <X className="size-5" />
              </button>
            </div>

            {/* messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-background/40 p-4">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      m.role === "user"
                        ? "rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-bl-md border border-border bg-card text-card-foreground shadow-sm",
                    )}
                  >
                    {renderFormattedContent(m.content)}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="size-2 rounded-full bg-muted-foreground"
                        animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {messages.length <= 1 && !typing && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* input */}
            <div className="border-t border-border bg-card/60 p-3">
              <div className="flex items-end gap-2">
                <button
                  onClick={toggleVoice}
                  aria-label="Voice input"
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-xl border border-border transition-colors",
                    listening ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent",
                  )}
                >
                  {listening ? <MicOff className="size-5" /> : <Mic className="size-5" />}
                </button>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder={listening ? "Listening…" : "Ask about products, manufacturing…"}
                  className="max-h-24 flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                />
                <button
                  onClick={() => send(input)}
                  aria-label="Send message"
                  disabled={!input.trim()}
                  className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-40"
                >
                  <Send className="size-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
