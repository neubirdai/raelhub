import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleKeyUp = (event) => {
      if (event.key === 'Escape') {
        onClose();  // Call the onClose prop when the Escape key is pressed
      }
    };

    if (isOpen) {
      document.addEventListener('keyup', handleKeyUp);  // Add event listener when the modal is open
    }

    return () => {
      document.removeEventListener('keyup', handleKeyUp);  // Clean up the event listener when the modal is closed or component unmounts
    };
  }, [isOpen, onClose]);  // Only re-run the effect if isOpen or onClose changes

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    }}>
      <div style={{
        padding: 20,
        background: '#fff',
        borderRadius: 5,
        width: '80%',
        minHeight: '50vh',
        position: 'relative',
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 10, right: 10 }}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
