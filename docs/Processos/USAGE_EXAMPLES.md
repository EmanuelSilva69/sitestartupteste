# 📖 Exemplos de Uso - Sistema de Feedback com IA

## 1. QuestionCard - Modo Normal (Sem Feedback)

```tsx
import { QuestionCard } from './components/QuestionCard';
import { Question } from './types/simulation';

const question: Question = {
  id: 'q1',
  number: 1,
  subject: 'Direito Constitucional',
  statement: 'Qual artigo da CF trata dos direitos fundamentais?',
  alternatives: [
    { id: 'a', text: 'Artigo 2º' },
    { id: 'b', text: 'Artigo 4º' },
    { id: 'c', text: 'Artigo 5º' },
    { id: 'd', text: 'Artigo 8º' }
  ],
  correctAnswer: 'c'
};

export function Example1() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  return (
    <QuestionCard
      question={question}
      totalQuestions={20}
      onSelectAnswer={setSelectedAnswer}
      selectedAnswer={selectedAnswer}
      disabled={false}
      showImage={true}
      // Feedback mode OFF
      feedbackMode={false}
    />
  );
}

// RESULTADO:
// ☐ A) Artigo 2º (clicável)
// ☐ B) Artigo 4º (clicável)
// ☐ C) Artigo 5º (clicável)
// ☐ D) Artigo 8º (clicável)
```

---

## 2. QuestionCard - Modo Feedback (Resposta Correta)

```tsx
export function Example2() {
  const [selectedAnswer] = useState('c'); // Usuário selecionou C
  const question = { /* ... */ correctAnswer: 'c' };
  
  const isCorrect = selectedAnswer === question.correctAnswer; // true

  return (
    <QuestionCard
      question={question}
      totalQuestions={20}
      onSelectAnswer={() => {}} // Desativado
      selectedAnswer={selectedAnswer}
      disabled={true}
      showImage={true}
      // ✅ FEEDBACK MODE ON
      feedbackMode={true}
      isCorrect={isCorrect}           // true
      correctAnswerId={question.correctAnswer}
      onRequestExplanation={() => console.log("Abrir Modal")}
      onNextQuestion={() => console.log("Próxima")}
    />
  );
}

// RESULTADO:
// ✓ C) Artigo 5º (VERDE - bg-emerald-100 border-emerald-500)
// ☐ A) Artigo 2º (desativada, opaca)
// ☐ B) Artigo 4º (desativada, opaca)
// ☐ D) Artigo 8º (desativada, opaca)
// [✨ Explicar com IA] [Próxima →]
```

---

## 3. QuestionCard - Modo Feedback (Resposta Incorreta)

```tsx
export function Example3() {
  const [selectedAnswer] = useState('b'); // Usuário selecionou B (ERRADO)
  const question = { /* ... */ correctAnswer: 'c' };
  
  const isCorrect = selectedAnswer === question.correctAnswer; // false

  return (
    <QuestionCard
      question={question}
      totalQuestions={20}
      onSelectAnswer={() => {}}
      selectedAnswer={selectedAnswer}
      disabled={true}
      // ✅ FEEDBACK MODE ON
      feedbackMode={true}
      isCorrect={isCorrect}           // false
      correctAnswerId={question.correctAnswer}
      onRequestExplanation={() => console.log("Abrir Modal")}
      onNextQuestion={() => console.log("Próxima")}
    />
  );
}

// RESULTADO:
// ✗ B) Artigo 4º (VERMELHO - bg-red-100 border-red-500)
// ✓ C) Artigo 5º (VERDE - mostra a correta!)
// ☐ A) Artigo 2º (desativada, opaca)
// ☐ D) Artigo 8º (desativada, opaca)
// [✨ Explicar com IA] [Próxima →]
```

---

## 4. AIExplanationModal - Estado Loading

```tsx
import { AIExplanationModal } from './components/AIExplanationModal';

export function Example4() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AIExplanationModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      question="Qual artigo da CF trata dos direitos fundamentais?"
      correctAnswer="Artigo 5º - Dos Direitos e Garantias Fundamentais"
      selectedAnswer="Artigo 5º"
      isCorrect={true}
    />
  );
}

// RESULTADO (Por 2.5 segundos):
// ┌─────────────────────────────────┐
// │ ✨ Análise do Tutor            [×]
// ├─────────────────────────────────┤
// │ 💫 Analisando a questão...      │
// │                                 │
// │ ████░░░░░░░░░░░░░░ (pulsante)  │
// │ ████░░░░░░░░░░░░░░ (pulsante)  │
// │ ████░░░░░░░░░░░░░░ (pulsante)  │
// └─────────────────────────────────┘

// OBSERVAÇÃO:
// - Mensagem rotativa a cada 800ms
// - Opções: "Analisando...", "Consultando...", "Gerando...", etc.
```

---

## 5. AIExplanationModal - Estado Sucesso (80%)

```tsx
export function Example5() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AIExplanationModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      question="Qual artigo da CF trata dos direitos fundamentais?"
      correctAnswer="Artigo 5º - Dos Direitos e Garantias Fundamentais"
      selectedAnswer="Artigo 5º"
      isCorrect={true}
    />
  );
}

// RESULTADO (Após 2.5s, 80% do tempo):
// ┌─────────────────────────────────────────────┐
// │ ✨ Análise do Tutor                        [×]
// ├─────────────────────────────────────────────┤
// │                                             │
// │ ┌───────────────────────────────────────────┐
// │ │ ✓ Resposta Correta!                      │
// │ │ Resposta correta: Artigo 5º              │
// │ └───────────────────────────────────────────┘
// │                                             │
// │ ## Resumo                                   │
// │ Esta alternativa é a mais precisa e        │
// │ abrangente em relação ao tema.             │
// │                                             │
// │ ## Análise Detalhada                       │
// │ 1. A alternativa correta apresenta todos   │
// │    os elementos necessários da definição.  │
// │                                             │
// │ 2. Ela está em conformidade com a          │
// │    jurisprudência consolidada.             │
// │                                             │
// │ 3. As outras alternativas contêm erros     │
// │    conceituais ou informações incompletas. │
// │                                             │
// │ 4. O conhecimento aqui é aplicável em      │
// │    diversos contextos práticos.            │
// │                                             │
// │ ## 📖 Fontes Sugeridas                     │
// │ • Art. 5º da Constituição Federal ↗       │
// │ • Jurisprudência STF 2023 ↗               │
// │ • Lei Complementar nº 101/2000 ↗          │
// │                                             │
// │                  [Entendido]               │
// │                                             │
// └─────────────────────────────────────────────┘
```

---

## 6. AIExplanationModal - Estado Erro (20%)

```tsx
export function Example6() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AIExplanationModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      question="Qual artigo da CF trata dos direitos fundamentais?"
      correctAnswer="Artigo 5º - Dos Direitos e Garantias Fundamentais"
      selectedAnswer="Artigo 5º"
      isCorrect={true}
    />
  );
}

// RESULTADO (Após 2.5s, 20% do tempo):
// ┌─────────────────────────────────────────────┐
// │ ✨ Análise do Tutor                        [×]
// ├─────────────────────────────────────────────┤
// │                                             │
// │ ⚠️ IA Indisponível                         │
// │ A análise com IA está temporariamente      │
// │ indisponível. Exibindo gabarito padrão.    │
// │                                             │
// │ Resposta Correta                            │
// │ Artigo 5º - Dos Direitos e Garantias       │
// │ Fundamentais                                │
// │                                             │
// │ ## Explicação Padrão                       │
// │ A alternativa correta é a que melhor       │
// │ responde à questão proposta.               │
// │                                             │
// │ • Consulte o material didático para        │
// │   aprofundamento neste tema.               │
// │                                             │
// │ • Recomenda-se revisar os conceitos        │
// │   fundamentais relacionados.               │
// │                                             │
// │ • Pratique mais questões similares para    │
// │   consolidar o aprendizado.                │
// │                                             │
// │ ## Materiais de Referência                 │
// │ • Gabarito Oficial - INEP                  │
// │ • Material de Apoio - Instituição          │
// │ • Referências Complementares               │
// │                                             │
// │                  [Entendido]               │
// │                                             │
// └─────────────────────────────────────────────┘
```

---

## 7. SimulationRunnerScreen - Integração Completa

```tsx
import { SimulationRunnerScreen } from './screens/SimulationRunnerScreen';

export function Example7() {
  const questions = [
    {
      id: 'q1',
      number: 1,
      subject: 'Direito Constitucional',
      statement: 'Qual artigo da CF trata dos direitos fundamentais?',
      alternatives: [
        { id: 'a', text: 'Artigo 2º' },
        { id: 'b', text: 'Artigo 4º' },
        { id: 'c', text: 'Artigo 5º' },
        { id: 'd', text: 'Artigo 8º' }
      ],
      correctAnswer: 'c'
    },
    // ... mais questões
  ];

  const config = {
    questions: 20,
    mode: 'training', // ✅ Ativa feedback mode
    subjects: ['Direito Constitucional'],
    timestamp: new Date().toISOString()
  };

  return (
    <SimulationRunnerScreen
      questions={questions}
      config={config}
      onPause={() => console.log('Pausado')}
      onExit={() => console.log('Saindo')}
      onReview={() => console.log('Revisão')}
      onSubmit={() => console.log('Enviando')}
      onUpdateAnswers={(answers) => console.log('Respostas:', answers)}
    />
  );
}

// FLUXO:
// 1. Usuário seleciona resposta
//    → feedbackMode = true
//    → QuestionCard mostra cores + botões
//
// 2. Usuário clica "Explicar com IA"
//    → showAIExplanation = true
//    → AIExplanationModal abre
//    → Loading 2.5s → Sucesso (80%) ou Erro (20%)
//
// 3. Usuário clica "Próxima"
//    → feedbackMode = false
//    → currentQuestionIndex++
//    → Vai para Q2
```

---

## 8. Modo Real (Sem Feedback)

```tsx
export function Example8() {
  const config = {
    questions: 20,
    mode: 'real', // ❌ Não ativa feedback mode
    subjects: ['Direito Constitucional'],
    timestamp: new Date().toISOString()
  };

  return (
    <SimulationRunnerScreen
      questions={questions}
      config={config}
      // ... outros props
    />
  );
}

// RESULTADO:
// - handleSelectAnswer NÃO chama setFeedbackMode(true)
// - QuestionCard renderiza SEM cores + SEM botões
// - Footer normal (Anterior, Flag, Próxima)
// - Modal não aparece
// - Comportamento tradicional de simulado
```

---

## 9. Teste de Estados da IA (Mockado)

```tsx
// Para testar o mock de sucesso/erro:
// Execute este código no console do navegador

function testAIMocks() {
  for (let i = 0; i < 10; i++) {
    const probability = Math.random();
    const result = probability < 0.8 ? 'SUCCESS' : 'ERROR';
    console.log(`Teste ${i + 1}: ${result} (${(probability * 100).toFixed(0)}%)`);
  }
}

// ESPERADO (80% sucesso):
// Teste 1: SUCCESS (15%)
// Teste 2: ERROR (87%)     ← 20%
// Teste 3: SUCCESS (32%)
// Teste 4: SUCCESS (45%)
// Teste 5: ERROR (92%)     ← 20%
// Teste 6: SUCCESS (10%)
// Teste 7: SUCCESS (68%)
// Teste 8: ERROR (85%)     ← 20%
// Teste 9: SUCCESS (20%)
// Teste 10: SUCCESS (50%)
```

---

## 10. Integração com API Real

```tsx
// Substituir o mock em AIExplanationModal.tsx

import { AIExplanationModal } from './components/AIExplanationModal';

// Criar versão com API real:
export function AIExplanationModalReal({
  isOpen,
  onClose,
  question,
  correctAnswer,
  selectedAnswer,
  isCorrect
}: AIExplanationModalProps) {
  const [state, setState] = useState<ModalState>("loading");
  const [explanation, setExplanation] = useState<Explanation | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchExplanation = async () => {
      try {
        const response = await fetch('/api/ai/explain', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question,
            correctAnswer,
            selectedAnswer,
            isCorrect
          })
        });

        if (response.ok) {
          const data = await response.json();
          setExplanation(data);
          setState("success");
        } else {
          setState("error");
        }
      } catch (error) {
        console.error('Erro ao buscar explicação:', error);
        setState("error");
      }
    };

    fetchExplanation();
  }, [isOpen, question, correctAnswer, selectedAnswer, isCorrect]);

  return <AIExplanationModal {...} />;
}
```

---

## 11. Props Referência Rápida

### QuestionCard
```typescript
interface QuestionCardProps {
  question: Question;
  totalQuestions: number;
  onSelectAnswer: (alternativeId: string) => void;
  selectedAnswer?: string | null;
  disabled?: boolean;
  showImage?: boolean;
  feedbackMode?: boolean;              // ← NOVO
  isCorrect?: boolean;                 // ← NOVO
  correctAnswerId?: string;            // ← NOVO
  onRequestExplanation?: () => void;   // ← NOVO
  onNextQuestion?: () => void;         // ← NOVO
}
```

### AIExplanationModal
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

---

## 12. Constants & Customização

```typescript
// Em AIExplanationModal.tsx

// Tempo de loading (ms)
const LOADING_TIMEOUT = 2500;  // ← Mude para 1000, 3000, etc

// Mensagens de loading
const LOADING_MESSAGES = [
  "Analisando a questão...",
  "Consultando base de conhecimento...",
  "Gerando explicação didática...",
  "Processando análise profunda...",
  "Preparando resposta personalizada..."
];

// Explicações mockadas (seleciona aleatoriamente)
const MOCK_EXPLANATIONS = [
  {
    summary: "Esta alternativa é a mais precisa...",
    detail: ["A alternativa correta apresenta...", ...],
    sources: [{ title: "...", link: "#" }, ...]
  },
  // ... mais 2 explicações
];

// Fallback padrão
const MOCK_ERROR_EXPLANATION = {
  summary: "Explicação padrão do gabarito oficial.",
  detail: [
    "A alternativa correta é a que melhor...",
    "Consulte o material didático...",
    // ...
  ],
  sources: [...]
};
```

---

## 13. Debug: Verificar Estados

```typescript
// Debug no console para verificar estados

// 1. Verificar feedbackMode
console.log('feedbackMode:', feedbackMode);

// 2. Verificar resposta selecionada
console.log('selectedAnswer:', selectedAnswer);
console.log('correctAnswer:', currentQuestion.correctAnswer);
console.log('isCorrect:', selectedAnswer === currentQuestion.correctAnswer);

// 3. Verificar modal
console.log('showAIExplanation:', showAIExplanation);
console.log('AIExplanationModal isOpen:', showAIExplanation);

// 4. Verificar modo
console.log('config.mode:', config.mode);
console.log('É modo training?:', config.mode === 'training');
```

---

## 14. Storybook (Para Você Adicionar)

```tsx
// src/components/AIExplanationModal.stories.tsx
import { StoryObj } from '@storybook/react';
import { AIExplanationModal } from './AIExplanationModal';

export default {
  component: AIExplanationModal,
  title: 'Components/AIExplanationModal'
};

type Story = StoryObj<typeof AIExplanationModal>;

export const Loading: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    question: "Test question",
    correctAnswer: "Test answer",
    selectedAnswer: "Test selected",
    isCorrect: true
  }
};

export const Success: Story = {
  // ... similar
};

export const Error: Story = {
  // ... similar
};
```

---

## 15. Testes Unitários (Para Você Adicionar)

```tsx
// src/components/__tests__/AIExplanationModal.test.tsx
import { render, screen } from '@testing-library/react';
import { AIExplanationModal } from '../AIExplanationModal';

describe('AIExplanationModal', () => {
  it('renders loading state initially', () => {
    render(
      <AIExplanationModal
        isOpen={true}
        onClose={() => {}}
        question="Q"
        correctAnswer="A"
        selectedAnswer="A"
        isCorrect={true}
      />
    );

    expect(screen.getByText(/Analisando a questão.../i)).toBeInTheDocument();
  });

  it('closes on backdrop click', () => {
    const onClose = vi.fn();
    render(
      <AIExplanationModal
        isOpen={true}
        onClose={onClose}
        question="Q"
        correctAnswer="A"
        selectedAnswer="A"
        isCorrect={true}
      />
    );

    // Implementar teste
  });
});
```

---

**Fim dos Exemplos!** 🎉

Use esses exemplos como referência para integrar o sistema em seus próprios componentes.
