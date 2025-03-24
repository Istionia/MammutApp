import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider, useTheme } from '@/providers/ThemeProvider';
import { themes } from '@/constants/Theme';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

// Mock ColorScheme
jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  __esModule: true,
  default: jest.fn(() => 'light'),
}));

// Test component that uses the theme
const TestComponent = () => {
  const { theme, themeType, setTheme, isFollowingSystem, setFollowingSystem } = useTheme();
  
  return (
    <View>
      <Text testID="theme-type">{themeType}</Text>
      <Text testID="theme-primary">{theme.colors.primary}</Text>
      <Text testID="is-following-system">{isFollowingSystem.toString()}</Text>
      <TouchableOpacity testID="set-dark-theme" onPress={() => setTheme('dark')}>
        <Text>Set Dark Theme</Text>
      </TouchableOpacity>
      <TouchableOpacity testID="toggle-system-theme" onPress={() => setFollowingSystem(!isFollowingSystem)}>
        <Text>Toggle System Theme</Text>
      </TouchableOpacity>
    </View>
  );
};

describe('Theme System', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (AsyncStorage.getItem as jest.Mock).mockImplementation(() => Promise.resolve(null));
  });
  
  it('provides the default light theme initially', async () => {
    // Setup AsyncStorage mock to return null (default)
    (AsyncStorage.getItem as jest.Mock).mockImplementation(() => Promise.resolve(null));
    
    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    // Wait for the theme to be fully initialized
    await waitFor(() => {
      expect(getByTestId('theme-type').props.children).toBe('light');
    }, { timeout: 1000 });
    
    expect(getByTestId('theme-primary').props.children).toBe(themes.light.colors.primary);
    expect(getByTestId('is-following-system').props.children).toBe('true');
  });
  
  it('loads saved theme preference from storage', async () => {
    // Setup AsyncStorage mock to return custom values
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key: string) => {
      if (key === 'mammut_theme') return Promise.resolve('dark');
      if (key === 'mammut_follow_system_theme') return Promise.resolve('false');
      return Promise.resolve(null);
    });
    
    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    // Wait for the theme to be fully initialized with the mock values
    await waitFor(() => {
      expect(getByTestId('theme-type').props.children).toBe('dark');
    }, { timeout: 1000 });
    
    expect(getByTestId('is-following-system').props.children).toBe('false');
  });
  
  it('changes theme when setTheme is called', async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    // Wait for the theme to be fully initialized
    await waitFor(() => {
      expect(getByTestId('theme-type').props.children).toBe('light');
    }, { timeout: 1000 });
    
    // Trigger theme change
    fireEvent.press(getByTestId('set-dark-theme'));
    
    // Wait for the theme change to complete
    await waitFor(() => {
      expect(getByTestId('theme-type').props.children).toBe('dark');
    }, { timeout: 1000 });
    
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('mammut_theme', 'dark');
  });
  
  it('toggles following system theme', async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    // Wait for the theme to be fully initialized
    await waitFor(() => {
      expect(getByTestId('is-following-system').props.children).toBe('true');
    }, { timeout: 1000 });
    
    // Toggle following system theme
    fireEvent.press(getByTestId('toggle-system-theme'));
    
    // Wait for the change to complete
    await waitFor(() => {
      expect(getByTestId('is-following-system').props.children).toBe('false');
    }, { timeout: 1000 });
    
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('mammut_follow_system_theme', 'false');
  });
  
  it('provides all available themes', async () => {
    const ThemeNames = () => {
      const { availableThemes } = useTheme();
      return (
        <View>
          {Object.keys(availableThemes).map(key => (
            <Text key={key} testID={`theme-${key}`}>{key}</Text>
          ))}
        </View>
      );
    };
    
    const { getByTestId } = render(
      <ThemeProvider>
        <ThemeNames />
      </ThemeProvider>
    );
    
    // Wait for themes to be available
    await waitFor(() => {
      expect(getByTestId('theme-light')).toBeTruthy();
    }, { timeout: 1000 });
    
    // Check for existence of some key themes
    expect(getByTestId('theme-dark')).toBeTruthy();
    expect(getByTestId('theme-fire')).toBeTruthy();
    expect(getByTestId('theme-water')).toBeTruthy();
    expect(getByTestId('theme-forest')).toBeTruthy();
  });
}); 