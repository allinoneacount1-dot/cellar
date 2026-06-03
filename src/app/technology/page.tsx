'use client';

import { useRef } from 'react';
import Link from 'next/link';
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

export default function TechnologyPage() {
  const features = [
    { num: '01', title: 'Cognitive Processing Engine', desc: 'Multi-modal AI architecture capable of reasoning across text, code, and visual data. Processes information at the speed of thought.' },
    { num: '02', title: 'Neural Communication Protocol', desc: 'Proprietary mesh networking protocol enabling seamless coordination between distributed intelligence nodes with zero-latency message passing.' },
    { num: '03', title: 'Adaptive Learning Framework', desc: 'Continuous learning systems that evolve without retraining. Agents improve through experience, developing specialized capabilities.' },
    { num: '04', title: 'Quantum-Ready Security', desc: 'Post-quantum cryptographic protocols protect all communications. Zero-knowledge proofs ensure privacy without compromising verifiability.' },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <Reveal><span className="text-[10px] text-[#00F5FF] uppercase tracking-[0.3em] mb-4 block">Technology</span></Reveal>
            <Reveal delay={0.1}><h1 className="text-[clamp(40px,7vw,80px)] font-bold tracking-[-0.04em] leading-[0.95] mb-6">Built for Tomorrow</h1></Reveal>
            <Reveal delay={0.2}><p className="text-base text-[#A1A1AA] max-w-xl mx-auto">The technology stack powering CELLAR's autonomous intelligence network.</p></Reveal>
          </div>

          <div className="space-y-6">
            {features.map((f, i) => (
              <Reveal key={f.num} delay={i * 0.06}>
                <div className="glass rounded-2xl p-8 md:p-10 grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4 md:gap-8 items-start">
                  <span className="text-xs text-[#00F5FF] font-mono">{f.num}</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                    <p className="text-sm text-[#A1A1AA] leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <section className="py-28 text-center">
          <div className="max-w-xl mx-auto px-6">
            <Reveal><h2 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.03em] mb-4">Ready to Build?</h2></Reveal>
            <Reveal delay={0.1}><p className="text-[#A1A1AA] mb-8">Access the technology stack and start building on CELLAR.</p></Reveal>
            <Reveal delay={0.2}><Link href="/contact" className="inline-block px-7 py-3.5 rounded-full text-sm font-medium bg-gradient-to-r from-[#00F5FF] to-[#6D28FF] text-black">Get Access</Link></Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
