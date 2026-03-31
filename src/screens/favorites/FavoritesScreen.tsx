import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useFavorites } from "../../context/FavoritesContext";
import CharacterCard from "../../components/CharacterCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import ScannerOverlay from "../../components/ScannerOverlay";
import { SCREEN_NAMES } from "../../utils/constants";

interface FavoritesScreenProps {
  navigation: any;
}

const FavoritesScreen = ({ navigation }: FavoritesScreenProps) => {
  const { theme } = useTheme();
  const { favorites, loading } = useFavorites();

  const handleCharacterPress = (character: any) => {
    navigation.navigate(SCREEN_NAMES.CHARACTER_DETAIL, { character });
  };

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
      <FlatList
        data={favorites}
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
          <EmptyState message="No favorite characters yet" icon="💔" />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 8,
  },
});

export default FavoritesScreen;
