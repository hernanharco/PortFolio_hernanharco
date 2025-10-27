import { Code, Database, Globe, Zap, Users, MessageCircle, Target, Lightbulb } from 'lucide-react';

const Skills = () => {
  const technicalSkills = [
    {
      category: "Lenguajes de Programación",
      icon: <Code className="w-6 h-6" />,
      skills: [
        { name: "Python", level: 85, color: "bg-blue-500" },
        { name: "JavaScript", level: 80, color: "bg-yellow-500" }
      ]
    },
    {
      category: "Frontend",
      icon: <Globe className="w-6 h-6" />,
      skills: [
        { name: "React", level: 85, color: "bg-cyan-500" },
        { name: "HTML/CSS", level: 90, color: "bg-orange-500" },
        { name: "Tailwind CSS", level: 80, color: "bg-teal-500" }
      ]
    },
    {
      category: "Backend & Bases de Datos",
      icon: <Database className="w-6 h-6" />,
      skills: [
        { name: "MySQL", level: 85, color: "bg-blue-600" },
        { name: "Flask", level: 75, color: "bg-gray-600" },
        { name: "API REST", level: 80, color: "bg-green-500" }
      ]
    },
    {
      category: "Herramientas & Automatización",
      icon: <Zap className="w-6 h-6" />,
      skills: [
        { name: "n8n", level: 60, color: "bg-purple-500", learning: true },
        { name: "Git", level: 75, color: "bg-red-500" },
        { name: "VS Code", level: 90, color: "bg-blue-400" }
      ]
    }
  ];

  const softSkills = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Liderazgo",
      description: "14 años liderando equipos de 5 personas, desarrollando habilidades de gestión y motivación."
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-green-600" />,
      title: "Comunicación",
      description: "Capacidad para transmitir ideas complejas de manera clara y efectiva a diferentes audiencias."
    },
    {
      icon: <Target className="w-8 h-8 text-purple-600" />,
      title: "Trabajo en Equipo",
      description: "Experiencia colaborando en proyectos multidisciplinarios y coordinando esfuerzos grupales."
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-orange-600" />,
      title: "Resolución de Problemas",
      description: "Enfoque analítico para identificar soluciones innovadoras a desafíos técnicos y empresariales."
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Habilidades & Competencias
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Una combinación de habilidades técnicas sólidas y competencias 
            interpersonales desarrolladas a lo largo de mi carrera profesional
          </p>
        </div>

        {/* Technical Skills */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Habilidades Técnicas
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {technicalSkills.map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    {category.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {category.category}
                  </h4>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium">
                          {skill.name}
                          {skill.learning && (
                            <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                              Aprendiendo
                            </span>
                          )}
                        </span>
                        <span className="text-gray-500 text-sm">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${skill.color} transition-all duration-1000 ease-out`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Habilidades Interpersonales
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {softSkills.map((skill, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow duration-300">
                <div className="mb-4">
                  {skill.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  {skill.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Journey */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            En Constante Aprendizaje
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Actualmente explorando nuevas tecnologías y herramientas para 
            mantenerme actualizado en el dinámico mundo del desarrollo
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
              n8n - Automatización
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
              Docker
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
              TypeScript
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
              Next.js
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

