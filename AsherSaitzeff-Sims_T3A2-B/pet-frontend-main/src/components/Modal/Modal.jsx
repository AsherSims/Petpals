import React from "react";
import { FiX } from 'react-icons/fi';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative max-w-[500px] sm:mx-auto mx-4 bg-white shadow-lg rounded-lg px-4">
      <button
          onClick={onClose}
          className="absolute top-6 right-4 text-gray-600 hover:text-gray-900 transition"
        >
          <FiX size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
