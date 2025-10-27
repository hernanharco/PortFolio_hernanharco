import { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se implementaría la lógica de envío del formulario
    console.log('Formulario enviado:', formData);
    alert('¡Gracias por tu mensaje! Te contactaré pronto.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "hernan.arango@email.com",
      link: "mailto:hernan.arango@email.com",
      color: "bg-blue-500"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Teléfono",
      value: "+34 XXX XXX XXX",
      link: "tel:+34XXXXXXXXX",
      color: "bg-green-500"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Ubicación",
      value: "Avilés, Asturias - España",
      link: "#",
      color: "bg-red-500"
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      title: "LinkedIn",
      value: "linkedin.com/in/hernan-arango",
      link: "https://linkedin.com/in/hernan-arango",
      color: "bg-blue-600"
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      name: "GitHub",
      url: "https://github.com/hernan-arango",
      color: "hover:bg-gray-700"
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      name: "LinkedIn",
      url: "https://linkedin.com/in/hernan-arango",
      color: "hover:bg-blue-600"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      name: "Email",
      url: "mailto:hernan.arango@email.com",
      color: "hover:bg-blue-500"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Hablemos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente? ¿Quieres colaborar? ¿O simplemente 
            quieres charlar sobre tecnología? Me encantaría escucharte
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Envíame un mensaje
              </h3>
              <p className="text-gray-600">
                Completa el formulario y te responderé lo antes posible. 
                También puedes contactarme directamente a través de mis redes sociales.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="¿De qué quieres hablar?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Cuéntame sobre tu proyecto o idea..."
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Enviar mensaje
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Información de contacto
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className={`${info.color} p-3 rounded-lg mr-4 text-white group-hover:scale-110 transition-transform`}>
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">
                        {info.title}
                      </div>
                      <div className="text-gray-900 font-medium">
                        {info.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Sígueme en redes
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg text-gray-600 ${social.color} hover:text-white transition-all duration-200 hover:scale-110`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-green-300 rounded-full mr-3 animate-pulse"></div>
                <span className="font-semibold">Disponible para proyectos</span>
              </div>
              <p className="text-green-100 mb-4">
                Actualmente acepto nuevos proyectos y colaboraciones. 
                ¿Tienes algo interesante en mente?
              </p>
              <div className="flex items-center text-green-200 text-sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Respuesta típica en 24 horas
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-blue-600 rounded-2xl p-8 text-white text-center">
              <h3 className="text-xl font-bold mb-4">
                ¿Listo para empezar?
              </h3>
              <p className="text-blue-100 mb-6">
                Ya sea un proyecto pequeño o una aplicación completa, 
                estoy aquí para ayudarte a convertir tu idea en realidad.
              </p>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => document.querySelector('#contact form input[name="name"]')?.focus()}
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Iniciar conversación
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

