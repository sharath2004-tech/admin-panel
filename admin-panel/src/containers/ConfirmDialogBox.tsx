import { systemTheme } from "@/constants/Color";
import { ButtonLoader } from "@/constants/Loader";
import { useTheme } from "@/hooks/useThemeContext";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

interface Props {
  onClick: () => void;
  title: string;
  description: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  children?: React.ReactNode;
}
const ConfirmDialogBox: React.FC<Props> = ({
  onClick,
  isLoading,
  title,
  description,
  isModalOpen,
  setIsModalOpen,
  children,
}: Props) => {
  const { currentTheme } = useTheme();
  return (
    <>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsModalOpen(true)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-white bg-opacity-25 backdrop-blur-sm" />
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
                  className={`w-full flex flex-col items-start space-y-2 max-w-lg transform overflow-hidden rounded-md
                  ${
                    currentTheme === "dark" ||
                    (currentTheme === "dark" && systemTheme)
                      ? "bg-main-dark-bg"
                      : "bg-white"
                  }
                 p-8  text-left align-middle shadow-lg transition-all`}
                >
                  <h2
                    className={`${
                      currentTheme === "light" ? "text-black" : "text-gray-300"
                    } font-semibold text-lg`}
                  >
                    {title}
                  </h2>
                  <p
                    className={`${
                      currentTheme === "light" ? "text-black" : "text-gray-300"
                    } font-normal`}
                  >
                    {description}
                  </p>
                  {children}
                  <div className="flex items-center justify-end self-end">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className={` p-2 px-4 rounded-md font-medium ${
                        currentTheme === "light" ? "" : "text-white"
                      } text-black`}
                    >
                      cancel
                    </button>
                    <button
                      onClick={onClick}
                      className="bg-red-500 hover:bg-red-400 p-3 px-5 text-white font-medium rounded-md"
                      disabled={isLoading}
                    >
                      {isLoading ? <ButtonLoader /> : "Continue"}
                      {/* <ButtonLoader /> */}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ConfirmDialogBox;
