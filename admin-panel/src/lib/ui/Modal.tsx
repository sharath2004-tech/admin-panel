import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FaTimes } from "react-icons/fa";
import { useTheme } from "@/hooks/useThemeContext";
interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
}
const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  const { currentTheme } = useTheme();
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full
                max-w-md  
                transform overflow-hidden rounded-2xl ${
                  currentTheme === "dark"  || (currentTheme === "dark" && systemTheme) ? "bg-secondary-dark-bg" : "bg-white"
                }  p-6 text-left align-middle shadow-xl transition-all z-50`}
              >
                <div className=" flex items-end justify-end self-end">
                  <FaTimes
                    onClick={onClose}
                    className={`w-fit text-lg hover:rotate-180 duration-500  ${currentTheme === "dark"  || (currentTheme === "dark" && systemTheme) ? "text-white" : "text-gray-700"} cursor-pointer`}
                  />
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
