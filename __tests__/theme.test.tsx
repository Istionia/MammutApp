import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
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
    let component: any;
    
    await act(async () => {
      component = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );
    });
    
    expect(component.getByTestId('theme-type').props.children).toBe('light');
    expect(component.getByTestId('theme-primary').props.children).toBe(themes.light.colors.primary);
    expect(component.getByTestId('is-following-system').props.children).toBe('true');
  });
  
  it('loads saved theme preference from storage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
      if (key === 'mammut_theme') return Promise.resolve('dark');
      if (key === 'mammut_follow_system_theme') return Promise.resolve('false');
      return Promise.resolve(null);
    });
    
    let component: any;
    
    await act(async () => {
      component = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );
    });
    
    expect(component.getByTestId('theme-type').props.children).toBe('dark');
    expect(component.getByTestId('is-following-system').props.children).toBe('false');
  });
  
  it('changes theme when setTheme is called', async () => {
    let component: any;
    
    await act(async () => {
      component = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );
    });
    
    expect(component.getByTestId('theme-type').props.children).toBe('light');
    
    await act(async () => {
      fireEvent.press(component.getByTestId('set-dark-theme'));
    });
    
    expect(component.getByTestId('theme-type').props.children).toBe('dark');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('mammut_theme', 'dark');
  });
  
  it('toggles following system theme', async () => {
    let component: any;
    
    await act(async () => {
      component = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );
    });
    
    expect(component.getByTestId('is-following-system').props.children).toBe('true');
    
    await act(async () => {
      fireEvent.press(component.getByTestId('toggle-system-theme'));
    });
    
    expect(component.getByTestId('is-following-system').props.children).toBe('false');
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
    
    let component: any;
    
    await act(async () => {
      component = render(
        <ThemeProvider>
          <ThemeNames />
        </ThemeProvider>
      );
    });
    
    // Check for existence of some key themes
    expect(component.getByTestId('theme-light')).toBeTruthy();
    expect(component.getByTestId('theme-dark')).toBeTruthy();
    expect(component.getByTestId('theme-fire')).toBeTruthy();
    expect(component.getByTestId('theme-water')).toBeTruthy();
    expect(component.getByTestId('theme-forest')).toBeTruthy();
  });
}); 