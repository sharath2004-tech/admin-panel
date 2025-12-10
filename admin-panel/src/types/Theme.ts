export type ThemeType = "light" | "dark" | "system" | null | string
export type ThemeContextType={
  currentTheme:ThemeType;
  setCurrentTheme:React.Dispatch<React.SetStateAction<ThemeType>>
}