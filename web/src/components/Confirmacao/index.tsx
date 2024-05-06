import React from 'react';
import './styles.css';

interface ConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  text: string;
}

const Confirmation: React.FC<ConfirmationProps> = ({ isOpen, onClose, onConfirm, text }) => {
  if (!isOpen) return null;

  return (
    <div className='confirmation-overlay'>
      <div className='confirmation-modal'>
        <h2 className='confirmation-text'>{text}</h2>
        <div className='confirmation-buttons'>
          <button className='confirmation-cancel-button' onClick={onClose}>
            Cancelar
          </button>
          <button className='confirmation-confirm-button' onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
