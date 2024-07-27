import React, { useRef, useEffect } from "react";

const SongMenu = ({ onClose, onAction, className }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className={`bg-dark text-light rounded-2 ${className}`}
    >
      <div
        className="p-2 cursor-pointer border-bottom border-secondary"
        onClick={() => onAction("delete")}
        onMouseEnter={(e) => e.currentTarget.classList.add('bg-secondary')}
        onMouseLeave={(e) => e.currentTarget.classList.remove('bg-secondary')}
      >
        Eliminar Canción
      </div>
      <div
        className="p-2 cursor-pointer"
        onClick={() => onAction("add")}
        onMouseEnter={(e) => e.currentTarget.classList.add('bg-secondary')}
        onMouseLeave={(e) => e.currentTarget.classList.remove('bg-secondary')}
      >
        Agregar a la Lista
      </div>
    </div>
  );
};

export default SongMenu;
