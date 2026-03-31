export const SCREEN_NAMES = {
    // Tabs
    CHARACTERS_TAB: 'CharactersTab',
    PLANETS_TAB: 'PlanetsTab',
    FAVORITES_TAB: 'FavoritesTab',
    SETTINGS_TAB: 'SettingsTab',

    // Screens
    CHARACTER_LIST: 'CharacterList',
    CHARACTER_DETAIL: 'CharacterDetail',
    PLANET_LIST: 'PlanetList',
    PLANET_DETAIL: 'PlanetDetail',
    FAVORITES: 'Favorites',
    SETTINGS: 'Settings',
} as const;

export const ANIMATION_DURATION = {
    FAST: 200,
    MEDIUM: 400,
    SLOW: 600,
    VERY_SLOW: 1000,
} as const;

export const API_CONFIG = {
    BASE_URL: 'https://dragonball-api.com/api',
    TIMEOUT: 10000,
    ITEMS_PER_PAGE: 50,
} as const;


export const STORAGE_KEYS = {
    FAVORITES: '@saiyandex_favorites',
    THEME: '@saiyandex_theme',
    CACHE_PREFIX: '@saiyandex_cache_',
} as const;