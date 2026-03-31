import { ThemeColors } from "../types";

export const LIGHT_COLORS: ThemeColors = {
    // Main colors
    primary: '#FF6B00',           // Orange - main brand color
    secondary: '#FFD700',         // Gold - accent color
    background: '#F5F5F5',        // Light gray - main background
    cardBg: '#FFFFFF',            // White - card backgrounds

    // Text colors
    text: '#1A1F3A',              // Dark blue - primary text
    textSecondary: '#666666',     // Gray - secondary text

    // UI colors
    border: '#E0E0E0',            // Light gray - borders
    danger: '#FF3B30',            // Red - errors/delete
    success: '#34C759',           // Green - success
    warning: '#FF9500',           // Orange - warnings

    // Scouter HUD (keeps green even in light mode)
    scouter: '#FF6B00',           // Orange scouter
    scanLine: 'rgba(255, 107, 0, 0.3)', // Semi-transparent orange

    // Character aura colors (same in both themes)
    goku: '#FF8C00',              // Orange aura for Goku
    vegeta: '#9370DB',            // Purple aura for Vegeta
    ssj: '#FFD700',               // Gold for Super Saiyan
    ssb: '#00CED1',               // Cyan for Super Saiyan Blue
    ui: '#E0E0E0',                // Silver for Ultra Instinct
};

export const DARK_COLORS: ThemeColors = {
  // Main colors
  primary: '#00FF41',           // Neon green - Scouter color
  secondary: '#FF6B00',         // Orange - accent
  background: '#0A0E27',        // Deep space blue - main background
  cardBg: '#1A1F3A',            // Dark blue - card backgrounds
  
  // Text colors
  text: '#FFFFFF',              // White - primary text
  textSecondary: '#B0B0B0',     // Light gray - secondary text
  
  // UI colors
  border: '#2A2F4A',            // Dark blue - borders
  danger: '#FF3B30',            // Red - errors/delete
  success: '#34C759',           // Green - success
  warning: '#FF9500',           // Orange - warnings
  
  // Scouter HUD
  scouter: '#00FF41',           // Neon green scouter
  scanLine: 'rgba(0, 255, 65, 0.3)', // Semi-transparent green
  
  // Character aura colors (same as light mode)
  goku: '#FF8C00',
  vegeta: '#9370DB',
  ssj: '#FFD700',
  ssb: '#00CED1',
  ui: '#E0E0E0',
};