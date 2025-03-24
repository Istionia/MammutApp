import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Colors } from '@/constants/Colors';

// Define theme types
export type ThemeType = 
  | 'system' 
  | 'light' 
  | 'dark' 
  | 'highContrast' 
  | 'fire' 
  | 'water' 
  | 'earth' 
  | 'air' 
  | 'forest'
  | 'desert'
  | 'tundra'
  | 'ocean';

// Theme state interface
export interface ThemeState {
  theme: ThemeType;
  useSystemTheme: boolean;
  customColorPrimary: string | null;
  customColorSecondary: string | null;
}

// Initial state
const initialState: ThemeState = {
  theme: 'system',
  useSystemTheme: true,
  customColorPrimary: null,
  customColorSecondary: null,
};

// Create the theme slice
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
      state.useSystemTheme = action.payload === 'system';
    },
    setUseSystemTheme: (state, action: PayloadAction<boolean>) => {
      state.useSystemTheme = action.payload;
      if (action.payload) {
        state.theme = 'system';
      }
    },
    setCustomColors: (state, action: PayloadAction<{ primary: string; secondary: string }>) => {
      state.customColorPrimary = action.payload.primary;
      state.customColorSecondary = action.payload.secondary;
    },
    resetCustomColors: (state) => {
      state.customColorPrimary = null;
      state.customColorSecondary = null;
    },
  },
});

// Export actions
export const { setTheme, setUseSystemTheme, setCustomColors, resetCustomColors } = themeSlice.actions;

// Export reducer
export default themeSlice.reducer; 