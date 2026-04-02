import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { getCharacters } from "../../services/api";
import CharacterCard from "../../components/CharacterCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import ScannerOverlay from "../../components/ScannerOverlay";
import { SCREEN_NAMES } from "../../utils/constants";
import { Character } from "@/types";
import { Ionicons } from "@expo/vector-icons";

const CharacterListScreen = ({ navigation }: { navigation: any }) => {
  const { theme } = useTheme();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const races = [
    "All",
    "Saiyan",
    "Namekian",
    "Human",
    "Android",
    "Frieza Race",
  ];
  const [selectedRace, setSelectedRace] = useState("All");

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const data = await getCharacters(1, 50);
      setCharacters(data.items || []);
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchCharacters();
    setRefreshing(false);
  };

  const handleCharacterPress = (character: Character) => {
    navigation.navigate(SCREEN_NAMES.CHARACTER_DETAIL, { id: character.id });
  };

  const filteredCharacters = characters.filter((char) => {
    // Match race
    const matchesRace = selectedRace === "All" || char.race === selectedRace;

    // Match search query
    const matchesSearch = char.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Include only if both match
    return matchesRace && matchesSearch;
  });

  //   const filteredCharacters = characters.filter(char => {
  //   if (selectedRace === 'All') return true;
  //   return char.race === selectedRace;
  // });

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
          placeholder="Search characters..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        {races.map((race) => (
          <TouchableOpacity
            key={race}
            style={[
              styles.filterButton,
              selectedRace === race && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedRace(race)}
          >
            <Text style={styles.filterText}>{race}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView> */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {races.map((race) => {
          const isActive = selectedRace === race;
          return (
            <TouchableOpacity
              key={race}
              style={[
                styles.filterButton,
                { backgroundColor: theme.colors.background },
                { borderColor: theme.colors.border },
                isActive && [
                  {
                    backgroundColor: theme.colors.primary,
                    borderColor: theme.colors.primary,
                  },
                ],
              ]}
              onPress={() => setSelectedRace(race)}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: theme.colors.textSecondary },
                  isActive && { color: theme.colors.cardBg },
                ]}
              >
                {race}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <FlatList
        data={filteredCharacters}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            onPress={() => handleCharacterPress(item)}
          />
        )}
        ListEmptyComponent={
          <EmptyState message="No characters found" icon="👤" />
        }
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
  filterContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
    height: 50,
    flexGrow: 0,
  },
  filterButton: {
    height: "100%",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
  },
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 8,
  },
});

export default CharacterListScreen;
