import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Switch, useColorScheme, TextInput } from 'react-native';
import { useTheme, ThemeName } from '@/providers/ThemeProvider';
import { Theme, themes, createCustomTheme } from '@/constants/Theme';
import { Stack } from 'expo-router';

// Component to display a theme preview
const ThemePreview = ({ theme, isSelected, onSelect }: { theme: Theme; isSelected: boolean; onSelect: () => void }) => {
  return (
    <Pressable
      style={[
        styles.themePreview,
        { backgroundColor: theme.colors.background },
        isSelected && styles.selectedTheme
      ]}
      onPress={onSelect}
    >
      <View style={styles.previewContent}>
        <View style={[styles.previewHeader, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.previewTitle, { color: theme.colors.text }]}>
            {theme.displayName}
          </Text>
        </View>
        <View style={styles.colorSamples}>
          <View style={[styles.colorSample, { backgroundColor: theme.colors.primary }]} />
          <View style={[styles.colorSample, { backgroundColor: theme.colors.secondary }]} />
          <View style={[styles.colorSample, { backgroundColor: theme.colors.accent }]} />
          <View style={[styles.colorSample, { backgroundColor: theme.colors.text }]} />
        </View>
        {isSelected && (
          <View style={styles.selectedIndicator}>
            <Text style={[styles.selectedText, { color: theme.colors.primary }]}>Active</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default function ThemeScreen() {
  const { theme, themeType, setTheme, isFollowingSystem, setFollowingSystem, availableThemes } = useTheme();
  const deviceColorScheme = useColorScheme();
  
  // State for custom theme color
  const [customColor, setCustomColor] = useState('#ff5a5f');
  const [customThemeName, setCustomThemeName] = useState('My Theme');
  
  // Function to create and apply a custom theme
  const applyCustomTheme = () => {
    const baseTheme = deviceColorScheme === 'dark' ? themes.dark : themes.light;
    const newTheme = createCustomTheme(baseTheme, customColor, customThemeName);
    
    // In a real implementation, you would save this custom theme to a store
    // For now, we'll just pretend to apply it and show an alert
    alert(`Custom theme "${customThemeName}" would be created with primary color ${customColor}`);
  };
  
  // Group themes by category
  const systemThemes = Object.entries(availableThemes)
    .filter(([_, theme]) => theme.category === 'system')
    .map(([key, theme]) => ({ key: key as ThemeName, theme }));
    
  const elementThemes = Object.entries(availableThemes)
    .filter(([_, theme]) => theme.category === 'element')
    .map(([key, theme]) => ({ key: key as ThemeName, theme }));
    
  const biomeThemes = Object.entries(availableThemes)
    .filter(([_, theme]) => theme.category === 'biome')
    .map(([key, theme]) => ({ key: key as ThemeName, theme }));
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen options={{ title: 'Theme Settings', headerStyle: { backgroundColor: theme.colors.background }, headerTintColor: theme.colors.text }} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* System Theme Toggle */}
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>System Theme</Text>
          <View style={styles.settingRow}>
            <Text style={[styles.settingText, { color: theme.colors.text }]}>
              Use device theme
            </Text>
            <Switch
              value={isFollowingSystem}
              onValueChange={setFollowingSystem}
              trackColor={{ false: theme.colors.surfaceVariant, true: theme.colors.primary }}
              thumbColor={theme.colors.background}
            />
          </View>
          <Text style={[styles.sectionDescription, { color: theme.colors.textSecondary }]}>
            Automatically switch between light and dark themes based on your device settings.
          </Text>
        </View>
        
        {/* System Themes */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>System Themes</Text>
          <Text style={[styles.sectionDescription, { color: theme.colors.textSecondary }]}>
            Basic light, dark, and high contrast themes.
          </Text>
          <View style={styles.themeGrid}>
            {systemThemes.map(({ key, theme: themeOption }) => (
              <ThemePreview
                key={key}
                theme={themeOption}
                isSelected={themeType === key}
                onSelect={() => {
                  setTheme(key);
                  if (isFollowingSystem) {
                    setFollowingSystem(false);
                  }
                }}
              />
            ))}
          </View>
        </View>
        
        {/* Element Themes */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Element Themes</Text>
          <Text style={[styles.sectionDescription, { color: theme.colors.textSecondary }]}>
            Themes based on the four classic elements.
          </Text>
          <View style={styles.themeGrid}>
            {elementThemes.map(({ key, theme: themeOption }) => (
              <ThemePreview
                key={key}
                theme={themeOption}
                isSelected={themeType === key}
                onSelect={() => {
                  setTheme(key);
                  if (isFollowingSystem) {
                    setFollowingSystem(false);
                  }
                }}
              />
            ))}
          </View>
        </View>
        
        {/* Biome Themes */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Biome Themes</Text>
          <Text style={[styles.sectionDescription, { color: theme.colors.textSecondary }]}>
            Themes inspired by natural environments.
          </Text>
          <View style={styles.themeGrid}>
            {biomeThemes.map(({ key, theme: themeOption }) => (
              <ThemePreview
                key={key}
                theme={themeOption}
                isSelected={themeType === key}
                onSelect={() => {
                  setTheme(key);
                  if (isFollowingSystem) {
                    setFollowingSystem(false);
                  }
                }}
              />
            ))}
          </View>
        </View>
        
        {/* Custom Theme Creator */}
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Custom Theme</Text>
          <Text style={[styles.sectionDescription, { color: theme.colors.textSecondary }]}>
            Create your own theme with a custom primary color.
          </Text>
          
          <View style={styles.customThemeForm}>
            <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Theme Name</Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  color: theme.colors.text,
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.border,
                }
              ]}
              value={customThemeName}
              onChangeText={setCustomThemeName}
              placeholder="My Custom Theme"
              placeholderTextColor={theme.colors.placeholder}
            />
            
            <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Primary Color</Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  color: theme.colors.text,
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.border,
                }
              ]}
              value={customColor}
              onChangeText={setCustomColor}
              placeholder="#FF5A5F"
              placeholderTextColor={theme.colors.placeholder}
            />
            
            <View style={styles.colorPreview}>
              <Text style={[styles.colorPreviewText, { color: theme.colors.text }]}>Preview:</Text>
              <View style={[styles.colorPreviewSample, { backgroundColor: customColor }]} />
            </View>
            
            <Pressable
              style={[styles.applyButton, { backgroundColor: theme.colors.primary }]}
              onPress={applyCustomTheme}
            >
              <Text style={[styles.applyButtonText, { color: theme.colors.textInverse }]}>
                Create Custom Theme
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  settingText: {
    fontSize: 16,
  },
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  themePreview: {
    width: '48%',
    height: 120,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  previewContent: {
    flex: 1,
  },
  previewHeader: {
    padding: 8,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  previewTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  colorSamples: {
    flexDirection: 'row',
    padding: 8,
  },
  colorSample: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 4,
  },
  selectedTheme: {
    borderWidth: 2,
    borderColor: '#38bdf8',
  },
  selectedIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderTopLeftRadius: 8,
  },
  selectedText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  customThemeForm: {
    marginTop: 8,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 4,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  colorPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  colorPreviewText: {
    marginRight: 8,
  },
  colorPreviewSample: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  applyButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 