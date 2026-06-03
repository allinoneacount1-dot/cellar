'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Navbar />
      <main className="pt-32">
        {/* Hero */}
        <section className="pb-20">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <Reveal>
              <span className="text-xs text-[#00F5FF] uppercase tracking-[0.3em] mb-4 block">Contact</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-[clamp(40px,7vw,96px)] font-black tracking-[-0.04em] leading-[0.95] mb-6 font-[family-name:var(--font-display)]">
                Enter The Vault
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
                Ready to access CELLAR? Get in touch with our team or join the network directly.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Form */}
        <section className="py-16">
          <div className="mx-auto max-w-xl px-6">
            <Reveal>
              {submitted ? (
                <div className="glass-card p-12 text-center glow-neural">
                  <div className="text-4xl mb-4">✓</div>
                  <h3 className="text-2xl font-bold mb-2 font-[family-name:var(--font-display)]">Message Received</h3>
                  <p className="text-[#A1A1AA]">We'll respond within 24 hours. Welcome to CELLAR.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  className="glass-card p-8 md:p-12 space-y-6"
                >
                  <div>
                    <label className="text-xs text-[#A1A1AA] uppercase tracking-widest mb-2 block">Name</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#00F5FF]/40 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#A1A1AA] uppercase tracking-widest mb-2 block">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#00F5FF]/40 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#A1A1AA] uppercase tracking-widest mb-2 block">Subject</label>
                    <select className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00F5FF]/40 transition-colors">
                      <option value="">Select a topic</option>
                      <option value="access">Request Access</option>
                      <option value="partnership">Partnership</option>
                      <option value="technical">Technical Inquiry</option>
                      <option value="general">General</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-[#A1A1AA] uppercase tracking-widest mb-2 block">Message</label>
                    <textarea
                      rows={5}
                      required
                      className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#00F5FF]/40 transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full magnetic-btn px-8 py-4 rounded-full text-sm font-semibold bg-gradient-to-r from-[#00F5FF] to-[#6D28FF] text-black hover:shadow-[0_0_30px_rgba(0,245,255,0.2)] transition-all duration-300"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </section>

        {/* Direct Access */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: '📧', title: 'Email', value: 'team@cellar.ai' },
                { icon: '💬', title: 'Discord', value: 'discord.gg/cellar' },
                { icon: '🐦', title: 'Twitter', value: '@cellar_ai' },
              ].map((c, i) => (
                <Reveal key={c.title} delay={i * 0.1}>
                  <div className="glass-card p-8 text-center cursor-pointer group">
                    <span className="text-2xl mb-3 block">{c.icon}</span>
                    <div className="text-sm text-[#A1A1AA] mb-1">{c.title}</div>
                    <div className="text-sm font-medium text-white group-hover:text-[#00F5FF] transition-colors">{c.value}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
