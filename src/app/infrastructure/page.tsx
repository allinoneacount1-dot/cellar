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

const SPECS = [
  { value: '2,400+', label: 'Compute Nodes' },
  { value: '847M', label: 'Daily Transactions' },
  { value: '99.97%', label: 'Uptime' },
  { value: '12.4 PB', label: 'Data / Day' },
  { value: '47,363', label: 'Active Agents' },
  { value: '156', label: 'API Endpoints' },
];

const NODES = [
  { region: 'North America', status: 'Active', agents: '12,847' },
  { region: 'Europe', status: 'Active', agents: '9,234' },
  { region: 'Asia Pacific', status: 'Active', agents: '15,621' },
  { region: 'South America', status: 'Active', agents: '4,567' },
  { region: 'Africa', status: 'Deploying', agents: '1,203' },
  { region: 'Middle East', status: 'Active', agents: '3,891' },
];

export default function InfrastructurePage() {
  return (
    <>
      <Navbar />
      <main className="pt-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <Reveal><span className="text-[10px] text-[#6D28FF] uppercase tracking-[0.3em] mb-4 block">Infrastructure</span></Reveal>
            <Reveal delay={0.1}><h1 className="text-[clamp(40px,7vw,80px)] font-bold tracking-[-0.04em] leading-[0.95] mb-6">Global Network</h1></Reveal>
            <Reveal delay={0.2}><p className="text-base text-[#A1A1AA] max-w-xl mx-auto">Distributed compute infrastructure spanning six continents.</p></Reveal>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
            {SPECS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.04}>
                <div className="glass rounded-2xl p-6 text-center">
                  <div className="text-xl md:text-2xl font-bold text-[#00F5FF] mb-1">{s.value}</div>
                  <div className="text-[10px] text-[#555] uppercase tracking-[0.15em]">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal><h2 className="text-2xl font-bold text-center mb-8">Network Nodes</h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {NODES.map((n, i) => (
              <Reveal key={n.region} delay={0.1 + i * 0.04}>
                <div className="glass rounded-xl p-5 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{n.region}</div>
                    <div className="text-xs text-[#555]">{n.agents} agents</div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${n.status === 'Active' ? 'bg-[#00F5FF]' : 'bg-[#6D28FF]'}`} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <section className="py-28 text-center">
          <div className="max-w-xl mx-auto px-6">
            <Reveal><h2 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.03em] mb-4">Deploy Anywhere</h2></Reveal>
            <Reveal delay={0.1}><p className="text-[#A1A1AA] mb-8">Access the global infrastructure and deploy your agents at the edge.</p></Reveal>
            <Reveal delay={0.2}><Link href="/contact" className="inline-block px-7 py-3.5 rounded-full text-sm font-medium bg-gradient-to-r from-[#00F5FF] to-[#6D28FF] text-black">Start Deploying</Link></Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
