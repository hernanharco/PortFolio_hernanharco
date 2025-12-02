import { Users, Target, Plane, Code2 } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Mi Historia
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Un viaje de transformación profesional impulsado por la pasión, 
            la familia y el deseo constante de aprender y crecer
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Story Content */}
          <div className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                De Colombia a España: Una nueva aventura
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Durante 14 años en Colombia, me desempeñé como <strong>Analista de Mediciones</strong>, 
                donde no solo desarrollé habilidades técnicas sólidas, sino que también tuve la 
                oportunidad de liderar un equipo de 5 personas. Esta experiencia me enseñó el 
                valor del trabajo en equipo, la comunicación efectiva y la gestión de proyectos.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                El traslado a <strong>Avilés, Asturias</strong> marcó el inicio de una nueva etapa 
                en mi vida. Fue aquí donde decidí dar el salto hacia el desarrollo de software, 
                combinando mi experiencia previa en análisis con mi pasión por la tecnología 
                y la innovación.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Hoy, como <strong>Desarrollador Full Stack</strong>, especializado en Python, 
                React y MySQL, continúo aprendiendo y creciendo. Mi familia es mi mayor 
                inspiración y motor, mientras que el emprendimiento me permite explorar 
                nuevas oportunidades y crear soluciones que impacten positivamente en la vida 
                de las personas.
              </p>
            </div>
          </div>

          {/* Key Highlights */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Liderazgo y Trabajo en Equipo
                  </h4>
                  <p className="text-gray-700">
                    14 años liderando equipos de 5 personas, desarrollando 
                    habilidades de gestión y comunicación efectiva.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
              <div className="flex items-start space-x-4">
                <div className="bg-green-600 p-3 rounded-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Enfoque en Resultados
                  </h4>
                  <p className="text-gray-700">
                    Experiencia sólida en análisis de mediciones y manejo 
                    de sistemas internos empresariales.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-600 p-3 rounded-lg">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Adaptabilidad Global
                  </h4>
                  <p className="text-gray-700">
                    Transición exitosa de Colombia a España, adaptándome 
                    a nuevos entornos y culturas profesionales.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl">
              <div className="flex items-start space-x-4">
                <div className="bg-orange-600 p-3 rounded-lg">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Transformación Tecnológica
                  </h4>
                  <p className="text-gray-700">
                    Evolución profesional hacia el desarrollo Full Stack, 
                    combinando experiencia previa con nuevas tecnologías.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">
            Mis Valores Fundamentales
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Aprendizaje Constante
              </h4>
              <p className="text-gray-600">
                La curiosidad y el deseo de mejorar continuamente impulsan 
                cada proyecto y decisión en mi carrera.
              </p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Familia como Motor
              </h4>
              <p className="text-gray-600">
                Mi familia es mi mayor inspiración y la razón principal 
                que me motiva a superarme cada día.
              </p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">🚀</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Espíritu Emprendedor
              </h4>
              <p className="text-gray-600">
                La innovación y el emprendimiento me permiten crear 
                soluciones que generen impacto positivo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

