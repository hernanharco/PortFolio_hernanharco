import React from "react";
import {
  ArrowDown,
  MapPin,
  Heart,
  Code,
  Lightbulb,
  Save,
  X,
  RotateCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import UpdateButton from "@/components/ui/UpdateButton";
import { Hero } from "@/hero/types/HeroData";

/**
 * Tipos de Props para HeroView
 */
export interface HeroViewProps {
  heroData: Hero | null;
  isEditing: boolean;
  formData: Record<string, string>;
  editableClass: string;
  viewClass: string;
  isLoading: boolean;
  error: string | null;
  separator: string;
  namePart: string;

  // Callbacks
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
  scrollToAbout: () => void;
  fetchHeroes: () => void;

  // Extra
  isSaving: boolean;
  userRole: string | null;

  // Nuevo: activador de edición
  onEdit: () => void;  
};

/**
 * 🧩 Componente Presentacional de HeroSection
 * - Totalmente desacoplado de lógica
 * - Solo recibe props y renderiza UI
 */
const HeroView: React.FC<HeroViewProps> = ({
  heroData,
  isEditing,
  formData,
  editableClass,
  viewClass,
  isLoading,
  error,
  separator,
  namePart,
  handleFormChange,
  handleSave,
  handleCancel,
  scrollToAbout,
  fetchHeroes,
  isSaving,
  userRole,
  onEdit,
  
}) => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">

          {/* Estado de carga o error */}
          {(isLoading || error) && (
            <div className="mb-6 flex flex-col items-center space-y-4">
              {isLoading && !error && (
                <p className="text-xl text-blue-500">Cargando datos del héroe...</p>
              )}
              {error && <p className="text-xl text-red-500">Error: {error}</p>}
              <UpdateButton
                onClick={fetchHeroes}
                isLoading={isLoading}
                text="Recargar Datos"
              />
            </div>
          )}

          {/* Contenido principal */}
          {heroData && (
            <>
              {/* --- CITY --- */}
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                  <MapPin className="w-4 h-4 mr-2" />

                  {isEditing ? (
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleFormChange}
                      className={`text-center bg-transparent focus:outline-none ${editableClass}`}
                      style={{
                        width: `${(formData.city.length || 1) * 0.75}em`,
                      }}
                    />
                  ) : (
                    <span className={viewClass}>{heroData.city}</span>
                  )}
                </span>
              </div>

              {/* --- TITLE --- */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                {isEditing ? (
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    className={`w-full bg-white text-gray-900 focus:outline-none ${editableClass} text-4xl md:text-6xl lg:text-7xl font-bold`}
                  />
                ) : (
                  <>
                    {separator}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                      {namePart}
                    </span>
                  </>
                )}
              </h1>

              {/* --- SUBTITLE --- */}
              <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-8 max-w-4xl mx-auto">
                {isEditing ? (
                  <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleFormChange}
                    className={`w-full bg-white ${editableClass}`}
                  />
                ) : (
                  <span className={viewClass}>{heroData.subtitle}</span>
                )}
              </h2>

              {/* --- DESCRIPTION --- */}
              <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
                {isEditing ? (
                  <textarea
                    name="exampletext"
                    value={formData.exampletext}
                    onChange={handleFormChange}
                    rows={4}
                    className={`w-full bg-white ${editableClass}`}
                  />
                ) : (
                  <span className={viewClass}>{heroData.exampletext}</span>
                )}
              </p>

              {/* --- KEY POINTS --- */}
              <div className="flex flex-wrap justify-center gap-6 mb-12">
                {/* Code */}
                <div className="flex items-center text-gray-700">
                  <Code className="w-5 h-5 mr-2 text-blue-600" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="textcody"
                      value={formData.textcody}
                      onChange={handleFormChange}
                      className={`bg-white ${editableClass}`}
                    />
                  ) : (
                    <span className={viewClass}>{heroData.textcody}</span>
                  )}
                </div>

                {/* Lightbulb */}
                <div className="flex items-center text-gray-700">
                  <Lightbulb className="w-5 h-5 mr-2 text-indigo-600" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="textundertake"
                      value={formData.textundertake}
                      onChange={handleFormChange}
                      className={`bg-white ${editableClass}`}
                    />
                  ) : (
                    <span className={viewClass}>{heroData.textundertake}</span>
                  )}
                </div>

                {/* Heart */}
                <div className="flex items-center text-gray-700">
                  <Heart className="w-5 h-5 mr-2 text-red-500" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="textfamily"
                      value={formData.textfamily}
                      onChange={handleFormChange}
                      className={`bg-white ${editableClass}`}
                    />
                  ) : (
                    <span className={viewClass}>{heroData.textfamily}</span>
                  )}
                </div>
              </div>

              {/* --- CTA BUTTONS --- */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                {/* Modo edición */}
                {isEditing ? (
                  <>
                    <Button
                      onClick={handleSave}
                      disabled={isSaving || isLoading}
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg flex items-center"
                    >
                      {isSaving ? (
                        <RotateCw className="w-5 h-5 mr-2 animate-spin" />
                      ) : (
                        <Save className="w-5 h-5 mr-2" />
                      )}
                      {isSaving ? "Guardando..." : "Guardar Cambios"}
                    </Button>

                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-50 px-8 py-3 text-lg flex items-center"
                    >
                      <X className="w-5 h-5 mr-2" />
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <>
                    {/* Normal CTA */}
                    <Button
                      onClick={scrollToAbout}
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                    >
                      Conoce mi historia
                    </Button>

                    <Button
                      onClick={() =>
                        document.querySelector("#projects")?.scrollIntoView({
                          behavior: "smooth",
                        })
                      }
                      variant="outline"
                      size="lg"
                      className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
                    >
                      Ver mis proyectos
                    </Button>

                    {/* Botón de edición → SOLO ADMIN */}
                    {userRole === "admin" && (
                      <Button
                        onClick={onEdit}
                        variant="outline"
                        size="lg"
                        className="border-gray-600 text-gray-600 hover:bg-gray-50 px-8 py-3 text-lg flex items-center"
                      >
                        Editar
                      </Button>
                    )}
                  </>
                )}
              </div>

              {/* Flecha scroll ↓ */}
              {!isEditing && (
                <div className="animate-bounce">
                  <button
                    onClick={scrollToAbout}
                    className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                  >
                    <ArrowDown className="w-6 h-6 mx-auto" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroView;
