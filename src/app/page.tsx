'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue } from 'framer-motion';
import CellarCore from '@/components/CellarCore';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ═══════════════════════════════════════════
   Section wrapper with scroll reveal
   ═══════════════════════════════════════════ */
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Magnetic Button
   ═══════════════════════════════════════════ */
function MagneticButton({ children, href, variant = 'primary' }: { children: React.ReactNode; href: string; variant?: 'primary' | 'ghost' }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.15);
    y.set((e.clientY - cy) * 0.15);
  };

  const handleLeave = () => { x.set(0); y.set(0); };

  const base = variant === 'primary'
    ? 'bg-gradient-to-r from-[#00F5FF] to-[#6D28FF] text-black'
    : 'border border-[rgba(255,255,255,0.15)] text-white hover:border-[#00F5FF]/40';

  return (
    <Link href={href} className="inline-block">
      <motion.div
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className={`magnetic-btn px-8 py-4 rounded-full text-sm font-semibold tracking-wide cursor-pointer transition-all duration-300 ${base}`}
      >
        {children}
      </motion.div>
    </Link>
  );
}

/* ═══════════════════════════════════════════
   Glass Card (Bento)
   ═══════════════════════════════════════════ */
function BentoCard({ title, desc, icon, className = '', delay = 0 }: { title: string; desc: string; icon: string; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className={`glass-card p-8 md:p-10 flex flex-col justify-between group cursor-pointer ${className}`}
    >
      <div>
        <span className="text-3xl mb-4 block">{icon}</span>
        <h3 className="text-xl md:text-2xl font-bold mb-3 font-[family-name:var(--font-display)] tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-[#A1A1AA] leading-relaxed">{desc}</p>
      </div>
      <div className="mt-6 flex items-center gap-2 text-xs text-[#555] group-hover:text-[#00F5FF] transition-colors duration-300">
        <span>Explore</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-1 transition-transform">
          <path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Scroll Progress Bar
   ═══════════════════════════════════════════ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00F5FF] via-[#6D28FF] to-[#00F5FF] z-[60] origin-left"
    />
  );
}

/* ═══════════════════════════════════════════
   Particle Field (Canvas)
   ═══════════════════════════════════════════ */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.05,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,245,255,${p.opacity})`;
        ctx.fill();

        // Connect nearby
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,245,255,${0.04 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[2]" />;
}

/* ═══════════════════════════════════════════
   Aurora Background
   ═══════════════════════════════════════════ */
function AuroraBG() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse,rgba(0,245,255,0.04)_0%,transparent_70%)] animate-aurora" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(ellipse,rgba(109,40,255,0.04)_0%,transparent_70%)] animate-aurora" style={{ animationDelay: '4s' }} />
      <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] rounded-full bg-[radial-gradient(ellipse,rgba(0,245,255,0.02)_0%,transparent_70%)] animate-aurora" style={{ animationDelay: '2s' }} />
    </div>
  );
}

/* ═══════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Volumetric orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[10%] w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(0,245,255,0.06)_0%,transparent_70%)] blur-3xl animate-float" />
        <div className="absolute bottom-[20%] right-[10%] w-48 h-48 rounded-full bg-[radial-gradient(circle,rgba(109,40,255,0.06)_0%,transparent_70%)] blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(0,245,255,0.15)] text-xs text-[#00F5FF] tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse" />
            Autonomous Intelligence
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="text-[clamp(56px,10vw,140px)] font-black tracking-[-0.04em] leading-[0.9] mb-6 font-[family-name:var(--font-display)]"
        >
          <span className="block text-white">CELLAR</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-xl text-[#A1A1AA] max-w-2xl mx-auto mb-4 font-light"
        >
          Intelligence Beneath The Surface
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-sm text-[#555] max-w-lg mx-auto mb-10"
        >
          Building intelligent systems for the future. Hidden. Precise. Unstoppable.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton href="/technology">Enter The Vault</MagneticButton>
          <MagneticButton href="/ecosystem" variant="ghost">Explore Ecosystem</MagneticButton>
        </motion.div>
      </motion.div>

      {/* 3D Core */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 1.5, ease: [0.23, 1, 0.32, 1] }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 w-full max-w-2xl z-0"
      >
        <CellarCore />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-[#555] uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-[#00F5FF]/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SCENE 1 — Manifesto
   ═══════════════════════════════════════════ */
function ManifestoSection() {
  return (
    <section className="section-pad relative">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <span className="text-xs text-[#00F5FF] uppercase tracking-[0.3em] mb-6 block">The Philosophy</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-[clamp(32px,5vw,64px)] font-black tracking-[-0.03em] leading-[1.05] mb-8 font-[family-name:var(--font-display)]">
            Everything valuable<br />
            <span className="text-[#A1A1AA]">is hidden.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-lg text-[#A1A1AA] leading-relaxed max-w-2xl mx-auto mb-4">
            Everything powerful is invisible. CELLAR operates beneath the surface — 
            a distributed intelligence network that controls the future from the shadows.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="text-sm text-[#555] max-w-xl mx-auto">
            Not a startup. Not a protocol. An operating system for autonomous intelligence.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SCENE 2 — Bento Grid (Capabilities)
   ═══════════════════════════════════════════ */
function BentoSection() {
  return (
    <section className="section-pad relative">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-xs text-[#00F5FF] uppercase tracking-[0.3em] mb-4 block">Capabilities</span>
            <h2 className="text-[clamp(28px,4vw,48px)] font-black tracking-[-0.03em] font-[family-name:var(--font-display)]">
              Intelligence Layer
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <BentoCard
            title="Neural Intelligence"
            desc="Self-learning systems that adapt, evolve, and optimize without human intervention. The core of CELLAR's cognitive engine."
            icon="🧠"
            delay={0}
          />
          <BentoCard
            title="Infrastructure"
            desc="Distributed compute network spanning global nodes. Zero-latency execution with military-grade reliability."
            icon="⚡"
            delay={0.1}
          />
          <BentoCard
            title="Security"
            desc="Quantum-resistant encryption, zero-knowledge proofs, and autonomous threat detection. Invisible protection."
            icon="🛡️"
            delay={0.2}
          />
          <BentoCard
            title="Automation"
            desc="Autonomous agents executing complex workflows 24/7. From data analysis to decision-making at machine speed."
            icon="⚙️"
            delay={0.3}
          />
          <BentoCard
            title="Global Network"
            desc="A living ecosystem of interconnected intelligence nodes. Every connection strengthens the whole."
            icon="🌐"
            delay={0.4}
            className="md:col-span-2"
          />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SCENE 3 — Architecture
   ═══════════════════════════════════════════ */
function ArchitectureSection() {
  const features = [
    { num: '01', title: 'Cognitive Core', desc: 'Multi-modal AI processing engine capable of reasoning, planning, and executing complex tasks autonomously.' },
    { num: '02', title: 'Neural Mesh', desc: 'Decentralized communication layer enabling seamless coordination between distributed intelligence nodes.' },
    { num: '03', title: 'Execution Layer', desc: 'High-performance runtime for deploying and managing autonomous agents across the network.' },
    { num: '04', title: 'Vault Protocol', desc: 'Secure data isolation and privacy-preserving computation. Your intelligence stays yours.' },
  ];

  return (
    <section className="section-pad relative">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-center mb-20">
            <span className="text-xs text-[#6D28FF] uppercase tracking-[0.3em] mb-4 block">Architecture</span>
            <h2 className="text-[clamp(28px,4vw,48px)] font-black tracking-[-0.03em] font-[family-name:var(--font-display)]">
              Built Different
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <Reveal key={f.num} delay={i * 0.1}>
              <div className="glass-card p-8 md:p-10 group">
                <span className="text-xs text-[#00F5FF] font-mono mb-4 block">{f.num}</span>
                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-display)] group-hover:text-[#00F5FF] transition-colors duration-300">
                  {f.title}
                </h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SCENE 4 — Stats / Data Viz
   ═══════════════════════════════════════════ */
function StatsSection() {
  const stats = [
    { value: '99.97%', label: 'Uptime', suffix: '' },
    { value: '<2ms', label: 'Latency', suffix: '' },
    { value: '24/7', label: 'Autonomous', suffix: '' },
    { value: '∞', label: 'Scalability', suffix: '' },
  ];

  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="text-center glass-card py-10 px-4">
                <div className="text-[clamp(28px,4vw,48px)] font-black text-[#00F5FF] font-[family-name:var(--font-display)] mb-2">
                  {s.value}
                </div>
                <div className="text-xs text-[#A1A1AA] uppercase tracking-widest">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SCENE 5 — Network Visualization
   ═══════════════════════════════════════════ */
function NetworkSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    interface Node { x: number; y: number; vx: number; vy: number; radius: number; pulse: number; }
    const nodes: Node[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    for (let i = 0; i < 30; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const draw = () => {
      const cw = canvas.offsetWidth;
      const ch = canvas.offsetHeight;
      ctx.clearRect(0, 0, cw, ch);

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.02;
        if (n.x < 0 || n.x > cw) n.vx *= -1;
        if (n.y < 0 || n.y > ch) n.vy *= -1;
      });

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const alpha = 0.06 * (1 - dist / 150);
            ctx.strokeStyle = `rgba(0,245,255,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Nodes
      nodes.forEach((n) => {
        const r = n.radius + Math.sin(n.pulse) * 0.5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,245,255,${0.3 + Math.sin(n.pulse) * 0.15})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section className="section-pad relative">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-center mb-12">
            <span className="text-xs text-[#00F5FF] uppercase tracking-[0.3em] mb-4 block">Network</span>
            <h2 className="text-[clamp(28px,4vw,48px)] font-black tracking-[-0.03em] font-[family-name:var(--font-display)]">
              Distributed Intelligence
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)]">
            <canvas ref={canvasRef} className="w-full h-full" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-6xl md:text-8xl font-black text-white/5 font-[family-name:var(--font-display)]">CELLAR</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SCENE 6 — Vision (Massive Typography)
   ═══════════════════════════════════════════ */
function VisionSection() {
  return (
    <section className="py-32 md:py-48 relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <Reveal>
          <span className="text-xs text-[#6D28FF] uppercase tracking-[0.3em] mb-8 block">The Future</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-[clamp(40px,8vw,120px)] font-black tracking-[-0.05em] leading-[0.9] mb-8 font-[family-name:var(--font-display)]">
            <span className="block text-white">The future is</span>
            <span className="block bg-gradient-to-r from-[#00F5FF] via-[#6D28FF] to-[#00F5FF] bg-clip-text text-transparent animate-aurora">
              invisible.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-lg text-[#A1A1AA] max-w-xl mx-auto leading-relaxed">
            We are building the intelligence layer of the internet. 
            Silent. Omnipresent. Unstoppable.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SCENE 7 — Final CTA
   ═══════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="py-32 md:py-40 relative">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <div className="glass-card p-12 md:p-20 glow-neural">
            <span className="text-xs text-[#00F5FF] uppercase tracking-[0.3em] mb-6 block">Access</span>
            <h2 className="text-[clamp(32px,5vw,64px)] font-black tracking-[-0.03em] leading-[1.05] mb-6 font-[family-name:var(--font-display)]">
              ACCESS THE<br />CELLAR
            </h2>
            <p className="text-[#A1A1AA] max-w-md mx-auto mb-10">
              Become part of the future. Join the network that operates beneath the surface.
            </p>
            <MagneticButton href="/contact">Get Started</MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   HOME PAGE — ASSEMBLY
   ═══════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <AuroraBG />
      <ParticleField />
      <Navbar />
      <main>
        <HeroSection />
        <ManifestoSection />
        <BentoSection />
        <ArchitectureSection />
        <StatsSection />
        <NetworkSection />
        <VisionSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
