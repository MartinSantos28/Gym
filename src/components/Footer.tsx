import { Dumbbell, Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  const quickLinks = [
    { name: "Inicio", href: "#inicio" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "Servicios", href: "#servicios" },
    { name: "Membresías", href: "#membresias" }
  ];

  const services = [
    { name: "Entrenamiento Personal", href: "#" },
    { name: "Clases Grupales", href: "#" },
    { name: "Nutrición Deportiva", href: "#" },
    { name: "Fisioterapia", href: "#" }
  ];

  const legal = [
    { name: "Términos y Condiciones", href: "#" },
    { name: "Política de Privacidad", href: "#" },
    { name: "Política de Cancelación", href: "#" },
    { name: "Reglamento Interno", href: "#" }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10 sm:py-12 min-w-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Dumbbell className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">FitZone Pro</span>
            </div>
            <p className="text-gray-300 mb-6">
              Transformamos vidas a través del fitness. Únete a nuestra comunidad y 
              descubre tu mejor versión en el mejor gimnasio de la ciudad.
            </p>
            
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                <span>Av Tercera Sur Pte, Cintalapa, Mexico, 30400</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                <span>info@fitzonepro.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-300 hover:text-primary transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <a href={service.href} className="text-gray-300 hover:text-primary transition-colors text-sm">
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 mb-6">
              {legal.map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="text-gray-300 hover:text-primary transition-colors text-sm">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-gray-300 hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 text-gray-300 hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 text-gray-300 hover:text-primary cursor-pointer transition-colors" />
              <Youtube className="h-6 w-6 text-gray-300 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © 2024 FitZone Pro. Todos los derechos reservados.
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center md:justify-end gap-2 sm:gap-x-6 sm:gap-y-1 text-gray-400 text-sm">
              <span>Horario: Lun-Vie 7:00 AM - 10:00 PM</span>
              <span>Sáb 8:00 AM - 8:00 PM</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}