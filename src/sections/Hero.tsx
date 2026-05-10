import EmberField from '@/components/EmberField';
import { Flame } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative w-full overflow-hidden"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #080706 0%, #141210 40%, #1A1816 70%, #0E0E0E 100%)',
      }}
    >
      {/* Ember particle field */}
      <EmberField />

      {/* Bottom fade mask */}
      <div
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        style={{
          height: 120,
          background: 'linear-gradient(to top, #0E0E0E, transparent)',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        className="relative flex flex-col items-center justify-center text-center px-6"
        style={{ zIndex: 3, minHeight: '100vh', paddingTop: 72 }}
      >
        <Flame
          size={20}
          style={{ color: 'var(--color-accent)', marginBottom: 20 }}
        />

        <h1
          className="font-display text-display-xl"
          style={{
            color: 'var(--color-text)',
            textShadow: '0 2px 30px rgba(0,0,0,0.5)',
          }}
        >
          Auténtica Experiencia
          <br />
          Argentina
        </h1>

        <p
          className="text-label mt-6"
          style={{
            color: 'var(--color-accent)',
            letterSpacing: '0.15em',
          }}
        >
          Parrilla • Vinos • Tradición
        </p>

        <p
          className="font-body text-body-lg mt-6 max-w-[560px]"
          style={{
            color: 'var(--color-text-secondary)',
            textShadow: '0 1px 10px rgba(0,0,0,0.5)',
          }}
        >
          Descubrí el verdadero sabor de Argentina en cada bocado. Carnes premium,
          parrilla tradicional y un ambiente inigualable te esperan.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <a
            href="#reservas"
            className="font-body text-sm font-medium transition-all duration-300 hover:brightness-110"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-bg)',
              borderRadius: 6,
              padding: '14px 32px',
            }}
          >
            Reservar Mesa
          </a>
          <a
            href="#galeria"
            className="font-body text-sm font-normal transition-all duration-300 hover:border-[var(--color-accent)]"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
              borderRadius: 6,
              padding: '14px 32px',
            }}
          >
            Ver Menú
          </a>
        </div>
      </div>
    </section>
  );
}
