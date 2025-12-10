import React from "react";

interface HeaderContainerProps {
  children?: React.ReactNode;
  headerTitle: string;
}
const HeaderContainer: React.FC<HeaderContainerProps> = ({
  children,
  headerTitle,
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <h5 className="font-semibold capitalize md:text-lg dark:text-gray-400 my-transition">{headerTitle}</h5>
      {children}
    </div>
  );
};

export default HeaderContainer;
