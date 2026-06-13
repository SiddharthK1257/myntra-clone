import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, themeMode, setThemeMode } = useTheme();

  const toggleTheme = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: theme.primary }
      ]}
      onPress={toggleTheme}
    >
      <Text style={styles.text}>
        {themeMode === "light"
          ? "🌙 Dark Mode"
          : "☀️ Light Mode"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});