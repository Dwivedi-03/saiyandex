import { useTheme } from "@/context/ThemeContext";
import CharacterDetailScreen from "@/screens/characters/CharacterDetailScreen";
import FavoritesScreen from "@/screens/favorites/FavoritesScreen";
import { SCREEN_NAMES } from "@/utils/constants";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const FavoritesStack: React.FC = ({ route, navigation }: any) => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.cardBg,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: "800",
          fontSize: 20,
        },
      }}
    >
      <Stack.Screen
        name={SCREEN_NAMES.FAVORITES}
        component={FavoritesScreen}
        options={{ title: "Favorites" }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.CHARACTER_DETAIL}
        component={CharacterDetailScreen}
        options={() => ({ title: route.param?.character?.name || "Details" })}
      />
    </Stack.Navigator>
  );
};

export default FavoritesStack;
