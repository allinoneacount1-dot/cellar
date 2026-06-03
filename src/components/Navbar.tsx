'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const NAV = [
  { label: 'Home',          href: '/' },
  { label: 'Technology',    href: '/technology' },
  { label: 'Infrastructure', href: '/infrastructure' },
  { label: 'Ecosystem',     href: '/ecosystem' },
  { label: 'Vision',        href: '/vision' },
  { label: 'Contact',       href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-[0_2px_40px_rgba(0,0,0,0.3)]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00F5FF] to-[#6D28FF]" />
            <span className="text-sm font-bold tracking-tight">CELLAR</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV.map(n => (
              <Link key={n.href} href={n.href} className="text-[13px] text-[#A1A1AA] hover:text-white transition-colors duration-200">
                {n.label}
              </Link>
            ))}
          </div>

          <Link href="/contact" className="hidden md:block text-[13px] px-5 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] transition-all duration-200">
            Access
          </Link>

          <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Menu">
            <div className="w-5 flex flex-col gap-1">
              <span className={`block h-px bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-[3px]' : ''}`} />
              <span className={`block h-px bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-[3px]' : ''}`} />
            </div>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-6"
          >
            {NAV.map(n => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="text-xl font-semibold hover:text-[#00F5FF] transition-colors">
                {n.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
