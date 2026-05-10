import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const CONTACT_ITEMS = [
  { icon: MapPin, text: 'Av. del Libertador 2450, Palermo, Buenos Aires' },
  { icon: Phone, text: '+54 11 4567-8900' },
  { icon: Mail, text: 'reservas@laestancia.com.ar' },
  { icon: Clock, text: 'Lun-Dom: 12:00 - 23:00' },
];

export default function Reservations() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '2',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useScrollReveal();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', phone: '', date: '', guests: '2', message: '' });
    }, 3000);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <section
      id="reservas"
      className="section-padding"
      style={{
        background: 'linear-gradient(180deg, #0E0E0E 0%, #141210 100%)',
      }}
    >
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left - Contact info */}
          <div className="reveal">
            <h2
              className="font-display text-display-lg mb-4"
              style={{ color: 'var(--color-text)' }}
            >
              Visitá La Estancia
            </h2>
            <p
              className="font-body text-body-lg mb-10"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Estamos aquí para servirte. No dudes en contactarnos para reservas
              o consultas.
            </p>

            <div className="flex flex-col gap-5">
              {CONTACT_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-center gap-4">
                    <Icon
                      size={20}
                      style={{ color: 'var(--color-accent)' }}
                    />
                    <span
                      className="font-body text-base"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right - Form */}
          <div
            className="reveal p-8 md:p-10"
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border)',
              borderRadius: 8,
              transitionDelay: '80ms',
            }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'var(--color-accent-dim)' }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3
                  className="font-display text-h3 mb-2"
                  style={{ color: 'var(--color-text)' }}
                >
                  ¡Gracias {form.name}!
                </h3>
                <p
                  className="font-body text-sm"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Tu reserva ha sido enviada. Te contactaremos pronto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label
                    className="block text-label mb-2"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    NOMBRE
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full font-body text-sm outline-none transition-colors duration-200 focus:border-[var(--color-accent)]"
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid var(--color-border)',
                      borderRadius: 4,
                      padding: '12px 16px',
                      color: 'var(--color-text)',
                    }}
                    placeholder="Tu nombre"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-label mb-2"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      EMAIL
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full font-body text-sm outline-none transition-colors duration-200 focus:border-[var(--color-accent)]"
                      style={{
                        backgroundColor: 'transparent',
                        border: '1px solid var(--color-border)',
                        borderRadius: 4,
                        padding: '12px 16px',
                        color: 'var(--color-text)',
                      }}
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-label mb-2"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      TELÉFONO
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full font-body text-sm outline-none transition-colors duration-200 focus:border-[var(--color-accent)]"
                      style={{
                        backgroundColor: 'transparent',
                        border: '1px solid var(--color-border)',
                        borderRadius: 4,
                        padding: '12px 16px',
                        color: 'var(--color-text)',
                      }}
                      placeholder="+54 11..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-label mb-2"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      FECHA
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      required
                      className="w-full font-body text-sm outline-none transition-colors duration-200 focus:border-[var(--color-accent)]"
                      style={{
                        backgroundColor: 'transparent',
                        border: '1px solid var(--color-border)',
                        borderRadius: 4,
                        padding: '12px 16px',
                        color: 'var(--color-text)',
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-label mb-2"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      COMENSALES
                    </label>
                    <select
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      className="w-full font-body text-sm outline-none transition-colors duration-200 focus:border-[var(--color-accent)]"
                      style={{
                        backgroundColor: 'transparent',
                        border: '1px solid var(--color-border)',
                        borderRadius: 4,
                        padding: '12px 16px',
                        color: 'var(--color-text)',
                      }}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option
                          key={n}
                          value={n}
                          style={{
                            backgroundColor: 'var(--color-bg-elevated)',
                            color: 'var(--color-text)',
                          }}
                        >
                          {n} {n === 1 ? 'persona' : 'personas'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-label mb-2"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    MENSAJE
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full font-body text-sm outline-none transition-colors duration-200 resize-y focus:border-[var(--color-accent)]"
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid var(--color-border)',
                      borderRadius: 4,
                      padding: '12px 16px',
                      color: 'var(--color-text)',
                      minHeight: 100,
                    }}
                    placeholder="Alguna preferencia o consulta especial..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full font-body text-sm font-medium py-3.5 transition-all duration-300 hover:brightness-110"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-bg)',
                    borderRadius: 6,
                  }}
                >
                  Reservar Mesa
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
