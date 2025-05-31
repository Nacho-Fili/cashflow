
import React from 'react';
import { Modal } from '../organisms/Modal';

interface FormModalTemplateProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  modalSize?: 'sm' | 'md' | 'lg' | 'xl';
}

export const FormModalTemplate: React.FC<FormModalTemplateProps> = ({
  isOpen,
  onClose,
  title,
  children,
  modalSize = 'lg',
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size={modalSize}>
      {children}
    </Modal>
  );
};
