import { useContext } from "react";
import { ThemeContext } from "./theme";
import { ThemeContextValue } from "./theme";

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
