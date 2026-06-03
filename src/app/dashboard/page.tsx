'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, animate } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, target, {
        duration: 2,
        ease: 'easeOut',
        onUpdate: (v) => setDisplay(Math.round(v).toLocaleString()),
      });
      return () => controls.stop();
    }
  }, [isInView, target]);

  return <span ref={ref}>{display}{suffix}</span>;
}

/* ── Mini Bar Chart ── */
function BarChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((v, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${(v / max) * 100}%` }}
          transition={{ duration: 0.8, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
          className="flex-1 rounded-t-sm bg-gradient-to-t from-[#00F5FF]/30 to-[#00F5FF]/80 min-h-[2px]"
        />
      ))}
    </div>
  );
}

/* ── Line Chart (SVG) ── */
function LineChart({ data, color = '#00F5FF' }: { data: number[]; color?: string }) {
  const w = 300;
  const h = 80;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,${h} ${points} ${w},${h}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-20" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.polygon
        points={areaPoints}
        fill={`url(#grad-${color})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      />
      <motion.polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
      />
    </svg>
  );
}

/* ── Donut Chart ── */
function DonutChart({ percentage, color = '#00F5FF', size = 80 }: { percentage: number; color?: string; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percentage / 100) * circ;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="4" />
      <motion.circle
        cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
      />
    </svg>
  );
}

const AGENTS = [
  { name: 'Alpha-7', status: 'Active', tasks: 847, cpu: 34, mem: 62 },
  { name: 'Beta-3', status: 'Active', tasks: 623, cpu: 28, mem: 45 },
  { name: 'Gamma-1', status: 'Active', tasks: 912, cpu: 56, mem: 78 },
  { name: 'Delta-9', status: 'Idle', tasks: 0, cpu: 2, mem: 12 },
  { name: 'Epsilon-4', status: 'Active', tasks: 445, cpu: 41, mem: 55 },
  { name: 'Zeta-2', status: 'Active', tasks: 778, cpu: 67, mem: 81 },
];

const WEEKLY_DATA = [42, 58, 35, 71, 89, 64, 77];
const MONTHLY_DATA = [120, 185, 240, 198, 312, 278, 356, 401, 389, 445, 512, 478];

export default function DashboardPage() {
  const [liveTime, setLiveTime] = useState('');

  useEffect(() => {
    const tick = () => setLiveTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
              <div>
                <h1 className="text-3xl md:text-4xl font-black font-[family-name:var(--font-display)] tracking-tight">
                  Command Center
                </h1>
                <p className="text-sm text-[#555] mt-1">Real-time network monitoring</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#00F5FF] animate-pulse" />
                <span className="text-xs text-[#A1A1AA] font-mono">{liveTime}</span>
                <span className="text-xs text-[#555]">LIVE</span>
              </div>
            </div>
          </Reveal>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Active Agents', value: 47363, suffix: '', color: '#00F5FF' },
              { label: 'Tasks Today', value: 847291, suffix: '', color: '#6D28FF' },
              { label: 'Avg Latency', value: 1, suffix: '.8ms', color: '#00F5FF' },
              { label: 'Uptime', value: 99, suffix: '.97%', color: '#00F5FF' },
            ].map((m, i) => (
              <Reveal key={m.label} delay={i * 0.08}>
                <div className="glass-card p-5 md:p-6">
                  <div className="text-xs text-[#555] uppercase tracking-widest mb-2">{m.label}</div>
                  <div className="text-2xl md:text-3xl font-black font-[family-name:var(--font-display)]" style={{ color: m.color }}>
                    {m.suffix.includes('.') ? (
                      <><AnimatedCounter target={m.value} />{m.suffix.replace(m.value.toString(), '')}</>
                    ) : (
                      <><AnimatedCounter target={m.value} />{m.suffix}</>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Reveal delay={0.2}>
              <div className="glass-card p-6">
                <div className="text-xs text-[#555] uppercase tracking-widest mb-4">Weekly Activity</div>
                <BarChart data={WEEKLY_DATA} />
                <div className="flex justify-between mt-2 text-[10px] text-[#555]">
                  {['M','T','W','T','F','S','S'].map(d => <span key={d}>{d}</span>)}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="glass-card p-6">
                <div className="text-xs text-[#555] uppercase tracking-widest mb-4">Network Load</div>
                <LineChart data={MONTHLY_DATA} color="#00F5FF" />
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="glass-card p-6">
                <div className="text-xs text-[#555] uppercase tracking-widest mb-4">System Health</div>
                <div className="flex items-center justify-around">
                  <div className="text-center">
                    <DonutChart percentage={87} color="#00F5FF" />
                    <div className="text-xs text-[#A1A1AA] mt-1">CPU</div>
                  </div>
                  <div className="text-center">
                    <DonutChart percentage={62} color="#6D28FF" />
                    <div className="text-xs text-[#A1A1AA] mt-1">Memory</div>
                  </div>
                  <div className="text-center">
                    <DonutChart percentage={94} color="#00F5FF" />
                    <div className="text-xs text-[#A1A1AA] mt-1">Network</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Agent Table */}
          <Reveal delay={0.3}>
            <div className="glass-card overflow-hidden">
              <div className="p-6 border-b border-[rgba(255,255,255,0.04)]">
                <h3 className="text-sm font-semibold text-white">Active Agents</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-[#555] uppercase tracking-widest">
                      <th className="text-left p-4 font-medium">Agent</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-right p-4 font-medium">Tasks</th>
                      <th className="text-right p-4 font-medium">CPU</th>
                      <th className="text-right p-4 font-medium">Memory</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AGENTS.map((a, i) => (
                      <motion.tr
                        key={a.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.05 }}
                        className="border-t border-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                      >
                        <td className="p-4 font-mono text-white">{a.name}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 text-xs ${a.status === 'Active' ? 'text-[#00F5FF]' : 'text-[#555]'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${a.status === 'Active' ? 'bg-[#00F5FF] animate-pulse' : 'bg-[#555]'}`} />
                            {a.status}
                          </span>
                        </td>
                        <td className="p-4 text-right text-[#A1A1AA] font-mono">{a.tasks.toLocaleString()}</td>
                        <td className="p-4 text-right">
                          <span className={`font-mono ${a.cpu > 60 ? 'text-[#6D28FF]' : 'text-[#A1A1AA]'}`}>{a.cpu}%</span>
                        </td>
                        <td className="p-4 text-right">
                          <span className={`font-mono ${a.mem > 75 ? 'text-[#6D28FF]' : 'text-[#A1A1AA]'}`}>{a.mem}%</span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
