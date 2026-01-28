# Design System - Componentes UI
## Biblioteca Completa de Componentes Reutilizáveis

**Versão:** 1.0.0  
**Última Atualização:** 28/01/2026  
**Responsável:** Design & Frontend Team

---

## 📋 Índice

1. [Componentes Base (Primitivos)](#componentes-base)
2. [Componentes de Produto (Compostos)](#componentes-de-produto)
3. [Estados e Variantes](#estados-e-variantes)
4. [Tokens de Design](#tokens-de-design)

---

## 🎨 Componentes Base (Primitivos)

### 1. Button (Botão)

**Arquivo:** `src/components/ui/button.tsx`  
**Propósito:** Elemento clicável para ações primárias, secundárias e terciárias.

| Estado | Descrição | Variante CSS | Comportamento |
|--------|-----------|--------------|---------------|
| **Default** | Estado inicial do botão | `bg-primary text-white` | Cursor pointer |
| **Hover** | Mouse sobre o botão | `hover:bg-primary/90` | Escala 1.02 |
| **Disabled** | Botão inativo | `disabled:opacity-50 disabled:cursor-not-allowed` | Não clicável |
| **Loading** | Processando ação | `pointer-events-none opacity-70` | Spinner animado |
| **Focus** | Teclado/Tab navegação | `focus:ring-2 focus:ring-primary` | Outline visível |
| **Error** | Ação falhou | `bg-destructive hover:bg-destructive/90` | Cor vermelha |

**Variantes:**
- `default` - Primário com background sólido
- `outline` - Borda com fundo transparente
- `ghost` - Sem borda, apenas texto
- `link` - Estilo de hyperlink

**Exemplo de Uso:**
```tsx
<Button variant="default" size="lg" disabled={isLoading}>
  {isLoading ? <Spinner /> : 'Enviar'}
</Button>
```

---

### 2. Input (Campo de Texto)

**Arquivo:** `src/components/ui/input.tsx`  
**Propósito:** Entrada de dados do usuário (texto, números, etc).

| Estado | Descrição | Variante CSS | Comportamento |
|--------|-----------|--------------|---------------|
| **Default** | Estado vazio/preenchido | `border border-input bg-background` | Cursor text |
| **Hover** | Mouse sobre o input | `hover:border-primary/50` | Borda destaque |
| **Disabled** | Campo não editável | `disabled:cursor-not-allowed disabled:opacity-50` | Bloqueado |
| **Loading** | Validação em progresso | `pointer-events-none opacity-70` | Spinner lado direito |
| **Focus** | Campo ativo | `focus:ring-2 focus:ring-primary` | Borda roxa |
| **Error** | Validação falhou | `border-destructive focus:ring-destructive` | Borda vermelha |

**Props Especiais:**
- `type` - text, email, password, number
- `placeholder` - Texto de ajuda
- `error` - Mensagem de erro abaixo

**Exemplo de Uso:**
```tsx
<Input 
  type="email" 
  placeholder="seu@email.com" 
  error={errors.email}
  disabled={isSubmitting}
/>
```

---

### 3. Card (Cartão)

**Arquivo:** `src/components/ui/card.tsx`  
**Propósito:** Container agrupador de conteúdo relacionado.

| Estado | Descrição | Variante CSS | Comportamento |
|--------|-----------|--------------|---------------|
| **Default** | Cartão estático | `border border-border bg-card shadow-sm` | Exibe conteúdo |
| **Hover** | Interativo (clicável) | `hover:shadow-md hover:border-primary/50` | Cursor pointer |
| **Disabled** | Card inativo | `opacity-50 cursor-not-allowed` | Bloqueado |
| **Loading** | Carregando dados | `animate-pulse bg-muted` | Skeleton |
| **Focus** | Navegação teclado | `focus:ring-2 focus:ring-primary` | Outline |
| **Error** | Card com erro | `border-destructive bg-destructive/5` | Borda vermelha |

**Subcomponentes:**
- `CardHeader` - Cabeçalho com título
- `CardContent` - Corpo principal
- `CardFooter` - Ações/botões

---

### 4. Badge (Etiqueta)

**Arquivo:** `src/components/ui/badge.tsx`  
**Propósito:** Tag de status, categoria ou informação destacada.

| Estado | Descrição | Variante CSS | Comportamento |
|--------|-----------|--------------|---------------|
| **Default** | Badge padrão | `bg-primary text-white` | Estático |
| **Hover** | Badge clicável | `hover:bg-primary/90` | Cursor pointer |
| **Disabled** | Badge inativo | `opacity-50` | Não clicável |
| **Loading** | N/A | - | - |
| **Focus** | N/A | - | - |
| **Error** | Badge de erro | `bg-destructive text-white` | Cor vermelha |

**Variantes:**
- `default` - Roxo primário
- `secondary` - Rosa secundário
- `outline` - Borda sem fundo
- `success` - Verde (aprovado)
- `warning` - Amarelo (atenção)
- `destructive` - Vermelho (erro)

---

### 5. Alert (Alerta)

**Arquivo:** `src/components/ui/alert.tsx`  
**Propósito:** Mensagem de feedback (sucesso, erro, aviso, info).

| Estado | Descrição | Variante CSS | Comportamento |
|--------|-----------|--------------|---------------|
| **Default** | Info genérico | `border-blue-500 bg-blue-50` | Exibe mensagem |
| **Hover** | N/A | - | - |
| **Disabled** | N/A | - | - |
| **Loading** | N/A | - | - |
| **Focus** | N/A | - | - |
| **Error** | Erro crítico | `border-destructive bg-destructive/10` | Vermelho |

**Variantes:**
- `default` - Info/Azul
- `destructive` - Erro/Vermelho
- `success` - Sucesso/Verde
- `warning` - Aviso/Amarelo

---

### 6. Dialog (Modal)

**Arquivo:** `src/components/ui/dialog.tsx`  
**Propósito:** Overlay modal para ações críticas ou formulários.

| Estado | Descrição | Variante CSS | Comportamento |
|--------|-----------|--------------|---------------|
| **Default** | Modal aberto | `fixed inset-0 z-50 backdrop-blur` | Bloqueia tela |
| **Hover** | N/A | - | - |
| **Disabled** | Modal bloqueado | `pointer-events-none opacity-50` | Não fecha |
| **Loading** | Processando | `pointer-events-none` | Spinner central |
| **Focus** | Foco no modal | `focus:outline-none` | Trap focus |
| **Error** | Modal de erro | `border-destructive` | Bordas vermelhas |

**Subcomponentes:**
- `DialogTrigger` - Botão que abre
- `DialogContent` - Conteúdo do modal
- `DialogHeader` - Título/descrição
- `DialogFooter` - Botões de ação

---

### 7. Select (Seleção)

**Arquivo:** `src/components/ui/select.tsx`  
**Propósito:** Dropdown de seleção única ou múltipla.

| Estado | Descrição | Variante CSS | Comportamento |
|--------|-----------|--------------|---------------|
| **Default** | Fechado | `border border-input` | Clique abre |
| **Hover** | Mouse sobre | `hover:border-primary/50` | Destaque |
| **Disabled** | Bloqueado | `disabled:opacity-50 disabled:cursor-not-allowed` | Não abre |
| **Loading** | Carregando opções | `pointer-events-none opacity-70` | Spinner |
| **Focus** | Aberto | `focus:ring-2 focus:ring-primary` | Dropdown visível |
| **Error** | Validação falhou | `border-destructive` | Borda vermelha |

---

### 8. Switch (Interruptor)

**Arquivo:** `src/components/ui/switch.tsx`  
**Propósito:** Toggle booleano (on/off).

| Estado | Descrição | Variante CSS | Comportamento |
|--------|-----------|--------------|---------------|
| **Default** | Desligado | `bg-muted` | Clique liga |
| **Hover** | Mouse sobre | `hover:bg-muted/90` | Feedback visual |
| **Disabled** | Bloqueado | `disabled:opacity-50 disabled:cursor-not-allowed` | Não muda |
| **Loading** | N/A | - | - |
| **Focus** | Teclado | `focus:ring-2 focus:ring-primary` | Outline |
| **Error** | N/A | - | - |

**Variantes:**
- `unchecked` - Desligado (cinza)
- `checked` - Ligado (roxo)

---

## 🎮 Componentes de Produto (Compostos)

### 9. QuestionCard (Cartão de Questão)

**Arquivo:** `src/components/QuestionCard.tsx`  
**Propósito:** Exibe uma questão do simulado com alternativas e ações.

| Estado | Descrição | Comportamento |
|--------|-----------|---------------|
| **Default** | Questão ativa | Alternativas clicáveis |
| **Answered** | Respondida | Alternativa marcada |
| **Reviewing** | Revisão pós-prova | Mostra gabarito |
| **Loading** | Carregando IA | Spinner no botão |
| **Marked** | Marcada para revisão | Badge "Marcada" visível |
| **Skipped** | Pulada | Sem resposta |

**Funcionalidades:**
- Alternativas A-E clicáveis
- Botão "Explicação IA"
- Botão "Marcar para Revisão"
- Botão "Pular Questão"
- Timer de tempo gasto

---

### 10. QuestionNavigator (Navegador de Questões)

**Arquivo:** `src/components/game/QuestionNavigator.tsx`  
**Propósito:** Mapa visual de todas as questões com status.

| Estado | Descrição | Cor | Ícone |
|--------|-----------|-----|-------|
| **Not Answered** | Não respondida | Cinza escuro | Número |
| **Answered** | Respondida | Verde | ✓ |
| **Marked** | Marcada | Laranja | 📌 |
| **Current** | Atual | Roxo brilhante | Borda |
| **Skipped** | Pulada | Cinza claro | - |

---

### 11. SimuladoTimer (Timer de Prova)

**Arquivo:** `src/components/SimuladoTimer.tsx`  
**Propósito:** Cronômetro regressivo da prova.

| Estado | Descrição | Comportamento |
|--------|-----------|---------------|
| **Running** | Tempo normal | Contagem regressiva |
| **Warning** | <10 min | Cor amarela, pulse |
| **Critical** | <5 min | Cor vermelha, blink |
| **Paused** | Pausado | Timer congelado |
| **Expired** | Tempo esgotado | Auto-submit |

---

### 12. AIExplanationModal (Modal de Explicação)

**Arquivo:** `src/components/AIExplanationModal.tsx`  
**Propósito:** Modal com explicação gerada por IA.

| Estado | Descrição | Comportamento |
|--------|-----------|---------------|
| **Loading** | Gerando resposta | Skeleton animado |
| **Success** | Explicação gerada | Texto formatado |
| **Error** | Falha na API | Mensagem erro |
| **Retry** | Tentar novamente | Botão retry |

---

### 13. DetailedProfile (Perfil Gamificado)

**Arquivo:** `src/components/DetailedProfile.tsx`  
**Propósito:** Tela de resultados com atributos RPG.

**Seções:**
- Header com nome e dados do usuário
- Stats gamificados (XP, Ofensiva, Tempo)
- **Radar Chart** (5 atributos visualizados)
- Gráficos de desempenho por disciplina
- Histórico de simulados

---

### 14. ProcessingScreen (Tela de Processamento)

**Arquivo:** `src/components/ProcessingScreen.tsx`  
**Propósito:** Loading animado ao enviar prova.

| Estado | Descrição | Animação |
|--------|-----------|----------|
| **Processing** | Analisando | Spinner + progresso |
| **Completed** | Finalizado | Checkmark verde |

---

### 15. ResultScreen (Tela de Resultados)

**Arquivo:** `src/components/ResultScreen.tsx`  
**Propósito:** Resumo rápido pós-prova.

**Elementos:**
- Nota final (grande, destaque)
- % de acerto
- Status (Aprovado/Reprovado)
- Botão "Ver Perfil Completo"
- Botão "Novo Simulado"

---

## 🎯 Estados e Variantes

### Matriz de Estados Universais

| Componente | Default | Hover | Disabled | Loading | Focus | Error |
|------------|---------|-------|----------|---------|-------|-------|
| Button | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Input | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Card | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Badge | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ |
| Alert | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Dialog | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ |
| Select | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Switch | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |

---

## 🎨 Tokens de Design

### Cores

```css
--primary: #8b5cf6 (Roxo)
--secondary: #ec4899 (Rosa)
--accent: #3b82f6 (Azul)
--destructive: #ef4444 (Vermelho)
--muted: #27293d (Cinza escuro)
--background: #0f0f23 (Preto azulado)
--foreground: #f8fafc (Branco gelo)
```

### Tamanhos

```css
--radius: 16px (Border radius padrão)
--spacing: 0.25rem (Base spacing)
```

### Animações

```css
--transition-default: 150ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1)
```

---

## 📦 Checklist de Implementação

- [x] Button (com todas variantes)
- [x] Input (com validação)
- [x] Card (com subcomponentes)
- [x] Badge (6 variantes)
- [x] Alert (4 variantes)
- [x] Dialog (com overlay)
- [x] Select (com dropdown)
- [x] Switch (toggle)
- [x] QuestionCard (produto)
- [x] QuestionNavigator (produto)
- [x] SimuladoTimer (produto)
- [x] AIExplanationModal (produto)
- [x] DetailedProfile (produto)
- [x] ProcessingScreen (produto)
- [x] ResultScreen (produto)

---

## 🚀 Próximos Componentes

- [ ] Tooltip (Dica de contexto)
- [ ] Popover (Menu contextual)
- [ ] Progress (Barra de progresso)
- [ ] Slider (Controle deslizante)
- [ ] Tabs (Navegação por abas)
- [ ] Toast (Notificação temporária)

---

**Documento mantido por:** Frontend Team  
**Versão:** 1.0.0  
**Data:** 28/01/2026
