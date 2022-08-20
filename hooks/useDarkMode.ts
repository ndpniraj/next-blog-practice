import { useEffect, useState } from "react";

const defaultThemeMode = "light";
const darkThemeMode = "dark";

const useDarkMode = () => {
  const getThemeFromLS = (): string => {
    return localStorage.getItem("ndp_theme_mode") || "";
  };

  const storeThemeToLS = (theme: string): void => {
    localStorage.setItem("ndp_theme_mode", theme);
  };

  const updateTheme = (newTheme: string, previousTheme?: string): void => {
    const classList = document.documentElement.classList;
    if (previousTheme) classList.remove(previousTheme);
    classList.add(newTheme);
    classList.add("transition-all");
  };

  const toggleTheme = () => {
    let previousTheme = getThemeFromLS();
    let newTheme =
      previousTheme === defaultThemeMode ? darkThemeMode : defaultThemeMode;

    storeThemeToLS(newTheme);
    updateTheme(newTheme, previousTheme);
  };

  useEffect(() => {
    let previousThemeMode = getThemeFromLS();

    if (previousThemeMode) {
      return updateTheme(previousThemeMode);
    }

    const media = window.matchMedia;
    if (media && media("(prefers-color-scheme: dark)").matches) {
      updateTheme(darkThemeMode);
      storeThemeToLS(darkThemeMode);
    } else {
      updateTheme(defaultThemeMode);
      storeThemeToLS(defaultThemeMode);
    }
  }, []);

  return { toggleTheme };
};

export default useDarkMode;
