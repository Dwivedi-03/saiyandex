import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { useTheme } from "../context/ThemeContext";
import { useFavorites } from "../context/FavoritesContext";
import { Ionicons } from "@expo/vector-icons";
import { getAuraColor, getRaceIcon, formatPowerLevel } from "../utils/helpers";
import { Character } from "../types";
import EnergyAura from "./EnergyAura";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 24;

interface CharacterCardProps {
  character: Character;
  onPress: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onPress,
}) => {
  const { theme } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();
  const floatAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleFavoritePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleFavorite(character);
  };

  const auraColor = getAuraColor(character.race, theme.isDark);
  const isFav = isFavorite(character.id);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: floatAnim }, { scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <LinearGradient
          colors={[theme.colors.cardBg, theme.colors.background]}
          style={[styles.card, { borderColor: theme.colors.border }]}
        >
          {/* Energy Aura */}
          <View style={styles.imageContainer}>
            <EnergyAura color={auraColor} size={140} />
            <Image
              source={{ uri: character.image }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          {/* Character Info */}
          <View style={styles.infoContainer}>
            <Text
              style={[styles.name, { color: theme.colors.text }]}
              numberOfLines={1}
            >
              {character.name}
            </Text>

            <View style={styles.raceContainer}>
              <Text style={styles.raceIcon}>{getRaceIcon(character.race)}</Text>
              <Text
                style={[styles.race, { color: theme.colors.textSecondary }]}
              >
                {character.race}
              </Text>
            </View>

            {/* Power Level */}
            {character.ki && (
              <View style={styles.powerContainer}>
                <Text
                  style={[
                    styles.powerLabel,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  POWER
                </Text>
                <Text
                  style={[styles.powerValue, { color: theme.colors.primary }]}
                >
                  {formatPowerLevel(character.ki)}
                </Text>
              </View>
            )}
          </View>

          {/* Favorite Button */}
          <TouchableOpacity
            style={[
              styles.favoriteButton,
              { backgroundColor: theme.colors.cardBg },
            ]}
            onPress={handleFavoritePress}
          >
            <Ionicons
              name={isFav ? "heart" : "heart-outline"}
              size={24}
              color={isFav ? theme.colors.danger : theme.colors.textSecondary}
            />
          </TouchableOpacity>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    margin: 8,
  },
  card: {
    borderRadius: 20,
    borderWidth: 2,
    padding: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    marginBottom: 8,
  },
  image: {
    width: 100,
    height: 140,
  },
  infoContainer: {
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
    textAlign: "center",
  },
  raceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  raceIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  race: {
    fontSize: 12,
    fontWeight: "600",
  },
  powerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  powerLabel: {
    fontSize: 10,
    fontWeight: "700",
    marginRight: 6,
  },
  powerValue: {
    fontSize: 14,
    fontWeight: "800",
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default CharacterCard;
