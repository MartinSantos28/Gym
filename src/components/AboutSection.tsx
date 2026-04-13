import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Award, Users, Target, Heart, Sparkles, Gem, Crown } from 'lucide-react';
import yearsOfExp from '../assets/YearsOfExp.png';

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const features = [
    {
      icon: Award,
      title: "15 Años de Excelencia",
      description: "Pioneros en fitness de lujo con instalaciones que definen estándares globales.",
      gradient: "from-gray-200 to-gray-400"
    },
    {
      icon: Users,
      title: "Comunidad Exclusiva",
      description: "Una selecta familia de 1,200 miembros que comparten la pasión por la excelencia.",
      gradient: "from-gray-300 to-gray-500"
    },
    {
      icon: Target,
      title: "Resultados Garantizados",
      description: "Metodologías científicas y programas personalizados con 98% de éxito comprobado.",
      gradient: "from-slate-200 to-slate-400"
    },
    {
      icon: Heart,
      title: "Transformación Integral",
      description: "No solo esculpimos cuerpos, creamos versiones superiores de ti mismo.",
      gradient: "from-slate-300 to-slate-500"
    }
  ];

  const luxuryFeatures = [
    "Equipos Cybex de última generación",
    "Entrenadores con certificaciones internacionales",
    "Consultorio fisico y centro de recuperación exclusivo",
    "Nutricionistas especialistas en nutricion deportiva",
    "Area de espejos para selfie y videos",
    "Tratamientos especializados para la recuperación"
  ];

  return (
    <section
      ref={containerRef}
      id="nosotros"
      className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gray-400/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 min-w-0"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center space-x-2 glass-dark rounded-full px-6 py-3 mb-8 border border-primary/30"
          >
            <Gem className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-white tracking-wider">SOBRE NOSOTROS</span>
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight px-1">
            Redefiniendo el
            <span className="block text-gradient"> Fitness de Lujo</span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="text-base sm:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed px-1"
          >
            En Trinity Gym hemos sido la cúspide de la excelencia en fitness.
            No somos solo un gimnasio, somos la manifestación física de tus ambiciones más elevadas.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="space-y-8">
              <div className="glass-dark rounded-3xl p-5 sm:p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Crown className="mr-3 text-primary" />
                  La Experiencia Trinity
                </h3>
                <p className="text-lg text-white/80 leading-relaxed mb-6">
                  Nuestras instalaciones representan la convergencia perfecta entre tecnología de vanguardia, 
                  diseño arquitectónico excepcional y servicios personalizados que superan las expectativas más exigentes.
                </p>

                <div className="space-y-3">
                  {luxuryFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-center space-x-3 group"
                    >
                      <div className="w-2 h-2 bg-gradient-primary rounded-full group-hover:scale-150 transition-transform" />
                      <span className="text-white/90 group-hover:text-white transition-colors">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Premium Stats */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="glass-dark rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="text-3xl font-black text-gradient mb-2">500m²</div>
                  <div className="text-sm text-white/70 font-medium">Instalaciones Premium</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, rotateY: -5 }}
                  className="glass-dark rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="text-3xl font-black text-gradient mb-2">98%</div>
                  <div className="text-sm text-white/70 font-medium">Satisfacción Cliente</div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Visual Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative"
          >
            <motion.div
              style={{ y }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl">
                <ImageWithFallback
                  src={yearsOfExp}
                  alt="Interior de APEX Elite Fitness"
                  className="w-full h-64 sm:h-96 lg:h-[600px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Floating Stats */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.2 }}
                  className="absolute top-6 right-6 glass-dark rounded-2xl p-4 border border-white/20"
                >
                  <div className="text-2xl font-bold text-primary text-white">15+</div>
                  <div className="text-xs text-white/80">Años de Excelencia</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.4 }}
                  className="absolute bottom-6 left-6 glass-dark rounded-2xl p-4 border border-white/20"
                >
                  <div className="text-2xl font-bold text-primary">1.2K+</div>
                  <div className="text-xs text-white/80">Miembros Elite</div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8 mt-12 sm:mt-16 lg:mt-20"
        >
          {features.map((feature, index) => {
            const FeatureIcon = feature.icon;
            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
              whileHover={{
                y: -10,
                rotateX: 5,
                rotateY: 5,
                scale: 1.02
              }}
              className="glass-dark rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-primary/30 transition-all duration-500 group hover-glow"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:shadow-lg group-hover:shadow-primary/20`}
              >
                <FeatureIcon className="w-8 h-8 text-white" />
              </motion.div>

              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>

              <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
                {feature.description}
              </p>

              {/* Hover effect overlay */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 0.1 }}
                className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient}`}
              />
            </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}