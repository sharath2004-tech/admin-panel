import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="bg-white dark:bg-main-dark-bg p-1  flex items-center justify-center w-full my-transition">
      {" "}
      <p className="text-xs font-normal dark:text-light-gray">
        {" "}
        {new Date().getFullYear()} Zulu &copy; All Rights Reserved.{" "}
      </p>
    </div>
  );
};

export default Footer;
