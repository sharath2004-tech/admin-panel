import { ThemeContext } from "@/context/ThemeContext";
import { ThemeContextType } from "@/types/Theme";
import { useContext } from "react";

export function useTheme(): ThemeContextType {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("useTheme must be used within an ThemeProvider");
  }
  return themeContext;
}
