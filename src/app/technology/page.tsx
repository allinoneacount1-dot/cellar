'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
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

function SectionHead({ tag, title, desc }: { tag: string; title: string; desc: string }) {
  return (
    <div className="text-center mb-20">
      <Reveal>
        <span className="text-xs text-[#00F5FF] uppercase tracking-[0.3em] mb-4 block">{tag}</span>
      </Reveal>
      <Reveal delay={0.1}>
        <h1 className="text-[clamp(40px,7vw,96px)] font-black tracking-[-0.04em] leading-[0.95] mb-6 font-[family-name:var(--font-display)]">
          {title}
        </h1>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">{desc}</p>
      </Reveal>
    </div>
  );
}

function FeatureRow({ num, title, desc, reversed }: { num: string; title: string; desc: string; reversed?: boolean }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32 ${reversed ? 'md:direction-rtl' : ''}`}>
      <Reveal delay={0}>
        <div className={reversed ? 'md:order-2' : ''}>
          <span className="text-xs text-[#00F5FF] font-mono mb-4 block">{num}</span>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-display)] tracking-tight">{title}</h3>
          <p className="text-[#A1A1AA] leading-relaxed">{desc}</p>
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <div className={`glass-card aspect-square flex items-center justify-center ${reversed ? 'md:order-1' : ''}`}>
          <div className="text-center">
            <div className="text-6xl mb-4 opacity-20">◆</div>
            <div className="text-xs text-[#555] uppercase tracking-widest">Visualization</div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default function TechnologyPage() {
  const features = [
    { num: '01', title: 'Cognitive Processing Engine', desc: 'Multi-modal AI architecture capable of reasoning across text, code, and visual data. Our cognitive engine processes information at the speed of thought, making decisions with precision that exceeds human capability.' },
    { num: '02', title: 'Neural Communication Protocol', desc: 'Proprietary mesh networking protocol enabling seamless coordination between distributed intelligence nodes. Zero-latency message passing with built-in fault tolerance and self-healing capabilities.' },
    { num: '03', title: 'Adaptive Learning Framework', desc: 'Continuous learning systems that evolve without retraining. CELLAR agents improve through experience, developing specialized capabilities tailored to their operational environment.' },
    { num: '04', title: 'Quantum-Ready Security', desc: 'Post-quantum cryptographic protocols protect all communications and data. Zero-knowledge proofs ensure privacy without compromising verifiability.' },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-32">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead
            tag="Technology"
            title="Built for Tomorrow"
            desc="The technology stack powering CELLAR's autonomous intelligence network. Every component engineered for performance, security, and scale."
          />

          {features.map((f, i) => (
            <FeatureRow key={f.num} {...f} reversed={i % 2 === 1} />
          ))}
        </div>

        {/* CTA */}
        <section className="py-32 text-center">
          <div className="mx-auto max-w-2xl px-6">
            <Reveal>
              <h2 className="text-[clamp(32px,5vw,56px)] font-black tracking-[-0.03em] mb-6 font-[family-name:var(--font-display)]">
                Ready to Build?
              </h2>
              <p className="text-[#A1A1AA] mb-10">
                Access the technology stack and start building on CELLAR.
              </p>
              <Link href="/contact" className="magnetic-btn inline-block px-8 py-4 rounded-full text-sm font-semibold bg-gradient-to-r from-[#00F5FF] to-[#6D28FF] text-black">
                Get Access
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
