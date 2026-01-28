# Design System: Clean Pop (Startplay)

O Design System **Clean Pop** foi concebido para transformar a experiência de simulados em algo estimulante e de alta performance. Ele utiliza uma paleta escura profunda (`#171717`) contrastada com gradientes vibrantes (Primary: `#9E7FFF` para Secondary: `#38BDF8`), cantos arredondados generosos e micro-interações fluidas.

## 1. Componentes de Base

| Componente | Props Principais | Descrição | Quando Usar |
| :--- | :--- | :--- | :--- |
| **Button** | `variant`, `size`, `isLoading` | Botão com suporte a estados de carregamento e gradientes. | Ações principais (Gerar, Entrar) e secundárias (Voltar). |
| **Input** | `isError`, `icon`, `label` | Campo de texto com suporte a ícones do Lucide e validação visual. | Captura de IDs de simulado e dados de perfil. |
| **Badge** | `variant` (success, warning, accent) | Etiquetas compactas para status ou categorias. | Indicar dificuldade, status de aprovação ou matérias. |
| **Card** | `hoverable`, `padding` | Container com efeito de vidro (glassmorphism) e bordas suaves. | Agrupar informações relacionadas e seções de conteúdo. |

## 2. Componentes de Produto

| Componente | Props Principais | Descrição | Quando Usar |
| :--- | :--- | :--- | :--- |
| **SimuladoTimer** | `initialTime`, `onExpire` | Contador regressivo com alerta visual em tempo real. | Durante a execução de simulados no modo "Pressão". |
| **QuestionCard** | `question`, `options`, `onSelect` | Interface interativa para exibição de questões e alternativas. | Na tela principal de execução do simulado. |
| **Progress** | `value`, `showLabel` | Barra de progresso com gradiente animado Startplay. | Indicar conclusão de simulado ou desempenho por matéria. |

## 3. Diretrizes Visuais
- **Arredondamento:** Padrão de `16px` (rounded-2xl) para cards e `full` para botões de ação.
- **Elevação:** Uso de sombras coloridas (`shadow-primary/20`) para destacar elementos ativos.
- **Tipografia:** Hierarquia clara com títulos em negrito extra e corpo de texto legível (Inter/Sans-serif).
