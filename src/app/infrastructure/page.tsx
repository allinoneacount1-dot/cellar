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

const NODES = [
  { region: 'North America', status: 'Active', latency: '0.8ms', agents: '12,847' },
  { region: 'Europe', status: 'Active', latency: '1.2ms', agents: '9,234' },
  { region: 'Asia Pacific', status: 'Active', latency: '0.9ms', agents: '15,621' },
  { region: 'South America', status: 'Active', latency: '2.1ms', agents: '4,567' },
  { region: 'Africa', status: 'Deploying', latency: '—', agents: '1,203' },
  { region: 'Middle East', status: 'Active', latency: '1.8ms', agents: '3,891' },
];

const SPECS = [
  { label: 'Compute Nodes', value: '2,400+', desc: 'Globally distributed' },
  { label: 'Daily Transactions', value: '847M', desc: 'Processed autonomously' },
  { label: 'Uptime', value: '99.97%', desc: 'Last 365 days' },
  { label: 'Data Processed', value: '12.4 PB', desc: 'Per day' },
  { label: 'Active Agents', value: '47,363', desc: 'Across all regions' },
  { label: 'API Endpoints', value: '156', desc: 'REST + WebSocket' },
];

export default function InfrastructurePage() {
  return (
    <>
      <Navbar />
      <main className="pt-32">
        {/* Hero */}
        <section className="pb-20">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <Reveal>
              <span className="text-xs text-[#6D28FF] uppercase tracking-[0.3em] mb-4 block">Infrastructure</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-[clamp(40px,7vw,96px)] font-black tracking-[-0.04em] leading-[0.95] mb-6 font-[family-name:var(--font-display)]">
                Global Network
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
                A distributed compute infrastructure spanning six continents. Every node optimized for performance, security, and autonomous operation.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Specs Grid */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {SPECS.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.05}>
                  <div className="glass-card p-6 md:p-8 text-center">
                    <div className="text-[clamp(20px,3vw,32px)] font-black text-[#00F5FF] font-[family-name:var(--font-display)] mb-1">{s.value}</div>
                    <div className="text-sm font-medium text-white mb-1">{s.label}</div>
                    <div className="text-xs text-[#555]">{s.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Node Map */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-[family-name:var(--font-display)]">Network Nodes</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {NODES.map((n, i) => (
                <Reveal key={n.region} delay={i * 0.05}>
                  <div className="glass-card p-6 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white mb-1">{n.region}</div>
                      <div className="text-xs text-[#555]">{n.agents} agents · {n.latency}</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${n.status === 'Active' ? 'bg-[#00F5FF]' : 'bg-[#6D28FF] animate-pulse'}`} />
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
                Deploy Anywhere
              </h2>
              <p className="text-[#A1A1AA] mb-10">
                Access the global infrastructure and deploy your agents at the edge.
              </p>
              <Link href="/contact" className="magnetic-btn inline-block px-8 py-4 rounded-full text-sm font-semibold bg-gradient-to-r from-[#00F5FF] to-[#6D28FF] text-black">
                Start Deploying
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
