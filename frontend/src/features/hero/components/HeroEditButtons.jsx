// src/features/hero/components/HeroEditButtons.jsx

import React from "react";
import { Save, X, RotateCw, Edit } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";

// Importamos tu hook de autenticación
import useAuth from "@/features/hero/hooks/useAuth";

/**
 * Componente que renderiza los botones de control de edición 
 * (Guardar, Cancelar, Editar).
 *
 * @param {object} props - Propiedades del componente.
 * @param {boolean} isEditing - Indica si el modo de edición está activo.
 * @param {boolean} isSaving - Indica si el proceso de guardado está en curso.
 * @param {boolean} isLoading - Indica si la carga de datos principal está en curso.
 * @param {function} onSave - Handler para la acción de guardar.
 * @param {function} onCancel - Handler para la acción de cancelar.
 * @param {function} onEditStart - Handler para la acción de iniciar la edición.
 * @param {function} onScrollToAbout - Handler CTA "Conoce mi historia".
 * @param {function} onScrollToProjects - Handler CTA "Ver mis proyectos".
 */
const HeroEditButtons = ({
    isEditing,
    isSaving,
    isLoading,
    onSave,
    onCancel,
    onEditStart,
    onScrollToAbout,
    onScrollToProjects,
}) => {

    // Obtenemos el usuario autenticado
    const { currentUser, authLoading } = useAuth();

    // Clases comunes para los botones grandes (Llamada a la Acción)
    const ctaClass = "px-8 py-3 text-lg";

    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">

            {isEditing ? (
                // --- Botones en Modo Edición: Guardar y Cancelar ---
                <>
                    <Button
                        onClick={onSave}
                        disabled={isSaving || isLoading}
                        className={`bg-green-600 hover:bg-green-700 text-white flex items-center ${ctaClass}`}
                    >
                        {isSaving
                            ? <RotateCw className="w-5 h-5 mr-2 animate-spin" />
                            : <Save className="w-5 h-5 mr-2" />
                        }
                        {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                    </Button>

                    <Button
                        onClick={onCancel}
                        variant="outline"
                        className={`border-red-500 text-red-500 hover:bg-red-50 flex items-center ${ctaClass}`}
                        disabled={isSaving || isLoading}
                    >
                        <X className="w-5 h-5 mr-2" />
                        Cancelar
                    </Button>
                </>
            ) : (
                // --- Botones en Modo Vista ---
                <>
                    {/* CTA 1: Conoce mi historia */}
                    <Button
                        onClick={onScrollToAbout}
                        size="lg"
                        className={`bg-blue-600 hover:bg-blue-700 text-white ${ctaClass}`}
                    >
                        Conoce mi historia
                    </Button>

                    {/* CTA 2: Ver mis proyectos */}
                    <Button
                        onClick={onScrollToProjects}
                        variant="outline"
                        size="lg"
                        className={`border-blue-600 text-blue-600 hover:bg-blue-50 ${ctaClass}`}
                    >
                        Ver mis proyectos
                    </Button>

                    {/* Botón Editar — solo si el usuario está autenticado */}
                    {!authLoading && currentUser && (
                        <Button
                            onClick={onEditStart}
                            variant="outline"
                            size="lg"
                            className={`border-gray-600 text-gray-600 hover:bg-gray-50 flex items-center ${ctaClass}`}
                            disabled={isLoading}
                        >
                            <Edit className="w-5 h-5 mr-2" />
                            Editar
                        </Button>
                    )}
                </>
            )}
        </div>
    );
};

export default HeroEditButtons;
