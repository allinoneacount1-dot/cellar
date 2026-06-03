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

const PILLARS = [
  { icon: '🤖', title: 'Autonomous Agents', desc: 'Self-operating AI agents that execute complex workflows, make decisions, and adapt to changing conditions without human oversight.' },
  { icon: '🔗', title: 'Interconnected Protocols', desc: 'Seamless communication between diverse systems and chains. CELLAR bridges the fragmented landscape into a unified intelligence layer.' },
  { icon: '🏛️', title: 'Governance Framework', desc: 'Decentralized decision-making powered by collective intelligence. Transparent, fair, and resistant to manipulation.' },
  { icon: '💎', title: 'Value Distribution', desc: 'A fair economic model that rewards contribution. Every participant in the ecosystem earns proportional to their impact.' },
  { icon: '🔮', title: 'Predictive Systems', desc: 'Market intelligence and forecasting powered by real-time data analysis. See the future before it happens.' },
  { icon: '🛡️', title: 'Trust Infrastructure', desc: 'Cryptographic verification, reputation systems, and automated compliance. Trustless trust for the intelligent age.' },
];

const PARTNERS = [
  'OpenAI', 'Anthropic', 'Google DeepMind', 'Mistral', 'Hugging Face', 'Chainlink',
  'Ethereum', 'Solana', 'Polygon', 'Arbitrum', 'Optimism', 'Base',
];

export default function EcosystemPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32">
        {/* Hero */}
        <section className="pb-20">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <Reveal>
              <span className="text-xs text-[#00F5FF] uppercase tracking-[0.3em] mb-4 block">Ecosystem</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-[clamp(40px,7vw,96px)] font-black tracking-[-0.04em] leading-[0.95] mb-6 font-[family-name:var(--font-display)]">
                A Living Network
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
                CELLAR is not a single product — it's an ecosystem of interconnected intelligence systems, protocols, and participants working in harmony.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Pillars */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PILLARS.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08}>
                  <div className="glass-card p-8 h-full group">
                    <span className="text-3xl mb-4 block">{p.icon}</span>
                    <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-display)] group-hover:text-[#00F5FF] transition-colors duration-300">{p.title}</h3>
                    <p className="text-sm text-[#A1A1AA] leading-relaxed">{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <Reveal>
              <span className="text-xs text-[#555] uppercase tracking-[0.3em] mb-12 block">Integrations & Partners</span>
            </Reveal>
            <div className="flex flex-wrap justify-center gap-4">
              {PARTNERS.map((p, i) => (
                <Reveal key={p} delay={i * 0.03}>
                  <div className="px-6 py-3 rounded-full border border-[rgba(255,255,255,0.06)] text-sm text-[#A1A1AA] hover:border-[#00F5FF]/30 hover:text-[#00F5FF] transition-all duration-300 cursor-pointer">
                    {p}
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
                Join the Ecosystem
              </h2>
              <p className="text-[#A1A1AA] mb-10">
                Become a node in the network. Contribute, earn, and shape the future.
              </p>
              <Link href="/contact" className="magnetic-btn inline-block px-8 py-4 rounded-full text-sm font-semibold bg-gradient-to-r from-[#00F5FF] to-[#6D28FF] text-black">
                Get Started
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
