import { Instagram, Facebook, Twitter } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Reservas', href: '#reservas' },
];

const SOCIAL_LINKS = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-bg-hero)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="container-main py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <a
              href="#inicio"
              className="font-display text-xl font-bold"
              style={{ color: 'var(--color-text)' }}
            >
              La Estancia
            </a>
            <p
              className="font-body text-sm mt-3"
              style={{ color: 'var(--color-text-dim)' }}
            >
              Parrilla argentina desde 1998
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-label mb-4"
              style={{ color: 'var(--color-text-dim)' }}
            >
              NAVEGACIÓN
            </h4>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-sm transition-colors duration-200 hover:text-[var(--color-accent)]"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-label mb-4"
              style={{ color: 'var(--color-text-dim)' }}
            >
              CONTACTO
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li
                className="font-body text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Av. del Libertador 2450
                <br />
                Palermo, Buenos Aires
              </li>
              <li
                className="font-body text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                +54 11 4567-8900
              </li>
              <li
                className="font-body text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                reservas@laestancia.com.ar
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4
              className="text-label mb-4"
              style={{ color: 'var(--color-text-dim)' }}
            >
              HORARIOS
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li
                className="font-body text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Lunes – Domingo
              </li>
              <li
                className="font-body text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                12:00 – 23:00
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="container-main py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        <p
          className="text-caption"
          style={{ color: 'var(--color-text-dim)' }}
        >
          © 2025 La Estancia. Todos los derechos reservados.
        </p>

        <div className="flex items-center gap-5">
          {SOCIAL_LINKS.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="transition-colors duration-200 hover:text-[var(--color-accent)]"
                style={{ color: 'var(--color-text-dim)' }}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
