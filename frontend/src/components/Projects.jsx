import { ExternalLink, Github, ShoppingCart, Scissors, Shield, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Tienda Virtual",
      category: "E-commerce",
      description: "Plataforma de comercio electrónico desarrollada como proyecto emprendedor personal. Incluye gestión de productos, carrito de compras, procesamiento de pagos y panel administrativo.",
      technologies: ["React", "Python", "MySQL", "Stripe API"],
      icon: <ShoppingCart className="w-8 h-8" />,
      status: "En producción",
      highlights: [
        "Sistema de gestión de inventario en tiempo real",
        "Integración con pasarelas de pago",
        "Panel administrativo completo",
        "Diseño responsive y optimizado para móviles"
      ],
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 2,
      title: "Sistema para Tapicería",
      category: "Gestión Empresarial",
      description: "Sistema integral de gestión para una tapicería que incluye control de inventario, gestión de clientes, seguimiento de proyectos y facturación automatizada.",
      technologies: ["Python", "Flask", "MySQL", "React"],
      icon: <Scissors className="w-8 h-8" />,
      status: "En desarrollo",
      highlights: [
        "Gestión completa de clientes y proyectos",
        "Control de inventario de materiales",
        "Sistema de facturación automatizada",
        "Seguimiento de tiempos y costos"
      ],
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: 3,
      title: "Plataforma de Gestión de Seguros",
      category: "Fintech",
      description: "Aplicación desarrollada especialmente para mi esposa, que facilita la gestión de pólizas de seguros, clientes, renovaciones y seguimiento de reclamaciones.",
      technologies: ["React", "Python", "MySQL", "n8n"],
      icon: <Shield className="w-8 h-8" />,
      status: "En desarrollo",
      highlights: [
        "Gestión integral de pólizas de seguros",
        "Automatización de recordatorios de renovación",
        "Dashboard con métricas y reportes",
        "Sistema de notificaciones automatizadas"
      ],
      color: "from-purple-500 to-violet-600"
    },
    {
      id: 4,
      title: "Proyecto Educativo Prixline",
      category: "Educación",
      description: "Plataforma educativa innovadora para la empresa Prixline, enfocada en proporcionar herramientas de aprendizaje interactivas y seguimiento del progreso estudiantil.",
      technologies: ["React", "Python", "MySQL", "Chart.js"],
      icon: <GraduationCap className="w-8 h-8" />,
      status: "En planificación",
      highlights: [
        "Plataforma de aprendizaje interactiva",
        "Sistema de seguimiento de progreso",
        "Herramientas de evaluación automatizada",
        "Dashboard para educadores y estudiantes"
      ],
      color: "from-orange-500 to-red-600"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "En producción":
        return "bg-green-100 text-green-800";
      case "En desarrollo":
        return "bg-blue-100 text-blue-800";
      case "En planificación":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Proyectos Destacados
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Una selección de proyectos que reflejan mi pasión por crear 
            soluciones tecnológicas innovadoras y funcionales
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
              {/* Project Header */}
              <div className={`bg-gradient-to-r ${project.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    {project.icon}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)} bg-white/90`}>
                    {project.status}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-white/90 text-sm font-medium">{project.category}</p>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    Tecnologías utilizadas:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    Características destacadas:
                  </h4>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600 text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    Código
                  </Button>
                  {project.status === "En producción" && (
                    <Button 
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Ver proyecto
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Tienes un proyecto en mente?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Me encanta colaborar en proyectos innovadores que generen impacto. 
              Si tienes una idea o necesitas ayuda con desarrollo Full Stack, 
              ¡hablemos!
            </p>
            <Button 
              size="lg"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Iniciar conversación
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

