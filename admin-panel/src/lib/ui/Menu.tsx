import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface ReusableMenuProps {
  children: React.ReactNode;
  menuHeader: React.ReactNode;
}

const ReusableMenu: React.FC<ReusableMenuProps> = ({
  children,
  menuHeader,
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left z-30">
      <div>
        <Menu.Button className="inline-flex w-full justify-center">
          {menuHeader}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute z-50 right-0 mt-2 py-2 w-56 origin-top-right flex flex-col items-start
 dark:border-gray-700 border       rounded-md bg-white dark:bg-secondary-dark-bg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  border-gray-200 "
        >
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ReusableMenu;
