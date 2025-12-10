import React from "react";

export type HomeContextType = {
  isSideBarOpen: boolean;
  setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>
  activeMenu: boolean;
  setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  screenSize: number | undefined;
  isSmallScreen: boolean;
  confirmModalOpen: boolean;
  setConfirmModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
