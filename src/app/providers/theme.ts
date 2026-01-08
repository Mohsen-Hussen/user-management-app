import React from "react";

export type Theme = "light" | "dark";
export type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

export const STORAGE_KEY = "yamm.theme";

export const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export function applyThemeToDom(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}
