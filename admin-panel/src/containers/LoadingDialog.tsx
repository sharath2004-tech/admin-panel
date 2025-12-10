import { systemTheme } from "@/constants/Color";
import { useTheme } from "@/hooks/useThemeContext";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Ring } from "@uiball/loaders";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  title?: string;
}
const LoadingDialog: React.FC<Props> = ({ isModalOpen, setIsModalOpen }) => {
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
                  className={`w-full max-w-xs transform overflow-hidden flex flex-col items-center justify-center
                rounded-md 
                ${
                  currentTheme === "dark" ||
                  (currentTheme === "dark" && systemTheme)
                    ? "bg-main-dark-bg"
                    : "bg-white"
                }
                p-6 text-left align-middle shadow-xl transition-all`}
                >
                  <Dialog.Title
                    as="h3"
                    className={`
                    ${
                      currentTheme === "dark" ||
                      (currentTheme === "dark" && systemTheme)
                        ? "text-white "
                        : "text-gray-900"
                    }
                    text-lg font-medium leading-6  pb-2`}
                  >
                    Please Wait
                  </Dialog.Title>
                  <Ring
                    size={40}
                    lineWeight={5}
                    speed={2}
                    color={
                      currentTheme === "dark" ||
                      (currentTheme === "dark" && systemTheme)
                        ? "white"
                        : "black"
                    }
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default LoadingDialog;
