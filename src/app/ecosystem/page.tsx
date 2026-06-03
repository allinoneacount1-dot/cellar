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

const PILLARS = [
  { title: 'Autonomous Agents', desc: 'Self-operating AI agents that execute complex workflows and adapt without human oversight.' },
  { title: 'Interconnected Protocols', desc: 'Seamless communication between diverse systems and chains. A unified intelligence layer.' },
  { title: 'Governance Framework', desc: 'Decentralized decision-making powered by collective intelligence. Transparent and fair.' },
  { title: 'Value Distribution', desc: 'A fair economic model that rewards contribution proportional to impact.' },
  { title: 'Predictive Systems', desc: 'Market intelligence and forecasting powered by real-time data analysis.' },
  { title: 'Trust Infrastructure', desc: 'Cryptographic verification, reputation systems, and automated compliance.' },
];

export default function EcosystemPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <Reveal><span className="text-[10px] text-[#00F5FF] uppercase tracking-[0.3em] mb-4 block">Ecosystem</span></Reveal>
            <Reveal delay={0.1}><h1 className="text-[clamp(40px,7vw,80px)] font-bold tracking-[-0.04em] leading-[0.95] mb-6">A Living Network</h1></Reveal>
            <Reveal delay={0.2}><p className="text-base text-[#A1A1AA] max-w-xl mx-auto">CELLAR is an ecosystem of interconnected intelligence systems working in harmony.</p></Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="glass rounded-2xl p-7 h-full hover:bg-white/[0.04] transition-colors duration-300">
                  <h3 className="text-base font-semibold mb-2">{p.title}</h3>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <section className="py-28 text-center">
          <div className="max-w-xl mx-auto px-6">
            <Reveal><h2 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.03em] mb-4">Join the Ecosystem</h2></Reveal>
            <Reveal delay={0.1}><p className="text-[#A1A1AA] mb-8">Become a node in the network. Contribute, earn, and shape the future.</p></Reveal>
            <Reveal delay={0.2}><Link href="/contact" className="inline-block px-7 py-3.5 rounded-full text-sm font-medium bg-gradient-to-r from-[#00F5FF] to-[#6D28FF] text-black">Get Started</Link></Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
