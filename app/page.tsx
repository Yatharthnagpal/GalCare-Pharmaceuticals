import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/sections/hero"
import { Overview } from "@/components/sections/overview"
import { Divisions } from "@/components/sections/divisions"
import { Products } from "@/components/sections/products"
import { TherapeuticAreas } from "@/components/sections/therapeutic-areas"
import { WhyUs } from "@/components/sections/why-us"
import { Manufacturing } from "@/components/sections/manufacturing"
import { Research } from "@/components/sections/research"
import { Testimonials } from "@/components/sections/testimonials"
import { News } from "@/components/sections/news"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Products />
        <Divisions />
        <Overview />
        <News />
        <TherapeuticAreas />
        <Manufacturing />
        <Research />
        <Testimonials />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
      <AIAssistant />
    </>
  )
}
