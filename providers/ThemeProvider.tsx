import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import { Theme, themes, lightTheme, darkTheme } from '@/constants/Theme';

// Keys for AsyncStorage
const THEME_STORAGE_KEY = 'mammut_theme';
const FOLLOW_SYSTEM_THEME_KEY = 'mammut_follow_system_theme';

// Type for theme names
export type ThemeName = keyof typeof themes;

// Theme context interface
interface ThemeContextType {
  theme: Theme;
  themeType: ThemeName;
  setTheme: (themeType: ThemeName) => void;
  isFollowingSystem: boolean;
  setFollowingSystem: (follow: boolean) => void;
  availableThemes: typeof themes;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  themeType: 'light',
  setTheme: () => {},
  isFollowingSystem: true,
  setFollowingSystem: () => {},
  availableThemes: themes,
});

// Custom hook for using the theme context
export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Get device color scheme
  const deviceColorScheme = useDeviceColorScheme();
  
  // State for the current theme and whether to follow system theme
  const [themeType, setThemeType] = useState<ThemeName>('light');
  const [isFollowingSystem, setIsFollowingSystem] = useState<boolean>(true);
  
  // Effect to load saved theme preference
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        const followSystem = await AsyncStorage.getItem(FOLLOW_SYSTEM_THEME_KEY);
        
        if (followSystem !== null) {
          setIsFollowingSystem(followSystem === 'true');
        }
        
        if (savedTheme && Object.keys(themes).includes(savedTheme)) {
          setThemeType(savedTheme as ThemeName);
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
      }
    };
    
    loadThemePreference();
  }, []);
  
  // Effect to update theme when system theme changes (if following system)
  useEffect(() => {
    if (isFollowingSystem) {
      setThemeType(deviceColorScheme === 'dark' ? 'dark' : 'light');
    }
  }, [deviceColorScheme, isFollowingSystem]);
  
  // Function to change the theme
  const setTheme = async (newThemeType: ThemeName) => {
    try {
      setThemeType(newThemeType);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newThemeType);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };
  
  // Function to set whether to follow the system theme
  const setFollowingSystem = async (follow: boolean) => {
    try {
      setIsFollowingSystem(follow);
      await AsyncStorage.setItem(FOLLOW_SYSTEM_THEME_KEY, follow.toString());
      
      if (follow) {
        // If following system, immediately apply the system theme
        const systemTheme = deviceColorScheme === 'dark' ? 'dark' : 'light';
        setThemeType(systemTheme);
        await AsyncStorage.setItem(THEME_STORAGE_KEY, systemTheme);
      }
    } catch (error) {
      console.error('Error saving system theme preference:', error);
    }
  };
  
  // Get the current theme object
  const theme = themes[themeType];
  
  // Context value
  const contextValue: ThemeContextType = {
    theme,
    themeType,
    setTheme,
    isFollowingSystem,
    setFollowingSystem,
    availableThemes: themes,
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 