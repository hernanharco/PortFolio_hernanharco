# Creamos los estilos en src/index.css
```
/* Estilos en App.css o tu archivo de estilos */

/* App.css (o donde manejes tus estilos globales) */

/* --- 1. Estilos del Overlay (Fondo y Centrado) --- */
.modal-overlay {
  position: fixed; /* Fija la posición en la ventana (no se mueve con el scroll) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7); /* Color negro semitransparente (oscurece el contenido de atrás) */
  
  /* Flexbox para centrar el contenido */
  display: flex; 
  justify-content: center; /* Centrado horizontal */
  align-items: center; /* Centrado vertical */
  
  z-index: 1000; /* Asegura que esté por encima de todos los demás elementos */
  overflow-y: auto; /* Permite scroll si el contenido es muy largo */
}

/* --- 2. Estilos del Contenido del Modal --- */
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  /*max-width: 500px; -> se trabaja desde tailwindcss*/
  width: 90%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  margin: 10px; /* Pequeño margen para evitar que toque los bordes en móviles */
}

/* --- 3. Estilos del Encabezado y Botón de Cierre --- */
.modal-header {
  display: flex;
  justify-content: space-between; /* Alinea el título y el botón de cierre */
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
}

.close-button {
  background: none;
  border: none;
  font-size: 2rem;
  line-height: 1; 
  cursor: pointer;
  color: #aaa;
  transition: color 0.2s;
}

.close-button:hover {
  color: #333;
}

```

# Creamos la clase

```
// modal/Modal.tsx
import React, { useEffect } from 'react';

// 1. Definición de las props
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // 2. Hook para manejar el cierre con la tecla ESC
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      // Si el modal está abierto y se presiona 'Escape', llama a onClose
      if (isOpen && event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    
    // Función de limpieza: se ejecuta cuando el componente se desmonta 
    // o antes de que se vuelva a ejecutar el efecto (cleanup)
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]); // Dependencias: el efecto se ejecuta cuando cambian estas props

  // Si el modal no está abierto, no renderiza nada
  if (!isOpen) {
    return null;
  }

  return (
    // 3. Overlay (fondo oscuro)
    // El 'modal-overlay' implementa el centrado, la posición fija y el fondo oscuro
    <div className="modal-overlay" onClick={onClose}>
      
      {/* 4. Contenido del Modal */}
      <div 
        className="modal-content" 
        // Detiene la propagación del evento, para que hacer clic dentro NO cierre el modal
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3 className="modal-title">Título del Modal</h3>
          {/* Botón de cierre */}
          <button className="close-button" onClick={onClose} aria-label="Cerrar modal">
            &times;
          </button>
        </div>
        
        {/* 5. Cuerpo del Modal */}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
```

# Creamos el boton y la vista
esto va dentro de return
```
{/* -------------------------------------- */}
      {/* --- BOTÓN PARA ABRIR EL MODAL (NUEVO) --- */}
      {/* -------------------------------------- */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleOpenModal} // ⬅️ Llama a la función para abrir
          className="px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
        >
          Abrir Panel de Detalles
        </button>
      </div>

      {/* ----------------------------------- */}
      {/* --- EL COMPONENTE MODAL (NUEVO) --- */}
      {/* ----------------------------------- */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal} // ⬅️ Llama a la función para cerrar
      >
        <h3 className="text-xl font-bold mb-3 text-gray-900">Detalles Adicionales</h3>
        <p className="text-gray-700 mb-4">
          Aquí va la información detallada relacionada con los highlights o el contexto de tu aplicación.
        </p>
        <button
          onClick={handleCloseModal}
          className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
        >
          Cerrar
        </button>
      </Modal>
```