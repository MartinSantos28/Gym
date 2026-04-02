import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { MapPin, Phone, Mail, Clock, Car, Wifi, Sparkles } from 'lucide-react';

const cardDark =
  'rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-none';

const fieldDark =
  'bg-white/5 border-white/15 text-white placeholder:text-white/40 focus-visible:border-primary/50 focus-visible:ring-primary/25';

export function ContactSection() {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Dirección',
      details: [
        'Av Tercera Sur Pte',
        'Cintalapa, Mexico',
        'C.P. 30400',
      ],
    },
    {
      icon: Phone,
      title: 'Teléfonos',
      details: [
        '(555) 123-4567',
        '(555) 987-6543',
        'WhatsApp: (555) 111-2222',
      ],
    },
    {
      icon: Mail,
      title: 'Email',
      details: [
        'info@fitzonepro.com',
        'ventas@fitzonepro.com',
        'soporte@fitzonepro.com',
      ],
    },
    {
      icon: Clock,
      title: 'Horarios',
      details: ['Lun - Vie: 7:00 AM - 10:00 PM', 'Sábado: 8:00 AM - 8:00 PM'],
    },
  ];

  const amenities = [
    { icon: Car, text: 'Estacionamiento gratuito' },
    { icon: Wifi, text: 'WiFi gratis' },
    { icon: MapPin, text: 'Fácil acceso en transporte público' },
  ];

  return (
    <section
      id="contacto"
      className="relative py-16 sm:py-24 lg:py-32 bg-black overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gray-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 min-w-0">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 glass-dark rounded-full px-5 py-2 mb-8 border border-white/10">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold tracking-[0.2em] text-white/90 uppercase">
              Contacto
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-5 leading-tight px-1">
            <span className="text-gradient">Contáctanos</span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed px-1">
            ¿Tienes preguntas? ¿Quieres una visita guiada? ¿Necesitas más
            información sobre nuestros planes? Estamos aquí para ayudarte a
            comenzar tu transformación.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 tracking-tight">
              Información de contacto
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((info, index) => (
                <Card key={index} className={cardDark}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-lg text-white font-semibold">
                      <info.icon className="h-5 w-5 text-primary mr-2 shrink-0" />
                      {info.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {info.details.map((detail, detailIndex) => (
                      <p
                        key={detailIndex}
                        className="text-white/65 text-sm mb-1 last:mb-0"
                      >
                        {detail}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mb-8">
              <h4 className="font-semibold text-white mb-4 text-sm tracking-wide">
                Servicios adicionales
              </h4>
              <div className="space-y-3">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center text-white/70">
                    <amenity.icon className="h-4 w-4 text-primary mr-3 shrink-0" />
                    <span className="text-sm">{amenity.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`${cardDark} rounded-lg h-64 flex items-center justify-center border-dashed border-white/20`}
            >
              <div className="text-center text-white/50 px-4">
                <MapPin className="h-12 w-12 mx-auto mb-2 text-primary/80" />
                <p className="text-white/70 font-medium">Mapa de ubicación</p>
                <p className="text-sm text-white/50 mt-1">
                  Av Tercera Sur Pte, Cintalapa, Mexico, 30400
                </p>
              </div>
            </div>
          </div>

          <div>
            <Card className={cardDark}>
              <CardHeader className="border-b border-white/10 pb-4">
                <CardTitle className="text-xl text-white font-bold">
                  Envíanos un mensaje
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-white/80">
                      Nombre
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Tu nombre"
                      className={fieldDark}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-white/80">
                      Apellido
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Tu apellido"
                      className={fieldDark}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className={fieldDark}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white/80">
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    className={fieldDark}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interest" className="text-white/80">
                    ¿Qué te interesa?
                  </Label>
                  <select
                    id="interest"
                    className={`w-full h-9 rounded-md border px-3 py-1 text-sm outline-none transition-[color,box-shadow] ${fieldDark} focus-visible:ring-[3px]`}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="membership">
                      Información sobre membresías
                    </option>
                    <option value="tour">Visita guiada</option>
                    <option value="personal">Entrenamiento personal</option>
                    <option value="classes">Clases grupales</option>
                    <option value="nutrition">Asesoría nutricional</option>
                    <option value="other">Otro</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white/80">
                    Mensaje
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    rows={4}
                    className={fieldDark}
                  />
                </div>

                <Button className="w-full rounded-xl h-11 font-bold bg-gradient-primary text-black hover:opacity-95 hover:shadow-lg hover:shadow-primary/25 transition-all">
                  Enviar mensaje
                </Button>

                <p className="text-xs text-white/45 text-center">
                  Te responderemos en menos de 24 horas
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
