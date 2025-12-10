import { useTheme } from "@/hooks/useThemeContext";
import React from "react";

interface HeaderProps {
  title: string;
}
const Header: React.FC<HeaderProps> = ({ title }) => {
  const { currentTheme } = useTheme();
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return (
    <h3
      className={`${
        currentTheme === "dark" || (currentTheme === "dark" && systemTheme)
          ? "text-white "
          : "text-gray-700"
      } text-sm md:text-lg font-bold pb-2 text-center`}
    >
      {title}
    </h3>
  );
};

export default Header;
