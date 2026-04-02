import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Play, Star, Zap, Crown, Trophy, Target } from 'lucide-react';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const smoothY = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseRafRef = useRef<number | null>(null);
  const mouseLatestRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const mql = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!mql) return;

    const update = () => setPrefersReducedMotion(!!mql.matches);
    update();

    // Windows/modern browsers support addEventListener; older fallback to addListener
    if ('addEventListener' in mql) {
      mql.addEventListener('change', update);
      return () => mql.removeEventListener('change', update);
    }
    // @ts-expect-error - legacy Safari/old implementations
    mql.addListener(update);
    // @ts-expect-error - legacy Safari/old implementations
    return () => mql.removeListener(update);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseLatestRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };

      // Throttle state updates to one per animation frame.
      if (mouseRafRef.current !== null) return;
      mouseRafRef.current = window.requestAnimationFrame(() => {
        mouseRafRef.current = null;
        setMousePosition(mouseLatestRef.current);
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (mouseRafRef.current !== null) {
        window.cancelAnimationFrame(mouseRafRef.current);
        mouseRafRef.current = null;
      }
    };
  }, [prefersReducedMotion]);

  const stats = [
    { icon: Trophy, number: "10+", label: "Años de experiencia en el rubro", delay: 0.2 },
    { icon: Crown, number: "2", label: "Fisioterapeutas Profesionales", delay: 0.4 },
    { icon: Star, number: "4", label: "Coaches Certificados", delay: 0.6 },
    { icon: Target, number: "100+", label: "Miembros Activos", delay: 0.8 }
  ];

  const floatingElements = [
    { icon: Zap, position: { top: "20%", left: "10%" }, delay: 0 },
    { icon: Star, position: { top: "60%", left: "85%" }, delay: 1 },
    { icon: Trophy, position: { top: "40%", left: "5%" }, delay: 2 },
    { icon: Crown, position: { top: "80%", left: "90%" }, delay: 1.5 }
  ];

  return (
    <section
      ref={containerRef}
      id="inicio"
      className="relative min-h-[100dvh] min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-12 md:pt-24"
    >
      {/* Background Video Effect */}
      <motion.div
        style={{ y: smoothY, scale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
          alt="Gimnasio elite"
          className="w-full h-full object-cover opacity-30"
        />

        {/* Dynamic overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>

        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(prefersReducedMotion ? 8 : 20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                ...(prefersReducedMotion
                  ? { y: 0, opacity: 0.6, scale: 1 }
                  : { y: [0, -100, 0], opacity: [0, 1, 0], scale: [0, 1, 0] }),
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: prefersReducedMotion ? 0 : Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating Elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute z-10 opacity-20"
          style={element.position}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.2,
            scale: 1,
            y: [0, -20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            delay: element.delay,
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <element.icon className="w-8 h-8 text-primary" />
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-center w-full min-w-0"
      >
        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 max-w-full glass-dark rounded-full px-4 py-2.5 sm:px-6 sm:py-3 mb-6 sm:mb-8 border border-primary/30"
        >
          <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
          <span className="text-xs sm:text-sm font-semibold text-white tracking-wide sm:tracking-wider text-center">
            MEJORANDO TU ESTILO DE VIDA
          </span>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-8xl font-black mb-3 sm:mb-4 leading-none px-0.5">
            <motion.span
              className="block text-white"
              style={{
                transform: `translate3d(${mousePosition.x * 10}px, ${mousePosition.y * 10}px, 0)`
              }}
            >
              TRINITY
            </motion.span>
            <motion.span
              className="block text-gradient text-shadow-glow"
              style={{
                transform: `translate3d(${mousePosition.x * -10}px, ${mousePosition.y * -10}px, 0)`
              }}
            >
              GYM
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-base sm:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed px-1"
          >
            Aquí entendemos que la verdadera fuerza nace del equilibrio entre cuerpo, mente y espíritu.
            Entrena en un entorno diseñado para inspirar tu mejor versión.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-stretch sm:items-center w-full max-w-lg sm:max-w-none mx-auto mb-10 sm:mb-16"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
            <Button
              size="lg"
              className="relative overflow-hidden w-full sm:w-auto px-8 py-5 sm:px-12 sm:py-6 text-base sm:text-lg font-bold bg-gradient-primary hover:shadow-2xl hover:shadow-primary/40 group"
              onClick={() => {
                window.open("https://www.facebook.com/messages/t/61586771990786/", "_blank");
              }}
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 tracking-wide text-white">Contactanos</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-8 py-5 sm:px-12 sm:py-6 text-base sm:text-lg font-semibold border-white/30 text-white hover:bg-white/10 glass group"
              onClick={() => {
                window.open("https://maps.app.goo.gl/dCaq7C7DySRob3dF8", "_blank");
              }}
            >
              <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
              <span className="tracking-wide">Visitanos</span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Premium Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: stat.delay + 1.8, duration: 0.6 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="glass-dark rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-primary/30 transition-all duration-300 group hover-glow"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{
                  duration: 20,
                  repeat: prefersReducedMotion ? 0 : Infinity,
                  ease: "linear",
                }}
                className="inline-block mb-4"
              >
                <stat.icon className="w-8 h-8 text-primary group-hover:text-gray-200 transition-colors" />
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: stat.delay + 2, type: "spring", stiffness: 200 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-black text-gradient mb-2"
              >
                {stat.number}
              </motion.div>

              <div className="text-[0.65rem] leading-snug sm:text-sm text-white/70 font-medium tracking-wide sm:tracking-wider uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-primary rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}