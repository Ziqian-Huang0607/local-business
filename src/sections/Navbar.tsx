import { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Reservas', href: '#reservas' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = NAV_LINKS.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0E0E0EE6] backdrop-blur-xl' : 'bg-transparent'
      }`}
      style={{ height: 72 }}
    >
      <div className="container-main flex items-center justify-between h-full">
        <a
          href="#inicio"
          className="font-display text-[22px] font-bold tracking-wide"
          style={{ color: 'var(--color-text)' }}
        >
          La Estancia
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative font-body text-sm font-normal transition-colors duration-200 hover:text-[var(--color-accent)]"
              style={{
                color:
                  activeSection === link.href.slice(1)
                    ? 'var(--color-accent)'
                    : 'var(--color-text-secondary)',
              }}
            >
              {link.label}
              <span
                className="absolute -bottom-1 left-0 h-[2px] transition-all duration-300"
                style={{
                  width: activeSection === link.href.slice(1) ? '100%' : '0%',
                  backgroundColor: 'var(--color-accent)',
                }}
              />
            </a>
          ))}
          <a
            href="#reservas"
            className="flex items-center gap-2 font-body text-sm font-medium transition-colors duration-200"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-bg)',
              borderRadius: 6,
              padding: '10px 24px',
            }}
          >
            <Phone size={14} />
            Reservar
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: 'var(--color-text)' }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden absolute top-[72px] left-0 w-full py-6 px-6 flex flex-col gap-4"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-body text-base py-2 transition-colors duration-200 hover:text-[var(--color-accent)]"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#reservas"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 font-body text-sm font-medium mt-2"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-bg)',
              borderRadius: 6,
              padding: '12px 24px',
            }}
          >
            <Phone size={14} />
            Reservar Mesa
          </a>
        </div>
      )}
    </nav>
  );
}
