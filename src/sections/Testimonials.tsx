import { useState, useEffect } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const TESTIMONIALS = [
  {
    text: 'La mejor parrilla de Buenos Aires. La calidad de la carne es excepcional y el servicio impecable. Volveremos sin dudarlo.',
    author: 'María González',
    role: 'Cliente Regular',
  },
  {
    text: 'Un lugar increíble con una atmósfera cálida. La atención al detalle es notable en cada plato. Totalmente recomendado.',
    author: 'Carlos Martínez',
    role: 'Crítico Gastronómico',
  },
  {
    text: 'Celebramos nuestro aniversario aquí y fue perfecto. Comida excelente, vinos magníficos y un servicio de primera clase.',
    author: 'Laura Fernández',
    role: 'Cliente VIP',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  useScrollReveal();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const t = TESTIMONIALS[current];

  return (
    <section
      className="section-padding"
      style={{ backgroundColor: 'var(--color-bg-alt)' }}
    >
      <div className="container-main">
        <h2
          className="reveal font-display text-display-lg text-center mb-12"
          style={{ color: 'var(--color-text)' }}
        >
          Lo Que Dicen Nuestros Comensales
        </h2>

        <div className="reveal flex justify-center">
          <div
            className="w-full max-w-[720px] p-10 md:p-12"
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border)',
              borderRadius: 8,
            }}
          >
            <p
              className="font-display italic text-lg md:text-xl leading-relaxed"
              style={{ color: 'var(--color-text)' }}
            >
              "{t.text}"
            </p>

            <div className="mt-8">
              <p
                className="font-body text-base font-semibold"
                style={{ color: 'var(--color-text)' }}
              >
                {t.author}
              </p>
              <p
                className="text-caption mt-1"
                style={{ color: 'var(--color-text-dim)' }}
              >
                {t.role}
              </p>
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="w-3 h-3 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  i === current ? 'var(--color-accent)' : 'var(--color-text-dim)',
                transform: i === current ? 'scale(1.3)' : 'scale(1)',
              }}
              aria-label={`Testimonio ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
