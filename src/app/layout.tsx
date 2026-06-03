import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const bodyFont = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata = {
  title: 'CELLAR — Intelligence Beneath The Surface',
  description: 'Building intelligent systems for the future.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${bodyFont.variable} dark`}>
      <body>{children}</body>
    </html>
  );
}
