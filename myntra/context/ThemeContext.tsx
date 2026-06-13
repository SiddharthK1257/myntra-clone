import React, {
  createContext,
  useContext,
  useState,
} from "react";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "@/constants/theme";

const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: any) => {
  const colorScheme = useColorScheme();

  const [themeMode, setThemeMode] = useState(
    colorScheme === "dark" ? "dark" : "light"
  );

  const theme =
    themeMode === "dark"
      ? darkTheme
      : lightTheme;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMode,
        setThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);