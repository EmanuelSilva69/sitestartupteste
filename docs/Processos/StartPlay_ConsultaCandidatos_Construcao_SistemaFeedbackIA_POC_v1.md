# Sistema de Feedback com IA Tutor

## Visão Geral

O sistema de **Feedback Imediato e Explicação Inteligente** foi implementado para elevar a experiência do "Modo Treino" do Startplay. Quando um aluno seleciona uma resposta no modo treino, ele recebe:

1. **Feedback Visual Imediato** - Indicação se acertou ou errou
2. **Explicação da Resposta Correta** - Análise detalhada com IA
3. **Fallback Robusto** - Gabarito padrão se a IA falhar

---

## Componentes

### 1. `AIExplanationModal.tsx`

Um componente modal tipo "Bottom Sheet" (mobile) ou "Side Panel" (desktop) que exibe explicações da IA.

#### Props
```typescript
interface AIExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  correctAnswer: string;
  selectedAnswer: string;
  isCorrect: boolean;
}
```

#### Estados da UI

**A. Estado de Carregamento (`isLoading`)**
- Barras cinzas pulsantes simulando texto sendo gerado
- Mensagens rotativas: "Analisando a questão...", "Consultando base de conhecimento...", etc.
- Duração: 2.5 segundos

**B. Estado de Sucesso (`success`)**
- ✓ Header com "Análise do Tutor" e ícone Sparkles
- ✓ Resumo curto
- ✓ Análise ponto-a-ponto (4 itens numerados)
- ✓ Seção "Fontes Sugeridas" com links fictícios

**C. Estado de Erro/Fallback (`error`)**
- ⚠️ Alerta amarelo/laranja
- ⚠️ Mensagem: "A IA está indisponível no momento"
- ⚠️ Explicação padrão (hardcoded)
- ⚠️ Fontes de referência padrão

#### Lógica Mockada
```
1. isLoading = true (2.5s)
2. Math.random() < 0.8
   └─ 80% → Success
   └─ 20% → Error
```

#### Estilização
- Tailwind CSS com `animate-pulse` para loading
- Gradientes: `bg-emerald-500/10` (correto), `bg-red-500/10` (incorreto)
- Ícones Lucide: `Sparkles`, `BookOpen`, `AlertTriangle`, `X`

---

### 2. `QuestionCard.tsx` (Atualizado)

#### Novas Props
```typescript
feedbackMode?: boolean;        // Ativa o modo de feedback
isCorrect?: boolean;           // Se a resposta está correta
correctAnswerId?: string;      // ID da alternativa correta
onRequestExplanation?: () => void;  // Clique em "Explicar com IA"
onNextQuestion?: () => void;   // Clique em "Próxima"
```

#### Comportamento no Feedback Mode

**Quando `feedbackMode = true` e `selectedAnswer` é selecionada:**

1. **Resposta Correta (isCorrect = true)**
   - Alternativa selecionada fica verde
   - `bg-emerald-100 border-emerald-500`
   - Ícone: `CheckCircle`

2. **Resposta Incorreta (isCorrect = false)**
   - Alternativa selecionada fica vermelha
   - `bg-red-100 border-red-500`
   - Ícone: `XCircle`
   - Alternativa correta é iluminada em verde (para referência)

3. **Barra de Ações**
   - Botão "✨ Explicar com IA" (outline/ghost)
   - Botão "Próxima" (primário)

#### Estilização
```typescript
// Resposta correta selecionada
bg-emerald-100 border-emerald-500 text-emerald-800

// Resposta incorreta selecionada
bg-red-100 border-red-500 text-red-800

// Barra de ações
flex gap-3 pt-6 border-t border-border/50
```

---

### 3. `SimulationRunnerScreen.tsx` (Integração)

#### Novos States
```typescript
const [feedbackMode, setFeedbackMode] = useState(false);
const [showAIExplanation, setShowAIExplanation] = useState(false);
```

#### Fluxo de Operação

1. **Usuário seleciona alternativa**
   ```
   handleSelectAnswer() → 
     setAnswers() → 
     setFeedbackMode(true) [apenas no modo treino]
   ```

2. **Feedback aparece**
   - QuestionCard renderiza com `feedbackMode=true`
   - Mostram os botões "Explicar com IA" e "Próxima"

3. **Clique em "Explicar com IA"**
   ```
   onRequestExplanation() → 
     setShowAIExplanation(true) → 
     AIExplanationModal abre
   ```

4. **Clique em "Próxima"**
   ```
   onNextQuestion() → 
     setFeedbackMode(false) → 
     handleNext() → 
     Vai para próxima questão
   ```

#### Integração no Render
```tsx
<QuestionCard
  // Props existentes...
  feedbackMode={feedbackMode}
  isCorrect={currentAnswer?.selectedAlternative === currentQuestion.correctAnswerId}
  correctAnswerId={currentQuestion.correctAnswerId}
  onRequestExplanation={() => setShowAIExplanation(true)}
  onNextQuestion={handleNext}
/>

<AIExplanationModal
  isOpen={showAIExplanation}
  onClose={() => setShowAIExplanation(false)}
  question={currentQuestion.statement}
  correctAnswer={/* alternativa correta text */}
  selectedAnswer={/* resposta selecionada text */}
  isCorrect={/* é correta? */}
/>
```

---

## Fluxo Visual Completo

### Modo Treino (Train Mode)

```
┌─────────────────────────────────────┐
│         SIMULADO - MODO TREINO       │
├─────────────────────────────────────┤
│                                     │
│  Questão 1 de 20                    │
│                                     │
│  [Enunciado da questão...]          │
│                                     │
│  ☐ A) Alternativa A                 │  ← Normal
│  ☐ B) Alternativa B                 │  ← Normal
│  ☑ C) Alternativa C (Selecionada)   │  ← Selected (blue ring)
│  ☐ D) Alternativa D                 │  ← Normal
│                                     │
└─────────────────────────────────────┘
      ↓ [Usuário clica em C]
┌─────────────────────────────────────┐
│  ✓ C) Alternativa C (Correta!)      │  ← GREEN + CheckCircle
│  ☐ A) Alternativa A                 │  ← Desativada (opaca)
│  ☐ B) Alternativa B                 │  ← Desativada (opaca)
│  ☐ D) Alternativa D                 │  ← Desativada (opaca)
│                                     │
│  [✨ Explicar com IA] [Próxima →]  │  ← Action Buttons
│                                     │
└─────────────────────────────────────┘
      ↓ [Clica em "Explicar com IA"]
┌─────────────────────────────────────────────────────┐
│         🎯 ANÁLISE DO TUTOR                  [×]   │
├─────────────────────────────────────────────────────┤
│                                                     │
│ 💫 Analisando a questão...                         │
│ ████░░░░░░░░░░░░░░                                │
│ ████░░░░░░░░░░░░░░                                │
│ ████░░░░░░░░░░░░░░  (2.5 segundos)                │
│                                                     │
└─────────────────────────────────────────────────────┘
      ↓ [Após 2.5s - 80% sucesso]
┌─────────────────────────────────────────────────────┐
│         ✨ ANÁLISE DO TUTOR                  [×]   │
├─────────────────────────────────────────────────────┤
│                                                     │
│ ✓ Resposta Correta!                                │
│ Resposta correta: C) Alternativa C                 │
│                                                     │
│ ## Resumo                                          │
│ Esta alternativa é a mais precisa e abrangente...  │
│                                                     │
│ ## Análise Detalhada                               │
│ 1. A alternativa correta apresenta todos...       │
│ 2. Ela está em conformidade com...                │
│ 3. As outras alternativas contêm erros...         │
│ 4. O conhecimento aqui é aplicável...             │
│                                                     │
│ ## 📖 Fontes Sugeridas                             │
│ • Art. 5º da Constituição Federal ↗              │
│ • Jurisprudência STF 2023 ↗                       │
│ • Lei Complementar nº 101/2000 ↗                  │
│                                                     │
│              [Entendido]                           │
└─────────────────────────────────────────────────────┘
```

---

## Casos de Uso

### Caso 1: Resposta Correta
```
1. Usuário seleciona: A) Alternativa correta
2. feedbackMode = true
3. QuestionCard mostra A em VERDE com ✓
4. Usuário clica "Explicar com IA"
5. Modal abre com análise (80% chance sucesso)
6. Usuário clica "Próxima" → vai para Q2
```

### Caso 2: Resposta Incorreta
```
1. Usuário seleciona: B) Alternativa incorreta
2. feedbackMode = true
3. QuestionCard mostra:
   - B em VERMELHO com ✗ (selecionada)
   - A em VERDE com ✓ (correta)
4. Usuário clica "Explicar com IA"
5. Modal abre com análise (80% chance sucesso, 20% fallback)
6. Usuário clica "Próxima" → vai para Q2
```

### Caso 3: IA Indisponível
```
1. Modal abre com loading
2. Após 2.5s, 20% de chance de erro
3. Modal mostra: ⚠️ "A IA está indisponível"
4. Exibe gabarito padrão com explicação estática
5. Fontes de referência padrão
6. Usuário clica "Entendido" e continua
```

---

## Customização Futura

### Integração com API Real
```typescript
// Substituir a lógica mockada em AIExplanationModal
const generateExplanation = async () => {
  const response = await fetch('/api/ai/explain', {
    method: 'POST',
    body: JSON.stringify({
      question: question,
      correctAnswer: correctAnswer,
      selectedAnswer: selectedAnswer,
      isCorrect: isCorrect
    })
  });
  return response.json();
};
```

### Adicionar Relatório de Aprendizado
```typescript
// No SimulationRunnerScreen, rastrear:
- Explicações visualizadas por questão
- Tempo gasto lendo explicações
- Taxa de acerto com/sem explicação
```

### Melhorar Fallback
```typescript
// Usar uma base de dados de respostas pré-gravadas
const FALLBACK_EXPLANATIONS = {
  [questionId]: {
    summary: "...",
    detail: ["...", "..."],
    sources: [{ title: "...", link: "..." }]
  }
};
```

---

## Atalhos de Teclado (Futuro)

- `ESC` - Fechar modal de explicação
- `Ctrl + →` - Próxima questão
- `Ctrl + ←` - Questão anterior

---

## Acessibilidade

- ✓ Semantic HTML com `<button>`, `<h4>`, etc.
- ✓ ARIA labels: `aria-label`, `title`
- ✓ Contraste adequado nas cores de feedback
- ✓ Navegação por teclado (Tab, Enter)
- ✓ Descrições de imagens nos ícones

---

## Performance

- Loading skeleton reduz Cumulative Layout Shift (CLS)
- Modal usa `z-index` apropriado para não bloquear header/footer
- Cleanup de `setTimeout` e `setInterval` em useEffect
- Renderização condicional (não renderiza quando `isOpen=false`)

---

## Testes

### Teste o Sucesso (80%)
```
1. Abrir app em modo treino
2. Selecionar qualquer resposta
3. Clicar "Explicar com IA"
4. Esperar 2.5s
5. Deve aparecer análise com sucesso (80% do tempo)
```

### Teste o Erro (20%)
```
1. Repetir teste acima
2. Eventualmente (20% das vezes) verá alerta amarelo
3. Verificar que gabarito padrão aparece
4. Clicar "Entendido" deve fechar
```

### Teste o Mobile
```
1. Abrir no DevTools (iPad/iPhone size)
2. Modal deve ocupar full width + padding
3. Botões devem ser touchable (44px min)
4. Scroll deve funcionar em conteúdo longo
```

---

## Troubleshooting

| Problema | Solução |
|----------|---------|
| Modal não abre | Verificar se `showAIExplanation` é `true` |
| Feedback não aparece | Verificar se `config.mode === "train"` |
| Ícones não aparecem | Verificar importação do Lucide React |
| Cores estranhas | Verificar Tailwind color palette no `tailwind.config.ts` |
| Loading infinito | Aumentar timeout em `setTimeout` (atualmente 2500ms) |

---

## Próximos Passos

1. ✅ Implementar componentes base (AIExplanationModal, QuestionCard upgrade, integração)
2. 🔄 Conectar com API real de IA (ChatGPT, Claude, etc.)
3. 🔄 Adicionar tracking de analytics
4. 🔄 Customizar templates de explicação por disciplina
5. 🔄 Adicionar modo dark/light no modal
6. 🔄 Testes de E2E e acessibilidade
