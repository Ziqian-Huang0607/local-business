import { useScrollReveal } from '@/hooks/useScrollReveal';

const GALLERY_ITEMS = [
  { image: '/images/gallery-1.jpg', title: 'Bife de Chorizo', description: 'Nuestro corte estrella, grillado a la perfección', aspect: '4/3' },
  { image: '/images/gallery-2.jpg', title: 'Patagonian Lamb', description: 'Cordero patagónico con hierbas frescas', aspect: '3/4' },
  { image: '/images/gallery-3.jpg', title: 'Malbec Selection', description: 'Nuestra cava premium de vinos locales', aspect: '4/3' },
  { image: '/images/gallery-4.jpg', title: 'Parrilla Mixta', description: 'La experiencia completa de la parrilla', aspect: '1/1' },
  { image: '/images/gallery-5.jpg', title: 'Empanadas Artesanales', description: 'Hechas a mano, horneadas en el momento', aspect: '4/3' },
  { image: '/images/gallery-6.jpg', title: 'Dulce de Leche', description: 'Postre clásico argentino', aspect: '3/4' },
  { image: '/images/gallery-7.jpg', title: 'Salón Principal', description: 'Ambiente elegante y acogedor', aspect: '4/3' },
  { image: '/images/gallery-8.jpg', title: 'Patio Criollo', description: 'Cenas al aire libre con vista al jardín', aspect: '4/3' },
];

export default function Gallery() {
  useScrollReveal();

  return (
    <section
      id="galeria"
      className="section-padding"
      style={{ backgroundColor: 'var(--color-bg-alt)' }}
    >
      <div className="container-main">
        {/* Section header */}
        <div className="reveal mb-16">
          <p
            className="text-label mb-4"
            style={{ color: 'var(--color-text-dim)' }}
          >
            NUESTRA CARTA
          </p>
          <h2
            className="font-display text-display-lg"
            style={{ color: 'var(--color-text)' }}
          >
            Sabores Que Inspiran
          </h2>
          <p
            className="font-body text-body-lg mt-4 max-w-[560px]"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Un vistazo a nuestra cocina, ambiente y creaciones culinarias.
          </p>
        </div>

        {/* Masonry grid */}
        <div className="columns-1 md:columns-2 gap-5 space-y-5">
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={item.title}
              className="reveal break-inside-avoid relative overflow-hidden group cursor-pointer"
              style={{
                borderRadius: 8,
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div style={{ aspectRatio: item.aspect }}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
                }}
              >
                <h4
                  className="font-display text-lg font-semibold"
                  style={{ color: 'var(--color-text)' }}
                >
                  {item.title}
                </h4>
                <p
                  className="text-caption mt-1"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
