import React from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'sonner';
import { useAuth } from './context/AuthContext';
import { MemberDashboard } from './components/member/MemberDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AuthModal } from './components/auth/AuthModal';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { MembershipSection } from './components/MembershipSection';
import { TrainersSection } from './components/TrainersSection';
import { ScheduleSection } from './components/ScheduleSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const { user, authModalOpen, setAuthModalOpen, authModalView } = useAuth();

  if (user) {
    return (
      <>
        {user.role === 'admin' ? <AdminDashboard /> : <MemberDashboard />}
        <Toaster theme="dark" position="top-center" richColors closeButton />
      </>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-black overflow-x-hidden"
    >
      <Header />
      <main className="relative min-w-0">
        {/* Ambient Background Effects */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gray-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gray-400/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10">
          <HeroSection />
          
          {/* Section Divider */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1 }}
            className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent max-w-4xl mx-4 sm:mx-auto"
          />
          
          <AboutSection />
          
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1 }}
            className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent max-w-4xl mx-4 sm:mx-auto"
          />
          
          <ServicesSection />
          
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1 }}
            className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent max-w-4xl mx-4 sm:mx-auto"
          />
          
          <MembershipSection />
          
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1 }}
            className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent max-w-4xl mx-4 sm:mx-auto"
          />
          
          <TrainersSection />
          
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1 }}
            className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent max-w-4xl mx-4 sm:mx-auto"
          />
          
          <ScheduleSection />
          
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1 }}
            className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent max-w-4xl mx-4 sm:mx-auto"
          />
          
          <ContactSection />
        </div>
      </main>
      <Footer />
      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        initialView={authModalView}
      />
      <Toaster theme="dark" position="top-center" richColors closeButton />
    </motion.div>
  );
}