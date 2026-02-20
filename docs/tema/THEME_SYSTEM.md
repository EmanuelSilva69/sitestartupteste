# 🎨 Sistema de Temas - Arquitetura Themable

## 📚 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Instalação e Setup](#instalação-e-setup)
4. [Uso Básico](#uso-básico)
5. [Design Tokens](#design-tokens)
6. [Criando Novos Temas](#criando-novos-temas)
7. [Guia de Migração](#guia-de-migração)
8. [Best Practices](#best-practices)
9. [API Reference](#api-reference)

---

## 🎯 Visão Geral

Este sistema implementa uma **arquitetura de temas modular e escalável** que permite:

- ✅ **Troca de temas em tempo real** sem reload da página
- ✅ **Persistência da preferência** do usuário
- ✅ **Suporte a tema do sistema** (auto dark/light mode)
- ✅ **4 temas pré-configurados**: Default, Light, Dark, High Contrast
- ✅ **Componentes agnósticos** ao tema (não possuem cores hardcoded)
- ✅ **Design tokens centralizados** para fácil customização
- ✅ **TypeScript e type-safe** em toda a implementação

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────┐
│         Application Layer               │
│  (App.tsx, Components, Pages)           │
└─────────────┬───────────────────────────┘
              │ usa
              ↓
┌─────────────────────────────────────────┐
│        Theme Context API                │
│  (theme-context.tsx)                    │
│  - Estado global do tema                │
│  - Persistência (localStorage)          │
│  - Hooks customizados                   │
└─────────────┬───────────────────────────┘
              │ consome
              ↓
┌─────────────────────────────────────────┐
│        Design Tokens                    │
│  (design-tokens.ts)                     │
│  - Paleta de cores                      │
│  - Espaçamentos                         │
│  - Tipografia                           │
│  - Definições de temas                  │
└─────────────┬───────────────────────────┘
              │ injeta
              ↓
┌─────────────────────────────────────────┐
│        CSS Variables (:root)            │
│  --primary, --background, etc.          │
└─────────────────────────────────────────┘
              │ aplicado em
              ↓
┌─────────────────────────────────────────┐
│        Atomic Components                │
│  (Button, Card, Input, etc.)            │
│  - Usam apenas tokens semânticos        │
│  - Sem cores hardcoded                  │
└─────────────────────────────────────────┘
```

### Camadas do Sistema:

1. **Design Tokens Layer** (`design-tokens.ts`)
   - Define todos os valores primitivos (cores, espaçamentos, efeitos)
   - Mapeia tokens semânticos para cada tema
   - Exporta utilitários para manipulação de temas

2. **Context Layer** (`theme-context.tsx`)
   - Gerencia estado global do tema
   - Persiste preferências do usuário
   - Fornece hooks para consumir o tema

3. **UI Components Layer** (`components/ui/`)
   - Componentes que consomem tokens semânticos
   - Totalmente agnósticos ao tema escolhido
   - Exemplo: `themed-components-example.tsx`

4. **Application Layer**
   - Usa o ThemeProvider no root
   - Implementa ThemeSelector onde necessário

---

## 🚀 Instalação e Setup

### Passo 1: Estrutura de Arquivos

Os seguintes arquivos foram criados:

```
src/
├── lib/
│   ├── design-tokens.ts       # Definições de tokens e temas
│   └── theme-context.tsx      # Context Provider e hooks
├── components/
│   └── ui/
│       ├── theme-selector.tsx          # Componente de seleção de tema
│       └── themed-components-example.tsx # Exemplos de componentes
└── docs/
    └── THEME_SYSTEM.md        # Esta documentação
```

### Passo 2: Integrar no App.tsx

```tsx
import { ThemeProvider } from './lib/theme-context';
import { ThemeSelector } from './components/ui/theme-selector';

export default function App() {
  return (
    <ThemeProvider defaultTheme="default">
      {/* Seu app aqui */}
      <YourAppContent />
      
      {/* Adicione o seletor de tema onde desejar */}
      <ThemeSelector />
    </ThemeProvider>
  );
}
```

### Passo 3: Atualizar globals.css (Opcional)

Os tokens já estão definidos em `design-tokens.ts`, mas você pode sincronizar com CSS:

```css
/* globals.css */
:root {
  /* Tokens são injetados dinamicamente pelo ThemeProvider */
  /* Não é necessário definir aqui, mas pode servir como fallback */
}
```

---

## 💡 Uso Básico

### 1. Hook useTheme

```tsx
import { useTheme } from '@/lib/theme-context';

function MyComponent() {
  const { theme, setTheme, toggleTheme } = useTheme();

  return (
    <div>
      <p>Tema atual: {theme}</p>
      <button onClick={toggleTheme}>Alternar Tema</button>
      <button onClick={() => setTheme('light')}>Modo Claro</button>
    </div>
  );
}
```

### 2. Seletor de Tema

```tsx
import { ThemeSelector } from '@/components/ui/theme-selector';

// Dropdown com todos os temas
<ThemeSelector variant="dropdown" showLabel />

// Botão de toggle simples
<ThemeSelector variant="button" />
```

### 3. Atalho de Teclado

```tsx
import { useThemeKeyboardShortcut } from '@/components/ui/theme-selector';

function MyApp() {
  useThemeKeyboardShortcut(); // Adiciona Ctrl+Shift+T para alternar
  return <YourContent />;
}
```

### 4. Detectar Tema Dark

```tsx
import { useIsDarkTheme } from '@/lib/theme-context';

function MyComponent() {
  const isDark = useIsDarkTheme();
  return <div>Tema escuro: {isDark ? 'Sim' : 'Não'}</div>;
}
```

---

## 🎨 Design Tokens

### Tokens Semânticos

Use sempre tokens semânticos ao invés de valores hardcoded:

```tsx
// ❌ EVITE (hardcoded)
<div className="bg-purple-600 text-white">

// ✅ PREFIRA (semântico)
<div className="bg-primary text-primary-foreground">
```

### Tabela de Tokens Principais

| Token | Uso | Exemplo |
|-------|-----|---------|
| `bg-background` | Fundo principal da aplicação | `<body>` |
| `text-foreground` | Texto principal | `<p>` |
| `bg-card` | Fundo de cards/containers | `<Card>` |
| `bg-primary` | Cor primária (ações principais) | Botões CTA |
| `bg-secondary` | Cor secundária (ações alternativas) | Botões secundários |
| `bg-accent` | Cor de destaque | Highlights, badges |
| `bg-muted` | Fundos sutis | Seções de informação |
| `text-muted-foreground` | Texto secundário | Descrições, hints |
| `border-border` | Bordas padrão | Divisores, outlines |
| `bg-destructive` | Ações destrutivas | Botões de deletar |

### Tokens de Efeitos

```tsx
// Bordas arredondadas
rounded-sm, rounded, rounded-md, rounded-lg, rounded-xl, rounded-full

// Sombras
shadow-sm, shadow, shadow-md, shadow-lg, shadow-xl

// Transições
transition-all, transition-colors, transition-shadow
```

---

## 🆕 Criando Novos Temas

### Passo 1: Definir o Tema

Edite `design-tokens.ts`:

```typescript
export const themes: Record<ThemeName, Theme> = {
  // ... temas existentes

  // Novo tema corporativo
  corporate: {
    name: 'corporate',
    displayName: 'Corporativo',
    colors: {
      background: '#ffffff',
      foreground: '#1a202c',
      card: '#f7fafc',
      cardForeground: '#1a202c',
      primary: '#2563eb', // Azul corporativo
      primaryForeground: '#ffffff',
      secondary: '#64748b',
      secondaryForeground: '#ffffff',
      accent: '#0891b2',
      accentForeground: '#ffffff',
      muted: '#f1f5f9',
      mutedForeground: '#64748b',
      destructive: '#dc2626',
      destructiveForeground: '#ffffff',
      border: '#e2e8f0',
      input: '#e2e8f0',
      inputBackground: '#ffffff',
      ring: '#2563eb',
    },
  },
};
```

### Passo 2: Adicionar ao Type

```typescript
export type ThemeName = 'default' | 'light' | 'dark' | 'highContrast' | 'corporate';
```

### Passo 3: Adicionar Ícone (Opcional)

Em `theme-selector.tsx`:

```tsx
import { Briefcase } from 'lucide-react';

const themeIcons: Record<ThemeName, React.ReactNode> = {
  // ... ícones existentes
  corporate: <Briefcase className="size-4" />,
};
```

Pronto! O novo tema estará disponível automaticamente.

---

## 📝 Guia de Migração

### Migrar Componentes Existentes

#### 1. Identifique Cores Hardcoded

```tsx
// ANTES
<div className="bg-purple-600 text-white border-purple-700">
  <p className="text-gray-600">Descrição</p>
</div>
```

#### 2. Substitua por Tokens Semânticos

```tsx
// DEPOIS
<div className="bg-primary text-primary-foreground border-primary">
  <p className="text-muted-foreground">Descrição</p>
</div>
```

### Tabela de Conversão Rápida

| Antes (Hardcoded) | Depois (Token) |
|-------------------|----------------|
| `bg-purple-600` | `bg-primary` |
| `bg-pink-500` | `bg-secondary` |
| `bg-blue-500` | `bg-accent` |
| `bg-white` | `bg-background` ou `bg-card` |
| `bg-gray-100` | `bg-muted` |
| `bg-gray-900` | `bg-card` (dark) |
| `text-white` | `text-foreground` (light) ou `text-primary-foreground` |
| `text-black` | `text-foreground` |
| `text-gray-600` | `text-muted-foreground` |
| `border-gray-300` | `border-border` |
| `bg-red-600` | `bg-destructive` |

### Exemplo Completo de Migração

#### Antes:
```tsx
export function OldCard() {
  return (
    <div className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl">
      <div className="p-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          Título
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Descrição
        </p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-4">
          Ação
        </button>
      </div>
    </div>
  );
}
```

#### Depois:
```tsx
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function NewCard() {
  return (
    <Card className="border shadow-lg">
      <div className="p-8">
        <h2 className="text-3xl font-bold text-foreground">
          Título
        </h2>
        <p className="text-muted-foreground">
          Descrição
        </p>
        <Button>
          Ação
        </Button>
      </div>
    </Card>
  );
}
```

**Benefícios:**
- ✅ Adapta-se automaticamente a todos os temas
- ✅ Menos código (removidos dark:*)
- ✅ Mais manutenível
- ✅ Type-safe

---

## ⚡ Best Practices

### ✅ Faça

1. **Use tokens semânticos sempre**
   ```tsx
   <div className="bg-primary text-primary-foreground">
   ```

2. **Use componentes do sistema**
   ```tsx
   import { Button } from '@/components/ui/button';
   <Button>Click me</Button>
   ```

3. **Teste em todos os temas**
   - Verifique contraste
   - Teste legibilidade
   - Valide acessibilidade

4. **Documente tokens customizados**
   ```tsx
   // Token customizado para status especial
   const statusColor = "text-emerald-500 dark:text-emerald-400";
   ```

### ❌ Evite

1. **Cores hardcoded**
   ```tsx
   // ❌ EVITE
   <div style={{ backgroundColor: '#8b5cf6' }}>
   ```

2. **Múltiplas variantes dark:**
   ```tsx
   // ❌ EVITE (complexo e frágil)
   <div className="bg-white dark:bg-gray-900 dark:border-gray-700">
   
   // ✅ PREFIRA
   <div className="bg-background border-border">
   ```

3. **Inline styles para cores**
   ```tsx
   // ❌ EVITE
   <div style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
   ```

4. **Acesso direto a CSS variables**
   ```tsx
   // ❌ EVITE
   const color = getComputedStyle(root).getPropertyValue('--primary');
   
   // ✅ PREFIRA
   const { theme } = useTheme();
   const color = themes[theme].colors.primary;
   ```

---

## 📖 API Reference

### ThemeProvider

```tsx
<ThemeProvider
  defaultTheme="default"  // Tema inicial
  storageKey="app-theme"  // Chave do localStorage
>
  {children}
</ThemeProvider>
```

### useTheme()

```typescript
const {
  theme,           // ThemeName: tema atual
  setTheme,        // (theme: ThemeName) => void
  toggleTheme,     // () => void: alterna entre temas
  availableThemes  // ThemeName[]: lista de temas
} = useTheme();
```

### useIsDarkTheme()

```typescript
const isDark = useIsDarkTheme(); // boolean
```

### useThemeObserver()

```typescript
useThemeObserver((theme) => {
  console.log('Tema mudou para:', theme);
});
```

### ThemeSelector

```tsx
<ThemeSelector 
  variant="dropdown"    // 'dropdown' | 'button'
  showLabel={false}     // boolean
  className=""          // string
/>
```

---

## 🎓 Exemplos Práticos

Veja `themed-components-example.tsx` para exemplos completos de:

- Botões temáveis
- Cards temáveis
- Inputs temáveis
- Badges com variantes semânticas
- Formulários completos

---

## 🔄 Próximos Passos

1. **Migre componentes existentes** usando o guia acima
2. **Adicione ThemeProvider** no App.tsx
3. **Implemente ThemeSelector** no header/settings
4. **Teste todos os temas** em diferentes páginas
5. **Crie temas customizados** conforme necessidade da marca

---

## 📌 Recursos Úteis

- [Tailwind CSS Variables](https://tailwindcss.com/docs/customizing-colors#using-css-variables)
- [React Context API](https://react.dev/reference/react/useContext)
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

---

**🎨 Sistema criado para Startplay Simulados**  
**Versão:** 1.0.0  
**Última atualização:** Fevereiro 2026
