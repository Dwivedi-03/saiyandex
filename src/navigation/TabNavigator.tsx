import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { SCREEN_NAMES } from "../utils/constants";

// Import Stack Navigators (we'll create these next)
import CharacterStack from "./CharacterStack";
import PlanetStack from "./PlanetStack";
import SettingsScreen from "../screens/settings/SettingsScreen";
import FavoritesStack from "./FavoritesStack";

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === SCREEN_NAMES.CHARACTERS_TAB) {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === SCREEN_NAMES.PLANETS_TAB) {
            iconName = focused ? "planet" : "planet-outline";
          } else if (route.name === SCREEN_NAMES.FAVORITES_TAB) {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === SCREEN_NAMES.SETTINGS_TAB) {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.cardBg,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: theme.colors.cardBg,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: "800",
          fontSize: 20,
        },
      })}
    >
      <Tab.Screen
        name={SCREEN_NAMES.CHARACTERS_TAB}
        component={CharacterStack}
        options={{
          title: "Characters",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={SCREEN_NAMES.PLANETS_TAB}
        component={PlanetStack}
        options={{
          title: "Planets",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={SCREEN_NAMES.FAVORITES_TAB}
        component={FavoritesStack}
        options={{
          title: "Favorites",
        }}
      />
      <Tab.Screen
        name={SCREEN_NAMES.SETTINGS_TAB}
        component={SettingsScreen}
        options={{
          title: "Settings",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
