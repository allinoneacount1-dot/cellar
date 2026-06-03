'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Home',        href: '/' },
  { label: 'Technology',  href: '/technology' },
  { label: 'Infrastructure', href: '/infrastructure' },
  { label: 'Ecosystem',   href: '/ecosystem' },
  { label: 'Vision',      href: '/vision' },
  { label: 'Dashboard',   href: '/dashboard' },
  { label: 'Contact',     href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'glass-strong shadow-[0_4px_60px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00F5FF] to-[#6D28FF] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-shadow duration-500">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" fill="rgba(0,0,0,0.8)"/>
                <circle cx="8" cy="8" r="3" fill="#00F5FF"/>
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight font-[family-name:var(--font-display)]">
              CELLAR
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.08, duration: 0.5 }}
              >
                <Link
                  href={item.href}
                  className="text-sm text-[#A1A1AA] hover:text-white transition-colors duration-300 tracking-wide"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="hidden md:block"
          >
            <Link
              href="/technology"
              className="magnetic-btn px-6 py-2.5 rounded-full text-sm font-medium text-black bg-gradient-to-r from-[#00F5FF] to-[#6D28FF] hover:shadow-[0_0_30px_rgba(0,245,255,0.3)] transition-all duration-300"
            >
              Access CELLAR
            </Link>
          </motion.div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`}/>
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`}/>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-bold text-white hover:text-[#00F5FF] transition-colors font-[family-name:var(--font-display)]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/technology"
              onClick={() => setMobileOpen(false)}
              className="mt-4 px-8 py-3 rounded-full text-sm font-medium text-black bg-gradient-to-r from-[#00F5FF] to-[#6D28FF]"
            >
              Access CELLAR
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
