import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  TextInput,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { getPlanets } from "../../services/api";
import PlanetCard from "../../components/PlanetCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import ScannerOverlay from "../../components/ScannerOverlay";
import { SCREEN_NAMES } from "../../utils/constants";
import { Planet } from "@/types";
import { Ionicons } from "@expo/vector-icons";

const PlanetListScreen = ({ navigation }: { navigation: any }) => {
  const { theme } = useTheme();
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPlanets();
  }, []);

  const fetchPlanets = async () => {
    try {
      setLoading(true);
      const data = await getPlanets(1, 50);
      setPlanets(data.items || []);
    } catch (error) {
      console.error("Error fetching planets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPlanets();
    setRefreshing(false);
  };

  const handlePlanetPress = (planet: Planet) => {
    navigation.navigate(SCREEN_NAMES.PLANET_DETAIL, { id: planet.id });
  };

  const filteredPlanets = planets.filter((planet) =>
    planet.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* <ScannerOverlay /> */}
      <View
        style={[
          styles.searchContainer,
          { borderColor: theme.colors.border },
          { backgroundColor: theme.colors.cardBg },
        ]}
      >
        <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: theme.colors.text }]}
          placeholder="Search planets..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredPlanets}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <PlanetCard planet={item} onPress={() => handlePlanetPress(item)} />
        )}
        ListEmptyComponent={<EmptyState message="No planets found" icon="🌍" />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme.colors.primary}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  container: {
    flex: 1,
  },
  listContainer: {
    paddingVertical: 0,
  },
});

export default PlanetListScreen;
