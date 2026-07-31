import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/sections/hero"
import { Overview } from "@/components/sections/overview"
import { Products } from "@/components/sections/products"
import { ThirdPartyCTA } from "@/components/sections/third-party-cta"
import { WhyUs } from "@/components/sections/why-us"
import { Testimonials } from "@/components/sections/testimonials"
import { News } from "@/components/sections/news"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Overview />
        <Products />
        <ThirdPartyCTA />
        <WhyUs />
        <Testimonials />
        <News />
      </main>
      <Footer />
      <AIAssistant />
    </>
  )
}
