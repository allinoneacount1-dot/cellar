'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import CellarCore from '@/components/CellarCore';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ── Reveal animation ── */
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Section heading ── */
function SH({ tag, title, center = true }: { tag: string; title: string; center?: boolean }) {
  return (
    <div className={center ? 'text-center' : ''}>
      <Reveal>
        <span className="text-[10px] text-[#00F5FF] uppercase tracking-[0.3em] mb-4 block">{tag}</span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="text-[clamp(32px,5vw,56px)] font-bold tracking-[-0.03em] leading-[1.05]">
          {title}
        </h2>
      </Reveal>
    </div>
  );
}

/* ═══════════════════════════════════════
   HERO
   ═══════════════════════════════════════ */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,245,255,0.03)_0%,transparent_70%)] pointer-events-none" />

      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(0,245,255,0.12)] text-[11px] text-[#00F5FF] tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF]" />
            Autonomous Intelligence
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="text-[clamp(56px,11vw,150px)] font-bold tracking-[-0.05em] leading-[0.9] mb-6"
        >
          CELLAR
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-lg md:text-xl text-[#A1A1AA] max-w-xl mx-auto mb-3 font-light"
        >
          Intelligence Beneath The Surface
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-sm text-[#555] max-w-md mx-auto mb-10"
        >
          Building intelligent systems for the future.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link href="/technology" className="px-7 py-3.5 rounded-full text-sm font-medium bg-gradient-to-r from-[#00F5FF] to-[#6D28FF] text-black hover:shadow-[0_0_30px_rgba(0,245,255,0.2)] transition-shadow duration-300">
            Enter The Vault
          </Link>
          <Link href="/ecosystem" className="px-7 py-3.5 rounded-full text-sm font-medium border border-white/[0.1] text-white hover:border-white/[0.2] transition-colors duration-300">
            Explore Ecosystem
          </Link>
        </motion.div>
      </motion.div>

      {/* 3D Core — positioned at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.5 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 w-full max-w-xl z-0"
      >
        <CellarCore />
      </motion.div>

      {/* Scroll hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <span className="text-[9px] text-[#444] uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-px h-6 bg-gradient-to-b from-[#00F5FF]/30 to-transparent" />
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════
   MANIFESTO
   ═══════════════════════════════════════ */
function Manifesto() {
  return (
    <section className="py-32 md:py-44">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <SH tag="Philosophy" title="Everything valuable is hidden." />
        <Reveal delay={0.2}>
          <p className="text-lg text-[#A1A1AA] leading-relaxed mt-8 max-w-xl mx-auto">
            Everything powerful is invisible. CELLAR operates beneath the surface — a distributed intelligence network that controls the future from the shadows.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   CAPABILITIES — 4 cards, clean grid
   ═══════════════════════════════════════ */
function Capabilities() {
  const items = [
    { title: 'Neural Intelligence', desc: 'Self-learning systems that adapt and evolve without human intervention.' },
    { title: 'Infrastructure', desc: 'Distributed compute network with zero-latency execution.' },
    { title: 'Security', desc: 'Quantum-resistant encryption and autonomous threat detection.' },
    { title: 'Automation', desc: 'Autonomous agents executing complex workflows 24/7.' },
  ];

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16">
          <SH tag="Capabilities" title="Intelligence Layer" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="glass rounded-2xl p-8 md:p-10 group hover:bg-white/[0.04] transition-colors duration-300">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-[#00F5FF] transition-colors duration-300">{item.title}</h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   STATS — minimal, no animation spam
   ═══════════════════════════════════════ */
function Stats() {
  const stats = [
    { value: '99.97%', label: 'Uptime' },
    { value: '<2ms', label: 'Latency' },
    { value: '24/7', label: 'Autonomous' },
    { value: '∞', label: 'Scalability' },
  ];

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="glass rounded-2xl py-8 px-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#00F5FF] mb-1">{s.value}</div>
                <div className="text-[10px] text-[#555] uppercase tracking-[0.2em]">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   VISION — massive typography
   ═══════════════════════════════════════ */
function Vision() {
  return (
    <section className="py-32 md:py-44">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <Reveal>
          <span className="text-[10px] text-[#6D28FF] uppercase tracking-[0.3em] mb-6 block">The Future</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-[clamp(40px,9vw,120px)] font-bold tracking-[-0.05em] leading-[0.9]">
            <span className="block text-white">The future is</span>
            <span className="block bg-gradient-to-r from-[#00F5FF] to-[#6D28FF] bg-clip-text text-transparent">
              invisible.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-base text-[#A1A1AA] max-w-md mx-auto mt-8 leading-relaxed">
            We are building the intelligence layer of the internet. Silent. Omnipresent. Unstoppable.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   CTA
   ═══════════════════════════════════════ */
function CTA() {
  return (
    <section className="py-28 md:py-36">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <Reveal>
          <div className="glass rounded-3xl p-12 md:p-16">
            <span className="text-[10px] text-[#00F5FF] uppercase tracking-[0.3em] mb-4 block">Access</span>
            <h2 className="text-[clamp(28px,4vw,48px)] font-bold tracking-[-0.03em] mb-4">
              ACCESS THE CELLAR
            </h2>
            <p className="text-sm text-[#A1A1AA] max-w-sm mx-auto mb-8">
              Become part of the future.
            </p>
            <Link href="/contact" className="inline-block px-7 py-3.5 rounded-full text-sm font-medium bg-gradient-to-r from-[#00F5FF] to-[#6D28FF] text-black hover:shadow-[0_0_30px_rgba(0,245,255,0.2)] transition-shadow duration-300">
              Get Started
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <Capabilities />
        <Stats />
        <Vision />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
