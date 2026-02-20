/**
 * THEME SELECTOR COMPONENT
 * Componente UI para permitir ao usuário escolher o tema
 */

import React from 'react';
import { 
  Palette, Sun, Moon, Contrast, Sparkles,
  Cloud, Snowflake, Flower2, Droplets, Flower,
  Zap, Trees, Sunset, Wind, Heart,
  Leaf, Waves, Feather, Lightbulb, Star,
  Wand2, Zap as MagicIcon
} from 'lucide-react';
import { useTheme } from '../../lib/theme-context';
import { ThemeName, themes } from '../../lib/design-tokens';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from './dropdown-menu';

// ============================================
// ÍCONES PARA CADA TEMA
// ============================================

const themeIcons: Record<ThemeName, React.ReactNode> = {
  default: <Sparkles className="size-4" />,
  light: <Sun className="size-4" />,
  dark: <Moon className="size-4" />,
  highContrast: <Contrast className="size-4" />,
  sunny: <Sun className="size-4" />,
  icyBlue: <Snowflake className="size-4" />,
  dustyLavender: <Flower2 className="size-4" />,
  icyAqua: <Droplets className="size-4" />,
  vintageRose: <Flower className="size-4" />,
  berry: <Heart className="size-4" />,
  forestGreen: <Trees className="size-4" />,
  sunsetOrange: <Sunset className="size-4" />,
  midnightNavy: <Moon className="size-4" />,
  cherryPink: <Heart className="size-4" />,
  sageGreen: <Leaf className="size-4" />,
  coralReef: <Waves className="size-4" />,
  deepPurple: <Wand2 className="size-4" />,
  autumnAmber: <Sunset className="size-4" />,
  oceanWave: <Waves className="size-4" />,
  peacock: <Feather className="size-4" />,
  marigold: <Lightbulb className="size-4" />,
  stellar: <Star className="size-4" />,
  mystic: <Wand2 className="size-4" />,
  cottonCandy: <Heart className="size-4" />,
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

interface ThemeSelectorProps {
  variant?: 'button' | 'dropdown';
  showLabel?: boolean;
  className?: string;
}

export function ThemeSelector({ 
  variant = 'dropdown', 
  showLabel = false,
  className = '' 
}: ThemeSelectorProps) {
  const { theme, setTheme, availableThemes } = useTheme();

  // ============================================
  // Variant: Button (Toggle between themes)
  // ============================================
  if (variant === 'button') {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
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
        }}
        className={`relative group transition-all duration-300 ${className}`}
        title={`Tema atual: ${themes[theme].displayName}`}
        aria-label={`Alternar tema. Tema atual: ${themes[theme].displayName}. Clique para próximo tema`}
      >
        <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          {themeIcons[theme]}
        </div>
        
        {/* Tooltip visual */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="px-3 py-1.5 bg-card border border-border rounded-md text-xs font-medium text-foreground shadow-lg">
            {themes[theme].displayName}
          </div>
        </div>
        
        <span className="sr-only">Alternar tema</span>
      </Button>
    );
  }

  // ============================================
  // Variant: Dropdown (Select from all themes)
  // ============================================
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={className}>
          <Palette className="size-4 mr-2" />
          {showLabel && (
            <span className="hidden sm:inline">
              {themes[theme].displayName}
            </span>
          )}
          <span className="sr-only">Selecionar tema</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Escolher Tema</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {availableThemes.map((themeName) => (
          <DropdownMenuItem
            key={themeName}
            onClick={() => setTheme(themeName)}
            className={theme === themeName ? 'bg-accent' : ''}
          >
            <span className="mr-2">{themeIcons[themeName]}</span>
            <span className="flex-1">{themes[themeName].displayName}</span>
            {theme === themeName && (
              <span className="ml-2 text-xs">✓</span>
            )}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        
        <div className="px-2 py-1.5 text-xs text-muted-foreground">
          Use Ctrl+Shift+T para alternar
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ============================================
// VARIAÇÕES DO COMPONENTE
// ============================================

/**
 * Seletor simples em formato de ícone
 */
export function ThemeToggle() {
  return <ThemeSelector variant="button" />;
}

/**
 * Seletor com label visível
 */
export function ThemeDropdownWithLabel() {
  return <ThemeSelector variant="dropdown" showLabel />;
}

// ============================================
// KEYBOARD SHORTCUT HANDLER
// ============================================

/**
 * Hook que adiciona atalho de teclado para alternar tema
 * Uso: useThemeKeyboardShortcut() dentro de um componente
 */
export function useThemeKeyboardShortcut(key = 't', modifiers = ['ctrlKey', 'shiftKey']) {
  const { toggleTheme } = useTheme();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const modifiersPressed = modifiers.every(mod => e[mod as keyof KeyboardEvent]);
      if (modifiersPressed && e.key.toLowerCase() === key) {
        e.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTheme, key, modifiers]);
}
