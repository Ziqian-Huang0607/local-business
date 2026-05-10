import { useScrollReveal } from '@/hooks/useScrollReveal';

const STEPS = [
  {
    num: '01',
    title: 'Reservá',
    description: 'Elegí fecha y horario. Te confirmamos en minutos.',
  },
  {
    num: '02',
    title: 'Llegá',
    description: 'Te recibimos con una copa de champagne de bienvenida.',
  },
  {
    num: '03',
    title: 'Disfrutá',
    description: 'Dejate llevar por nuestros sabores y atención personalizada.',
  },
  {
    num: '04',
    title: 'Recordá',
    description: 'Llevate un recuerdo dulce y ganas de volver.',
  },
];

export default function Experience() {
  useScrollReveal();

  return (
    <section
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
            TU EXPERIENCIA
          </p>
          <h2
            className="font-display text-display-lg"
            style={{ color: 'var(--color-text)' }}
          >
            Cómo Funciona
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line - desktop */}
          <div
            className="hidden md:block absolute top-[30px] left-0 w-full h-[1px]"
            style={{ backgroundColor: 'var(--color-border)' }}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className="reveal relative flex flex-row md:flex-col items-start md:items-center gap-4 md:text-center"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Step number */}
                <div
                  className="relative flex-shrink-0 w-[60px] h-[60px] flex items-center justify-center font-mono text-xl font-normal"
                  style={{
                    color: 'var(--color-accent)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-bg)',
                    zIndex: 2,
                  }}
                >
                  {step.num}
                  {/* Amber dot on line */}
                  <div
                    className="hidden md:block absolute top-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full"
                    style={{
                      backgroundColor: 'var(--color-accent)',
                      left: '50%',
                      marginLeft: '-3px',
                      marginTop: '-3px',
                    }}
                  />
                </div>

                <div className="flex-1 md:mt-6">
                  <h3
                    className="font-display text-h3 mb-2"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="font-body text-sm"
                    style={{
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.7,
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
