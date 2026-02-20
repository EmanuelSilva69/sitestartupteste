/**
 * THEME CONTEXT & PROVIDER
 * Gerencia o estado global do tema e persiste preferências do usuário
 * VERSÃO SEGURA: Aplica tema imediatamente sem layout shifts
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ThemeName, themes, applyTheme, getSystemTheme } from './design-tokens';

// ============================================
// 1. APPLY THEME IMMEDIATELY (Script Initialization)
// ============================================

// Esta função roda ANTES do React render para evitar FOUC
function initializeThemeImmediately() {
  if (typeof window === 'undefined') return;
  
  try {
    // Tenta carregar tema salvo
    const saved = localStorage.getItem('startplay-theme-preference');
    if (saved && Object.keys(themes).includes(saved)) {
      applyTheme(saved as ThemeName);
      return;
    }
  } catch (e) {
    // Falha silenciosa se localStorage não disponível
  }

  // Fallback: aplica tema default
  applyTheme('default');
}

// Inicia imediatamente quando script carrega
if (typeof document !== 'undefined') {
  initializeThemeImmediately();
}

// ============================================
// 2. TYPES & INTERFACES
// ============================================

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  toggleTheme: () => void;
  availableThemes: ThemeName[];
}

// ============================================
// 3. CONTEXT CREATION
// ============================================

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ============================================
// 4. LOCAL STORAGE KEY
// ============================================

const STORAGE_KEY = 'startplay-theme-preference';

// ============================================
// 5. THEME PROVIDER COMPONENT (VERSÃO SEGURA)
// ============================================

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeName;
  storageKey?: string;
}

export function ThemeProvider({ 
  children, 
  defaultTheme = 'default',
  storageKey = STORAGE_KEY 
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeName>(defaultTheme);

  // ============================================
  // Sincroniza estado com tema já aplicado
  // ============================================
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored && isValidTheme(stored)) {
        const savedTheme = stored as ThemeName;
        setThemeState(savedTheme);
        applyTheme(savedTheme); // Garante sincronização
        return;
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
    }

    // Aplica tema padrão se nada foi salvo
    setThemeState(defaultTheme);
    applyTheme(defaultTheme);
  }, [defaultTheme, storageKey]);

  // ============================================
  // Detecta mudanças na preferência do sistema
  // ============================================
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const hasStoredPreference = localStorage.getItem(storageKey);
      if (!hasStoredPreference) {
        const systemTheme = e.matches ? 'dark' : 'light';
        setThemeState(systemTheme);
        applyTheme(systemTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [storageKey]);

  // ============================================
  // Função para alterar o tema
  // ============================================
  const setTheme = (newTheme: ThemeName) => {
    if (!isValidTheme(newTheme)) {
      console.warn(`Invalid theme: ${newTheme}`);
      return;
    }

    setThemeState(newTheme);
    applyTheme(newTheme);

    // Persiste no localStorage
    try {
      localStorage.setItem(storageKey, newTheme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }

    // Emite evento customizado para observadores
    window.dispatchEvent(
      new CustomEvent('theme-change', { 
        detail: { theme: newTheme } 
      })
    );
  };

  // ============================================
  // Função para alternar entre temas
  // ============================================
  const toggleTheme = () => {
    const themeOrder: ThemeName[] = [
      'default', 'light', 'dark', 'highContrast',
      'sunny', 'icyBlue', 'dustyLavender', 'icyAqua', 'vintageRose',
      'berry', 'forestGreen', 'sunsetOrange', 'midnightNavy', 'cherryPink',
      'sageGreen', 'coralReef', 'deepPurple', 'autumnAmber', 'oceanWave',
      'peacock', 'marigold', 'stellar', 'mystic', 'cottonCandy'
    ];
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setTheme(themeOrder[nextIndex]);
  };

  // ============================================
  // Lista de temas disponíveis
  // ============================================
  const availableThemes = Object.keys(themes) as ThemeName[];

  // ============================================
  // Renderiza SEM delay - tema já foi aplicado
  // ============================================
  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        setTheme, 
        toggleTheme,
        availableThemes 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// ============================================
// 6. CUSTOM HOOK
// ============================================

export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

// ============================================
// 6. UTILITY FUNCTIONS
// ============================================

function isValidTheme(theme: string): theme is ThemeName {
  return Object.keys(themes).includes(theme);
}

// ============================================
// 7. HELPER HOOKS
// ============================================

/**
 * Hook que retorna true se o tema atual é dark
 */
export function useIsDarkTheme(): boolean {
  const { theme } = useTheme();
  // Temas que são considerados 'dark' ou com fundo escuro
  const darkThemes: ThemeName[] = [
    'default', 'dark', 'highContrast',
    'icyBlue', 'forestGreen', 'sunsetOrange',
    'midnightNavy', 'deepPurple', 'autumnAmber',
    'oceanWave', 'peacock', 'stellar', 'mystic'
  ];
  return darkThemes.includes(theme);
}

/**
 * Hook que observa mudanças de tema e executa callback
 */
export function useThemeObserver(callback: (theme: ThemeName) => void) {
  const { theme } = useTheme();

  useEffect(() => {
    callback(theme);
  }, [theme, callback]);

  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: ThemeName }>;
      callback(customEvent.detail.theme);
    };

    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, [callback]);
}
