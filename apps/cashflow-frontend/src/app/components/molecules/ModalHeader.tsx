
import React from 'react';

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onClose }) => {
  return (
    <div className="flex justify-between items-center mb-4 pb-4 border-b border-neutral-600">
      <h2 className="text-2xl font-semibold text-brandBlue-300">{title}</h2>
      <button
        onClick={onClose}
        className="text-neutral-400 hover:text-neutral-100 text-3xl p-1 leading-none rounded-full hover:bg-neutral-600"
        aria-label="Close modal"
      >
        &times;
      </button>
    </div>
  );
};
