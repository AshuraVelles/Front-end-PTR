import React from 'react';
import './ItemDetailsPage.css';

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, handleClose, children }) => {
  const showModal = show ? { display: 'block' } : { display: 'none' };

  return (
    <div className="modal" style={showModal}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
