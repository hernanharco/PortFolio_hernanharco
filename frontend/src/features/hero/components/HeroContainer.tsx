import React, { useState, useEffect, ChangeEvent } from "react";
import useHeroCRUD from "@/features/hero/hooks/useHeroCRUD";
import { useAuth } from "@/context/AuthContext";
import HeroView from "./HeroView";

// Tipos
import type { Hero, HeroInput } from "@/features/hero/types/HeroData";

/**
 * HeroContainer
 *
 * Componente contenedor encargado de:
 * - Administrar estado de edición
 * - Manejar formulario (formData)
 * - Conectarse con useHero para operaciones CRUD
 * - Pasar datos y handlers a HeroView (UI presentacional)
 */
const HeroContainer: React.FC = () => {
  const { userRole } = useAuth();

  const {
    heroes,
    isLoading,
    error,
    separator,
    namePart,
    fetchHeroes,
    updateHero,
  } = useHeroCRUD();

  // Héroe principal
  const heroData: Hero | null = heroes.length > 0 ? heroes[0] : null;
  const heroId = heroData?.id;

  // Estado UI
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Estado del formulario
  const [formData, setFormData] = useState<HeroInput>({
    title: "",
    subtitle: "",
    exampletext: "",
    city: "",
    textcody: "",
    textfamily: "",
    textundertake: "",
  });

  /**
   * Cargar datos iniciales en el formulario cuando llega heroData
   */
  useEffect(() => {
    if (heroData) {
      setFormData({
        title: heroData.title || "",
        subtitle: heroData.subtitle || "",
        exampletext: heroData.exampletext || "",
        city: heroData.city || "",
        textcody: heroData.textcody || "",
        textfamily: heroData.textfamily || "",
        textundertake: heroData.textundertake || "",
      });
    }
  }, [heroData]);

  /**
   * Actualizar los campos del formulario
   */
  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Guardar cambios en el héroe
   */
  const handleSave = async () => {
    if (!heroId) return;

    setIsSaving(true);
    const updatedHero = await updateHero(heroId, formData);
    setIsSaving(false);

    if (updatedHero) setIsEditing(false);
  };

  /**
   * Cancelar edición y restaurar datos
   */
  const handleCancel = () => {
    setIsEditing(false);

    if (heroData) {
      setFormData({
        title: heroData.title,
        subtitle: heroData.subtitle,
        exampletext: heroData.exampletext,
        city: heroData.city,
        textcody: heroData.textcody,
        textfamily: heroData.textfamily,
        textundertake: heroData.textundertake,
      });
    }
  };

  /**
   * Scroll hacia la sección "About"
   */
  const scrollToAbout = () => {
    const el = document.querySelector("#about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Estilos
  const editableClass =
    "p-1 rounded-md transition-colors duration-200 border border-transparent " +
    "focus:border-blue-400 focus:bg-white resize-none outline-none text-center";

  const viewClass = "p-1";

  return (
    <HeroView
      heroData={heroData}
      isEditing={isEditing}
      formData={formData}
      editableClass={editableClass}
      viewClass={viewClass}
      isLoading={isLoading}
      error={error}
      separator={separator}
      namePart={namePart}
      handleFormChange={handleFormChange}
      handleSave={handleSave}
      handleCancel={handleCancel}
      scrollToAbout={scrollToAbout}
      fetchHeroes={fetchHeroes}
      isSaving={isSaving}
      userRole={userRole}
      onEdit={() => setIsEditing(true)}
    />
  );
};

export default HeroContainer;
