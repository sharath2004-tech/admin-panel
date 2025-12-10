import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import ReactLoading from "react-loading";
interface Props {
  isProgressModalOpen: boolean;
  setIsProgressModalOpen: (isProgressModalOpen: boolean) => void;
  progress: number;
  title?: string;
}
const ProgressDialog: React.FC<Props> = ({
  isProgressModalOpen,
  setIsProgressModalOpen,
  progress,
}) => {
  return (
    <>
      <Transition appear show={isProgressModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsProgressModalOpen(true)}
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
                  className="w-full max-w-xs transform overflow-hidden flex flex-col items-center justify-center
                rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all"
                >
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 pb-2"
                  >
                    Please Wait
                  </Dialog.Title>
                  <ReactLoading type={"balls"} color="#000" />
                  <div className="mt-4 text-main-green-color font-bold text-xl">
                    {progress} %
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

export default ProgressDialog;
