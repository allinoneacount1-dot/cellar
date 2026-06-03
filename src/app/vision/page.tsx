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

const TIMELINE = [
  { phase: 'Phase I', title: 'Foundation', status: 'Complete', desc: 'Core infrastructure, cognitive engine, and neural protocol deployed.' },
  { phase: 'Phase II', title: 'Network Expansion', status: 'In Progress', desc: 'Global node deployment and agent ecosystem growth.' },
  { phase: 'Phase III', title: 'Autonomous Operations', status: 'Upcoming', desc: 'Full autonomous governance and self-evolving agents.' },
  { phase: 'Phase IV', title: 'Global Intelligence', status: 'Future', desc: 'Planetary-scale intelligence network. The internet thinks.' },
];

export default function VisionPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <Reveal><span className="text-[10px] text-[#6D28FF] uppercase tracking-[0.3em] mb-4 block">Vision</span></Reveal>
            <Reveal delay={0.1}><h1 className="text-[clamp(48px,9vw,110px)] font-bold tracking-[-0.05em] leading-[0.9] mb-6">
              <span className="block text-white">The future</span>
              <span className="block bg-gradient-to-r from-[#00F5FF] to-[#6D28FF] bg-clip-text text-transparent">is invisible.</span>
            </h1></Reveal>
            <Reveal delay={0.2}><p className="text-base text-[#A1A1AA] max-w-lg mx-auto">We are building the intelligence layer of the internet.</p></Reveal>
          </div>

          <div className="max-w-xl mx-auto mb-24 space-y-6">
            {[
              'The most powerful systems are the ones you never see.',
              'Intelligence should be invisible — woven into the fabric of the digital world.',
              'We are not building a product. We are building the substrate of the future.',
              'Every connection strengthens the whole.',
              'The vault is open. The future is being built now.',
            ].map((line, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className={`text-base ${i === 4 ? 'text-[#00F5FF] font-medium' : 'text-[#A1A1AA]'} leading-relaxed`}>{line}</p>
              </Reveal>
            ))}
          </div>

          <Reveal><h2 className="text-2xl font-bold text-center mb-12">Roadmap</h2></Reveal>
          <div className="relative max-w-lg mx-auto">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/[0.06]" />
            {TIMELINE.map((t, i) => (
              <Reveal key={t.phase} delay={0.1 + i * 0.08}>
                <div className="flex gap-5 mb-10 last:mb-0">
                  <div className={`w-[15px] h-[15px] rounded-full mt-1 shrink-0 relative z-10 ${
                    t.status === 'Complete' ? 'bg-[#00F5FF]' : t.status === 'In Progress' ? 'bg-[#6D28FF]' : 'bg-[#333]'
                  }`} />
                  <div>
                    <span className="text-[10px] text-[#555] font-mono">{t.phase}</span>
                    <h3 className="text-base font-semibold mt-0.5 mb-1">{t.title}</h3>
                    <p className="text-sm text-[#A1A1AA] leading-relaxed">{t.desc}</p>
                    <span className={`inline-block mt-2 text-[10px] px-2.5 py-0.5 rounded-full ${
                      t.status === 'Complete' ? 'text-[#00F5FF] bg-[#00F5FF]/[0.08]' : t.status === 'In Progress' ? 'text-[#6D28FF] bg-[#6D28FF]/[0.08]' : 'text-[#555] bg-white/[0.03]'
                    }`}>{t.status}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <section className="py-28 text-center">
          <div className="max-w-xl mx-auto px-6">
            <Reveal><h2 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.03em] mb-4">Build the Future</h2></Reveal>
            <Reveal delay={0.1}><p className="text-[#A1A1AA] mb-8">The vault is open. Step inside.</p></Reveal>
            <Reveal delay={0.2}><Link href="/contact" className="inline-block px-7 py-3.5 rounded-full text-sm font-medium bg-gradient-to-r from-[#00F5FF] to-[#6D28FF] text-black">Enter The Vault</Link></Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
