import { Theme, ThemeColors } from '../types';

// Color Theme Configurations
export const THEME_CONFIGS: Record<Theme, ThemeColors> = {
  [Theme.WARM_BEIGE]: {
    name: Theme.WARM_BEIGE,
    displayName: 'Warm Beige',
    colors: {
      // Primary shades - Warm Beige/Cream tones
      primary: '#E8DCC4',        // Warm beige
      primaryLight: '#F5EFE3',   // Light cream
      primaryDark: '#D4C4A8',    // Darker beige
      
      // Secondary - Complementary warm tones
      secondary: '#C9B896',      // Taupe beige
      
      // Accent - Gold/Bronze highlights
      accent: '#D4A574',         // Warm gold
      accentHover: '#C69564',    // Darker gold
      
      // Backgrounds
      background: '#FAF8F4',     // Off-white with warm undertone
      backgroundAlt: '#F0EBE1',  // Slightly darker warm background
      
      // Text colors
      text: '#5C4A3A',          // Warm brown
      textLight: '#8B7355',     // Medium brown
      textDark: '#3E2F23',      // Dark chocolate brown
      
      // Borders
      border: '#E0D5C0',        // Soft beige border
      borderLight: '#EDE6D8',   // Very light border
      
      // Shadow
      shadow: 'rgba(92, 74, 58, 0.1)' // Warm shadow
    }
  },
  
  [Theme.LIGHT_SAND]: {
    name: Theme.LIGHT_SAND,
    displayName: 'Light Sand',
    colors: {
      // Primary shades - Sand/Taupe tones
      primary: '#D9CFC1',        // Light sand
      primaryLight: '#EAE4DA',   // Pale sand
      primaryDark: '#C4B8A9',    // Taupe
      
      // Secondary - Neutral earth tones
      secondary: '#B5A491',      // Medium taupe
      
      // Accent - Desert rose/Terracotta
      accent: '#C8997C',         // Desert rose
      accentHover: '#B8896C',    // Darker terracotta
      
      // Backgrounds
      background: '#F7F3EE',     // Soft sand white
      backgroundAlt: '#EBE5DC',  // Light taupe background
      
      // Text colors
      text: '#4A3F35',          // Dark taupe brown
      textLight: '#756A5E',     // Medium gray-brown
      textDark: '#332B24',      // Deep brown
      
      // Borders
      border: '#D4CAB9',        // Sand border
      borderLight: '#E3DDD1',   // Pale sand border
      
      // Shadow
      shadow: 'rgba(74, 63, 53, 0.1)' // Neutral shadow
    }
  },
  
  [Theme.OFF_WHITE]: {
    name: Theme.OFF_WHITE,
    displayName: 'Off-White',
    colors: {
      // Primary shades - Off-white/Ivory tones
      primary: '#F5F2ED',        // Off-white
      primaryLight: '#FEFDFB',   // Almost white
      primaryDark: '#E8E3DA',    // Warm gray
      
      // Secondary - Soft neutrals
      secondary: '#D9D4CB',      // Light warm gray
      
      // Accent - Champagne/Soft gold
      accent: '#D4C5A9',         // Champagne
      accentHover: '#C4B599',    // Deeper champagne
      
      // Backgrounds
      background: '#FFFFFF',     // Pure white
      backgroundAlt: '#FAF9F6',  // Ivory white
      
      // Text colors
      text: '#524A42',          // Soft charcoal
      textLight: '#7D756C',     // Medium gray
      textDark: '#3A342E',      // Dark charcoal
      
      // Borders
      border: '#E7E3DA',        // Soft gray border
      borderLight: '#F0EDE7',   // Very light border
      
      // Shadow
      shadow: 'rgba(82, 74, 66, 0.08)' // Subtle shadow
    }
  }
};

// Default theme
export const DEFAULT_THEME = Theme.WARM_BEIGE;

// Helper function to get theme from localStorage or default
export const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('selectedTheme');
    if (saved && Object.values(Theme).includes(saved as Theme)) {
      return saved as Theme;
    }
  }
  return DEFAULT_THEME;
};

// Helper function to save theme to localStorage
export const saveTheme = (theme: Theme): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('selectedTheme', theme);
  }
};

// Helper function to apply theme CSS variables
export const applyThemeVariables = (theme: Theme): void => {
  const themeConfig = THEME_CONFIGS[theme];
  const root = document.documentElement;
  
  Object.entries(themeConfig.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
};
