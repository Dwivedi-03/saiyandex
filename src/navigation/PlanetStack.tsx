import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../context/ThemeContext';
import { SCREEN_NAMES } from '../utils/constants';

import PlanetListScreen from '../screens/planets/PlanetListScreen';
import PlanetDetailScreen from '../screens/planets/PlanetDetailScreen';
import CharacterDetailScreen from '../screens/characters/CharacterDetailScreen';

const Stack = createStackNavigator();

const PlanetStack: React.FC = ({ route, navigation }: any) => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.cardBg,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: '800',
          fontSize: 20,
        },
        // headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name={SCREEN_NAMES.PLANET_LIST}
        component={PlanetListScreen}
        options={{ title: 'Planets' }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.PLANET_DETAIL}
        component={PlanetDetailScreen}
        options={() => ({ title: route.params?.planet?.name || 'Details' })}
      />
      <Stack.Screen
        name={SCREEN_NAMES.CHARACTER_DETAIL}
        component={CharacterDetailScreen}
        options={() => ({ title: route.params?.character?.name || 'Details' })}
      />
    </Stack.Navigator>
  );
};

export default PlanetStack;