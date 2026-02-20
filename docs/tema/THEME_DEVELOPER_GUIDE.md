# 🛠️ THEME SYSTEM - GUIA TÉCNICO & TESTES

## 1. COMO USAR O SISTEMA DE TEMAS

### Para Desenvolvedores

#### Acessar o Tema Atual
```typescript
import { useTheme } from '@/lib/theme-context';

function MeuComponente() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div>
      Tema atual: {theme}
      <button onClick={() => setTheme('light')}>
        Mudar para Claro
      </button>
    </div>
  );
}
```

#### Usar Variáveis de Cores
```tsx
// ✅ COR RECOMENDADA: Use classes Tailwind
<h1 className="text-foreground">Meu Título</h1>
<p className="text-muted-foreground">Subtexto</p>
<div className="bg-card text-card-foreground">...</div>

// ✅ COR RECOMENDADA: CSS Variables
<div style={{ 
  color: 'var(--foreground)',
  backgroundColor: 'var(--card)'
}}>...</div>

// ❌ NÃO FAÇA: Hardcoded colors
<h1 className="text-white">...</h1> // ❌ Invisível em tema claro
<h1 style={{ color: '#ffffff' }}>...</h1> // ❌ Evite
```

#### Adicionar Nova Cor no Tema
1. Edite `src/lib/design-tokens.ts`:
```typescript
const themes = {
  default: {
    colors: {
      // ... cores existentes
      myNewColor: '#ff0000', // adicione aqui
    }
  }
}
```

2. Defina em `src/styles/globals.css`:
```css
:root {
  --my-new-color: #ff0000;
}

.light {
  --my-new-color: #cc0000; // versão para tema claro
}

.dark {
  --my-new-color: #ff6666;
}

.high-contrast {
  --my-new-color: #ff00ff; // neon para alto contraste
}
```

3. Use no componente:
```tsx
<div className="bg-my-new-color text-foreground">...</div>
```

---

## 2. TESTES MANUAIS

### ✅ Teste 1: Alternância de Temas

```bash
# Terminal 1: Iniciar servidor
npm run dev

# Terminal 2: Navegador
http://localhost:3003

# Passos:
1. Clique no ícone de tema (canto superior direito)
2. Selecione cada tema:
   - Padrão ✅ → Roxo/Rosa, textos brancos
   - Claro ☀️ → Branco, textos escuros
   - Escuro ⭕ → Preto puro, textos brancos
   - Alto Contraste 🔲 → Neon em preto
3. Observe:
   - Todos os textos permanecem legíveis
   - Gradientes mantêm a qualidade visual
   - Botões e ícones adaptam-se
```

### ✅ Teste 2: localStorage Persistence

```bash
# Passos:
1. Abra DevTools (F12)
2. Selecione tema "Claro"
3. Abra Console / Application / localStorage
4. Busque chave: 'startplay-theme-preference'
5. Valor esperado: 'light'
6. Recarregue a página (F5)
7. ✅ Tema deve manter "Claro"
8. Dele localStorage (DevTools → Application → Clear Storage)
9. Recarregue
10. ✅ Tema deve voltar para padrão do sistema
```

### ✅ Teste 3: Preferência do Sistema

**Windows:**
```
1. Configurações → Personalization → Colors
2. Escolha "Dark" ou "Light"
3. Volte no navegador e recarregue (F5)
4. ✅ Tema deve mudar automaticamente
```

**Mac:**
```
1. System Preferences → General
2. Escolha "Light" ou "Dark" Appearance
3. Recarregue o navegador
4. ✅ Tema deve mudar automaticamente
```

### ✅ Teste 4: Contraste (WCAG)

Uso: **WebAIM Contrast Checker** (extensão Chrome)
```
1. Abra ConsultationForm em cada tema
2. Use ferramenta para medir contraste
3. Verifique:
   - Texto vs Background ≥ 4.5:1 (AA)
   - Preferível ≥ 7:1 (AAA)

Temas esperados:
  Padrão: 9.2:1 ✅ AAA
  Claro: 17.8:1 ✅ AAA
  Escuro: 20:1 ✅ AAA
  Alto Contraste: 21:1 ✅ AAA+
```

### ✅ Teste 5: Visibilidade de Elementos

```bash
# ConsultationForm
1. Tema Claro ☀️
2. Verifique:
   □ Título "Startplay Simulados" visível
   □ Subtexto "Portal de Desempenho..." visível
   □ Labels de campos visíveis
   □ Botão "Iniciar Consulta" legível

# ResultScreen  
1. Tema Claro ☀️
2. Verifique:
   □ "Simulado Concluído!" em verde legível
   □ ID do simulado em preto legível
   □ Pontuação amostra bem visível

# DetailedProfile
1. Tema Claro ☀️
2. Verifique:
   □ Nome do candidato em preto legível
   □ Número "Diferença" em 6xl visível (+5.2%)
   □ Gráficos com cores contrastadas
```

### ✅ Teste 6: Responsividade com Tema

```bash
# DevTools: F12 → Toggle Device Toolbar (Ctrl+Shift+M)

Teste em:
  □ iPad (768px)
  □ iPhone 12 (390px)
  □ Desktop (1920px)

Trocar tema em cada tamanho:
  ✅ Textos legíveis em qualquer viewport
  ✅ Layouts não mudos
  ✅ Cores mantêm contraste
```

---

## 3. TESTES AUTOMATIZADOS

### Setup (Opcional)
```bash
# Instalar ferramentas de teste (opcional)
npm install --save-dev jest @testing-library/react axe-core
```

### Teste de Tema com Jest
```typescript
// src/__tests__/theme.test.tsx
import { act, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/lib/theme-context';
import App from '@/App';

describe('Theme System', () => {
  it('should render with default theme', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );
    expect(document.documentElement.classList).toContain('default');
  });

  it('should apply light theme class', () => {
    const { getByRole } = render(...);
    const themeButton = getByRole('button');
    
    act(() => {
      themeButton.click();
    });
    
    // Verificar se classe foi aplicada
    expect(document.documentElement.classList).toContain('light');
  });

  it('should save theme to localStorage', () => {
    // ... teste localStorage
    expect(localStorage.getItem('startplay-theme-preference')).toBe('light');
  });
});

// Executar:
// npm test theme.test.tsx
```

### Teste de Contraste com axe-core
```typescript
import { axe } from 'jest-axe';

it('should have no accessibility violations', async () => {
  const { container } = render(<ConsultationForm />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## 4. COMANDOS ÚTEIS

### Development
```bash
# Iniciar servidor hot-reload
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Type checking
npx tsc --noEmit
```

### Debug
```bash
# Ver CSS variables aplicadas em DevTools
document.documentElement.style  // Console → Application

# Ver localStorage
localStorage.getItem('startplay-theme-preference')

# Ver classe aplicada
document.documentElement.className

# Forçar tema (Console Editor)
localStorage.setItem('startplay-theme-preference', 'light')
location.reload()
```

### Limpeza
```bash
# Remover tema salvo (volta para padrão do sistema)
localStorage.removeItem('startplay-theme-preference')

# Limpar node_modules e reinstalar
rm -r node_modules
npm install

# Limpar build
rm -r build/
```

---

## 5. ESTRUTURA DE ARQUIVOS PRINCIPAIS

```
src/
├── lib/
│   ├── design-tokens.ts (360 linhas)
│   │   ├── defineColors() - define paleta de cores
│   │   ├── interface Theme - tipagem de temas
│   │   ├── themes = { default, light, dark, highContrast }
│   │   ├── applyTheme() - aplica tema ao documento
│   │   └── generateCSSVariables() - gera CSS variables
│   │
│   └── theme-context.tsx (211 linhas)
│       ├── initializeThemeImmediately() - init antes do render
│       ├── ThemeProvider - wrapper de App
│       ├── useTheme() - hook para usar tema
│       └── listeners para detectar mudanças do sistema
│
├── styles/
│   └── globals.css (190 linhas)
│       ├── :root (tema padrão)
│       ├── @theme inline (mapa para Tailwind)
│       ├── .light (novo tema)
│       ├── .dark (tema alternativo)
│       ├── .high-contrast (acessibilidade)
│       └── @layer base (tipografia)
│
└── components/
    └── ui/
        └── theme-selector.tsx (158 linhas)
            ├── Button variant (toggle simples)
            ├── Dropdown variant (menu completo)
            ├── Ícones dinâmicos por tema
            ├── Tooltip mostrando tema atual
            └── Keyboard shortcut: Ctrl+Shift+T
```

---

## 6. FLUXO DE INICIALIZAÇÃO

```
1. main.tsx
   ↓ (import ThemeProvider)
2. theme-context.tsx → initializeThemeImmediately()
   ├── Busca 'startplay-theme-preference' no localStorage
   ├├─ Se encontra → carrega tema salvo
   ├└─ Se não → detecta preferência do sistema
   ├── Define querySelector('html').className = tema
   ├── Define CSS variables inline
   └── ⚡ Tudo antes de React renderizar = sem FOUC

3. <App /> renderiza com tema já aplicado ✅

4. <ThemeProvider> (Context) ativa listeners para:
   ├── Mudanças do sistema operacional
   ├── Cliques no theme-selector
   └── localStorage changes (em outras abas)

5. setTheme(novoTema)
   ├── Atualiza Context state
   ├── Chama applyTheme() → classe + inline styles
   ├── Salva em localStorage automaticamente
   └── Componentes re-render com nova cor
```

---

## 7. VARIÁVEIS CSS DISPONÍVEIS

### Colores Base
```css
--background         /* Fundo principal */
--foreground         /* Texto principal (adapta ao tema) */
--card              /* Fundo de cards */
--card-foreground   /* Texto em cards */
--primary           /* Cor primária */
--primary-light     /* Primária mais clara */
--primary-dark      /* Primária mais escura */
--primary-foreground /* Texto em fundo primário */
--secondary         /* Cor secundária */
--secondary-foreground
--muted            /* Cores neutras */
--muted-foreground /* Texto em fundo muted */
--text-secondary   /* Textos secundários (NOVO) */
--text-tertiary    /* Textos terciários (NOVO) */
--destructive      /* Cor de erro/delete */
--border           /* cor de borda */
--input            /* Fundo de inputs */
--input-background
```

### Como Usar
```yaml
Tailwind Classes:
  text-foreground      → color: var(--foreground)
  bg-primary          → background-color: var(--primary)
  border-border       → border-color: var(--border)

CSS Variables Direto:
  color: var(--foreground)
  background: var(--card)
  border: 1px solid var(--border)
```

---

## 8. CHECKLIST ANTES DE FAZER COMMIT

```bash
□ npm run build        # Compila sem erros
□ npm run dev          # Servidor inicia sem warnings
□ Teste tema claro     # Todos os textos legíveis
□ Teste localStorage   # Persiste ao recarregar
□ Teste responsivo     # Funciona em mobile
□ DevTools Console     # Sem errors
□ Contraste OK         # WCAG AA+ confirmado

Você está pronto! ✅
```

---

## 9. TROUBLESHOOTING

### Problema: Texto invisível após trocar tema

**Solução:**
```tsx
// ❌ ERRADO
<h1 className="text-white">Título</h1>

// ✅ CERTO
<h1 className="text-foreground">Título</h1>
```

### Problema: Cor não muda ao selecionar tema

**Solução:**
1. Verifique se o componente usa `text-[color]` ou `text-white`
2. Mude para `text-foreground` ou classe semântica
3. Execute `npm run build` para garantir CSS compilado

### Problema: localStorage não funciona

**Solução:**
```javascript
// DevTools Console
localStorage.clear()  // Limpar
localStorage.setItem('startplay-theme-preference', 'light')
location.reload()     // Recarregar
```

### Problema: Tema não detecta preferência do sistema

**Solução:**
1. Verifique se localStorage está vazio
2. Abra DevTools → Console
3. Rode:
```javascript
// Remove preferência salva
localStorage.removeItem('startplay-theme-preference')
// Fecha e reabre navegador
```

### Problema: Build falha com erro de CSS

**Solução:**
```bash
npm run build -- --force     # Force rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 10. PERFORMANCE & OTIMIZAÇÕES

### Atual ✅
- Build size: 388.49 kB (JS bundled)
- CSS size: 55.29 kB
- Load time: ~2.5s em 4G
- Theme switch: < 50ms (instant)
- No FOUC (Flash of Unstyled Content) ✅

### Futuro (Sugestões)
```javascript
// 1. Code splitting por tema
const darkModuleImport = () => import('./themes/dark.css')

// 2. Critical CSS inline
<style>{criticalCSS}</style>

// 3. Preload alternativas
<link rel="preload" as="style" href="dark.css">
```

---

*Documentação gerada: 11/02/2026*  
*Versão: 1.0*  
*Status: ✅ PRODUÇÃO READY*
