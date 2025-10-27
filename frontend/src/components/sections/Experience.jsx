import { MapPin, Calendar, Users, TrendingUp, Code, Briefcase } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      period: "2024 - Presente",
      title: "Desarrollador Full Stack",
      company: "Proyectos Independientes",
      location: "Avilés, Asturias - España",
      type: "Freelance & Emprendimiento",
      description: "Desarrollo de aplicaciones web completas utilizando tecnologías modernas. Enfoque en soluciones personalizadas para pequeñas y medianas empresas.",
      achievements: [
        "Desarrollo de tienda virtual con sistema de pagos integrado",
        "Creación de sistema de gestión para tapicería",
        "Implementación de plataforma de seguros para gestión de pólizas",
        "Proyecto educativo para empresa Prixline"
      ],
      technologies: ["Python", "React", "MySQL", "n8n", "Flask"],
      icon: <Code className="w-5 h-5" />,
      color: "bg-blue-500"
    },
    {
      id: 2,
      period: "2023 - 2024",
      title: "Transición Profesional",
      company: "Formación en Desarrollo de Software",
      location: "Avilés, Asturias - España",
      type: "Educación y Desarrollo",
      description: "Período dedicado al aprendizaje intensivo de tecnologías de desarrollo web y programación, combinando formación autodidacta con proyectos prácticos.",
      achievements: [
        "Dominio de Python y desarrollo backend",
        "Especialización en React para frontend",
        "Aprendizaje de bases de datos MySQL",
        "Desarrollo de primeros proyectos personales"
      ],
      technologies: ["Python", "React", "JavaScript", "HTML/CSS", "MySQL"],
      icon: <TrendingUp className="w-5 h-5" />,
      color: "bg-green-500"
    },
    {
      id: 3,
      period: "2009 - 2023",
      title: "Analista de Mediciones",
      company: "Empresa del Sector Energético",
      location: "Colombia",
      type: "Tiempo Completo",
      description: "Responsable del análisis y gestión de sistemas de medición, liderando un equipo de 5 personas y manejando sistemas internos críticos de la compañía.",
      achievements: [
        "Liderazgo exitoso de equipo multidisciplinario de 5 personas",
        "Implementación de mejoras en procesos de medición",
        "Gestión de sistemas internos empresariales",
        "Desarrollo de reportes y análisis de datos críticos",
        "Coordinación de proyectos de optimización de procesos"
      ],
      technologies: ["Sistemas de Medición", "Análisis de Datos", "Gestión de Equipos", "Procesos Industriales"],
      icon: <Briefcase className="w-5 h-5" />,
      color: "bg-purple-500"
    }
  ];

  const stats = [
    {
      number: "14+",
      label: "Años de Experiencia",
      description: "En análisis y liderazgo"
    },
    {
      number: "5",
      label: "Personas en Equipo",
      description: "Lideradas exitosamente"
    },
    {
      number: "4",
      label: "Proyectos Actuales",
      description: "En desarrollo activo"
    },
    {
      number: "2",
      label: "Países",
      description: "Experiencia profesional"
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Experiencia Profesional
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Un recorrido profesional que combina años de experiencia en liderazgo 
            con la pasión por la tecnología y la innovación
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-600">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 hidden md:block"></div>

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative">
                {/* Timeline Dot */}
                <div className="absolute left-6 w-4 h-4 bg-white border-4 border-blue-500 rounded-full hidden md:block"></div>
                
                {/* Content */}
                <div className="md:ml-16">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div className="flex items-center mb-2 md:mb-0">
                        <div className={`${exp.color} p-2 rounded-lg mr-3`}>
                          {exp.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {exp.title}
                          </h3>
                          <p className="text-blue-600 font-medium">
                            {exp.company}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        <div className="flex items-center mb-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          {exp.period}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    {/* Type Badge */}
                    <div className="mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {exp.type}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Logros principales:
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-600 text-sm">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies/Skills */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">
                        Tecnologías y habilidades:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career Transition Highlight */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Una Transición Exitosa
            </h3>
            <p className="text-lg mb-6 opacity-90 max-w-3xl mx-auto">
              Mi experiencia de 14 años en liderazgo y análisis me ha proporcionado 
              una base sólida para mi nueva carrera en desarrollo de software. 
              La combinación de habilidades técnicas y de gestión me permite 
              abordar proyectos desde una perspectiva única y completa.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">14 años</div>
                <div className="text-sm opacity-90">Experiencia en liderazgo</div>
              </div>
              <div className="text-4xl opacity-50">+</div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Nuevas</div>
                <div className="text-sm opacity-90">Habilidades técnicas</div>
              </div>
              <div className="text-4xl opacity-50">=</div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Soluciones</div>
                <div className="text-sm opacity-90">Innovadoras y completas</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

