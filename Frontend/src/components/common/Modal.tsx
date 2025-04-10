import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import './Modal.css';

type ModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, children }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={onClose}>
        {/* Fondo oscuro con estilo para el modal */}
        <Transition.Child
          as={Fragment}
          enter="transition-opacity duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="modal-overlay dark:bg-black/50 bg-gray-900/50" />
        </Transition.Child>

        {/* Contenedor del modal centrado */}
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <Transition.Child
            as={Fragment}
            enter="transition duration-300 ease-out"
            enterFrom="opacity-0 scale-95 translate-y-4"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="transition duration-200 ease-in"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-4"
          >
            <Dialog.Panel className="modal-panel dark:bg-gray-800 bg-white text-white dark:text-gray-200 p-6 rounded-lg shadow-xl max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title as="h3" className="text-xl font-semibold">
                  {title}
                </Dialog.Title>
                <button
                  onClick={onClose}
                  className="text-gray-600 hover:text-red-500 text-2xl leading-none dark:text-gray-300 dark:hover:text-red-400"
                >
                  &times;
                </button>
              </div>
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
