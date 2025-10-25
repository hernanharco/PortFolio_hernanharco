import { Heart, Home, Star, Target, Compass, Users } from 'lucide-react';

const Family = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Amor Incondicional",
      description: "Mi familia es el centro de todo lo que hago. Cada decisión, cada proyecto, cada meta está inspirada en el amor y el compromiso hacia ellos.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Motivación Constante",
      description: "Cada desafío profesional se convierte en una oportunidad de crecimiento cuando tienes una familia que te apoya y en la que confías.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Inspiración Diaria",
      description: "Ver crecer a mi familia, sus logros y sueños, me impulsa a ser mejor cada día y a buscar siempre la excelencia en todo lo que emprendo.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Compass className="w-8 h-8" />,
      title: "Guía de Valores",
      description: "Los valores familiares son mi brújula moral: honestidad, trabajo duro, perseverancia y la importancia de ayudar a otros a crecer.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const familyMilestones = [
    {
      title: "El Gran Salto",
      description: "La decisión de mudarnos de Colombia a España fue tomada en familia, buscando nuevas oportunidades y un mejor futuro para todos.",
      icon: "✈️"
    },
    {
      title: "Apoyo Incondicional",
      description: "Durante mi transición profesional hacia el desarrollo de software, mi familia fue mi mayor soporte y motivación.",
      icon: "💪"
    },
    {
      title: "Crecimiento Conjunto",
      description: "Cada proyecto que desarrollo tiene un propósito: crear un futuro más próspero y estable para mi familia.",
      icon: "🌱"
    },
    {
      title: "Legado de Valores",
      description: "Trabajo para ser un ejemplo de perseverancia, dedicación y amor por el aprendizaje para las futuras generaciones.",
      icon: "🏆"
    }
  ];

  return (
    <section id="family" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
            <Heart className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Familia & Valores
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            El corazón de todo lo que hago. Mi familia no solo es mi inspiración, 
            sino también mi razón de ser y la fuerza que impulsa cada uno de mis proyectos
          </p>
        </div>

        {/* Hero Quote */}
        <div className="text-center mb-16">
          <blockquote className="text-2xl md:text-3xl font-light text-gray-800 italic mb-6">
            "La familia no es algo importante, lo es todo"
          </blockquote>
          <p className="text-gray-600">
            Esta frase resume perfectamente mi filosofía de vida y trabajo
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${value.color} rounded-xl mb-6 text-white`}>
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {value.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Family Journey */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Nuestro Viaje Familiar
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cada hito en nuestro camino familiar ha sido una oportunidad de 
              crecimiento, aprendizaje y fortalecimiento de nuestros lazos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {familyMilestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="text-3xl">{milestone.icon}</div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {milestone.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact on Work */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-6">
              Cómo la Familia Impulsa mi Trabajo
            </h3>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div>
                <h4 className="text-lg font-semibold mb-3">
                  🎯 Propósito Claro
                </h4>
                <p className="text-white/90 text-sm">
                  Cada línea de código que escribo tiene un propósito: 
                  crear un futuro mejor y más estable para mi familia.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">
                  ⚡ Energía Renovada
                </h4>
                <p className="text-white/90 text-sm">
                  El amor familiar me da la energía necesaria para 
                  enfrentar cualquier desafío técnico o profesional.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">
                  🌟 Excelencia Personal
                </h4>
                <p className="text-white/90 text-sm">
                  Quiero ser el mejor ejemplo posible para mi familia, 
                  lo que me impulsa a la excelencia en todo lo que hago.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Message */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Un Mensaje Personal
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                Si hay algo que he aprendido en este viaje de Colombia a España, 
                de analista a desarrollador, es que el éxito profesional sin 
                familia no tiene sentido. Cada proyecto que emprendo, cada 
                tecnología que aprendo, cada meta que me propongo, está 
                profundamente conectada con mi deseo de ser mejor padre, 
                mejor esposo y mejor persona.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                Mi familia no solo me inspira a trabajar duro, sino que también 
                me recuerda la importancia de mantener el equilibrio, de celebrar 
                los pequeños logros y de nunca perder de vista lo que realmente 
                importa en la vida.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Family;

