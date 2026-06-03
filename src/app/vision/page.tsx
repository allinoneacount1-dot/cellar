'use client';

import { useRef } from 'react';
import Link from 'next/link';
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

const TIMELINE = [
  { phase: 'Phase I', title: 'Foundation', status: 'Complete', desc: 'Core infrastructure, cognitive engine, and neural protocol deployed.' },
  { phase: 'Phase II', title: 'Network Expansion', status: 'In Progress', desc: 'Global node deployment, agent ecosystem growth, and partnership integration.' },
  { phase: 'Phase III', title: 'Autonomous Operations', status: 'Upcoming', desc: 'Full autonomous governance, self-evolving agents, and decentralized coordination.' },
  { phase: 'Phase IV', title: 'Global Intelligence', status: 'Future', desc: 'Planetary-scale intelligence network. The internet thinks.' },
];

export default function VisionPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32">
        {/* Hero */}
        <section className="pb-20">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <Reveal>
              <span className="text-xs text-[#6D28FF] uppercase tracking-[0.3em] mb-4 block">Vision</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-[clamp(48px,9vw,130px)] font-black tracking-[-0.05em] leading-[0.9] mb-8 font-[family-name:var(--font-display)]">
                <span className="block text-white">The future</span>
                <span className="block bg-gradient-to-r from-[#00F5FF] via-[#6D28FF] to-[#00F5FF] bg-clip-text text-transparent animate-aurora">
                  is invisible.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
                We are building the intelligence layer of the internet. Silent. Omnipresent. Unstoppable.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Manifesto */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            {[
              'The most powerful systems are the ones you never see.',
              'Intelligence should be invisible — woven into the fabric of the digital world.',
              'We are not building a product. We are building the substrate of the future.',
              'Every connection strengthens the whole. Every agent makes the network smarter.',
              'The vault is open. The future is being built now.',
            ].map((line, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={`text-lg md:text-xl ${i === 4 ? 'text-[#00F5FF] font-semibold mt-8' : 'text-[#A1A1AA]'} leading-relaxed ${i > 0 ? 'mt-4' : ''}`}>
                  {line}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-6">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-[family-name:var(--font-display)]">Roadmap</h2>
            </Reveal>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00F5FF]/20 via-[#6D28FF]/20 to-transparent" />

              {TIMELINE.map((t, i) => (
                <Reveal key={t.phase} delay={i * 0.12}>
                  <div className={`relative flex items-start gap-8 mb-16 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Dot */}
                    <div className={`absolute left-4 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 mt-1.5 ${
                      t.status === 'Complete' ? 'bg-[#00F5FF]' :
                      t.status === 'In Progress' ? 'bg-[#6D28FF] animate-pulse' :
                      'bg-[#333]'
                    }`} />

                    {/* Content */}
                    <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <span className="text-xs text-[#555] font-mono">{t.phase}</span>
                      <h3 className="text-xl font-bold mt-1 mb-2 font-[family-name:var(--font-display)]">{t.title}</h3>
                      <p className="text-sm text-[#A1A1AA] leading-relaxed">{t.desc}</p>
                      <span className={`inline-block mt-2 text-xs px-3 py-1 rounded-full ${
                        t.status === 'Complete' ? 'bg-[#00F5FF]/10 text-[#00F5FF]' :
                        t.status === 'In Progress' ? 'bg-[#6D28FF]/10 text-[#6D28FF]' :
                        'bg-[#333]/50 text-[#555]'
                      }`}>
                        {t.status}
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 text-center">
          <div className="mx-auto max-w-2xl px-6">
            <Reveal>
              <h2 className="text-[clamp(32px,5vw,56px)] font-black tracking-[-0.03em] mb-6 font-[family-name:var(--font-display)]">
                Build the Future
              </h2>
              <p className="text-[#A1A1AA] mb-10">
                The vault is open. Step inside.
              </p>
              <Link href="/contact" className="magnetic-btn inline-block px-8 py-4 rounded-full text-sm font-semibold bg-gradient-to-r from-[#00F5FF] to-[#6D28FF] text-black">
                Enter The Vault
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
