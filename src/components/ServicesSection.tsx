import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Vite sirve archivos estáticos desde `/public` como rutas con `/`
const fuerzaSrc = '/images/FuerzaSrc.png';
const recuperacionSrc = '/images/RehabilitacionSrc.png';
const espaciosSrc = '/images/EspacioSrc.png';
const fisioTerapeutaSrc = '/images/FisioTerapeutaSrc.png';

import { 
  Dumbbell, Heart, Users, Zap, Music, Target, 
  Sparkles, Crown, Gem, Star, Flame, Shield, Coffee 
} from 'lucide-react';

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const services = [
    {
      icon: Dumbbell,
      title: "Entrenamiento de Fuerza",
      subtitle: "Forja de Titanes",
      description: "Zona exclusiva con equipos Cybex de última generación. Desarrolla fuerza sobrehumana con metodologías de atletas olímpicos.",
      image: fuerzaSrc,
      features: ["Cybex Pure Strength", "Entrenamiento Olimpico", "Análisis de rendimiento", "Coaching 1:1"],
      gradient: "from-cyan-200 via-cyan-400 to-cyan-600",
      bgGradient: "from-cyan-500/20 to-cyan-800/20",
      accentText: "text-cyan-300",
      premium: true
    },
    {
      icon: Flame,
      title: "Sala de Recuperacion",
      subtitle: "Tratamientos Especializados para la Recuperacion",
      description: "Sala de recuperacion con tratamientos especializados para la recuperacion.",
      image: recuperacionSrc,
      features: ["Hidromasaje Terapéutico", "Programas de Recuperación Acuática", "Tratamientos Especializados", "Consultorio Físico"],
      gradient: "from-emerald-200 via-emerald-400 to-emerald-600",
      bgGradient: "from-emerald-500/20 to-emerald-800/20",
      accentText: "text-emerald-300",
      premium: false
    },
    {
      icon: Coffee,
      title: "Espacios de Relax",
      subtitle: "Espacios para relajarse",
      description: "Espacios para relajarse.",
      image: espaciosSrc,
      features: ["Espacios para comer", "Espacios para consumir bebidas", "Espacios para ver deportes"],
      gradient: "from-violet-200 via-violet-400 to-indigo-600",
      bgGradient: "from-violet-500/20 to-indigo-800/20",
      accentText: "text-violet-300",
      premium: true
    },
    {
      icon: Zap,
      title: "FisioTerapeuta",
      subtitle: "FisioTerapeuta",
      description: "FisioTerapeuta",
      image: fisioTerapeutaSrc,
      features: ["FisioTerapeuta", "FisioTerapeuta", "FisioTerapeuta", "FisioTerapeuta"],
      gradient: "from-orange-200 via-amber-400 to-orange-600",
      bgGradient: "from-orange-500/20 to-amber-800/20",
      accentText: "text-orange-300",
      premium: false
    },
    {
      icon: Heart,
      title: "Aqua Luxe",
      subtitle: "Hidroterapia Premium",
      description: "Piscina infinity con vista panorámica, hidromasaje terapéutico y programas de recuperación acuática exclusivos.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      features: ["Piscina Infinity Premium", "Hidroterapia Médica", "Aqua Yoga VIP", "Recuperación Acuática"],
      gradient: "from-sky-200 via-sky-400 to-indigo-600",
      bgGradient: "from-sky-500/20 to-indigo-800/20",
      accentText: "text-sky-300",
      premium: true
    },
    {
      icon: Target,
      title: "Personal Elite",
      subtitle: "Transformación Exclusiva",
      description: "Entrenamiento personalizado 1:1 con los mejores trainers del mundo. Tu transformación, nuestra obsesión.",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      features: ["Trainer Certificado Mundial", "Plan Ultraespecializado", "Nutrición Molecular", "Seguimiento 24/7"],
      gradient: "from-amber-200 via-amber-400 to-orange-600",
      bgGradient: "from-amber-500/20 to-orange-800/20",
      accentText: "text-amber-300",
      premium: true
    }
  ];

  return (
    <section 
      ref={containerRef}
      id="servicios" 
      className="relative py-16 sm:py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <motion.div 
          style={{ y }}
          className="absolute inset-0 opacity-30"
        >
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-400/10 rounded-full blur-3xl" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 min-w-0">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center space-x-2 glass-dark rounded-full px-6 py-3 mb-8 border border-primary/30"
          >
            <Star className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-white tracking-wider">SERVICIOS PREMIUM</span>
            <Crown className="w-5 h-5 text-primary animate-pulse" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight px-1">
            Experiencias
            <span className="block text-gradient"> Extraordinarias</span>
          </h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="text-base sm:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed px-1"
          >
            Cada servicio está meticulosamente diseñado para superar expectativas. 
            Desde equipos de vanguardia hasta metodologías revolucionarias.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ 
                opacity: 0, 
                y: 50,
                rotateX: -15,
                scale: 0.9
              }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0,
                rotateX: 0,
                scale: 1
              } : {}}
              transition={{ 
                delay: index * 0.15,
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -15,
                rotateX: 5,
                rotateY: 5,
                scale: 1.02
              }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group perspective-1000"
            >
              <Card className="relative overflow-hidden bg-transparent border-0 h-full hover-lift">
                {/* Premium Badge */}


                {/* Background Image with Parallax */}
                <div className="relative h-64 mt-2 overflow-hidden rounded-t-3xl">
                  <motion.div
                    animate={{
                      scale: hoveredCard === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full"
                  >
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  
                  {/* Dynamic Gradient Overlay */}
                  <motion.div
                    animate={{
                      opacity: hoveredCard === index ? 0.95 : 0.85,
                    }}
                    className={`absolute inset-0 bg-gradient-to-t ${service.bgGradient} to-transparent`}
                  />
                  
                  {/* Floating Icon */}
                  <motion.div
                    animate={{
                      y: hoveredCard === index ? -5 : 0,
                      rotate: hoveredCard === index ? 360 : 0,
                      scale: hoveredCard === index ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                    className="absolute top-4 left-4"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center shadow-2xl`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <motion.h3 
                      animate={{
                        y: hoveredCard === index ? -5 : 0,
                      }}
                      className="inline-block text-2xl font-bold text-white mb-1 px-3 py-1 rounded-lg bg-black/35 backdrop-blur-sm text-shadow-glow"
                    >
                      {service.title}
                    </motion.h3>
                    <motion.p 
                      animate={{
                        opacity: hoveredCard === index ? 1 : 0.8,
                      }}
                      className={`inline-block mt-1 text-sm ${service.accentText} font-semibold tracking-wide px-2 py-0.5 rounded-md bg-black/30 backdrop-blur-sm`}
                    >
                      {service.subtitle}
                    </motion.p>
                  </div>
                </div>
                
                {/* Content */}
                <CardContent className="glass-dark border-t-0 rounded-b-3xl border border-white/10 p-5 sm:p-8 relative">
                  {/* Background Glow Effect */}
                  <motion.div
                    animate={{
                      opacity: hoveredCard === index ? 0.1 : 0,
                      scale: hoveredCard === index ? 1 : 0.8,
                    }}
                    className={`absolute inset-0 rounded-b-3xl bg-gradient-to-r ${service.gradient}`}
                  />
                  
                  <div className="relative z-10">
                    <motion.p 
                      animate={{
                        color: hoveredCard === index ? "#ffffff" : "rgba(255, 255, 255, 0.8)",
                      }}
                      className="text-base leading-relaxed mb-6"
                    >
                      {service.description}
                    </motion.p>
                    
                    <div className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: index * 0.15 + featureIndex * 0.1 + 0.8 }}
                          className="flex items-center space-x-3 group/feature"
                        >
                          <motion.div
                            animate={{
                              scale: hoveredCard === index ? 1.5 : 1,
                              rotate: hoveredCard === index ? 180 : 0,
                            }}
                            transition={{ delay: featureIndex * 0.1 }}
                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient}`}
                          />
                          <motion.span 
                            animate={{
                              color: hoveredCard === index ? "#ffffff" : "rgba(255, 255, 255, 0.7)",
                              x: hoveredCard === index ? 5 : 0,
                            }}
                            transition={{ delay: featureIndex * 0.05 }}
                            className="text-sm font-medium"
                          >
                            {feature}
                          </motion.span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Premium Indicator */}
                    <motion.div
                      animate={{
                        y: hoveredCard === index ? 0 : 10,
                        opacity: hoveredCard === index ? 1 : 0,
                      }}
                      className="mt-6 pt-4 border-t border-white/10"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs ${service.accentText} uppercase tracking-wider`}>
                          Experiencia Elite
                        </span>
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{
                                scale: hoveredCard === index ? [1, 1.5, 1] : 1,
                              }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <Star className={`w-3 h-3 ${service.accentText} fill-current`} />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center mt-12 sm:mt-20 px-1"
        >
          <div className="glass-dark rounded-3xl p-8 border border-white/10 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center">
              <Gem className="mr-3 text-primary" />
              ¿Listo para la Experiencia Definitiva?
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Reserva tu sesión de prueba premium y descubre por qué Trinity Fitness
              es la elección de atletas profesionales y personalidades de élite.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-primary rounded-2xl font-bold text-black hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300"
            >
              Contactanosj
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}