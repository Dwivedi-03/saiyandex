import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "../context/ThemeContext";
import { SCREEN_NAMES } from "../utils/constants";

import CharacterListScreen from "../screens/characters/CharacterListScreen";
import CharacterDetailScreen from "../screens/characters/CharacterDetailScreen";
import PlanetDetailScreen from "@/screens/planets/PlanetDetailScreen";

const Stack = createStackNavigator();

const CharacterStack: React.FC = ({ route, navigation }: any) => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.cardBg,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        // headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name={SCREEN_NAMES.CHARACTER_LIST}
        component={CharacterListScreen}
        options={{ title: "Characters" }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.CHARACTER_DETAIL}
        component={CharacterDetailScreen}
        options={() => ({
          title: route.params?.character?.name || "Details",
        })}
      />
      <Stack.Screen
        name={SCREEN_NAMES.PLANET_DETAIL}
        component={PlanetDetailScreen}
        options={() => ({
          title: route.params?.character?.name || "Details",
        })}
      />
    </Stack.Navigator>
  );
};

export default CharacterStack;
