import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Check, Star, Crown, Gem, Sparkles, Zap } from 'lucide-react';

export function MembershipSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const plans = [
    {
      name: "Estudiantes",
      price: "249",
      period: "mes",
      description: "Membresía especial para estudiantes",
      features: [
        "Acceso completo al área de entrenamiento",
        "Zona cardio equipada para uso diario",
        "Duchas funcionales con servicios básicos",
        "Horario flexible adaptado a estudiantes",
        "Área de descanso y estudio",
        "WiFi disponible en toda la instalación"
      ],
      buttonText: "Comenzar Transformación",
      popular: false,
      gradient: "from-black-200 to-gray-400",
      bgGradient: "from-gray-500/10 to-gray-700/10"
    },
    {
      name: "Profesionales",
      price: "449",
      period: "mes",
      description: "Membresía mensual con recuperación y entrenamiento personal",
      features: [
        "Incluye sesiones de fisioterapia y recuperación",
        "Acceso 24/7 con seguridad privada",
        "Gimnasio completo con equipo de última generación",
        "Clases grupales ilimitadas con instructores certificados",
        "3 sesiones mensuales de entrenamiento personal",
        "Acceso a zona de rehabilitación física especializada",
        "Consulta fisioterapéutica personalizada mensual",
        "Área VIP exclusiva con zona de descanso y recuperación",
        "Invitados: 4 pases mensuales premium"
      ],
      buttonText: "Experiencia Elite",
      popular: true,
      gradient: "from-gray-300 to-gray-600",
      bgGradient: "from-gray-500/10 to-gray-700/10"
    },
    {
      name: "Mensual",
      price: "349",
      period: "mes",
      description: "Membresía mensual para profesionales",
      features: [
        "Todo lo del plan estudiantes",
        "2 sesiones de entrenamiento personal al mes",
        "Evaluación física básica",
        "Plan nutricional accesible",
        "Prioridad en reservas dentro de horario estudiantil",
        "Servicio básico de toallas",
        "Acceso a clases grupales",
        "Acceso a talleres y actividades",
        "Soporte en área de entrenamiento",
        "Invitados: 2 pases mensuales"
      ],
      buttonText: "Lujo Absoluto",
      popular: false,
      gradient: "from-black-300 to-slate-600",
      bgGradient: "from-slate-500/10 to-slate-700/10"
    }
  ];

  return (
    <section
      ref={containerRef}
      id="membresias"
      className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
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
            initial={{ scale: 0, rotate: 180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center space-x-2 glass-dark rounded-full px-6 py-3 mb-8 border border-primary/30"
          >
            <Crown className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-white tracking-wider">MEMBRESÍAS PREMIUM</span>
            <Gem className="w-5 h-5 text-primary animate-pulse" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight px-1">
            Membresías
            <span className="block text-gradient"> Extraordinarias</span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed"
          >
            Cada membresía está diseñada para ofrecer una experiencia única y personalizada.
            Desde acceso básico hasta servicios de concierge personal.
          </motion.p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 50,
                scale: 0.9,
                rotateX: -15
              }}
              animate={isInView ? {
                opacity: 1,
                y: 0,
                scale: plan.popular ? 1.05 : 1,
                rotateX: 0
              } : {}}
              transition={{
                delay: index * 0.2,
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{
                y: -10,
                scale: plan.popular ? 1.08 : 1.03,
                rotateY: 2
              }}
              className="group perspective-1000"
            >
              <Card className={`relative overflow-hidden bg-transparent border-0 h-full hover-lift ${plan.popular ? 'ring-2 ring-primary shadow-2xl shadow-primary/20' : ''
                }`}>
                {/* Premium Badge */}
                {plan.popular && (
                  <motion.div
                    initial={{ scale: 0, y: -20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 0.5, type: "spring", stiffness: 200 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
                  >
                    <div className="flex items-center space-x-2 bg-gradient-primary rounded-full px-6 py-2 shadow-lg">
                      <Star className="w-4 h-4 text-black fill-current" />
                      <span className="text-sm font-bold text-black">MÁS POPULAR</span>
                      <Sparkles className="w-4 h-4 text-black" />
                    </div>
                  </motion.div>
                )}

                {/* Background Gradient */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.05 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                  className={`absolute inset-0 bg-gradient-to-br ${plan.bgGradient} rounded-3xl`}
                />

                {/* Card Content */}
                <div className="glass-dark rounded-3xl border border-white/10 h-full relative overflow-hidden">
                  {/* Header Glow Effect */}
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${plan.gradient} blur-xl`}
                  />

                  <CardHeader className={`text-center relative z-10 ${plan.popular ? 'pt-12' : 'pt-8'}`}>
                    {/* Plan Icon */}
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="mx-auto mb-4"
                    >
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center shadow-2xl`}>
                        {index === 0 && <Zap className="w-10 h-10 text-white" />}
                        {index === 1 && <Crown className="w-10 h-10 text-white" />}
                        {index === 2 && <Gem className="w-10 h-10 text-white" />}
                      </div>
                    </motion.div>

                    <CardTitle className="text-3xl text-white mb-2">{plan.name}</CardTitle>

                    <div className="mt-4 mb-2">
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ delay: index * 0.2 + 0.8, type: "spring", stiffness: 200 }}
                        className="text-5xl font-black text-gradient"
                      >
                        ${plan.price}
                      </motion.span>
                      <span className="text-white/60">/{plan.period}</span>
                    </div>

                    <p className="text-white/80 leading-relaxed">{plan.description}</p>
                  </CardHeader>

                  <CardContent className="px-5 sm:px-8 pb-6 sm:pb-8">
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: index * 0.2 + featureIndex * 0.1 + 1 }}
                          className="flex items-start space-x-3 group/feature"
                        >
                          <motion.div
                            whileHover={{ scale: 1.3, rotate: 180 }}
                            className="flex-shrink-0 mt-0.5"
                          >
                            <Check className="h-5 w-5 text-green-400" />
                          </motion.div>
                          <span className="text-white/80 text-sm leading-relaxed group-hover/feature:text-white transition-colors">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        className={`w-full py-4 text-lg font-bold rounded-2xl transition-all duration-300 ${plan.popular
                          ? 'bg-gradient-primary hover:shadow-2xl hover:shadow-primary/40 text-black'
                          : `bg-gradient-to-r ${plan.gradient} hover:shadow-xl text-white`
                          }`}
                      >
                        {plan.buttonText}
                      </Button>
                    </motion.div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mt-12 sm:mt-20 px-1"
        >
          <div className="glass-dark rounded-3xl p-5 sm:p-8 border border-white/10 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center">
              <Crown className="mr-3 text-primary" />
              ¿Necesitas una Experiencia Completamente Personalizada?
            </h3>
            <p className="text-white/80 mb-6">
              Nuestro equipo de concierge puede crear un plan completamente customizado
              que se adapte a tus necesidades y objetivos únicos.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="border-primary/50 text-primary hover:bg-primary/10 glass"
              >
                Consultar Plan Personalizado
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}