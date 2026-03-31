import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useFavorites } from '../../context/FavoritesContext';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const { favorites } = useFavorites();

  const handleClearFavorites = () => {
    Alert.alert(
      'Clear Favorites',
      'Are you sure you want to remove all favorite characters?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.setItem('favorites', JSON.stringify([]));
              Alert.alert('Success', 'Favorites cleared!');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear favorites');
            }
          },
        },
      ]
    );
  };

  const handleClearCache = async () => {
    Alert.alert(
      'Clear Cache',
      'This will clear all cached data. The app will reload.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              Alert.alert('Success', 'Cache cleared! Please restart the app.');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear cache');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        {/* Theme Section */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBg }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Appearance
          </Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons
                name={isDark ? 'moon' : 'sunny'}
                size={24}
                color={theme.colors.primary}
                style={styles.settingIcon}
              />
              <View>
                <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                  {isDark ? 'Dark Mode' : 'Light Mode'}
                </Text>
                <Text style={[styles.settingDescription, { color: theme.colors.textSecondary }]}>
                  {isDark ? 'Scouter Vision Theme' : 'Bright Day Theme'}
                </Text>
              </View>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor={isDark ? theme.colors.secondary : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Stats Section */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBg }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Statistics
          </Text>
          
          <View style={styles.statItem}>
            <Ionicons
              name="heart"
              size={24}
              color={theme.colors.danger}
              style={styles.settingIcon}
            />
            <Text style={[styles.statLabel, { color: theme.colors.text }]}>
              Favorite Characters
            </Text>
            <Text style={[styles.statValue, { color: theme.colors.primary }]}>
              {favorites.length}
            </Text>
          </View>
        </View>

        {/* Data Management */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBg }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Data Management
          </Text>
          
          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleClearFavorites}
          >
            <View style={styles.settingInfo}>
              <Ionicons
                name="trash-outline"
                size={24}
                color={theme.colors.danger}
                style={styles.settingIcon}
              />
              <View>
                <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                  Clear Favorites
                </Text>
                <Text style={[styles.settingDescription, { color: theme.colors.textSecondary }]}>
                  Remove all favorite characters
                </Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleClearCache}
          >
            <View style={styles.settingInfo}>
              <Ionicons
                name="refresh-outline"
                size={24}
                color={theme.colors.warning}
                style={styles.settingIcon}
              />
              <View>
                <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                  Clear Cache
                </Text>
                <Text style={[styles.settingDescription, { color: theme.colors.textSecondary }]}>
                  Clear all cached data
                </Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBg }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            About
          </Text>
          
          <View style={styles.aboutItem}>
            <Text style={[styles.aboutLabel, { color: theme.colors.textSecondary }]}>
              App Name
            </Text>
            <Text style={[styles.aboutValue, { color: theme.colors.text }]}>
              SaiyanDex
            </Text>
          </View>

          <View style={styles.aboutItem}>
            <Text style={[styles.aboutLabel, { color: theme.colors.textSecondary }]}>
              Version
            </Text>
            <Text style={[styles.aboutValue, { color: theme.colors.text }]}>
              1.0.0
            </Text>
          </View>

          <View style={styles.aboutItem}>
            <Text style={[styles.aboutLabel, { color: theme.colors.textSecondary }]}>
              API
            </Text>
            <Text style={[styles.aboutValue, { color: theme.colors.text }]}>
              Dragon Ball API
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontWeight: '800',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  settingDescription: {
    fontSize: 12,
    marginTop: 2,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  statLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  aboutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  aboutLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  aboutValue: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SettingsScreen;