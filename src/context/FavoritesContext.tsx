import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Character } from "@/types";
import { STORAGE_KEYS } from "@/utils/constants";

interface FavoritesContextType {
  favorites: Character[];
  loading: boolean;
  addFavorite: (character: Character) => Promise<void>;
  removeFavorite: (characterId: number) => Promise<void>;
  isFavorite: (characterId: number) => boolean;
  toggleFavorite: (character: Character) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async (): Promise<void> => {
    try {
      const savedFavorites = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (savedFavorites !== null) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (character: Character): Promise<void> => {
    try {
      const newFavorites = [...favorites, character];
      setFavorites(newFavorites);
      await AsyncStorage.setItem(
        STORAGE_KEYS.FAVORITES,
        JSON.stringify(newFavorites),
      );
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const removeFavorite = async (characterId: number): Promise<void> => {
    try {
      const newFavorites = favorites.filter((fav) => fav.id !== characterId);
      setFavorites(newFavorites);
      await AsyncStorage.setItem(
        STORAGE_KEYS.FAVORITES,
        JSON.stringify(newFavorites),
      );
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const isFavorite = (characterId: number): boolean => {
    return favorites.some((fav) => fav.id === characterId);
  };

  const toggleFavorite = async (character: Character): Promise<void> => {
    if (isFavorite(character.id)) {
      await removeFavorite(character.id);
    } else {
      await addFavorite(character);
    }
  };

  const value: FavoritesContextType = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    loading,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
};
