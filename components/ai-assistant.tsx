"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Bot, X, Send, Mic, MicOff, Sparkles } from "lucide-react"
import { PRODUCTS } from "@/lib/site-data"
import { cn } from "@/lib/utils"

interface Message {
  role: "user" | "assistant"
  content: string
}

const SUGGESTIONS = [
  "Recommend a product for acne",
  "Tell me about your sunscreen",
  "How do I become a distributor?",
  "Connect me with a doctor",
]

function generateReply(input: string): string {
  const q = input.toLowerCase()

  const matched = PRODUCTS.find(
    (p) => q.includes(p.category.toLowerCase()) || q.includes(p.name.toLowerCase().split(" ")[0]),
  )
  if (matched) {
    return `For ${matched.category.toLowerCase()} concerns, I'd recommend ${matched.name} — ${matched.tagline}. Key ingredients include ${matched.ingredients.join(", ")}. It helps ${matched.benefits.join(", ").toLowerCase()}. Would you like the brochure?`
  }
  if (q.includes("distributor") || q.includes("partner")) {
    return "We partner with distributors across 42 countries. Share your region and organization via the contact form and our partnerships team will reach out within 48 hours."
  }
  if (q.includes("doctor") || q.includes("connect") || q.includes("expert")) {
    return "I can connect you with a dermatology expert. Use the 'Talk to Expert' button or the contact form, and select 'Healthcare Professional' — our medical team responds promptly."
  }
  if (q.includes("about") || q.includes("company") || q.includes("who")) {
    return "Galcare is a premium dermatology and skincare pharmaceutical company with 25+ years of experience, WHO-GMP certified manufacturing, and a portfolio of 180+ products trusted by 30,000+ doctors."
  }
  if (q.includes("skin") || q.includes("concern") || q.includes("recommend")) {
    return "Tell me your primary concern — acne, pigmentation, hair loss, sun protection, dryness, or fungal infection — and I'll suggest the ideal product from our range."
  }
  if (q.includes("faq") || q.includes("help")) {
    return "I can help with product recommendations, ingredient and safety information, distributor enquiries, doctor connections, and company details. What would you like to know?"
  }
  return "Thanks for your question! I can help with product recommendations, medicine information, skin-concern guidance, distributor enquiries, and doctor connections. Could you tell me a bit more about what you need?"
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
        "Hi, I'm Aria, your Galcare skincare assistant. I can recommend products, explain ingredients, or connect you with a dermatologist. How can I help?",
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
    }, 900)
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
            className="fixed bottom-24 right-5 z-50 flex h-[560px] max-h-[calc(100vh-7rem)] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-[1.75rem] glass-strong shadow-soft"
          >
            {/* header */}
            <div className="flex items-center gap-3 border-b border-border bg-gradient-to-r from-primary to-accent2 px-5 py-4 text-primary-foreground">
              <div className="grid size-10 place-items-center rounded-xl bg-primary-foreground/15">
                <Sparkles className="size-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold leading-tight">Aria · Skincare Assistant</p>
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
                      "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      m.role === "user"
                        ? "rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-bl-md border border-border bg-card text-card-foreground",
                    )}
                  >
                    {m.content}
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
                  placeholder={listening ? "Listening…" : "Ask about products, ingredients…"}
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
