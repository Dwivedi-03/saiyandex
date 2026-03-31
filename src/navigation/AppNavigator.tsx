import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useTheme } from "../context/ThemeContext";
import TabNavigator from "./TabNavigator";
import { Theme } from "@/types";

const AppNavigator: React.FC = () => {
  const { theme } = useTheme();

  const navTheme: Theme = {
    isDark: theme.isDark,
    colors: {
      primary: theme.colors.primary,
      secondary: theme.colors.secondary,
      background: theme.colors.background,
      cardBg: theme.colors.cardBg,
      text: theme.colors.text,
      textSecondary: theme.colors.textSecondary,
      border: theme.colors.border,
      danger: theme.colors.danger,
      success: theme.colors.success,
      warning: theme.colors.warning,
      scouter: theme.colors.scouter,
      scanLine: theme.colors.scanLine,
      goku: theme.colors.goku,
      vegeta: theme.colors.vegeta,
      ssj: theme.colors.ssj,
      ssb: theme.colors.ssb,
      ui: theme.colors.ui,
    },
    fonts: theme.fonts,
  };

  return (
    <NavigationContainer theme={navTheme}>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
