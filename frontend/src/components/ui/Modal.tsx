// modal/Modal.tsx
import React, { useEffect } from 'react';

// 1. Definición de las props
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: String;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
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
          <h3 className="modal-title">{title}</h3>
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