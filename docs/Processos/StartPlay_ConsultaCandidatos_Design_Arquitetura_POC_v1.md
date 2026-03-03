# 🎨 Arquitetura Visual do Sistema de Feedback

## Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────────────┐
│                     SimulationRunnerScreen                       │
│  (Gerencia todo o fluxo do simulado)                            │
│                                                                 │
│  State:                                                         │
│  - feedbackMode: boolean                                        │
│  - showAIExplanation: boolean                                   │
│  - currentQuestionIndex: number                                 │
│  - answers: Answer[]                                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Header (Sticky)                                         │  │
│  │  - Exit Button                                           │  │
│  │  - Timer (modo real)                                     │  │
│  │  - Progress Badge                                        │  │
│  │  - Grid Button (Mapa)                                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                          │                                      │
│                          ▼                                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │          QuestionCard                                    │  │
│  │  (Mostra questão + feedback)                            │  │
│  │                                                          │  │
│  │  Props NOVAS:                                           │  │
│  │  - feedbackMode: {feedbackMode}                         │  │
│  │  - isCorrect: {isCorrect}                               │  │
│  │  - correctAnswerId: {correctAnswerId}                   │  │
│  │  - onRequestExplanation: {openModal}                    │  │
│  │  - onNextQuestion: {handleNext}                         │  │
│  │                                                          │  │
│  │  Visual:                                                │  │
│  │  [Enunciado]                                            │  │
│  │  ☐ A) Alternativa A                                     │  │
│  │  ☐ B) Alternativa B                                     │  │
│  │  ✓ C) Alternativa C (se feedbackMode=true)             │  │
│  │  ☐ D) Alternativa D                                     │  │
│  │                                                          │  │
│  │  Feedback (se feedbackMode=true):                       │  │
│  │  [✨ Explicar com IA] [Próxima →]                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                          │                                      │
│                          ▼ (clica Explicar)                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │       AIExplanationModal                                 │  │
│  │  (Modal com IA ou fallback)                             │  │
│  │                                                          │  │
│  │  isOpen: {showAIExplanation}                            │  │
│  │                                                          │  │
│  │  Estados:                                               │  │
│  │  1. Loading (2.5s)                                      │  │
│  │     └─ Skeleton + Mensagens rotativas                   │  │
│  │  2. Success (80%)                                       │  │
│  │     └─ Análise com IA                                   │  │
│  │  3. Error (20%)                                         │  │
│  │     └─ Gabarito padrão (fallback)                       │  │
│  │                                                          │  │
│  │  Visual:                                                │  │
│  │  ┌─────────────────────────────────┐                   │  │
│  │  │ ✨ Análise do Tutor           [×]                  │  │
│  │  ├─────────────────────────────────┤                   │  │
│  │  │ [Conteúdo por estado]          │                   │  │
│  │  ├─────────────────────────────────┤                   │  │
│  │  │       [Entendido]               │                   │  │
│  │  └─────────────────────────────────┘                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                          │                                      │
│                          ▼ (clica Próxima)                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Footer (Sticky, hidden se feedbackMode=true)           │  │
│  │  - Previous Button                                       │  │
│  │  - Flag Button                                           │  │
│  │  - Next/Review Button                                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Fluxo de Dados

```
┌─────────────────┐
│  User Selects   │
│  An Answer      │
└────────┬────────┘
         │
         ▼
┌──────────────────────────┐
│ handleSelectAnswer()      │
├──────────────────────────┤
│ setAnswers(newAnswers)   │
│                          │
│ if (mode === "training") │
│   setFeedbackMode(true)  │  ◄─── KEY LOGIC
└────────┬─────────────────┘
         │
         ▼
    ┌─────────────────────────────────┐
    │   feedbackMode = true            │
    │   (State Updated)                │
    └────────┬────────────────────────┘
             │
             ▼
    ┌─────────────────────────────────┐
    │ QuestionCard Re-renders          │
    │ with feedbackMode props          │
    │                                  │
    │ Shows:                           │
    │ ├─ Colors (green/red)           │
    │ ├─ Icons (✓/✗)                  │
    │ ├─ Correct answer highlight     │
    │ └─ Buttons (Explain + Next)      │
    └────────┬────────────────────────┘
             │
             ├─ User clicks "Explain with AI"
             │  │
             │  ▼
             │  setShowAIExplanation(true)
             │  │
             │  ▼
             │  AIExplanationModal Opens
             │  │
             │  ├─ Loading (2.5s)
             │  │  └─ Random message
             │  │  └─ Skeleton loaders
             │  │
             │  ├─ After 2.5s:
             │  │  ├─ 80% → Success
             │  │  │  └─ AI Explanation
             │  │  └─ 20% → Error
             │  │     └─ Fallback
             │  │
             │  └─ User clicks "Done"
             │     └─ Modal closes
             │
             └─ User clicks "Next"
                │
                ▼
                handleNext()
                │
                ├─ setFeedbackMode(false)
                ├─ setShowAIExplanation(false)
                ├─ currentQuestionIndex++
                │
                └─ Volta ao estado inicial
                   para próxima questão
```

---

## Estado da Aplicação (State Tree)

```
SimulationRunnerScreen
│
├─ State
│  ├─ answers: Answer[]                    [mantido]
│  ├─ currentQuestionIndex: number         [mantido]
│  ├─ isNavigatorOpen: boolean             [mantido]
│  ├─ showExitDialog: boolean              [mantido]
│  ├─ timeRemaining: number | undefined    [mantido]
│  ├─ feedbackMode: boolean                ✨ NOVO
│  └─ showAIExplanation: boolean           ✨ NOVO
│
├─ Computed Values
│  ├─ currentQuestion: Question
│  ├─ currentAnswer: Answer
│  ├─ isCorrect: boolean
│  ├─ correctAnswerId: string
│  └─ isLastQuestion: boolean
│
├─ Handlers
│  ├─ handleSelectAnswer()
│  │  └─ Ativa feedbackMode (if training)
│  │
│  ├─ handleNext()
│  │  └─ Desativa feedbackMode + showAIExplanation
│  │
│  └─ [outros handlers]
│
└─ Components Rendered
   ├─ Header
   ├─ Main (QuestionCard)
   │  └─ feedbackMode={feedbackMode}
   │     isCorrect={isCorrect}
   │     onRequestExplanation={setShowAIExplanation}
   │     onNextQuestion={handleNext}
   │
   ├─ AIExplanationModal
   │  └─ isOpen={showAIExplanation}
   │
   └─ Footer (hidden if feedbackMode)
```

---

## Sequência de Estados em Modo Treino

```
Questão 1 (Training Mode)
│
├─ INICIAL
│  └─ feedbackMode = false
│     showAIExplanation = false
│     QuestionCard normal (clicável)
│
├─ USER SELECTS ANSWER
│  └─ handleSelectAnswer() 
│     └─ if (mode === "training")
│        └─ feedbackMode = true ◄─── TRIGGER
│
├─ FEEDBACK VISUAL
│  └─ feedbackMode = true
│     └─ QuestionCard mostra:
│        ├─ Cores (verde/vermelho)
│        ├─ Ícones (✓/✗)
│        ├─ Resposta correta destaca
│        └─ Botões "Explicar" + "Próxima"
│
├─ OPÇÃO A: USER CLICKS "Explain with AI"
│  ├─ showAIExplanation = true
│  │  └─ AIExplanationModal opens
│  │
│  ├─ LOADING STATE (2.5s)
│  │  ├─ Skeleton loaders
│  │  └─ Rotating messages
│  │
│  ├─ AFTER 2.5s
│  │  ├─ 80% → SUCCESS
│  │  │  └─ AI Analysis shown
│  │  └─ 20% → ERROR
│  │     └─ Fallback shown
│  │
│  └─ USER CLICKS "Done"
│     └─ showAIExplanation = false
│        └─ Modal closes
│
├─ USER CLICKS "Next"
│  ├─ setFeedbackMode(false)
│  ├─ setShowAIExplanation(false)
│  ├─ currentQuestionIndex++
│  └─ VOLTA AO INICIAL
│     └─ Questão 2
│
└─ [Repete para Q3, Q4, ... Q20]
```

---

## Comparação: Training vs Real Mode

```
TRAINING MODE (mode: "training")           REAL MODE (mode: "real")
┌────────────────────────────────┐        ┌────────────────────────────┐
│ 1. User selects answer         │        │ 1. User selects answer     │
│    │                           │        │    │                       │
│    ▼                           │        │    ▼                       │
│ 2. feedbackMode = true ◄───────┼────    │ 2. feedbackMode stays false│
│    │                           │        │    (não muda)              │
│    ▼                           │        │                            │
│ 3. Visual feedback appears     │        │ 3. Sem feedback visual     │
│    ├─ Colors (green/red)       │        │    ├─ Resposta registrada │
│    ├─ Icons                    │        │    └─ Continua direto      │
│    └─ Buttons                  │        │                            │
│    │                           │        │ 4. Footer normal           │
│    ▼                           │        │    ├─ Previous             │
│ 4. User clicks "Explain"       │        │    ├─ Flag                 │
│    │                           │        │    └─ Next/Review          │
│    ▼                           │        │                            │
│ 5. Modal opens with AI         │        │ 5. Modal NÃO aparece       │
│    ├─ Loading (2.5s)           │        │                            │
│    ├─ Success (80%)            │        │ 6. User clicks "Next"      │
│    └─ Error (20%)              │        │    └─ Próxima questão      │
│    │                           │        │                            │
│    ▼                           │        │ 7. Fim do simulado         │
│ 6. User clicks "Next"          │        │    ├─ Review               │
│    ├─ feedbackMode = false     │        │    └─ Results              │
│    ├─ Modal closes             │        │                            │
│    └─ Próxima questão          │        │                            │
│    │                           │        │                            │
│    ▼                           │        │                            │
│ 7. Volta ao INICIAL            │        │                            │
│    └─ Pronto para Q2           │        │                            │
│                                │        │                            │
│ [Repete para cada questão]     │        │ [Sem ciclo de feedback]    │
└────────────────────────────────┘        └────────────────────────────┘
```

---

## Componente QuestionCard - Antes vs Depois

### ANTES (Sem Feedback)
```
Props:
{
  question,
  totalQuestions,
  onSelectAnswer,
  selectedAnswer,
  disabled,
  showImage
}

Visual:
┌─────────────────────┐
│ Questão 1 de 20     │
├─────────────────────┤
│ [Enunciado...]      │
│                     │
│ ☐ A) Alternativa A  │
│ ☐ B) Alternativa B  │
│ ☐ C) Alternativa C  │
│ ☐ D) Alternativa D  │
└─────────────────────┘
```

### DEPOIS (Com Feedback)
```
Props:
{
  question,
  totalQuestions,
  onSelectAnswer,
  selectedAnswer,
  disabled,
  showImage,
  
  // ✨ NOVOS:
  feedbackMode,              ← boolean
  isCorrect,                 ← boolean
  correctAnswerId,           ← string
  onRequestExplanation,      ← function
  onNextQuestion             ← function
}

Visual (feedbackMode = false):
┌─────────────────────┐
│ Questão 1 de 20     │
├─────────────────────┤
│ [Enunciado...]      │
│                     │
│ ☐ A) Alternativa A  │
│ ☐ B) Alternativa B  │
│ ☐ C) Alternativa C  │
│ ☐ D) Alternativa D  │
└─────────────────────┘

Visual (feedbackMode = true, isCorrect = true):
┌─────────────────────────────────┐
│ Questão 1 de 20                 │
├─────────────────────────────────┤
│ [Enunciado...]                  │
│                                 │
│ ✓ C) Alternativa C (VERDE!)     │ ◄─ Destaque
│ ☐ A) Alternativa A              │
│ ☐ B) Alternativa B              │
│ ☐ D) Alternativa D              │
│                                 │
│ [✨ Explain] [Next →]           │ ◄─ Novos botões
└─────────────────────────────────┘

Visual (feedbackMode = true, isCorrect = false):
┌─────────────────────────────────┐
│ Questão 1 de 20                 │
├─────────────────────────────────┤
│ [Enunciado...]                  │
│                                 │
│ ✗ B) Alternativa B (VERMELHO!)  │ ◄─ Resposta errada
│ ✓ C) Alternativa C (VERDE!)     │ ◄─ Resposta correta
│ ☐ A) Alternativa A              │
│ ☐ D) Alternativa D              │
│                                 │
│ [✨ Explain] [Next →]           │
└─────────────────────────────────┘
```

---

## Componente AIExplanationModal - Estados Internos

```
AIExplanationModal
│
├─ Props Input
│  ├─ isOpen: boolean
│  ├─ onClose: function
│  ├─ question: string
│  ├─ correctAnswer: string
│  ├─ selectedAnswer: string
│  └─ isCorrect: boolean
│
├─ Internal State
│  ├─ state: "loading" | "success" | "error"
│  ├─ loadingMessage: string (rotativo)
│  └─ explanation: Explanation
│
├─ useEffect (quando isOpen muda)
│  ├─ Inicia messageInterval (rotação 800ms)
│  ├─ Inicia timer (2.5s)
│  ├─ After 2.5s:
│  │  ├─ if (Math.random() < 0.8) → "success"
│  │  └─ else → "error"
│  └─ Cleanup intervals/timers
│
└─ Conditional Rendering
   │
   ├─ if (!isOpen) → return null
   │
   └─ else → render Modal
      ├─ Backdrop (clickable)
      │
      ├─ Header
      │  ├─ Sparkles icon
      │  ├─ "Análise do Tutor"
      │  └─ Close button (X)
      │
      ├─ Content (conditional por state)
      │  ├─ if (state === "loading")
      │  │  ├─ Loading message (rotativo)
      │  │  └─ 3x Skeleton loaders
      │  │
      │  ├─ else if (state === "success")
      │  │  ├─ Success badge (✓/✗)
      │  │  ├─ Summary paragraph
      │  │  ├─ 4-item analysis list
      │  │  └─ 3x Suggested sources
      │  │
      │  └─ else (state === "error")
      │     ├─ Yellow alert
      │     ├─ Fallback summary
      │     ├─ Static explanation items
      │     └─ Default sources
      │
      └─ Footer
         └─ "Done" button
```

---

## Cores & Estilização

```
SEMANTIC COLORS
┌─────────────────────────────────────┐
│ SUCESSO (Resposta Correta)          │
├─────────────────────────────────────┤
│ Background: bg-emerald-100          │
│ Border: border-emerald-500          │
│ Text: text-emerald-800              │
│ Icon: CheckCircle (emerald-600)     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ ERRO (Resposta Incorreta)           │
├─────────────────────────────────────┤
│ Background: bg-red-100              │
│ Border: border-red-500              │
│ Text: text-red-800                  │
│ Icon: XCircle (red-600)             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ AVISO (Modal Error State)           │
├─────────────────────────────────────┤
│ Background: bg-warning/10           │
│ Border: border-warning/50           │
│ Icon: AlertTriangle (warning)       │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ PRIMÁRIO (Modal Header)             │
├─────────────────────────────────────┤
│ Background: bg-background           │
│ Border: border-border               │
│ Icon: Sparkles (primary)            │
└─────────────────────────────────────┘
```

---

## Animações

```
LOADING STATE
┌──────────────────────────────┐
│ ████░░░░░░░░░░░░░░          │ ◄─ animate-pulse
│ ████░░░░░░░░░░░░░░          │ ◄─ animate-pulse
│ ████░░░░░░░░░░░░░░          │ ◄─ animate-pulse
│                              │
│ (Mensagem rotativa a cada    │
│  800ms)                      │
└──────────────────────────────┘

MODAL ENTRANCE
┌──────────────────────────────┐
│                              │ ◄─ animate-in
│ [Modal slides in]            │    slide-in-from-right
│                              │
└──────────────────────────────┘

HOVER EFFECTS
┌──────────────────────────────┐
│ [Botão]                      │ ◄─ hover:shadow-lg
│ [Alternativa]                │ ◄─ hover:scale-[1.01]
│ [Fonte]                      │ ◄─ hover:text-primary
└──────────────────────────────┘

ACTIVE STATE
┌──────────────────────────────┐
│ [Clicando]                   │ ◄─ active:scale-95
└──────────────────────────────┘
```

---

## TypeScript Types

```typescript
// Props
interface AIExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  correctAnswer: string;
  selectedAnswer: string;
  isCorrect: boolean;
}

interface QuestionCardProps {
  // ... existentes
  feedbackMode?: boolean;
  isCorrect?: boolean;
  correctAnswerId?: string;
  onRequestExplanation?: () => void;
  onNextQuestion?: () => void;
}

// Internal State
type ModalState = "loading" | "success" | "error";

interface Explanation {
  summary: string;
  detail: string[];
  sources: Array<{
    title: string;
    link: string;
  }>;
}
```

---

**Fim da Documentação Arquitetural!** ✨
