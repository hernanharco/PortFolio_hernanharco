import { ArrowDown, MapPin, Heart, Code, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

const Hero = () => {
  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Greeting */}
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
              <MapPin className="w-4 h-4 mr-2" />
              Avilés, Asturias - España
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Hola, soy{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Hernan Arango
            </span>
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Desarrollador Full Stack apasionado por la tecnología, 
            el aprendizaje constante y la innovación
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            De Colombia a España, transformando 14 años de experiencia en liderazgo 
            y análisis en soluciones tecnológicas innovadoras. Mi familia es mi motor, 
            la tecnología mi pasión, y el emprendimiento mi camino hacia el futuro.
          </p>

          {/* Key Points */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center text-gray-700">
              <Code className="w-5 h-5 mr-2 text-blue-600" />
              <span>Python • React • MySQL</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Lightbulb className="w-5 h-5 mr-2 text-indigo-600" />
              <span>Innovación & Emprendimiento</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              <span>Familia como inspiración</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              onClick={scrollToAbout}
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            >
              Conoce mi historia
            </Button>
            <Button 
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              variant="outline" 
              size="lg" 
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
            >
              Ver mis proyectos
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <button 
              onClick={scrollToAbout}
              className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
            >
              <ArrowDown className="w-6 h-6 mx-auto" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

