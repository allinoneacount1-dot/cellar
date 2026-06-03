'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}>
      {children}
    </motion.div>
  );
}

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <Navbar />
      <main className="pt-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <Reveal><span className="text-[10px] text-[#00F5FF] uppercase tracking-[0.3em] mb-4 block">Contact</span></Reveal>
            <Reveal delay={0.1}><h1 className="text-[clamp(40px,7vw,80px)] font-bold tracking-[-0.04em] leading-[0.95] mb-6">Enter The Vault</h1></Reveal>
            <Reveal delay={0.2}><p className="text-base text-[#A1A1AA] max-w-lg mx-auto">Ready to access CELLAR? Get in touch.</p></Reveal>
          </div>

          <div className="max-w-lg mx-auto">
            <Reveal delay={0.1}>
              {sent ? (
                <div className="glass rounded-2xl p-12 text-center">
                  <div className="text-3xl mb-3">✓</div>
                  <h3 className="text-xl font-semibold mb-1">Message Received</h3>
                  <p className="text-sm text-[#A1A1AA]">We'll respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="glass rounded-2xl p-8 space-y-5">
                  <div>
                    <label className="text-[10px] text-[#555] uppercase tracking-[0.15em] mb-1.5 block">Name</label>
                    <input type="text" required className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#00F5FF]/30 transition-colors" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#555] uppercase tracking-[0.15em] mb-1.5 block">Email</label>
                    <input type="email" required className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#00F5FF]/30 transition-colors" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#555] uppercase tracking-[0.15em] mb-1.5 block">Message</label>
                    <textarea rows={5} required className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#00F5FF]/30 transition-colors resize-none" placeholder="Tell us about your project..." />
                  </div>
                  <button type="submit" className="w-full py-3.5 rounded-full text-sm font-medium bg-gradient-to-r from-[#00F5FF] to-[#6D28FF] text-black hover:shadow-[0_0_30px_rgba(0,245,255,0.15)] transition-shadow duration-300">
                    Send Message
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
