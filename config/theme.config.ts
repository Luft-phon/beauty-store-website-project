import { Theme, ThemeColors } from '../types';

// Light Sand Theme Configuration (Default and Only Theme)
export const LIGHT_SAND_THEME: ThemeColors = {
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
};

// Apply theme variables to the document
export const applyThemeVariables = (theme: Theme = Theme.LIGHT_SAND) => {
  const root = document.documentElement;
  const colors = LIGHT_SAND_THEME.colors;
  
  // Set CSS custom properties
  root.style.setProperty('--color-primary', colors.primary);
  root.style.setProperty('--color-primaryLight', colors.primaryLight);
  root.style.setProperty('--color-primaryDark', colors.primaryDark);
  root.style.setProperty('--color-secondary', colors.secondary);
  root.style.setProperty('--color-accent', colors.accent);
  root.style.setProperty('--color-accentHover', colors.accentHover);
  root.style.setProperty('--color-background', colors.background);
  root.style.setProperty('--color-backgroundAlt', colors.backgroundAlt);
  root.style.setProperty('--color-text', colors.text);
  root.style.setProperty('--color-textLight', colors.textLight);
  root.style.setProperty('--color-textDark', colors.textDark);
  root.style.setProperty('--color-border', colors.border);
  root.style.setProperty('--color-borderLight', colors.borderLight);
  root.style.setProperty('--color-shadow', colors.shadow);
};
