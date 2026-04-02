import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock, Sunrise, Sparkles } from 'lucide-react';

export function ScheduleSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  const blocks = [
    {
      label: 'Lunes a viernes',
      shortLabel: 'Lun – Vie',
      hours: '7:00 AM – 10:00 PM',
      emphasis: '15 h',
      emphasisNote: 'de sala abierta cada día',
      icon: Sunrise,
    },
    {
      label: 'Sábados',
      shortLabel: 'Sáb',
      hours: '8:00 AM – 8:00 PM',
      emphasis: '12 h',
      emphasisNote: 'para cerrar la semana fuerte',
      icon: Clock,
    },
  ];

  return (
    <section
      id="horarios"
      ref={ref}
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-black"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[420px] h-[420px] -translate-y-1/2 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[360px] h-[360px] bg-gray-500/10 rounded-full blur-[90px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 glass-dark rounded-full px-5 py-2 mb-6 sm:mb-8 border border-white/10">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold tracking-[0.2em] text-white/90 uppercase">
              Horarios
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-4 sm:mb-6 px-1">
            Tu entrenamiento,
            <span className="block text-gradient"> sin excusas de agenda</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed px-1">
            Pocas líneas, mucha claridad: amplias franjas para que encajes el gym
            antes del trabajo, después del estudio o cuando te quede un hueco real.
          </p>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-2 gap-5 lg:gap-6">
          {blocks.map((block, index) => {
            const BlockIcon = block.icon;
            return (
            <motion.div
              key={block.shortLabel}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.65,
                delay: 0.12 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 sm:p-8 lg:p-10 hover:border-primary/35 transition-colors duration-300"
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden
              />

              <div className="relative flex items-start justify-between gap-4 mb-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50 mb-2">
                    {block.label}
                  </p>
                  <p className="text-sm text-white/60">{block.emphasisNote}</p>
                </div>
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-white">
                  <BlockIcon className="h-7 w-7 text-primary" />
                </div>
              </div>

              <p className="relative text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-1 break-words">
                {block.hours}
              </p>
              <p className="relative text-sm text-white/55 mb-6">
                Misma puerta, mismo equipo: entra cuando te funcione a ti.
              </p>

              <div className="relative inline-flex items-baseline gap-2 rounded-2xl bg-black/35 px-4 py-2 border border-white/10">
                <span className="text-4xl font-black text-gradient leading-none tabular-nums">
                  {block.emphasis}
                </span>
                <span className="text-xs font-medium text-white/50 max-w-[9rem] leading-snug">
                  de gym disponibles en esa franja
                </span>
              </div>
            </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-8 sm:mt-12 text-center text-sm text-white/45 max-w-lg mx-auto px-2"
        >
          Festivos o ajustes puntuales: confirma en recepción o por WhatsApp —
          el calendario lo vives tú, nosotros lo acompañamos.
        </motion.p>
      </div>
    </section>
  );
}
