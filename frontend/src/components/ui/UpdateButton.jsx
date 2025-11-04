import React from 'react';

/**
 * Botón estilizado con Tailwind CSS para acciones de actualización o recarga.
 * * @param {object} props - Propiedades del componente
 * @param {function} props.onClick - Función a ejecutar cuando se hace clic en el botón (ej: fetchHeroes)
 * @param {boolean} [props.isLoading=false] - Indica si la acción está en curso para deshabilitar el botón.
 * @param {string} [props.text='Actualizar'] - Texto que se muestra en el botón.
 */
const UpdateButton = ({ onClick, isLoading = false, text = 'Actualizar' }) => {

  const ReloadIcon = (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} // Añade animación al cargar
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      {/* Icono de recarga/actualizar (tomado de Heroicons) */}
      <path 
        fillRule="evenodd" 
        d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11A1.5 1.5 0 0017 16.5v-13A1.5 1.5 0 0015.5 2h-11zM10 4a.5.5 0 00-.5.5v2.293L8.354 5.146a.5.5 0 10-.708.708l2 2a.5.5 0 00.708 0l2-2a.5.5 0 10-.708-.708L10.5 6.793V4.5a.5.5 0 00-.5-.5z" 
        clipRule="evenodd" 
      />
    </svg>
  );

  return (
    <button 
      onClick={onClick}
      disabled={isLoading} // Deshabilita el botón si está cargando
      className={`
        px-6 py-3 
        bg-blue-600 text-white 
        font-semibold rounded-lg 
        shadow-md 
        transition ease-in-out duration-300
        flex items-center justify-center space-x-2
        ${isLoading 
            ? 'opacity-70 cursor-not-allowed' 
            : 'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75'}
      `}
    >
      {ReloadIcon}
      <span>{isLoading ? 'Cargando...' : text}</span>
    </button>
  );
};

export default UpdateButton;