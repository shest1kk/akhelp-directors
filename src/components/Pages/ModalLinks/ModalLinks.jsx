// Modal.jsx
import React, { useEffect, useRef } from 'react';
import './ModalLinks.css'; // Подключаем CSS для модального окна

const ModalLinks = ({ isOpen, onClose, links }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    // Закрываем модальное окно при нажатии на клавишу Escape
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = (event) => {
    // Закрываем окно, если клик был вне модального контента
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" ref={modalRef}>
        
        <ul className="modal-links">
          {Object.entries(links).map(([text, url], index) => (
            <li key={index}><a href={url} target="_blank" rel="noopener noreferrer">{text}</a></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ModalLinks;
