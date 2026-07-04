"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { Reveal } from "@/components/motion-primitives"
import { Calendar, Tag, ArrowLeft, Share2, Printer, ChevronRight } from "lucide-react"

const ARTICLES_CONTENT = [
  {
    title: "Galcare launches next-gen biomimetic sunscreen line",
    category: "Product Launch",
    date: "May 2026",
    subtitle: "A breakthrough in photostable UV filtration with an invisible, barrier-supporting lipid finish.",
    author: "Dr. Elena Vance, Head of Formulation Chemistry",
    readTime: "4 min read",
    sections: [
      {
        heading: "The Science of Biomimetic Filtration",
        text: "Traditional sunscreens often sit as a heavy, separate layer on the skin, which can disrupt the natural lipid barrier and lead to instability under prolonged UV exposure. Galcare's new ShieldSun SPF 50+ utilizes a proprietary biomimetic base designed to mimic the skin's natural intercellular lipids. By structuring the sunscreen matrix to resemble the stratum corneum's lipid bilayers, we achieve superior skin affinity. This enables the organic UV filters—primarily Tinosorb S—to distribute evenly and stay fixed in a uniform micro-film, preventing patches of exposure and boosting overall UV absorption efficiency."
      },
      {
        heading: "Clinical Efficacy & Photostability",
        text: "In double-blind clinical trials conducted over 12 weeks with 150 participants, ShieldSun SPF 50+ demonstrated a remarkable 98% retention of UV-blocking efficacy even after 4 hours of constant, simulated solar radiation. Unlike conventional chemical sunscreens that degrade and release free radicals, the biomimetic formulation acts as a self-stabilizing antioxidant shield. It registered zero skin irritation indices, making it highly recommended for post-procedure recovery, acne-prone patients, and individuals with highly sensitive skin types."
      },
      {
        heading: "Ecological and Skin Compatibility",
        text: "Beyond high performance, ecological safety was a primary parameter in development. Our formulation is completely free of oxybenzone and octinoxate, chemical filters known to contribute to coral bleaching. By leveraging advanced green-chemistry solvents, the sunscreen leaves a completely transparent, matte finish on all skin tones, leaving no white cast while active moisturizers like Hyaluronic Acid keep the skin barrier hydrated."
      }
    ],
    conclusion: "ShieldSun SPF 50+ represents the next evolutionary step in daily photoprotection—merging therapeutic barrier repair with high-level broad-spectrum defense. It is now available through authorized dermatological clinics and our official distribution network."
  },
  {
    title: "Recognized at the Global Dermatology Innovation Awards",
    category: "Award",
    date: "Mar 2026",
    subtitle: "Honored for pioneering work in multi-lamellar barrier-repair and advanced pigmentation science.",
    author: "Clinical Board of Research & Innovation",
    readTime: "3 min read",
    sections: [
      {
        heading: "Bridging Skin Biology and Formulations",
        text: "At the Annual Dermatology Summit in Zurich, Galcare was awarded the prestigious Global Dermatology Innovation Award. The peer-reviewed committee recognized our research team's breakthrough in designing Multi-Lamellar Emulsion (MLE) systems. This formulation technology allows active ceramide complexes to penetrate deep into the skin's outer layers, repairing damage at a cellular level. This is the foundation of our CeraVeil Moisturizer, which has shown in trials to reduce trans-epidermal water loss (TEWL) by 45% within just 7 days of application."
      },
      {
        heading: "Advancing Pigmentation Solutions",
        text: "The award also spotlighted Galcare's Lumina Brightening Cream, which combines Alpha Arbutin, Kojic Acid, and Tranexamic Acid in a synergistic ratio. Historically, blending these powerful depigmenting agents led to stability and irritation issues. Our R&D department solved this by utilizing micro-encapsulation, protecting the active compounds from oxidation and releasing them slowly over 8 hours. The result is a highly stable cream that successfully treats stubborn melasma and hyperpigmentation with virtually no redness or peeling."
      },
      {
        heading: "Commitment to Clinical Validation",
        text: "Accepting the award on behalf of the company, our Chief Scientific Officer emphasized that every formulation is subjected to rigorous third-party clinical evaluation. Receiving recognition from the global dermatological community validates our mission to replace simple cosmetic claims with hard, clinical data."
      }
    ],
    conclusion: "This award strengthens Galcare's position as a leading global innovator in prescription-strength and therapeutic skincare, encouraging our teams to continue pushing the boundaries of skin science."
  },
  {
    title: "Galcare at the World Congress of Dermatology 2026",
    category: "Event",
    date: "Feb 2026",
    subtitle: "Presenting landmark clinical trial data across acne, psoriasis, and peptide-based hair-loss therapeutics.",
    author: "Global Medical Affairs Team",
    readTime: "5 min read",
    sections: [
      {
        heading: "Spotlight Presentations: Acne and Psoriasis Efficacy",
        text: "At the World Congress of Dermatology (WCD) 2026 in Singapore, Galcare's medical affairs team presented three landmark posters. The first session highlighted the clinical results of ClariGel Forte, our combination therapy of Adapalene (0.1%) and Niacinamide (4%). In a comparative trial involving 300 patients with moderate acne vulgaris, the ClariGel group achieved a 72% reduction in inflammatory lesions by week 8, significantly outperforming monotherapy options while exhibiting 60% fewer reports of dryness and peeling."
      },
      {
        heading: "Clinical Trial Revelations: Scalp Peptide Regimens",
        text: "The second presentation focused on our ReGrowth Peptide Serum, containing 3% Redensyl and Copper Peptides. Using high-resolution trichoscopy, researchers tracked hair follicle density and growth phases in 120 patients suffering from androgenetic alopecia. Over a 24-week period, the serum demonstrated a 14.8% increase in active (anagen) hair density, confirming its position as an effective, non-hormonal, prescription-free therapeutic option for hair thinning."
      },
      {
        heading: "Global Collaboration & Future Development",
        text: "The congress provided a crucial platform to engage with international clinical researchers. Galcare hosted a round-table discussion with 40 leading dermatologists from Europe, Asia, and North America, discussing next-generation delivery vehicles like solid lipid nanoparticles to improve target delivery of anti-inflammatory steroids."
      }
    ],
    conclusion: "Our active participation in the World Congress of Dermatology highlights Galcare's commitment to advancing global clinical standards, ensuring practitioners have access to validated, state-of-the-art dermatological therapeutics."
  }
]

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  
  const idStr = Array.isArray(params.id) ? params.id[0] : params.id
  const articleId = parseInt(idStr || "0", 10)
  
  const article = ARTICLES_CONTENT[articleId] || ARTICLES_CONTENT[0]

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 bg-muted/20">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="size-3" />
            <Link href="/news" className="hover:text-primary transition-colors">Newsroom</Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground truncate max-w-[200px] sm:max-w-xs">{article.title}</span>
          </nav>

          {/* Back button */}
          <button
            onClick={() => router.push("/news")}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary mb-8 hover:underline"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" /> Back to Newsroom
          </button>

          {/* Article Card Wrapper */}
          <div className="overflow-hidden rounded-[2rem] border border-border bg-card p-6 md:p-12 shadow-soft">
            <Reveal>
              {/* Category & Date */}
              <div className="flex items-center gap-3 text-sm font-semibold text-primary">
                <span className="rounded-full bg-primary/10 px-3.5 py-1">
                  {article.category}
                </span>
                <span className="text-muted-foreground/30">•</span>
                <span className="text-muted-foreground">
                  {article.date}
                </span>
                <span className="text-muted-foreground/30 hidden sm:inline">•</span>
                <span className="text-muted-foreground hidden sm:inline">
                  {article.readTime}
                </span>
              </div>

              {/* Title */}
              <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl leading-tight text-foreground">
                {article.title}
              </h1>

              {/* Subtitle */}
              <p className="mt-6 text-lg md:text-xl font-medium leading-relaxed text-muted-foreground border-l-4 border-primary/40 pl-4 py-1 bg-primary/5 rounded-r-xl">
                {article.subtitle}
              </p>

              {/* Author Info */}
              <div className="mt-8 flex items-center justify-between border-b border-border pb-6">
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Written By</p>
                  <p className="text-sm font-bold text-foreground mt-0.5">{article.author}</p>
                </div>
                <div className="flex gap-2">
                  <button className="grid size-9 place-items-center rounded-xl border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Share Article">
                    <Share2 className="size-4" />
                  </button>
                  <button onClick={() => window.print()} className="grid size-9 place-items-center rounded-xl border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Print Article">
                    <Printer className="size-4" />
                  </button>
                </div>
              </div>

              {/* Table of Contents / Quick Navigation */}
              <div className="mt-8 p-6 rounded-2xl border border-border bg-muted/40 max-w-md">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Quick Navigation</p>
                <nav className="flex flex-col gap-2.5">
                  {article.sections.map((section, idx) => {
                    const slug = section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")
                    return (
                      <a
                        key={idx}
                        href={`#${slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors hover:underline group/link"
                      >
                        <span className="text-xs text-primary/60 font-mono">0{idx + 1}.</span>
                        <span>{section.heading}</span>
                      </a>
                    )
                  })}
                </nav>
              </div>
            </Reveal>

            {/* Article Body */}
            <div className="mt-12 space-y-12 text-pretty">
              {article.sections.map((section, idx) => {
                const slug = section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")
                return (
                  <Reveal key={idx} delay={idx * 0.05}>
                    <section id={slug} className="scroll-mt-24">
                      <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground border-b border-border/60 pb-3">
                        {section.heading}
                      </h2>
                      <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground">
                        {section.text}
                      </p>
                    </section>
                  </Reveal>
                )
              })}

              {/* Conclusion Box */}
              <Reveal delay={0.15}>
                <div className="mt-12 rounded-2xl bg-muted p-6 border border-border">
                  <p className="text-base md:text-lg font-medium leading-relaxed italic text-foreground/95">
                    {article.conclusion}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AIAssistant />
    </>
  )
}
