// ============================================
// TYPE DEFINITIONS
// ============================================
// This file contains all TypeScript interfaces and types
// These help us catch errors during development and provide autocomplete

// Character represents a Dragon Ball character from the API
export interface Character {
  id: number;                    // Unique identifier
  name: string;                  // Character name (e.g., "Goku")
  ki: string;                    // Base power level
  maxKi: string;                 // Maximum power level
  race: string;                  // Race (e.g., "Saiyan")
  gender: string;                // Gender (Male/Female)
  description: string;           // Character description
  image: string;                 // Image URL
  affiliation: string;           // Affiliation (e.g., "Z Fighter")
  deletedAt: string | null;      // Soft delete timestamp
  originPlanet?: Planet;         // Home planet
  transformations?: Transformation[]; // All transformation forms
}

// Transformation represents a character's different forms
export interface Transformation {
  id: number;
  name: string;                  // Transformation name (e.g., "Super Saiyan")
  image: string;                 // Transformation image URL
  ki: string;                    // Power level in this form
}

// Planet represents a location in Dragon Ball universe
export interface Planet {
  id: number;
  name: string;                  // Planet name (e.g., "Earth")
  isDestroyed: boolean;          // Whether planet is destroyed
  description: string;           // Planet description
  image: string;                 // Planet image URL
  deletedAt: string | null;
  characters?: Character[];      // Characters from this planet
}

// API Response wrapper for paginated data
export interface ApiResponse<T> {
  items: T[];                    // Array of items (characters or planets)
  meta: {
    totalItems: number;          // Total count in database
    itemCount: number;           // Count in current response
    itemsPerPage: number;        // Items per page
    totalPages: number;          // Total number of pages
    currentPage: number;         // Current page number
  };
  links: {
    first: string;               // URL to first page
    previous: string;            // URL to previous page
    next: string;                // URL to next page
    last: string;                // URL to last page
  };
}

// Theme colors for light and dark modes
export interface ThemeColors {
  primary: string;               // Main brand color
  secondary: string;             // Secondary accent color
  background: string;            // Main background color
  cardBg: string;                // Card background color
  text: string;                  // Primary text color
  textSecondary: string;         // Secondary text color
  border: string;                // Border color
  danger: string;                // Error/danger color
  success: string;               // Success color
  warning: string;               // Warning color
  scouter: string;               // Scouter HUD color
  scanLine: string;              // Scanner line color

  // Character-specific aura colors
  goku: string;
  vegeta: string;
  ssj: string;
  ssb: string;
  ui: string;
}

// Complete theme object
export interface Theme {
  colors: ThemeColors;           // All color definitions
  isDark: boolean;               // Whether it's dark mode
  fonts: {
    regular: string;             // Regular font
    bold: string;                // Bold font
    italic: string;              // Italic font
  }
}

// Navigation types for type-safe navigation
export type RootStackParamList = {
  CharacterList: undefined;
  CharacterDetail: { character: Character };
  PlanetList: undefined;
  PlanetDetail: { planet: Planet };
  Favorites: undefined;
  Settings: undefined;
};

export type TabParamList = {
  CharactersTab: undefined;
  PlanetsTab: undefined;
  FavoritesTab: undefined;
  SettingsTab: undefined;
};