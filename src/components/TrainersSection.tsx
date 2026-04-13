import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Instagram, Linkedin, Award, Sparkles } from 'lucide-react';
import profileJoselin from '../assets/ProfileJoselin.png';

const badgeSecondaryDark =
  'border-white/15 bg-white/10 text-white/90 hover:bg-white/15';
const badgeOutlineDark =
  'border-white/20 bg-transparent text-white/75 hover:bg-white/5 hover:text-white';

/** Encuadre de foto con object-cover: prioriza la parte superior del retrato (cabeza). */
const defaultPhotoObject = 'object-[50%_32%]';

export function TrainersSection() {
  const trainers = [
    {
      name: 'Joselin Gomez',
      title: 'Director de Fitness',
      specialties: ['Entrenamiento de Fuerza', 'Powerlifting', 'Rehabilitación'],
      experience: '12 años',
      certifications: ['NSCA-CPT', 'ACSM', 'FMS'],
      image: profileJoselin,
      /** Foto tipo retrato: anclar arriba para no recortar la cabeza */
      imageObject: 'object-top',
      bio: 'Especialista en transformaciones corporales y recuperación de lesiones deportivas.',
    },
    {
      name: 'Xochitl Perez',
      title: 'Entrenadora de Yoga & Pilates',
      specialties: ['Hatha Yoga', 'Pilates', 'Flexibilidad'],
      experience: '8 años',
      certifications: ['RYT-500', 'BASI Pilates', 'TRX'],
      image:
        'https://images.unsplash.com/photo-1594824797443-d0c14e9c7f5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Experta en conexión mente-cuerpo y técnicas de relajación profunda.',
    },
    {
      name: 'Yair Trinidad',
      title: 'Especialista en HIIT',
      specialties: ['HIIT', 'CrossFit', 'Preparación Atlética'],
      experience: '10 años',
      certifications: ['CrossFit L2', 'NASM-PES', 'FMS'],
      image:
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Entrenador de atletas profesionales y especialista en rendimiento deportivo.',
    },
    /* Más perfiles (descomentar al añadir fotos/datos):
    {
      name: 'Sofia Castillo',
      title: 'Nutricionista Deportiva',
      specialties: ['Nutrición Deportiva', 'Pérdida de Peso', 'Planes Alimentarios'],
      experience: '7 años',
      certifications: ['Licenciada en Nutrición', 'ISSN', 'Precision Nutrition'],
      image:
        'https://images.unsplash.com/photo-1594824817353-dc3f17b2ac5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Especialista en planes nutricionales personalizados para objetivos específicos.',
    },
    {
      name: 'David Herrera',
      title: 'Entrenador de Natación',
      specialties: ['Natación', 'Aqua Fitness', 'Rehabilitación Acuática'],
      experience: '15 años',
      certifications: ['USA Swimming', 'Water Safety', 'Aqua Fitness'],
      image:
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Ex-nadador competitivo con experiencia en entrenamiento de todas las edades.',
    },
    {
      name: 'Laura Vega',
      title: 'Instructora de Danza Fitness',
      specialties: ['Zumba', 'Baile Fitness', 'Cardio Dance'],
      experience: '6 años',
      certifications: ['Zumba Gold', 'Strong by Zumba', 'Barre'],
      image:
        'https://images.unsplash.com/photo-1594824849809-c616d3c77c2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Bailarina profesional que combina diversión con resultados efectivos.',
    },
    */
  ];

  return (
    <section
      id="entrenadores"
      className="relative py-16 sm:py-24 lg:py-32 bg-black overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-16 left-1/4 w-72 h-72 bg-gray-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 min-w-0">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 glass-dark rounded-full px-5 py-2 mb-8 border border-white/10">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold tracking-[0.2em] text-white/90 uppercase">
              Equipo
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-5 leading-tight px-1">
            Nuestro{' '}
            <span className="text-gradient">equipo</span>
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
            Conoce a nuestros entrenadores certificados y especialistas en salud.
            Cada uno aporta años de experiencia y pasión por ayudarte a alcanzar tus
            objetivos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {trainers.map((trainer, index) => (
            <Card
              key={index}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-none transition-all duration-300 hover:border-primary/35 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40"
            >
              <div className="relative h-[19rem] sm:h-[23rem] w-full overflow-hidden">
                <ImageWithFallback
                  src={trainer.image}
                  alt={trainer.name}
                  className={`absolute inset-0 h-full w-full object-cover ${trainer.imageObject ?? defaultPhotoObject}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg drop-shadow-md">
                    {trainer.name}
                  </h3>
                  <p className="text-white/85 text-sm drop-shadow-sm">
                    {trainer.title}
                  </p>
                </div>
              </div>

              <CardContent className="p-5 sm:p-6 border-t border-white/5">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm font-medium text-white/85">
                      {trainer.experience} de experiencia
                    </span>
                  </div>
                  <p className="text-sm text-white/65 leading-relaxed">
                    {trainer.bio}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-white mb-2 text-sm tracking-wide">
                    Especialidades
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {trainer.specialties.map((specialty, specIndex) => (
                      <Badge
                        key={specIndex}
                        variant="secondary"
                        className={`text-xs ${badgeSecondaryDark}`}
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-white mb-2 text-sm tracking-wide">
                    Certificaciones
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {trainer.certifications.map((cert, certIndex) => (
                      <Badge
                        key={certIndex}
                        variant="outline"
                        className={`text-xs ${badgeOutlineDark}`}
                      >
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4 pt-3 border-t border-white/10">
                  <Instagram className="h-5 w-5 text-white/45 hover:text-primary cursor-pointer transition-colors" />
                  <Linkedin className="h-5 w-5 text-white/45 hover:text-primary cursor-pointer transition-colors" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
