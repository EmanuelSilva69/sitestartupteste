# 🚀 Quick Start - Implementando o Sistema de Temas

## Passo a Passo para Integração

### 1️⃣ Envolver a aplicação com ThemeProvider

**Arquivo:** `src/main.tsx` ou `src/App.tsx`

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from './lib/theme-context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="default">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

### 2️⃣ Adicionar Seletor de Tema na Interface

**Opção A: No Header (Recomendado)**

Edite `src/components/ConsultationForm.tsx`:

```tsx
import { ThemeToggle } from './ui/theme-selector';

export function ConsultationForm({ onSubmit, onViewProfile }: ConsultationFormProps) {
  // ... código existente ...

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Header */}
      <div className="bg-primary border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="size-6 text-primary-foreground" />
              <div>
                <h1 className="text-2xl font-semibold text-primary-foreground">
                  Startplay Simulados
                </h1>
                <p className="text-primary-foreground/80 text-sm">
                  Portal de Desempenho e Análise
                </p>
              </div>
            </div>
            
            {/* Adicione o ThemeToggle aqui */}
            <ThemeToggle />
          </div>
        </div>
      </div>
      
      {/* resto do código... */}
    </div>
  );
}
```

**Opção B: Dropdown Completo com Label**

```tsx
import { ThemeSelector } from './ui/theme-selector';

// No componente:
<ThemeSelector variant="dropdown" showLabel />
```

### 3️⃣ (Opcional) Adicionar Atalho de Teclado Global

Em `App.tsx`:

```tsx
import { useThemeKeyboardShortcut } from './components/ui/theme-selector';

export default function App() {
  useThemeKeyboardShortcut(); // Ctrl+Shift+T para alternar tema
  
  return (
    // ... seu app ...
  );
}
```

### 4️⃣ Testar o Sistema

1. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

2. Abra o navegador e verifique:
   - ✅ Botão de tema aparece no header
   - ✅ Clicar alterna entre temas
   - ✅ Recarregar a página mantém o tema escolhido
   - ✅ Ctrl+Shift+T alterna o tema

---

## 🎨 Exemplo de Implementação Completa

Aqui está um exemplo completo de como integrar no App.tsx:

```tsx
import { useState } from 'react';
import { ThemeProvider } from './lib/theme-context';
import { ThemeSelector, useThemeKeyboardShortcut } from './components/ui/theme-selector';
import { ConsultationForm } from './components/ConsultationForm';
// ... outros imports

function AppContent() {
  // Adiciona atalho de teclado
  useThemeKeyboardShortcut();
  
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  // ... resto do estado ...

  return (
    <div className="min-h-screen bg-background">
      {/* Seletor de tema fixo no canto superior direito */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeSelector variant="dropdown" />
      </div>

      {/* Seu conteúdo existente */}
      {currentScreen === 'login' && (
        <ConsultationForm onSubmit={handleLoginSuccess} />
      )}
      {/* ... outras telas ... */}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="default">
      <AppContent />
    </ThemeProvider>
  );
}
```

---

## 🔧 Personalizações Rápidas

### Mudar Tema Padrão

```tsx
<ThemeProvider defaultTheme="light"> {/* ou 'dark', 'highContrast' */}
```

### Tema Baseado na Hora do Dia

```tsx
const defaultTheme = new Date().getHours() >= 18 ? 'dark' : 'light';

<ThemeProvider defaultTheme={defaultTheme}>
```

### Tema Baseado em Preferência do Sistema

```tsx
import { getSystemTheme } from './lib/design-tokens';

const systemTheme = getSystemTheme();

<ThemeProvider defaultTheme={systemTheme}>
```

---

## 🐛 Troubleshooting

### Problema: Tema não persiste após reload

**Solução:** Verifique se o ThemeProvider está envolvendo toda a aplicação no nível mais alto.

### Problema: CSS Variables não são aplicados

**Solução:** Certifique-se de que `globals.css` está importado e que o código está rodando no cliente (não SSR).

### Problema: Flash de tema incorreto (FOUC)

**Solução:** O ThemeProvider já possui proteção contra isso. Se ainda acontecer, adicione no `index.html`:

```html
<script>
  // Carrega tema antes de renderizar
  const theme = localStorage.getItem('startplay-theme-preference') || 'default';
  document.documentElement.setAttribute('data-theme', theme);
</script>
```

---

## ✅ Checklist de Implementação

- [ ] ThemeProvider adicionado no nível raiz (main.tsx ou App.tsx)
- [ ] ThemeSelector adicionado na interface (header, settings, etc.)
- [ ] Arquivos de tokens e context estão na pasta correta
- [ ] Testado alternância de temas no navegador
- [ ] Verificado que preferência persiste após reload
- [ ] (Opcional) Atalho de teclado implementado
- [ ] Componentes principais migrados para usar tokens semânticos

---

## 📚 Próximos Passos

1. ✅ **Você está aqui:** Sistema instalado e funcionando
2. 📝 Migrar componentes existentes para usar tokens
3. 🎨 Criar tema customizado para sua marca
4. ♿ Testar acessibilidade em todos os temas
5. 🚀 Deploy!

---

**Dúvidas?** Consulte a [documentação completa](./THEME_SYSTEM.md)
