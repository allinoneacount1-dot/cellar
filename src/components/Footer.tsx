import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] bg-[#030303]">
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-start justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#00F5FF] to-[#6D28FF]" />
            <span className="text-sm font-bold">CELLAR</span>
          </div>
          <p className="text-xs text-[#555] max-w-xs leading-relaxed">
            Intelligence Beneath The Surface.
          </p>
        </div>
        <div className="flex gap-12">
          {[
            { title: 'Platform', items: ['Technology', 'Infrastructure', 'Ecosystem'] },
            { title: 'Company', items: ['Vision', 'Contact'] },
          ].map(g => (
            <div key={g.title}>
              <h4 className="text-[10px] text-[#555] uppercase tracking-[0.2em] mb-3">{g.title}</h4>
              <ul className="space-y-2">
                {g.items.map(i => (
                  <li key={i}><span className="text-xs text-[#555] hover:text-white transition-colors cursor-pointer">{i}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/[0.04] py-6 text-center">
        <p className="text-[10px] text-[#333]">© {new Date().getFullYear()} CELLAR. Made for the future.</p>
      </div>
    </footer>
  );
}
