# RELATÓRIO DE IMPLEMENTAÇÃO — DESIGN SYSTEM E TRANSPARÊNCIA

**Plataforma:** Consulta de Candidatos / Startplay Simulados  
**Data:** Julho de 2026  
**Versão do documento:** 1.0

---

## 1. INTRODUÇÃO

Este relatório documenta a implementação das camadas de design e transparência no front-end do projeto Consulta de Candidatos, abrangendo as atividades das tarefas DEV1-09 (Telas de resultado e análises + Estados críticos), DEV1-08 (Comparações/Ranking - stub) e a camada de transparência da IA. O documento segue as normas ABNT para estruturação e referência.

O sistema é construído sobre React 18 com TypeScript, estilizado via Tailwind CSS, utilizando Radix UI primitives, Lucide React para iconografia e recharts para gráficos.

---

## 2. TELAS DE RESULTADO E ANÁLISES (DEV1-09)

### 2.1 Arquitetura de Navegação

As telas de dashboard são geridas por um container stateful (`DashboardContainer.tsx`) que implementa uma máquina de estados simples com quatro telas navegáveis:

- `resultado` → exibe o resultado do último simulado
- `historico` → lista filtrada de tentativas anteriores
- `detalhe` → análise aprofundada de uma tentativa específica
- `perfil` → perfil gamificado do concurseiro

A navegação é feita via estado React (`useState<DashboardScreen>`), sem dependência do roteador principal (`react-router`), pois essas telas operam como subseções dentro de uma mesma rota.

### 2.2 Tela de Resultado (`ResultadoSimulado.tsx`)

O componente `ResultadoSimulado` consome dados do mock `latestAttempt` e apresenta:

- **Nota final**: exibida em destaque com gradiente dinâmico (esmeralda ≥ 80%, âmbar ≥ 65%, vermelho < 65%)
- **Tempo total e tempo médio**: indicadores com ícones `Clock` e `Timer`
- **Status**: badge `Aprovado` (success) ou `Abaixo da Meta` (warning)
- **Acertos por área**: barras de progresso com gradiente roxo-rosa, percentual numérico
- **Análise de tempo**: callout informativo comparando o tempo do usuário com a média esperada
- **CTAs**: botões "Histórico de Simulados" e "Ver Detalhes do Simulado" com navegação para as telas correspondentes

**Padrão visual**: gradientes consistentes, SVG grid overlay, blur-3xl decorativo, tipografia fluidText para responsividade.

### 2.3 Tela de Histórico (`HistoricoTentativas.tsx`)

Lista as 7 tentativas mockadas com:

- **Filtro por período**: pills `Tudo | Últimos 7 dias | Últimos 30 dias | Últimos 90 dias` com estado ativo via cor primária e sombra
- **Busca por ID**: campo de input com ícone `Search` e filtragem case-insensitive
- **Cards de tentativa**: cada card exibe ID, status (ícone e badge), data formatada (pt-BR), tempo total, número de questões, nota com cor e seta de navegação com hover animation

**Observação crítica**: não há tratamento para lista vazia (empty state). Quando o filtro não retorna resultados, a lista simplesmente não renderiza nada, sem mensagem ao usuário.

### 2.4 Tela de Detalhe da Tentativa (`DetalheTentativa.tsx`)

Recebe um `attemptId` e exibe:

- **Card de resumo**: status, nota (gradiente), tempo total
- **Tempo por área de conhecimento**: barras horizontais comparativas com razão `(timeSpent - avgTime) / avgTime * 100`. Se a razão excede 10%, a barra fica vermelha/laranja e um badge "Lento" é exibido
- **Grid de questões**: até 40 questões em grid responsivo (2 colunas mobile, 5 colunas desktop) com três estados visuais:
  - Esmeralda + `CheckCircle2` = correto
  - Âmbar + `Clock` + badge "Lento" = correto mas lento
  - Vermelho + `XCircle` = errado
- **Legenda**: ao final do grid, legenda explicativa dos três estados

**Observação crítica**: a função `getAttempt` faz fallback silencioso para `mockAttempts[0]` quando o ID não é encontrado, sem exibir estado de erro.

### 2.5 Tela de Perfil do Concurseiro (`PerfilConcurseiro.tsx`)

Composta por três seções:

1. **Gráfico de Radar (SVG Spider Chart)**: implementação customizada em SVG puro, com 5 eixos (disciplinas), polígono de dados com gradiente e glow filter, pontos de dados com círculos coloridos, labels e valores percentuais
2. **Cards de Insight**: "Ponto Forte" (esmeralda) com badge success e "Atenção" (âmbar) com badge warning, cada um destacando a disciplina de maior e menor desempenho
3. **Gráfico de Tendência (Evolução das Notas)**: barras verticais em gradiente com cores variáveis por faixa de score, badge de evolução geral (`TrendingUp`/`TrendingDown`), card de resumo textual com análise da variação

### 2.6 Tela de Perfil Detalhado (`DetailedProfile.tsx`)

Tela acessada via rota `/profile/:inscription` que expande o perfil com:

- **Seções**: cabeçalho do candidato, Detalhes do Simulado, Desempenho Geral (com status, ranking, aproveitamento vs média da turma), **Status do Concurseiro** com nível, título, gráfico de radar e barras de atributo por disciplina, Detalhamento por Disciplina e Histórico do Simulado (timeline)
- **Sistema de nível e título**: nível 12, título "Estrategista", componentes visuais gamificados com coroa (ícone `Crown`), efeito bounce, brilho com text-shadow e sparkle animado
- **5 atributos**: Precisão, Velocidade, Consistência, Resistência, Cobertura — cada um com ícone específico, gradiente de cor único, barra de progresso animada

---

## 3. ESTADOS CRÍTICOS (LOADING/ERRO/EMPTY)

### 3.1 Componente Skeleton (`src/components/ui/skeleton.tsx`)

Fornece três variantes pré-montadas:

- **`ProfileCardSkeleton`**: avatar circular + duas linhas de texto + dois blocos retangulares
- **`QuestionCardSkeleton`**: título + corpo + quatro opções de resposta
- **`ResultCardSkeleton`**: três colunas de métrica + bloco grande

Utiliza a classe `skeleton-shimmer` para animação de loading, com `role="status"` e `aria-label` para acessibilidade.

### 3.2 Tela de Processamento (`ProcessingScreen.tsx`)

Implementa carregamento progressivo com:

- Timer de 3 segundos simulando processamento assíncrono
- Exibição de dois `ProfileCardSkeleton` como placeholder
- Animação de fundo gradiente e card com blur
- Badge do ID da inscrição com gradiente

### 3.3 Tela de Resultado (`ResultScreen.tsx`)

Três estados distintos baseados no ID da inscrição:

| ID | Estado | Elementos |
|---|---|---|
| `123456789012` | **Success** | Card de confirmação verde, card de dados do candidato, grid de estatísticas (aproveitamento, média da turma, ranking), CTA "Analisar Desempenho Detalhado" |
| `000000000000` | **Not Found** | Ícone `AlertTriangle` grande com gradiente laranja, mensagem "Simulado Não Encontrado", ID destacado, botão "Tentar Outro ID" que retorna à busca |
| `999999999999` | **Error** | Ícone `XCircle` grande com gradiente vermelho, mensagem de erro, dois botões: "Voltar" (outline) e "Tentar Novamente" (reload) |

**Ações do usuário em cada estado**: retry, voltar, reload — cobertos conforme critério de aceite.

### 3.4 Estados no Modal TutorIA (`AIExplanationModal.tsx`)

- **Empty**: quando `ratedMessages.length === 0` e não está enviando, exibe ícone Bot + texto "Faça uma pergunta sobre esta questão"
- **Loading**: `TypingIndicator` com três bolinhas animadas (animate-bounce com delays)
- **Error**: mensagem de erro capturada do serviço `askAI`, exibida como mensagem do assistente com ícone `AlertCircle`

### 3.5 Lacunas Identificadas

- **Histórico sem empty state**: quando o filtro não retorna resultados, nada é exibido
- **Detalhe sem loading/error**: `getAttempt` faz fallback silencioso
- **Dashboard sem estados**: `DashboardContainer` não implementa loading nem error boundary
- **PerfilConcurseiro sem loading**: dados mockados carregam instantaneamente
- **Sem histórico vazio**: não há tratamento para "nenhuma tentativa registrada"

---

## 4. CAMADA DE TRANSPARÊNCIA DA IA

### 4.1 Componente AITransparencyPanel

Painel lateral (slide-in, 460px) que expõe:

- **Resposta da IA**: texto da resposta gerada
- **Contexto da questão**: exibe lado a lado a resposta marcada pelo usuário e a alternativa correta, com cores de fundo (esmeralda para correto, vermelho para errado)
- **Fontes oficiais**: fonte da prova e fonte do gabarito com ícones
- **Mapa de evidências**: lista numerada de fontes jurídicas (artigos, leis, jurisprudência, doutrina)
- **Matriz de relacionamento**: fluxo visual rastreando resposta da IA → questão → gabarito
- **Limitações**: callout âmbar com texto "A IA pode cometer imprecisões"
- **Feedback do usuário**: botões thumbs up/down que registram `FeedbackType` e exibem mensagem de agradecimento

### 4.2 Componente AIExplanationModal (TutorIA)

Modal lateral (384px) com chat para perguntas de acompanhamento:

- **Cabeçalho**: branding "TutorIA" com gradiente
- **Banner de resultado**: verde (acertou) ou vermelho (errou) com alternativa correta
- **Mensagens do chat**: bolhas com avatares distintos (Bot/User/AlertCircle), citações com links externos, rating por mensagem
- **Indicador de digitação**: três bolinhas animadas com delays
- **Rodapé**: campo de input + botão enviar + disclaimer "O TutorIA pode cometer erros"
- **Envio automático**: ao abrir o modal, envia "Explique esta questão" automaticamente

### 4.3 Componente TransparencyDemo

Página de demonstração completa que:

- Lista dois itens de transparência mockados (Direito Constitucional e Administrativo)
- Cada item contém contexto da questão + resposta do usuário + resposta da IA + fonte
- Botão "Ver evidências" que abre o `AITransparencyPanel`
- Sidebar explicativa "Como funciona" com 3 passos: Contexto → Fontes → Rastreio
- Feedback tracking por `messageId`

### 4.4 Tipos e Dados

- **`transparency.ts`**: define `TransparencyData`, `QuestionData`, `Traceability` (evidenceMap, relationship, limitations), `FeedbackType`
- **`mockTransparency.ts`**: dois cenários realistas com referências legais concretas (CF/88 art. 5º, art. 37, Lei 8.112/90, Súmulas STF)

### 4.5 Rastreabilidade

A relação entre resposta da IA, questão e gabarito é estabelecida através:

1. `AIQuestionContext` que agrupa pergunta, resposta do usuário, gabarito e resultado
2. `Traceability.evidenceMap` como lista de strings enumerando as fontes consultadas
3. `Traceability.relationship` texto descritivo conectando os elementos
4. Citações por mensagem (`Citation[]`) com URL e texto âncora

---

## 5. COMPARAÇÕES E RANKING — STUB (DEV1-08)

### 5.1 Implementação Atual

Não existe um componente dedicado de comparação/ranking. As funcionalidades estão embutidas em outros componentes:

- **ResultScreen**: exibe "Seu Ranking: Top 5%" e "Média da Turma: 70.0%" lado a lado com "Seu Aproveitamento: 87.5%"
- **DetailedProfile**: exibe "Seu Ranking: 142º entre 5.234 alunos" e "Diferença: +17.5%" (aproveitamento - média da turma)
- **PerfilConcurseiro**: comparação implícita através do badge de evolução (+evolução ou -evolução)

### 5.2 Lacunas

- Não há "Você vs Melhor do ranking" com radar comparativo
- Não há "Você vs Média" com radar ou cards dedicados
- Não há "Você vs Você Mesmo" com timeline de atributos mensais
- Não há texto de transparência sobre ranking relativo ao grupo de testes da POC
- Não há export PNG do frame principal de comparação

---

## 6. EXPORTS E PROTÓTIPO FIGMA

### 6.1 Exports PNG

O diretório `docs/design/exports/screens/` contém 14 arquivos PNG nomeados como `Tela1.PNG` a `Tela13.PNG` (com variações de nomenclatura como `teça13.PNG` e `tel10.PNG`). Os nomes seguem um padrão sequencial simples, sem descrição do conteúdo ou estado representado.

### 6.2 Guia de Exportação (`COMO_EXPORTAR.md`)

Documento com 194 linhas detalhando:

- Estrutura de pastas esperada (`screens/`, `components/`, `flows/`)
- 6 passos para criar protótipo Figma navegável
- Navegação: Login → Personalizar → Runner → Review → Processing → Resultado → Perfil
- Atalhos Figma
- Checklist de entrega
- Template Jira para card

---

## 7. PONTOS DE MELHORIA

### 7.1 Estados e Tratamento de Erro

| ID | Problema | Proposta |
|---|---|---|
| 1 | Histórico sem empty state | Adicionar mensagem "Nenhum simulado encontrado" com ilustração e CTA |
| 2 | `getAttempt` fallback silencioso | Exibir estado "Tentativa não encontrada" com botão de retorno |
| 3 | Dashboard sem loading state | Adicionar `ResultCardSkeleton` durante transição entre telas |
| 4 | PerfilConcurseiro dados estáticos | Conectar a API real e implementar loading/error states |
| 5 | Ausência de Error Boundary | Envolver rotas em React Error Boundary com fallback UI |

### 7.2 Comparações e Ranking

| ID | Problema | Proposta |
|---|---|---|
| 6 | Sem tela dedicada de comparação | Criar componente `ComparacaoRanking` com abas: "Você vs Melhor", "Você vs Média", "Você vs Você" |
| 7 | Radar comparativo inexistente | Estender `RadarChart` para sobrepor dois polígonos (usuário vs referência) |
| 8 | Sem texto de transparência da POC | Adicionar nota: "Ranking baseado no grupo de testes da POC — dados não representam a população real" |

### 7.3 Transparência da IA

| ID | Problema | Proposta |
|---|---|---|
| 9 | Evidências em texto plano | Criar cards visuais interativos no mapa de evidências |
| 10 | Sem fonte da prova editável | Adicionar campo de input para o usuário inserir fonte manualmente |
| 11 | Relação IA↔Questão↔Gabarito textual | Criar diagrama visual conectado com setas e cores |

### 7.4 Qualidade de Código

| ID | Problema | Proposta |
|---|---|---|
| 12 | Dados mockados inline vs módulo | Padronizar: todo mock em `src/data/`, zero dados inline nos componentes |
| 13 | CSS duplicado | Extrair padrões de gradiente e grid overlay para classes utilitárias |
| 14 | Nomenclatura inconsistente de imports | Revisar imports: algumas telas usam `../../components/`, outras `../../components/ui/` |
| 15 | Sem testes | Adicionar Vitest + React Testing Library para testes dos componentes críticos |
| 16 | Hardcoded `console.log` | Remover ou substituir por logger configurável |

### 7.5 Exports e Protótipo

| ID | Problema | Proposta |
|---|---|---|
| 17 | PNGs sem nomenclatura descritiva | Renomear seguindo padrão `[contexto]-[tela]-[estado].png` (ex: `dashboard-resultado-success.png`) |
| 18 | Protótipo Figma não publicado | Seguir o guia COMO_EXPORTAR.md e publicar link público |
| 19 | Faltam screenshots dos estados críticos | Exportar PNGs de: loading, empty, not-found, error de cada tela principal |

---

## 8. CONSIDERAÇÕES FINAIS

A implementação atual cobre satisfatoriamente as telas de resultado, histórico, detalhe e perfil do concurseiro, com consistência visual através de gradientes, sombras e tipografia responsiva. A camada de transparência da IA oferece rastreabilidade completa com fontes, evidências e feedback do usuário.

As principais lacunas concentram-se em: (a) tratamento de estados críticos em telas específicas do dashboard, (b) ausência de uma tela dedicada de comparação/ranking, (c) falta de naming convention nos exports PNG e (d) inexistência de testes automatizados.

Recomenda-se priorizar os itens 2, 3, 6, 7, 12, 15 e 17 da seção 7 como parte da próxima sprint para elevar a maturidade do protótipo a um nível pronto para validação com usuários reais.

---

## REFERÊNCIAS

- Documentação de tipos: `src/types/dashboard.ts`, `src/types/simulation.ts`, `src/types/transparency.ts`
- Dados mockados: `src/data/mockDashboard.ts`, `src/data/mockTransparency.ts`
- Documento de atributos: `docs/design/status-attributes.md`
- Blueprint Figma: `docs/design/figma-blueprint.md`
- Guia de exportação: `docs/design/exports/COMO_EXPORTAR.md`
