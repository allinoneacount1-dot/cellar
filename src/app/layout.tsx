'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });

export default function RootLayout({ children }: { children: ReactNode }) {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <html lang="en" className={`${display.variable} ${body.variable} dark`}>
      <head>
        <title>CELLAR — Intelligence Beneath The Surface</title>
        <meta name="description" content="Building intelligent systems for the future. CELLAR operates beneath the surface." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔮</text></svg>" />
      </head>
      <body className="noise-overlay grid-bg">
        <div ref={cursorRef} className="cursor-glow hidden md:block" />
        {children}
      </body>
    </html>
  );
}
