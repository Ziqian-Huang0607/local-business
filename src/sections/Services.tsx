import { Flame, Wine, ChefHat, Check } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const SERVICES = [
  {
    icon: Flame,
    title: 'Carnes Premium',
    description:
      'Seleccionamos las mejores carnes argentinas, maduradas y preparadas a la perfección.',
    features: ['Maduración controlada', 'Corte tradicional', 'Fuego de leña'],
    badge: 'Más elegido',
  },
  {
    icon: Wine,
    title: 'Vinos Selectos',
    description:
      'Una cava curada con los mejores vinos argentinos e internacionales.',
    features: ['Bodegas boutique', 'Sommelier experto', 'Maridaje guiado'],
  },
  {
    icon: ChefHat,
    title: 'Ambiente Único',
    description:
      'Diseño cálido y sofisticado que eleva cada cena a una experiencia memorable.',
    features: ['Iluminación cálida', 'Música ambiental', 'Atención personalizada'],
  },
];

export default function Services() {
  useScrollReveal();

  return (
    <section
      id="servicios"
      className="relative section-padding"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 dot-grid pointer-events-none"
        style={{ opacity: 0.4 }}
      />

      <div className="container-main relative" style={{ zIndex: 2 }}>
        {/* Section header */}
        <div className="reveal mb-16">
          <p
            className="text-label mb-4"
            style={{ color: 'var(--color-text-dim)' }}
          >
            NUESTRA ESPECIALIDAD
          </p>
          <h2
            className="font-display text-display-lg"
            style={{ color: 'var(--color-text)' }}
          >
            Lo Que Nos Hace Únicos
          </h2>
          <p
            className="font-body text-body-lg mt-4 max-w-[640px]"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Compromiso con la calidad, pasión por la tradición y dedicación en
            cada detalle.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="reveal relative p-8 transition-all duration-300 hover:-translate-y-0.5 group"
                style={{
                  backgroundColor: 'var(--color-bg-elevated)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 8,
                  transitionDelay: `${i * 80}ms`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212, 133, 63, 0.3)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 h-[2px]"
                  style={{
                    width: '33%',
                    backgroundColor: 'var(--color-accent)',
                    borderRadius: '8px 0 0 0',
                  }}
                />

                {/* Badge */}
                {service.badge && (
                  <span
                    className="absolute top-4 right-4 text-label px-3 py-1"
                    style={{
                      backgroundColor: 'var(--color-accent)',
                      color: 'var(--color-bg)',
                      borderRadius: 20,
                      fontSize: '0.625rem',
                    }}
                  >
                    {service.badge}
                  </span>
                )}

                <Icon
                  size={28}
                  style={{
                    color: 'var(--color-accent)',
                    marginBottom: 20,
                  }}
                />

                <h3
                  className="font-display text-h3 mb-3"
                  style={{ color: 'var(--color-text)' }}
                >
                  {service.title}
                </h3>

                <p
                  className="font-body text-sm mb-5"
                  style={{
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.7,
                  }}
                >
                  {service.description}
                </p>

                <ul className="flex flex-col gap-2">
                  {service.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-caption"
                      style={{ color: 'var(--color-text-dim)' }}
                    >
                      <Check
                        size={14}
                        style={{ color: 'var(--color-accent)' }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
