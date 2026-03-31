import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { useTheme } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Planet } from "../types";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 32;

interface PlanetCardProps {
  planet: Planet;
  onPress: () => void;
}

const PlanetCard: React.FC<PlanetCardProps> = ({ planet, onPress }) => {
  const { theme } = useTheme();
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.spring(scaleAnim, {
      toValue: 0.98,
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

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
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
          <View style={styles.planetContainer}>
            <Animated.View
              style={[
                styles.planet,
                {
                  backgroundColor: theme.colors.background,
                  transform: [{ rotate }],
                },
              ]}
            >
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
            </Animated.View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.name, { color: theme.colors.text }]}>
              {planet.name}
            </Text>

            {planet.description && (
              <Text
                style={[
                  styles.description,
                  { color: theme.colors.textSecondary },
                ]}
                numberOfLines={2}
              >
                {planet.description}
              </Text>
            )}

            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Ionicons
                  name="people-outline"
                  size={16}
                  color={theme.colors.textSecondary}
                />
                <Text
                  style={[
                    styles.detailText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {planet.characters?.length || 0} Characters
                </Text>
              </View>

              {planet.isDestroyed && (
                <View
                  style={[
                    styles.destroyedBadge,
                    { backgroundColor: theme.colors.danger + "20" },
                  ]}
                >
                  <Text
                    style={[
                      styles.destroyedText,
                      { color: theme.colors.danger },
                    ]}
                  >
                    Destroyed
                  </Text>
                </View>
              )}
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  card: {
    borderRadius: 20,
    borderWidth: 2,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  planetContainer: {
    width: 80,
    height: 80,
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  planet: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    // opacity: 0.8,
  },
  imageWrapper: {
    width: "100%",
    height: "100%",
    borderRadius: 40, // match your planet circle
    overflow: "hidden", // clip the image inside the circle
    justifyContent: "center",
    alignItems: "center",
  },
  planetImage: {
    width: "100%",
    height: "100%",
  },
  planetEmoji: {
    fontSize: 40,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: "600",
  },
  destroyedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  destroyedText: {
    fontSize: 10,
    fontWeight: "700",
  },
});

export default PlanetCard;
