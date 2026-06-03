'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const FOOTER_LINKS = [
  { title: 'Platform', links: ['Technology', 'Infrastructure', 'Ecosystem'] },
  { title: 'Company', links: ['Vision', 'Contact', 'Careers'] },
  { title: 'Resources', links: ['Documentation', 'API', 'Status'] },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-[rgba(255,255,255,0.04)] bg-[#030303]">
      {/* Gradient top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F5FF]/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00F5FF] to-[#6D28FF] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" fill="rgba(0,0,0,0.8)"/>
                  <circle cx="8" cy="8" r="3" fill="#00F5FF"/>
                </svg>
              </div>
              <span className="text-lg font-bold font-[family-name:var(--font-display)]">CELLAR</span>
            </div>
            <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-xs">
              Intelligence Beneath The Surface. Building the future of autonomous AI systems.
            </p>
          </motion.div>

          {/* Links */}
          {FOOTER_LINKS.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: gi * 0.1 }}
            >
              <h4 className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-widest mb-4">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link}>
                    <span className="text-sm text-[#555] hover:text-[#00F5FF] transition-colors duration-300 cursor-pointer">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-[rgba(255,255,255,0.04)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#555]">
            © {new Date().getFullYear()} CELLAR. Made for the future.
          </p>
          <div className="flex items-center gap-6">
            {['X', 'GitHub', 'Discord'].map((s) => (
              <span key={s} className="text-xs text-[#555] hover:text-[#00F5FF] transition-colors cursor-pointer">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
