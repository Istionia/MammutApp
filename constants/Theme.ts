/**
 * Theme interfaces and objects for the Mammut app
 */
// Theme interface that all themes must implement
export interface Theme {
  id: string;
  name: string;
  displayName: string;
  category: 'system' | 'element' | 'biome' | 'custom';
  isDark: boolean;
  colors: {
    // Main colors
    primary: string;
    secondary: string;
    accent: string;
    error: string;
    warning: string;
    success: string;
    info: string;

    // Background colors
    background: string;
    card: string;
    modal: string;
    surface: string;
    surfaceVariant: string;

    // Text colors
    text: string;
    textSecondary: string;
    textDisabled: string;
    textInverse: string;
    
    // Component colors
    border: string;
    icon: string;
    iconSelected: string;
    tabIconDefault: string;
    tabIconSelected: string;
    divider: string;
    placeholder: string;
    backdrop: string;
    
    // App-specific colors
    boost: string;
    favorite: string;
    reply: string;
    mention: string;
    notification: string;
  };
  
  // Typography
  typography: {
    fontFamily: {
      regular: string;
      medium: string;
      bold: string;
    };
    fontSize: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };
    lineHeight: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };
  };
  
  // Spacing
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  
  // Borders
  borderRadius: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  
  // Shadows
  shadow: {
    sm: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    md: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    lg: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
  };
}

// Default typography, spacing, and border radius
const baseTypography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
  },
};

const baseSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

const baseBorderRadius = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

// Theme objects
export const lightTheme: Theme = {
  id: 'light',
  name: 'light',
  displayName: 'Light',
  category: 'system',
  isDark: false,
  colors: {
    primary: '#0a7ea4',
    secondary: '#6b7280',
    accent: '#3b82f6',
    error: '#ef4444',
    warning: '#f59e0b',
    success: '#10b981',
    info: '#3b82f6',

    background: '#ffffff',
    card: '#f9fafb',
    modal: '#ffffff',
    surface: '#ffffff',
    surfaceVariant: '#f3f4f6',

    text: '#11181C',
    textSecondary: '#6b7280',
    textDisabled: '#9ca3af',
    textInverse: '#ffffff',
    
    border: '#e5e7eb',
    icon: '#6b7280',
    iconSelected: '#0a7ea4',
    tabIconDefault: '#6b7280',
    tabIconSelected: '#0a7ea4',
    divider: '#e5e7eb',
    placeholder: '#9ca3af',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    
    boost: '#10b981',
    favorite: '#f59e0b',
    reply: '#3b82f6',
    mention: '#8b5cf6',
    notification: '#ef4444',
  },
  typography: baseTypography,
  spacing: baseSpacing,
  borderRadius: baseBorderRadius,
  shadow: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
};

export const darkTheme: Theme = {
  id: 'dark',
  name: 'dark',
  displayName: 'Dark',
  category: 'system',
  isDark: true,
  colors: {
    primary: '#38bdf8',
    secondary: '#9ca3af',
    accent: '#60a5fa',
    error: '#f87171',
    warning: '#fbbf24',
    success: '#34d399',
    info: '#60a5fa',

    background: '#151718',
    card: '#1f2937',
    modal: '#1f2937',
    surface: '#1f2937',
    surfaceVariant: '#374151',

    text: '#ECEDEE',
    textSecondary: '#9ca3af',
    textDisabled: '#6b7280',
    textInverse: '#151718',
    
    border: '#374151',
    icon: '#9ca3af',
    iconSelected: '#38bdf8',
    tabIconDefault: '#9ca3af',
    tabIconSelected: '#38bdf8',
    divider: '#374151',
    placeholder: '#6b7280',
    backdrop: 'rgba(0, 0, 0, 0.7)',
    
    boost: '#34d399',
    favorite: '#fbbf24',
    reply: '#60a5fa',
    mention: '#a78bfa',
    notification: '#f87171',
  },
  typography: baseTypography,
  spacing: baseSpacing,
  borderRadius: baseBorderRadius,
  shadow: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 10,
    },
  },
};

export const highContrastTheme: Theme = {
  id: 'highContrast',
  name: 'highContrast',
  displayName: 'High Contrast',
  category: 'system',
  isDark: true,
  colors: {
    primary: '#ffffff',
    secondary: '#f2f2f2',
    accent: '#ffff00',
    error: '#ff0000',
    warning: '#ffff00',
    success: '#00ff00',
    info: '#00ffff',

    background: '#000000',
    card: '#121212',
    modal: '#121212',
    surface: '#121212',
    surfaceVariant: '#1a1a1a',

    text: '#ffffff',
    textSecondary: '#f2f2f2',
    textDisabled: '#a0a0a0',
    textInverse: '#000000',
    
    border: '#ffffff',
    icon: '#ffffff',
    iconSelected: '#ffff00',
    tabIconDefault: '#ffffff',
    tabIconSelected: '#ffff00',
    divider: '#ffffff',
    placeholder: '#a0a0a0',
    backdrop: 'rgba(0, 0, 0, 0.9)',
    
    boost: '#00ff00',
    favorite: '#ffff00',
    reply: '#00ffff',
    mention: '#ff00ff',
    notification: '#ff0000',
  },
  typography: {
    ...baseTypography,
    fontSize: {
      xs: 14, // Slightly larger for better readability
      sm: 16,
      md: 18,
      lg: 20,
      xl: 22,
      xxl: 26,
    },
  },
  spacing: baseSpacing,
  borderRadius: baseBorderRadius,
  shadow: {
    sm: {
      shadowColor: '#fff',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.4,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#fff',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2.62,
      elevation: 4,
    },
    lg: {
      shadowColor: '#fff',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.6,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
};

// Element-based themes
export const fireTheme: Theme = {
  id: 'fire',
  name: 'fire',
  displayName: 'Fire',
  category: 'element',
  isDark: true,
  colors: {
    primary: '#f97316',
    secondary: '#f59e0b',
    accent: '#ef4444',
    error: '#dc2626',
    warning: '#f59e0b',
    success: '#16a34a',
    info: '#0ea5e9',

    background: '#0c0a09',
    card: '#1c1917',
    modal: '#1c1917',
    surface: '#1c1917',
    surfaceVariant: '#292524',

    text: '#fafaf9',
    textSecondary: '#e7e5e4',
    textDisabled: '#a8a29e',
    textInverse: '#0c0a09',
    
    border: '#44403c',
    icon: '#d6d3d1',
    iconSelected: '#f97316',
    tabIconDefault: '#d6d3d1',
    tabIconSelected: '#f97316',
    divider: '#44403c',
    placeholder: '#a8a29e',
    backdrop: 'rgba(12, 10, 9, 0.7)',
    
    boost: '#16a34a',
    favorite: '#f59e0b',
    reply: '#0ea5e9',
    mention: '#a855f7',
    notification: '#ef4444',
  },
  typography: baseTypography,
  spacing: baseSpacing,
  borderRadius: baseBorderRadius,
  shadow: {
    sm: {
      shadowColor: '#f97316',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#f97316',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    lg: {
      shadowColor: '#f97316',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
};

export const waterTheme: Theme = {
  id: 'water',
  name: 'water',
  displayName: 'Water',
  category: 'element',
  isDark: true,
  colors: {
    primary: '#0ea5e9',
    secondary: '#06b6d4',
    accent: '#3b82f6',
    error: '#ef4444',
    warning: '#f59e0b',
    success: '#10b981',
    info: '#3b82f6',

    background: '#0c4a6e',
    card: '#075985',
    modal: '#075985',
    surface: '#075985',
    surfaceVariant: '#0369a1',

    text: '#f0f9ff',
    textSecondary: '#e0f2fe',
    textDisabled: '#7dd3fc',
    textInverse: '#0c4a6e',
    
    border: '#0284c7',
    icon: '#bae6fd',
    iconSelected: '#0ea5e9',
    tabIconDefault: '#bae6fd',
    tabIconSelected: '#0ea5e9',
    divider: '#0284c7',
    placeholder: '#7dd3fc',
    backdrop: 'rgba(12, 74, 110, 0.7)',
    
    boost: '#10b981',
    favorite: '#f59e0b',
    reply: '#3b82f6',
    mention: '#8b5cf6',
    notification: '#ef4444',
  },
  typography: baseTypography,
  spacing: baseSpacing,
  borderRadius: baseBorderRadius,
  shadow: {
    sm: {
      shadowColor: '#0ea5e9',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#0ea5e9',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    lg: {
      shadowColor: '#0ea5e9',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
};

export const earthTheme: Theme = {
  id: 'earth',
  name: 'earth',
  displayName: 'Earth',
  category: 'element',
  isDark: true,
  colors: {
    primary: '#84cc16',
    secondary: '#65a30d',
    accent: '#eab308',
    error: '#ef4444',
    warning: '#f59e0b',
    success: '#10b981',
    info: '#3b82f6',

    background: '#1c1a17',
    card: '#2c2a26',
    modal: '#2c2a26',
    surface: '#2c2a26',
    surfaceVariant: '#3c3a35',

    text: '#fafaf9',
    textSecondary: '#e5e4de',
    textDisabled: '#a5a29b',
    textInverse: '#1c1a17',
    
    border: '#524f48',
    icon: '#d8d7d0',
    iconSelected: '#84cc16',
    tabIconDefault: '#d8d7d0',
    tabIconSelected: '#84cc16',
    divider: '#524f48',
    placeholder: '#a5a29b',
    backdrop: 'rgba(28, 26, 23, 0.7)',
    
    boost: '#10b981',
    favorite: '#f59e0b',
    reply: '#3b82f6',
    mention: '#8b5cf6',
    notification: '#ef4444',
  },
  typography: baseTypography,
  spacing: baseSpacing,
  borderRadius: baseBorderRadius,
  shadow: {
    sm: {
      shadowColor: '#84cc16',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#84cc16',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    lg: {
      shadowColor: '#84cc16',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
};

export const airTheme: Theme = {
  id: 'air',
  name: 'air',
  displayName: 'Air',
  category: 'element',
  isDark: false,
  colors: {
    primary: '#8b5cf6',
    secondary: '#a78bfa',
    accent: '#6366f1',
    error: '#ef4444',
    warning: '#f59e0b',
    success: '#10b981',
    info: '#3b82f6',

    background: '#ffffff',
    card: '#f9fafb',
    modal: '#f9fafb',
    surface: '#f9fafb',
    surfaceVariant: '#f3f4f6',

    text: '#1f2937',
    textSecondary: '#4b5563',
    textDisabled: '#9ca3af',
    textInverse: '#ffffff',
    
    border: '#e5e7eb',
    icon: '#6b7280',
    iconSelected: '#8b5cf6',
    tabIconDefault: '#6b7280',
    tabIconSelected: '#8b5cf6',
    divider: '#e5e7eb',
    placeholder: '#9ca3af',
    backdrop: 'rgba(31, 41, 55, 0.5)',
    
    boost: '#10b981',
    favorite: '#f59e0b',
    reply: '#3b82f6',
    mention: '#8b5cf6',
    notification: '#ef4444',
  },
  typography: baseTypography,
  spacing: baseSpacing,
  borderRadius: baseBorderRadius,
  shadow: {
    sm: {
      shadowColor: '#8b5cf6',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#8b5cf6',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 2.62,
      elevation: 4,
    },
    lg: {
      shadowColor: '#8b5cf6',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.20,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
};

// Biome-based themes
export const forestTheme: Theme = {
  id: 'forest',
  name: 'forest',
  displayName: 'Forest',
  category: 'biome',
  isDark: true,
  colors: {
    primary: '#22c55e',
    secondary: '#16a34a',
    accent: '#84cc16',
    error: '#ef4444',
    warning: '#f59e0b',
    success: '#10b981',
    info: '#3b82f6',

    background: '#064e3b',
    card: '#065f46',
    modal: '#065f46',
    surface: '#065f46',
    surfaceVariant: '#047857',

    text: '#ecfdf5',
    textSecondary: '#d1fae5',
    textDisabled: '#6ee7b7',
    textInverse: '#064e3b',
    
    border: '#059669',
    icon: '#a7f3d0',
    iconSelected: '#22c55e',
    tabIconDefault: '#a7f3d0',
    tabIconSelected: '#22c55e',
    divider: '#059669',
    placeholder: '#6ee7b7',
    backdrop: 'rgba(6, 78, 59, 0.7)',
    
    boost: '#10b981',
    favorite: '#f59e0b',
    reply: '#3b82f6',
    mention: '#8b5cf6',
    notification: '#ef4444',
  },
  typography: baseTypography,
  spacing: baseSpacing,
  borderRadius: baseBorderRadius,
  shadow: {
    sm: {
      shadowColor: '#22c55e',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#22c55e',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    lg: {
      shadowColor: '#22c55e',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
};

export const desertTheme: Theme = {
  id: 'desert',
  name: 'desert',
  displayName: 'Desert',
  category: 'biome',
  isDark: false,
  colors: {
    primary: '#d97706',
    secondary: '#b45309',
    accent: '#eab308',
    error: '#ef4444',
    warning: '#f59e0b',
    success: '#10b981',
    info: '#3b82f6',

    background: '#fef3c7',
    card: '#fde68a',
    modal: '#fde68a',
    surface: '#fde68a',
    surfaceVariant: '#fcd34d',

    text: '#78350f',
    textSecondary: '#92400e',
    textDisabled: '#b45309',
    textInverse: '#fef3c7',
    
    border: '#fbbf24',
    icon: '#92400e',
    iconSelected: '#d97706',
    tabIconDefault: '#92400e',
    tabIconSelected: '#d97706',
    divider: '#fbbf24',
    placeholder: '#b45309',
    backdrop: 'rgba(120, 53, 15, 0.5)',
    
    boost: '#10b981',
    favorite: '#f59e0b',
    reply: '#3b82f6',
    mention: '#8b5cf6',
    notification: '#ef4444',
  },
  typography: baseTypography,
  spacing: baseSpacing,
  borderRadius: baseBorderRadius,
  shadow: {
    sm: {
      shadowColor: '#d97706',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#d97706',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    lg: {
      shadowColor: '#d97706',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
};

export const tundraTheme: Theme = {
  id: 'tundra',
  name: 'tundra',
  displayName: 'Tundra',
  category: 'biome',
  isDark: true,
  colors: {
    primary: '#93c5fd',
    secondary: '#60a5fa',
    accent: '#38bdf8',
    error: '#f87171',
    warning: '#fbbf24',
    success: '#34d399',
    info: '#60a5fa',

    background: '#1e293b',
    card: '#334155',
    modal: '#334155',
    surface: '#334155',
    surfaceVariant: '#475569',

    text: '#f1f5f9',
    textSecondary: '#e2e8f0',
    textDisabled: '#94a3b8',
    textInverse: '#1e293b',
    
    border: '#64748b',
    icon: '#cbd5e1',
    iconSelected: '#93c5fd',
    tabIconDefault: '#cbd5e1',
    tabIconSelected: '#93c5fd',
    divider: '#64748b',
    placeholder: '#94a3b8',
    backdrop: 'rgba(30, 41, 59, 0.7)',
    
    boost: '#34d399',
    favorite: '#fbbf24',
    reply: '#60a5fa',
    mention: '#a78bfa',
    notification: '#f87171',
  },
  typography: baseTypography,
  spacing: baseSpacing,
  borderRadius: baseBorderRadius,
  shadow: {
    sm: {
      shadowColor: '#93c5fd',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#93c5fd',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    lg: {
      shadowColor: '#93c5fd',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
};

export const reefTheme: Theme = {
  id: 'reef',
  name: 'reef',
  displayName: 'Reef',
  category: 'biome',
  isDark: false,
  colors: {
    primary: '#06b6d4',
    secondary: '#0891b2',
    accent: '#0ea5e9',
    error: '#ef4444',
    warning: '#f59e0b',
    success: '#10b981',
    info: '#3b82f6',

    background: '#ecfeff',
    card: '#cffafe',
    modal: '#cffafe',
    surface: '#cffafe',
    surfaceVariant: '#a5f3fc',

    text: '#164e63',
    textSecondary: '#155e75',
    textDisabled: '#0e7490',
    textInverse: '#ecfeff',
    
    border: '#67e8f9',
    icon: '#155e75',
    iconSelected: '#06b6d4',
    tabIconDefault: '#155e75',
    tabIconSelected: '#06b6d4',
    divider: '#67e8f9',
    placeholder: '#0e7490',
    backdrop: 'rgba(22, 78, 99, 0.5)',
    
    boost: '#10b981',
    favorite: '#f59e0b',
    reply: '#3b82f6',
    mention: '#8b5cf6',
    notification: '#ef4444',
  },
  typography: baseTypography,
  spacing: baseSpacing,
  borderRadius: baseBorderRadius,
  shadow: {
    sm: {
      shadowColor: '#06b6d4',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#06b6d4',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    lg: {
      shadowColor: '#06b6d4',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
};

export const savannahTheme: Theme = {
  id: 'savannah',
  name: 'savannah',
  displayName: 'Savannah',
  category: 'biome',
  isDark: false,
  colors: {
    primary: '#ca8a04',
    secondary: '#a16207',
    accent: '#d97706',
    error: '#ef4444',
    warning: '#f59e0b',
    success: '#10b981',
    info: '#3b82f6',

    background: '#fef9c3',
    card: '#fef08a',
    modal: '#fef08a',
    surface: '#fef08a',
    surfaceVariant: '#fde047',

    text: '#713f12',
    textSecondary: '#854d0e',
    textDisabled: '#a16207',
    textInverse: '#fef9c3',
    
    border: '#facc15',
    icon: '#854d0e',
    iconSelected: '#ca8a04',
    tabIconDefault: '#854d0e',
    tabIconSelected: '#ca8a04',
    divider: '#facc15',
    placeholder: '#a16207',
    backdrop: 'rgba(113, 63, 18, 0.5)',
    
    boost: '#10b981',
    favorite: '#f59e0b',
    reply: '#3b82f6',
    mention: '#8b5cf6',
    notification: '#ef4444',
  },
  typography: baseTypography,
  spacing: baseSpacing,
  borderRadius: baseBorderRadius,
  shadow: {
    sm: {
      shadowColor: '#ca8a04',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#ca8a04',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    lg: {
      shadowColor: '#ca8a04',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
};

// Export all themes in a single object
export const themes = {
  // System themes
  light: lightTheme,
  dark: darkTheme,
  highContrast: highContrastTheme,
  
  // Element themes
  fire: fireTheme,
  water: waterTheme,
  earth: earthTheme,
  air: airTheme,
  
  // Biome themes
  forest: forestTheme,
  desert: desertTheme,
  tundra: tundraTheme,
  reef: reefTheme,
  savannah: savannahTheme,
};

// Helper function to create a custom theme by modifying an existing theme
export function createCustomTheme(baseTheme: Theme, primaryColor: string, name: string): Theme {
  return {
    ...baseTheme,
    id: `custom-${name.toLowerCase().replace(/\s+/g, '-')}`,
    name: name.toLowerCase().replace(/\s+/g, '-'),
    displayName: name,
    category: 'custom',
    colors: {
      ...baseTheme.colors,
      primary: primaryColor,
      iconSelected: primaryColor,
      tabIconSelected: primaryColor,
    },
  };
} 