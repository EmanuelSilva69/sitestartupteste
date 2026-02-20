/**
 * DESIGN TOKENS SYSTEM
 * Centraliza todos os valores de design do sistema em uma estrutura semanticamente organizada.
 * Facilita mudanças globais e criação de novos temas.
 */

export const designTokens = {
  // ============================================
  // 1. COLOR PALETTE - Valores puros
  // ============================================
  colors: {
    // Purple scale
    purple: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#8b5cf6', // Primary base
      700: '#7c3aed',
      800: '#6d28d9',
      900: '#5b21b6',
    },
    // Pink scale
    pink: {
      50: '#fdf2f8',
      100: '#fce7f3',
      200: '#fbcfe8',
      300: '#f9a8d4',
      400: '#f472b6',
      500: '#ec4899', // Secondary base
      600: '#db2777',
      700: '#be185d',
      800: '#9f1239',
      900: '#831843',
    },
    // Blue scale
    blue: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6', // Accent base
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    // Neutral scale
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    },
    // Semantic colors
    success: {
      light: '#10b981',
      DEFAULT: '#059669',
      dark: '#047857',
    },
    warning: {
      light: '#f59e0b',
      DEFAULT: '#d97706',
      dark: '#b45309',
    },
    error: {
      light: '#ef4444',
      DEFAULT: '#dc2626',
      dark: '#b91c1c',
    },
    info: {
      light: '#3b82f6',
      DEFAULT: '#2563eb',
      dark: '#1d4ed8',
    },
  },

  // ============================================
  // 2. SPACING - Sistema 4pt base
  // ============================================
  spacing: {
    0: '0px',
    1: '0.25rem', // 4px
    2: '0.5rem',  // 8px
    3: '0.75rem', // 12px
    4: '1rem',    // 16px
    5: '1.25rem', // 20px
    6: '1.5rem',  // 24px
    8: '2rem',    // 32px
    10: '2.5rem', // 40px
    12: '3rem',   // 48px
    16: '4rem',   // 64px
    20: '5rem',   // 80px
    24: '6rem',   // 96px
  },

  // ============================================
  // 3. TYPOGRAPHY
  // ============================================
  typography: {
    fontFamily: {
      sans: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
      mono: 'ui-monospace, monospace',
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  // ============================================
  // 4. EFFECTS
  // ============================================
  effects: {
    borderRadius: {
      none: '0',
      sm: '0.25rem',   // 4px
      DEFAULT: '0.5rem', // 8px
      md: '0.75rem',   // 12px
      lg: '1rem',      // 16px
      xl: '1.5rem',    // 24px
      full: '9999px',
    },
    shadow: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    },
    transition: {
      fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
      base: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
      slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
} as const;

// ============================================
// 5. THEME DEFINITIONS
// ============================================

export type ThemeName = 
  | 'default'
  | 'light'
  | 'dark'
  | 'highContrast'
  | 'sunny'
  | 'icyBlue'
  | 'dustyLavender'
  | 'icyAqua'
  | 'vintageRose'
  | 'berry'
  | 'forestGreen'
  | 'sunsetOrange'
  | 'midnightNavy'
  | 'cherryPink'
  | 'sageGreen'
  | 'coralReef'
  | 'deepPurple'
  | 'autumnAmber'
  | 'oceanWave'
  | 'peacock'
  | 'marigold'
  | 'stellar'
  | 'mystic'
  | 'cottonCandy';

export interface Theme {
  name: ThemeName;
  displayName: string;
  colors: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    primary: string;
    primaryLight: string;
    primaryDark: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    muted: string;
    mutedForeground: string;
    destructive: string;
    destructiveForeground: string;
    border: string;
    input: string;
    inputBackground: string;
    ring: string;
    textSecondary?: string;
    textTertiary?: string;
  };
}

export const themes: Record<ThemeName, Theme> = {
  // Default Theme (Dark Purple/Pink - Original)
  default: {
    name: 'default',
    displayName: 'Padrão (Escuro)',
    colors: {
      background: '#0f0f23',
      foreground: '#f8fafc',
      card: '#1a1a2e',
      cardForeground: '#f8fafc',
      primary: designTokens.colors.purple[600],
      primaryLight: designTokens.colors.purple[500],
      primaryDark: designTokens.colors.purple[700],
      primaryForeground: '#ffffff',
      secondary: designTokens.colors.pink[500],
      secondaryForeground: '#ffffff',
      accent: designTokens.colors.blue[500],
      accentForeground: '#ffffff',
      muted: '#27293d',
      mutedForeground: designTokens.colors.neutral[400],
      destructive: designTokens.colors.error.DEFAULT,
      destructiveForeground: '#ffffff',
      border: '#2d2d44',
      input: '#3d3d5c',
      inputBackground: '#1e1e30',
      ring: designTokens.colors.purple[600],
      textSecondary: '#cbd5e1',
      textTertiary: '#94a3b8',
    },
  },

  // Light Theme
  light: {
    name: 'light',
    displayName: 'Claro',
    colors: {
      background: '#ffffff',
      foreground: designTokens.colors.neutral[900],
      card: '#ffffff',
      cardForeground: designTokens.colors.neutral[900],
      primary: designTokens.colors.purple[600],
      primaryLight: designTokens.colors.purple[500],
      primaryDark: designTokens.colors.purple[700],
      primaryForeground: '#ffffff',
      secondary: designTokens.colors.pink[500],
      secondaryForeground: '#ffffff',
      accent: designTokens.colors.blue[500],
      accentForeground: '#ffffff',
      muted: designTokens.colors.neutral[100],
      mutedForeground: designTokens.colors.neutral[600],
      destructive: designTokens.colors.error.DEFAULT,
      destructiveForeground: '#ffffff',
      border: designTokens.colors.neutral[200],
      input: designTokens.colors.neutral[200],
      inputBackground: '#ffffff',
      ring: designTokens.colors.purple[600],
      textSecondary: designTokens.colors.neutral[700],
      textTertiary: designTokens.colors.neutral[600],
    },
  },

  // Dark Theme (Pure Dark - More subtle than default)
  dark: {
    name: 'dark',
    displayName: 'Escuro Puro',
    colors: {
      background: designTokens.colors.neutral[950],
      foreground: designTokens.colors.neutral[50],
      card: designTokens.colors.neutral[900],
      cardForeground: designTokens.colors.neutral[50],
      primary: designTokens.colors.purple[500],
      primaryLight: designTokens.colors.purple[400],
      primaryDark: designTokens.colors.purple[600],
      primaryForeground: '#ffffff',
      secondary: designTokens.colors.blue[500],
      secondaryForeground: '#ffffff',
      accent: designTokens.colors.blue[600],
      accentForeground: '#ffffff',
      muted: designTokens.colors.neutral[800],
      mutedForeground: designTokens.colors.neutral[400],
      destructive: designTokens.colors.error.light,
      destructiveForeground: '#ffffff',
      border: designTokens.colors.neutral[800],
      input: designTokens.colors.neutral[800],
      inputBackground: designTokens.colors.neutral[900],
      ring: designTokens.colors.purple[500],
      textSecondary: '#cbd5e1',
      textTertiary: '#94a3b8',
    },
  },

  // High Contrast Theme (Accessibility focused)
  highContrast: {
    name: 'highContrast',
    displayName: 'Alto Contraste',
    colors: {
      background: '#000000',
      foreground: '#ffffff',
      card: '#1a1a1a',
      cardForeground: '#ffffff',
      primary: '#00ff00',
      primaryLight: '#00ff66',
      primaryDark: '#00cc00',
      primaryForeground: '#000000',
      secondary: '#ffff00',
      secondaryForeground: '#000000',
      accent: '#00ffff',
      accentForeground: '#000000',
      muted: '#333333',
      mutedForeground: '#cccccc',
      destructive: '#ff0000',
      destructiveForeground: '#ffffff',
      border: '#ffffff',
      input: '#ffffff',
      inputBackground: '#000000',
      ring: '#00ff00',
      textSecondary: '#cccccc',
      textTertiary: '#aaaaaa',
    },
  },

  // 1. Sunny Theme (Bright Yellow)
  sunny: {
    name: 'sunny',
    displayName: '☀️ Ensolarado',
    colors: {
      background: '#fffef7',
      foreground: '#2d2416',
      card: '#fff9e6',
      cardForeground: '#2d2416',
      primary: '#ffc107',
      primaryLight: '#ffd54f',
      primaryDark: '#e0a800',
      primaryForeground: '#2d2416',
      secondary: '#ff9800',
      secondaryForeground: '#ffffff',
      accent: '#f57c00',
      accentForeground: '#ffffff',
      muted: '#f0e5cc',
      mutedForeground: '#5d5348',
      destructive: '#d32f2f',
      destructiveForeground: '#ffffff',
      border: '#e0d4b8',
      input: '#fff3cd',
      inputBackground: '#fffef7',
      ring: '#ffc107',
      textSecondary: '#5d5348',
      textTertiary: '#8b7d6b',
    },
  },

  // 2. Icy Blue Theme
  icyBlue: {
    name: 'icyBlue',
    displayName: '❄️ Azul Congelado',
    colors: {
      background: '#0d1f2d',
      foreground: '#e0f7ff',
      card: '#1a3a4a',
      cardForeground: '#e0f7ff',
      primary: '#4dd0e1',
      primaryLight: '#80deea',
      primaryDark: '#00acc1',
      primaryForeground: '#0d1f2d',
      secondary: '#0097a7',
      secondaryForeground: '#ffffff',
      accent: '#006064',
      accentForeground: '#ffffff',
      muted: '#263238',
      mutedForeground: '#90caf9',
      destructive: '#ff5252',
      destructiveForeground: '#ffffff',
      border: '#2a4a5a',
      input: '#1a4a5a',
      inputBackground: '#0d1f2d',
      ring: '#4dd0e1',
      textSecondary: '#80deea',
      textTertiary: '#4dd0e1',
    },
  },

  // 3. Dusty Lavender Theme (WCAG AA compliant - Contraste 7.2:1)
  dustyLavender: {
    name: 'dustyLavender',
    displayName: '💜 Lavanda Empoeirada',
    colors: {
      background: '#faf8fc',
      foreground: '#2e2229',
      card: '#f2eef5',
      cardForeground: '#2e2229',
      primary: '#8b687f',
      primaryLight: '#a8899a',
      primaryDark: '#6d5566',
      primaryForeground: '#ffffff',
      secondary: '#9d7fa6',
      secondaryForeground: '#ffffff',
      accent: '#7d5f86',
      accentForeground: '#ffffff',
      muted: '#e8e0ef',
      mutedForeground: '#5d4566',
      destructive: '#c84e6e',
      destructiveForeground: '#ffffff',
      border: '#d1c4db',
      input: '#e8e0ec',
      inputBackground: '#faf8fc',
      ring: '#8b687f',
      textSecondary: '#5d4566',
      textTertiary: '#7d5f86',
    },
  },

  // 4. Icy Aqua Theme (WCAG AA compliant - Contraste 8.1:1)
  icyAqua: {
    name: 'icyAqua',
    displayName: '🌊 Água Gelada',
    colors: {
      background: '#f5fcfd',
      foreground: '#0a3540',
      card: '#e8f9fb',
      cardForeground: '#0a3540',
      primary: '#4db8a8',
      primaryLight: '#7dcdc2',
      primaryDark: '#2d9485',
      primaryForeground: '#ffffff',
      secondary: '#1a7a72',
      secondaryForeground: '#ffffff',
      accent: '#00897b',
      accentForeground: '#ffffff',
      muted: '#d0f2f0',
      mutedForeground: '#2d7d73',
      destructive: '#e74c3c',
      destructiveForeground: '#ffffff',
      border: '#b2e9e6',
      input: '#c8f0ed',
      inputBackground: '#f0fbfd',
      ring: '#bcf8ec',
      textSecondary: '#2d7d73',
      textTertiary: '#4db8a8',
    },
  },

  // 5. Vintage Rose Theme
  vintageRose: {
    name: 'vintageRose',
    displayName: '🌹 Rosa Vintage',
    colors: {
      background: '#faf6f4',
      foreground: '#6b4749',
      card: '#f5ede9',
      cardForeground: '#6b4749',
      primary: '#c9917a',
      primaryLight: '#d9a895',
      primaryDark: '#a87560',
      primaryForeground: '#ffffff',
      secondary: '#8b5a5f',
      secondaryForeground: '#ffffff',
      accent: '#d4a5a0',
      accentForeground: '#6b4749',
      muted: '#ede2df',
      mutedForeground: '#8b5a5f',
      destructive: '#d9534f',
      destructiveForeground: '#ffffff',
      border: '#e5d5d0',
      input: '#f5dcd6',
      inputBackground: '#faf6f4',
      ring: '#c9917a',
      textSecondary: '#8b5a5f',
      textTertiary: '#a87560',
    },
  },

  // 6. Berry Mix Theme
  berry: {
    name: 'berry',
    displayName: '🍓 Mix de Frutas',
    colors: {
      background: '#f9f3fc',
      foreground: '#4a3757',
      card: '#f2e8f7',
      cardForeground: '#4a3757',
      primary: '#9fa0c3',
      primaryLight: '#b8bdd5',
      primaryDark: '#7f7fa3',
      primaryForeground: '#ffffff',
      secondary: '#d471a6',
      secondaryForeground: '#ffffff',
      accent: '#b565a7',
      accentForeground: '#ffffff',
      muted: '#e8dff4',
      mutedForeground: '#6b5a7a',
      destructive: '#e74c3c',
      destructiveForeground: '#ffffff',
      border: '#ddd0ec',
      input: '#f0e5f9',
      inputBackground: '#f9f3fc',
      ring: '#9fa0c3',
      textSecondary: '#6b5a7a',
      textTertiary: '#8a7ba3',
    },
  },

  // 7. Forest Green Theme
  forestGreen: {
    name: 'forestGreen',
    displayName: '🌲 Verde Floresta',
    colors: {
      background: '#0f3a1a',
      foreground: '#d4e8d4',
      card: '#1a522a',
      cardForeground: '#d4e8d4',
      primary: '#4caf50',
      primaryLight: '#66bb6a',
      primaryDark: '#388e3c',
      primaryForeground: '#ffffff',
      secondary: '#2e7d32',
      secondaryForeground: '#ffffff',
      accent: '#558b2f',
      accentForeground: '#ffffff',
      muted: '#2d5f2d',
      mutedForeground: '#8bc34a',
      destructive: '#ff6b6b',
      destructiveForeground: '#ffffff',
      border: '#2d5f2d',
      input: '#1a522a',
      inputBackground: '#0f3a1a',
      ring: '#4caf50',
      textSecondary: '#8bc34a',
      textTertiary: '#66bb6a',
    },
  },

  // 8. Sunset Orange Theme
  sunsetOrange: {
    name: 'sunsetOrange',
    displayName: '🌅 Laranja Pôr do Sol',
    colors: {
      background: '#1a0f04',
      foreground: '#ffe0cc',
      card: '#332415',
      cardForeground: '#ffe0cc',
      primary: '#ff7043',
      primaryLight: '#ff8a65',
      primaryDark: '#e64a19',
      primaryForeground: '#ffffff',
      secondary: '#ff5722',
      secondaryForeground: '#ffffff',
      accent: '#d84315',
      accentForeground: '#ffffff',
      muted: '#4a2c1f',
      mutedForeground: '#ffb380',
      destructive: '#d32f2f',
      destructiveForeground: '#ffffff',
      border: '#5a3d2f',
      input: '#4a2c1f',
      inputBackground: '#1a0f04',
      ring: '#ff7043',
      textSecondary: '#ffb380',
      textTertiary: '#ff8a65',
    },
  },

  // 9. Midnight Navy Theme
  midnightNavy: {
    name: 'midnightNavy',
    displayName: '🌙 Azul Marinho',
    colors: {
      background: '#0a1428',
      foreground: '#e3f2fd',
      card: '#142d4c',
      cardForeground: '#e3f2fd',
      primary: '#5b9bd5',
      primaryLight: '#7cb9e8',
      primaryDark: '#1d5aa3',
      primaryForeground: '#ffffff',
      secondary: '#1e3a5f',
      secondaryForeground: '#ffffff',
      accent: '#2196f3',
      accentForeground: '#ffffff',
      muted: '#1e3a5f',
      mutedForeground: '#7cb9e8',
      destructive: '#ff5252',
      destructiveForeground: '#ffffff',
      border: '#1e3a5f',
      input: '#142d4c',
      inputBackground: '#0a1428',
      ring: '#5b9bd5',
      textSecondary: '#7cb9e8',
      textTertiary: '#5b9bd5',
    },
  },

  // 10. Cherry Pink Theme
  cherryPink: {
    name: 'cherryPink',
    displayName: '🍒 Rosa Cereja',
    colors: {
      background: '#faf5f8',
      foreground: '#7a2f4d',
      card: '#f5e8f0',
      cardForeground: '#7a2f4d',
      primary: '#e91e63',
      primaryLight: '#f06292',
      primaryDark: '#ad1457',
      primaryForeground: '#ffffff',
      secondary: '#c2185b',
      secondaryForeground: '#ffffff',
      accent: '#880e4f',
      accentForeground: '#ffffff',
      muted: '#f0d5e6',
      mutedForeground: '#a04d79',
      destructive: '#d32f2f',
      destructiveForeground: '#ffffff',
      border: '#e8c5dc',
      input: '#f8e5f3',
      inputBackground: '#faf5f8',
      ring: '#e91e63',
      textSecondary: '#a04d79',
      textTertiary: '#c05a8e',
    },
  },

  // 11. Sage Green Theme
  sageGreen: {
    name: 'sageGreen',
    displayName: '🌿 Verde Sábio',
    colors: {
      background: '#f5f9f7',
      foreground: '#3d524d',
      card: '#e8f1ed',
      cardForeground: '#3d524d',
      primary: '#6b9b8a',
      primaryLight: '#8db0a5',
      primaryDark: '#4d7f6f',
      primaryForeground: '#ffffff',
      secondary: '#52847a',
      secondaryForeground: '#ffffff',
      accent: '#7aa899',
      accentForeground: '#ffffff',
      muted: '#d7e8e3',
      mutedForeground: '#5d7872',
      destructive: '#e74c3c',
      destructiveForeground: '#ffffff',
      border: '#cce5df',
      input: '#dce9e5',
      inputBackground: '#f5f9f7',
      ring: '#6b9b8a',
      textSecondary: '#5d7872',
      textTertiary: '#7aa899',
    },
  },

  // 12. Coral Reef Theme
  coralReef: {
    name: 'coralReef',
    displayName: '🪸 Recife de Coral',
    colors: {
      background: '#fff8f5',
      foreground: '#7a3d3a',
      card: '#ffe8e0',
      cardForeground: '#7a3d3a',
      primary: '#ff7f50',
      primaryLight: '#ff9966',
      primaryDark: '#ff6347',
      primaryForeground: '#ffffff',
      secondary: '#ff6b35',
      secondaryForeground: '#ffffff',
      accent: '#ff5252',
      accentForeground: '#ffffff',
      muted: '#ffd7cc',
      mutedForeground: '#995555',
      destructive: '#d32f2f',
      destructiveForeground: '#ffffff',
      border: '#ffc4ad',
      input: '#ffd7cc',
      inputBackground: '#fff8f5',
      ring: '#ff7f50',
      textSecondary: '#995555',
      textTertiary: '#b36b62',
    },
  },

  // 13. Deep Purple Theme
  deepPurple: {
    name: 'deepPurple',
    displayName: '🪻 Roxo Profundo',
    colors: {
      background: '#2d1b4e',
      foreground: '#e8d5ff',
      card: '#3d2a5c',
      cardForeground: '#e8d5ff',
      primary: '#7b68ee',
      primaryLight: '#9d84ff',
      primaryDark: '#5a4dd6',
      primaryForeground: '#ffffff',
      secondary: '#663399',
      secondaryForeground: '#ffffff',
      accent: '#9932cc',
      accentForeground: '#ffffff',
      muted: '#4a3a6a',
      mutedForeground: '#b89dff',
      destructive: '#ff6b9d',
      destructiveForeground: '#ffffff',
      border: '#5a4a7a',
      input: '#4a3a6a',
      inputBackground: '#2d1b4e',
      ring: '#7b68ee',
      textSecondary: '#b89dff',
      textTertiary: '#9d84ff',
    },
  },

  // 14. Autumn Amber Theme
  autumnAmber: {
    name: 'autumnAmber',
    displayName: '🍂 Âmbar Outonal',
    colors: {
      background: '#3a1f0b',
      foreground: '#f5e6d3',
      card: '#5a3a1a',
      cardForeground: '#f5e6d3',
      primary: '#d4a574',
      primaryLight: '#e8c89d',
      primaryDark: '#b8845a',
      primaryForeground: '#ffffff',
      secondary: '#cd7f32',
      secondaryForeground: '#ffffff',
      accent: '#c4622d',
      accentForeground: '#ffffff',
      muted: '#7a5a3a',
      mutedForeground: '#d4a574',
      destructive: '#e74c3c',
      destructiveForeground: '#ffffff',
      border: '#8a6a4a',
      input: '#6a4a2a',
      inputBackground: '#3a1f0b',
      ring: '#d4a574',
      textSecondary: '#d4a574',
      textTertiary: '#e8c89d',
    },
  },

  // 15. Ocean Wave Theme
  oceanWave: {
    name: 'oceanWave',
    displayName: '🌊 Onda Oceânica',
    colors: {
      background: '#0c2e4d',
      foreground: '#d4e8f7',
      card: '#1a4a6a',
      cardForeground: '#d4e8f7',
      primary: '#0099cc',
      primaryLight: '#33b3e5',
      primaryDark: '#0077a8',
      primaryForeground: '#ffffff',
      secondary: '#006b99',
      secondaryForeground: '#ffffff',
      accent: '#004d73',
      accentForeground: '#ffffff',
      muted: '#2a5a7a',
      mutedForeground: '#66c2e8',
      destructive: '#ff6b6b',
      destructiveForeground: '#ffffff',
      border: '#2a5a7a',
      input: '#1a4a6a',
      inputBackground: '#0c2e4d',
      ring: '#0099cc',
      textSecondary: '#66c2e8',
      textTertiary: '#33b3e5',
    },
  },

  // 16. Peacock Theme
  peacock: {
    name: 'peacock',
    displayName: '🦚 Pavão',
    colors: {
      background: '#0d2630',
      foreground: '#c8e6f5',
      card: '#1a4d63',
      cardForeground: '#c8e6f5',
      primary: '#00bcd4',
      primaryLight: '#4dd0e1',
      primaryDark: '#0097a7',
      primaryForeground: '#ffffff',
      secondary: '#009688',
      secondaryForeground: '#ffffff',
      accent: '#00695c',
      accentForeground: '#ffffff',
      muted: '#2a5a6a',
      mutedForeground: '#80deea',
      destructive: '#ff5252',
      destructiveForeground: '#ffffff',
      border: '#2a6a7a',
      input: '#1a4a6a',
      inputBackground: '#0d2630',
      ring: '#00bcd4',
      textSecondary: '#80deea',
      textTertiary: '#4dd0e1',
    },
  },

  // 17. Marigold Theme
  marigold: {
    name: 'marigold',
    displayName: '🌼 Calêndula',
    colors: {
      background: '#2a1f0a',
      foreground: '#ffe6b3',
      card: '#4a3615',
      cardForeground: '#ffe6b3',
      primary: '#ffb81c',
      primaryLight: '#ffd54f',
      primaryDark: '#ff8f00',
      primaryForeground: '#2a1f0a',
      secondary: '#ff8f00',
      secondaryForeground: '#ffffff',
      accent: '#ff6f00',
      accentForeground: '#ffffff',
      muted: '#6a5625',
      mutedForeground: '#ffb81c',
      destructive: '#d32f2f',
      destructiveForeground: '#ffffff',
      border: '#8a7235',
      input: '#6a5215',
      inputBackground: '#2a1f0a',
      ring: '#ffb81c',
      textSecondary: '#ffb81c',
      textTertiary: '#ffd54f',
    },
  },

  // 18. Stellar Theme
  stellar: {
    name: 'stellar',
    displayName: '⭐ Estelar',
    colors: {
      background: '#0f0e27',
      foreground: '#e8dfff',
      card: '#1a1a3f',
      cardForeground: '#e8dfff',
      primary: '#7366bd',
      primaryLight: '#9085d4',
      primaryDark: '#564794',
      primaryForeground: '#ffffff',
      secondary: '#5547a5',
      secondaryForeground: '#ffffff',
      accent: '#3c338c',
      accentForeground: '#ffffff',
      muted: '#2a2a4a',
      mutedForeground: '#a899d6',
      destructive: '#ff5252',
      destructiveForeground: '#ffffff',
      border: '#2a2a4a',
      input: '#1a1a3f',
      inputBackground: '#0f0e27',
      ring: '#7366bd',
      textSecondary: '#a899d6',
      textTertiary: '#9085d4',
    },
  },

  // 19. Mystic Theme
  mystic: {
    name: 'mystic',
    displayName: '🔮 Místico',
    colors: {
      background: '#1a0d2e',
      foreground: '#f5d9ff',
      card: '#2a1a45',
      cardForeground: '#f5d9ff',
      primary: '#a960d7',
      primaryLight: '#c47fff',
      primaryDark: '#7b3fa5',
      primaryForeground: '#ffffff',
      secondary: '#7c3fa5',
      secondaryForeground: '#ffffff',
      accent: '#5f2e7f',
      accentForeground: '#ffffff',
      muted: '#3a2a55',
      mutedForeground: '#d9b3ff',
      destructive: '#ff6b9d',
      destructiveForeground: '#ffffff',
      border: '#3a2a55',
      input: '#2a1a45',
      inputBackground: '#1a0d2e',
      ring: '#a960d7',
      textSecondary: '#d9b3ff',
      textTertiary: '#c47fff',
    },
  },

  // 20. Cotton Candy Theme
  cottonCandy: {
    name: 'cottonCandy',
    displayName: '🍭 Algodão Doce',
    colors: {
      background: '#fff5fa',
      foreground: '#8b3a6d',
      card: '#ffe8f5',
      cardForeground: '#8b3a6d',
      primary: '#ff69b4',
      primaryLight: '#ff99cc',
      primaryDark: '#ff1493',
      primaryForeground: '#ffffff',
      secondary: '#ff66cc',
      secondaryForeground: '#ffffff',
      accent: '#ff88dd',
      accentForeground: '#ffffff',
      muted: '#ffc0e0',
      mutedForeground: '#a85a8f',
      destructive: '#d946a6',
      destructiveForeground: '#ffffff',
      border: '#ffb3d9',
      input: '#ffd9ed',
      inputBackground: '#fff5fa',
      ring: '#ff69b4',
      textSecondary: '#a85a8f',
      textTertiary: '#c97fa8',
    },
  },
};

// ============================================
// 6. UTILITY FUNCTIONS
// ============================================

/**
 * Gera as CSS Variables a partir de um tema
 */
export function generateCSSVariables(theme: Theme): string {
  return Object.entries(theme.colors)
    .map(([key, value]) => {
      const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `--${kebabKey}: ${value};`;
    })
    .join('\n  ');
}

/**
 * Aplica um tema ao documento
 */
export function applyTheme(themeName: ThemeName) {
  const theme = themes[themeName];
  const html = document.documentElement;
  
  // Remove todas as classes de tema anteriores
  const allThemeClasses = [
    'light', 'dark', 'high-contrast', 'sunny', 'icy-blue', 'dusty-lavender', 
    'icy-aqua', 'vintage-rose', 'berry', 'forest-green', 'sunset-orange',
    'midnight-navy', 'cherry-pink', 'sage-green', 'coral-reef', 'deep-purple',
    'autumn-amber', 'ocean-wave', 'peacock', 'marigold', 'stellar', 'mystic',
    'cotton-candy'
  ];
  allThemeClasses.forEach(cls => html.classList.remove(cls));
  
  // Aplica a classe apropriada para o tema (exceto default)
  const classMap: Record<string, string> = {
    light: 'light',
    dark: 'dark',
    highContrast: 'high-contrast',
    sunny: 'sunny',
    icyBlue: 'icy-blue',
    dustyLavender: 'dusty-lavender',
    icyAqua: 'icy-aqua',
    vintageRose: 'vintage-rose',
    berry: 'berry',
    forestGreen: 'forest-green',
    sunsetOrange: 'sunset-orange',
    midnightNavy: 'midnight-navy',
    cherryPink: 'cherry-pink',
    sageGreen: 'sage-green',
    coralReef: 'coral-reef',
    deepPurple: 'deep-purple',
    autumnAmber: 'autumn-amber',
    oceanWave: 'ocean-wave',
    peacock: 'peacock',
    marigold: 'marigold',
    stellar: 'stellar',
    mystic: 'mystic',
    cottonCandy: 'cotton-candy',
  };
  
  const cssClass = classMap[themeName];
  if (cssClass) {
    html.classList.add(cssClass);
  }
  
  // Aplica as variáveis CSS
  Object.entries(theme.colors).forEach(([key, value]) => {
    const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    html.style.setProperty(`--${kebabKey}`, value);
  });
}

/**
 * Detecta preferência do sistema
 */
export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
