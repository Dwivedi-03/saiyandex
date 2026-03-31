import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../context/ThemeContext";
import { useFavorites } from "../../context/FavoritesContext";
import { Ionicons } from "@expo/vector-icons";
import {
  getAuraColor,
  getRaceIcon,
  getGenderIcon,
  getAffilationColor,
} from "../../utils/helpers";
import EnergyAura from "../../components/EnergyAura";
import PowerLevelMeter from "../../components/PowerLevelMeter";
import { Share } from "react-native";

const CharacterDetailScreen = ({ route, navigation }: any) => {
  const { character } = route.params;
  const { theme } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();

  const auraColor = getAuraColor(character.race, theme.isDark);
  const isFav = isFavorite(character.id);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={handleShare} style={{ marginRight: 16 }}>
            <Ionicons
              name="share-outline"
              size={28}
              color={theme.colors.text}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavorite(character)} style={{ marginRight: 16 }}>
            <Ionicons
              name={isFav ? "heart" : "heart-outline"}
              size={28}
              color={isFav ? theme.colors.danger : theme.colors.text}
            />
          </TouchableOpacity>
        </View>
        // <TouchableOpacity
        //   onPress={() => toggleFavorite(character)}
        //   style={styles.headerButton}
        // >
        //   <Ionicons
        //     name={isFav ? "heart" : "heart-outline"}
        //     size={28}
        //     color={isFav ? theme.colors.danger : theme.colors.text}
        //   />
        // </TouchableOpacity>
      ),
    });
  }, [navigation, isFav]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${character.name} from Dragon Ball! Power Level: ${character.ki}`,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <LinearGradient
        colors={[theme.colors.cardBg, theme.colors.background]}
        style={styles.header}
      >
        <View style={styles.imageContainer}>
          <EnergyAura color={auraColor} size={250} />
          <Image
            source={{ uri: character.image }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <Text style={[styles.name, { color: theme.colors.text }]}>
          {character.name}
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        {/* Basic Info */}
        <View
          style={[styles.section, { backgroundColor: theme.colors.cardBg }]}
        >
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text
                style={[
                  styles.infoLabel,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Race
              </Text>
              <View style={styles.infoValueContainer}>
                <Text style={styles.infoIcon}>
                  {getRaceIcon(character.race)}
                </Text>
                <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                  {character.race}
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Text
                style={[
                  styles.infoLabel,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Gender
              </Text>
              <View style={styles.infoValueContainer}>
                <Text style={styles.infoIcon}>
                  {getGenderIcon(character.gender)}
                </Text>
                <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                  {character.gender}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Power Levels */}
        {character.ki && (
          <View
            style={[styles.section, { backgroundColor: theme.colors.cardBg }]}
          >
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Power Statistics
            </Text>
            <PowerLevelMeter powerLevel={character.ki} />
            {character.maxKi && (
              <PowerLevelMeter powerLevel={character.maxKi} />
            )}
          </View>
        )}

        {/* Affiliation */}
        {character.affiliation && (
          <View
            style={[styles.section, { backgroundColor: theme.colors.cardBg }]}
          >
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Affiliation
            </Text>
            <View
              style={[
                styles.affiliationBadge,
                {
                  backgroundColor:
                    getAffilationColor(character.affiliation) + "20",
                },
              ]}
            >
              <Text
                style={[
                  styles.affiliationText,
                  { color: getAffilationColor(character.affiliation) },
                ]}
              >
                {character.affiliation}
              </Text>
            </View>
          </View>
        )}

        {/* Description */}
        {character.description && (
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
              {character.description}
            </Text>
          </View>
        )}

        {/* Transformations */}
        {character.transformations && character.transformations.length > 0 && (
          <View
            style={[styles.section, { backgroundColor: theme.colors.cardBg }]}
          >
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Transformations ({character.transformations.length})
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {character.transformations.map((trans: any, index: number) => (
                <View key={index} style={styles.transformationCard}>
                  <Image
                    source={{ uri: trans.image }}
                    style={styles.transformationImage}
                    resizeMode="contain"
                  />
                  <Text
                    style={[
                      styles.transformationName,
                      { color: theme.colors.text },
                    ]}
                    numberOfLines={2}
                  >
                    {trans.name}
                  </Text>
                </View>
              ))}
            </ScrollView>
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
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: "100%",
  },
  image: {
    width: 200,
    height: 280,
  },
  name: {
    fontSize: 32,
    fontWeight: "900",
    marginTop: 16,
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
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  infoItem: {
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  infoValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "700",
  },
  affiliationBadge: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  affiliationText: {
    fontSize: 16,
    fontWeight: "700",
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
  },
  transformationCard: {
    width: 120,
    marginRight: 12,
    alignItems: "center",
  },
  transformationImage: {
    width: 120,
    height: 150,
    borderRadius: 12,
  },
  transformationName: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
  headerButton: {
    marginRight: 16,
  },
});

export default CharacterDetailScreen;
