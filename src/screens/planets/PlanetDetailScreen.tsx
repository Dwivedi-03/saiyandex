import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { useTheme } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { SCREEN_NAMES } from "../../utils/constants";
import { Planet, Character } from "../../types";
import { getPlanetById } from "@/services/api";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Props {
  route: any;
  navigation: any;
}

const PlanetDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params;
  const [planet, setPlanet] = React.useState<Planet>({} as Planet);
  const [loading, setLoading] = React.useState(true);
  const { theme } = useTheme();

  const handleCharacterPress = (character: Character): void => {
    navigation.navigate(SCREEN_NAMES.CHARACTER_DETAIL, { id: character.id });
  };

  const fetchPlanetDetails = async (id: number) => {
    try {
      setLoading(true);
      const data = await getPlanetById(id);
      setPlanet(data);
    } catch (error) {
      console.error("Error fetching planet details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanetDetails(id);
  }, [id]);

  if (loading) {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <LoadingSpinner />
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <LinearGradient
        colors={[theme.colors.cardBg, theme.colors.background]}
        style={styles.header}
      >
        <View style={styles.planetIcon}>
          {/* <Text style={styles.planetEmoji}>🌍</Text> */}
          {planet.image ? (
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: planet.image }}
                style={styles.planetImage}
                resizeMode="cover"
              />
            </View>
          ) : (
            <Text style={styles.planetEmoji}>🌍</Text>
          )}
        </View>
        <Text style={[styles.name, { color: theme.colors.text }]}>
          {planet.name}
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        {/* Description */}
        {planet.description && (
          <View
            style={[styles.section, { backgroundColor: theme.colors.cardBg }]}
          >
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Description
            </Text>
            <Text
              style={[
                styles.description,
                { color: theme.colors.textSecondary },
              ]}
            >
              {planet.description}
            </Text>
          </View>
        )}

        {/* Characters from this planet */}
        {planet.characters && planet.characters.length > 0 && (
          <View
            style={[styles.section, { backgroundColor: theme.colors.cardBg }]}
          >
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Characters ({planet.characters.length})
            </Text>
            {planet.characters.map((character: Character, index: number) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.characterItem,
                  { borderBottomColor: theme.colors.border },
                ]}
                onPress={() => handleCharacterPress(character)}
              >
                <Image
                  source={{ uri: character.image }}
                  style={styles.characterImage}
                  resizeMode="contain"
                />
                <Text
                  style={[styles.characterName, { color: theme.colors.text }]}
                >
                  {character.name}
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  planetIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  planetEmoji: {
    fontSize: 80,
  },
  imageWrapper: {
    width: "100%",
    height: "100%",
    borderRadius: 60, // match your planet circle
    overflow: "hidden", // clip the image inside the circle
    justifyContent: "center",
    alignItems: "center",
  },
  planetImage: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
  },
  content: {
    padding: 16,
  },
  section: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
  },
  characterItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  characterImage: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  characterName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default PlanetDetailScreen;
