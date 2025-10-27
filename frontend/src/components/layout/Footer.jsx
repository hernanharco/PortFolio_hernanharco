import { Heart, Code, Coffee } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold">
                Hernan<span className="text-blue-400">AC</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Desarrollador Full Stack apasionado por crear soluciones 
              tecnológicas innovadoras que generen impacto positivo.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Sobre mí
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Proyectos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Experiencia
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-2 text-gray-400">
              <p>📍 Avilés, Asturias - España</p>
              <p>📧 hernan.harco@email.com</p>
              <p>💼 Disponible para proyectos</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-gray-400 mb-4 md:mb-0">
              <span>Hecho con</span>
              <Heart className="w-4 h-4 mx-1 text-red-500" />
              <span>y</span>
              <Code className="w-4 h-4 mx-1 text-blue-400" />
              <span>y mucho</span>
              <Coffee className="w-4 h-4 mx-1 text-yellow-600" />
            </div>
            <div className="text-gray-400 text-sm">
              © {currentYear} Hernan Arango Cortes. Todos los derechos reservados.
            </div>
          </div>
        </div>

        {/* Personal Touch */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm italic">
            "La familia es mi motor, la tecnología mi pasión, y el emprendimiento mi camino hacia el futuro"
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

