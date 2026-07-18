import { ChatMessage, Citation, AIProviderConfig, AIQuestionContext } from "../types/simulation";

const DEFAULT_CONFIG: AIProviderConfig = {
  provider: "mock",
};

let providerConfig: AIProviderConfig = DEFAULT_CONFIG;

export function configureAI(config: Partial<AIProviderConfig>): void {
  providerConfig = { ...DEFAULT_CONFIG, ...config };
}

export function getAIProvider(): AIProviderConfig {
  return { ...providerConfig };
}

export async function askAI(
  userMessage: string,
  context: AIQuestionContext,
  messageHistory: ChatMessage[],
  signal?: AbortSignal
): Promise<ChatMessage> {
  switch (providerConfig.provider) {
    case "openai":
      return askOpenAI(userMessage, context, messageHistory, signal);
    case "mock":
    default:
      return askMockAI(userMessage, context);
  }
}

async function buildSystemPrompt(context: AIQuestionContext): Promise<string> {
  return `Você é um tutor especializado em concursos públicos. Responda com clareza e didática.

Contexto da questão atual:
- Disciplina: ${context.subject}
- Enunciado: ${context.question.statement}
- Alternativas:
${context.question.alternatives.map((a) => `  ${a.id}) ${a.text}`).join("\n")}
- Resposta do aluno: ${context.selectedAnswer}
- Resposta correta: ${context.correctAnswer}
- O aluno ${context.isCorrect ? "ACERTOU" : "ERROU"} esta questão.

Explique detalhadamente o raciocínio, mencione a legislação ou doutrina aplicável, e forneça dicas de estudo. Se possível, cite fontes confiáveis.`;
}

async function askOpenAI(
  userMessage: string,
  context: AIQuestionContext,
  messageHistory: ChatMessage[],
  signal?: AbortSignal
): Promise<ChatMessage> {
  const apiKey = providerConfig.apiKey;
  if (!apiKey) {
    throw new Error("API key não configurada. Use configureAI({ apiKey: '...' })");
  }

  const systemPrompt = await buildSystemPrompt(context);

  const messages = [
    { role: "system", content: systemPrompt },
    ...messageHistory.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
    { role: "user", content: userMessage },
  ];

  const response = await fetch(providerConfig.baseUrl || "https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: providerConfig.model || "gpt-4o-mini",
      messages,
      max_tokens: 1500,
      temperature: 0.7,
    }),
    signal,
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Erro da API: ${response.status} - ${errorData}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "Desculpe, não consegui processar a resposta.";

  return {
    id: `ai_${Date.now()}`,
    role: "assistant",
    content,
    citations: extractCitations(content),
    timestamp: Date.now(),
  };
}

function extractCitations(text: string): Citation[] {
  const citations: Citation[] = [];
  const urlRegex = /https?:\/\/[^\s)]+/g;
  let match: RegExpExecArray | null;
  const seen = new Set<string>();

  const urlRegexGlobal = new RegExp(urlRegex.source, "g");
  while ((match = urlRegexGlobal.exec(text)) !== null) {
    const url = match[0].replace(/[.,;:!?)]$/, "");
    if (!seen.has(url)) {
      seen.add(url);
      citations.push({ text: url, url });
    }
  }

  return citations;
}

async function askMockAI(
  userMessage: string,
  context: AIQuestionContext
): Promise<ChatMessage> {
  await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

  const correctAlternative = context.question.alternatives.find(
    (a) => a.id === context.correctAnswer
  );

  const selectedAlternative = context.question.alternatives.find(
    (a) => a.id === context.selectedAnswer
  );

  const baseExplanation = `## Análise da Questão

${context.isCorrect ? "**Parabéns!**" : "**Não foi dessa vez.**"} Você respondeu **${selectedAlternative?.text || "?"}** e ${
    context.isCorrect ? "acertou" : "o correto seria **" + correctAlternative?.text + "**"
  }.

### Fundamentação

${context.subject === "Direito" ? generateLawExplanation(context) : ""}
${context.subject === "Português" ? generatePortugueseExplanation(context) : ""}
${context.subject === "Raciocínio Lógico" ? generateLogicExplanation(context) : ""}

### Dica de Estudo

Revise os conceitos abordados e pratique com questões semelhantes para fixar o conteúdo.`;

  const answers: Record<string, string> = {
    default: baseExplanation,
    "explique": `${baseExplanation}\n\n### Aprofundamento\n\n${context.subject === "Direito" ? getLawDeepDive(context) : ""}${context.subject === "Português" ? getPortugueseDeepDive(context) : ""}${context.subject === "Raciocínio Lógico" ? getLogicDeepDive(context) : ""}`,
    "dica": `### Dicas para resolver questões de ${context.subject}\n\n1. Leia o enunciado com atenção\n2. Identifique palavras-chave\n3. Elimine alternativas claramente erradas\n4. ${context.isCorrect ? "Continue praticando!" : "Revise a matéria e tente novamente"}`,
    "lei": `### Legislação Aplicável\n\nArtigos relevantes para esta questão:\n\n- **Constituição Federal** - Artigos relacionados ao tema\n- **Lei específica da matéria** - Verifique a legislação atualizada\n\n> Consulte sempre o texto oficial da lei para estudo aprofundado.`,
  };

  const lowerMessage = userMessage.toLowerCase();
  let content: string;

  if (lowerMessage.includes("explique") || lowerMessage.includes("aprofund")) {
    content = answers.explique;
  } else if (lowerMessage.includes("dica") || lowerMessage.includes("como")) {
    content = answers.dica;
  } else if (lowerMessage.includes("lei") || lowerMessage.includes("artigo") || lowerMessage.includes("fundamento")) {
    content = answers.lei;
  } else if (lowerMessage.includes("obrigado") || lowerMessage.includes("valeu")) {
    content = "De nada! Estou aqui para ajudar. Continue estudando que você vai longe! 🚀";
  } else {
    content = answers.default;
  }

  const citations: Citation[] = [
    { text: "Constituição Federal (planalto.gov.br)", url: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm" },
    { text: "Biblioteca de Concursos - Estratégia", url: "https://www.estrategiaconcursos.com.br" },
  ];

  return {
    id: `ai_${Date.now()}`,
    role: "assistant",
    content,
    citations,
    timestamp: Date.now(),
  };
}

function generateLawExplanation(context: AIQuestionContext): string {
  return `Esta questão aborda tema de **Direito Constitucional/Administrativo**. 

- O fundamento legal está previsto na **Constituição Federal** e em legislação infraconstitucional.
- A doutrina majoritária entende que a alternativa correta é a que melhor se alinha aos princípios constitucionais.`;
}

function generatePortugueseExplanation(context: AIQuestionContext): string {
  return `A questão aborda tópico de **Língua Portuguesa** relacionado à interpretação de texto e análise gramatical.

- A alternativa correta é a que atende às regras gramaticais e ao contexto apresentado.
- É importante atentar-se ao comando da questão e ao gênero textual proposto.`;
}

function generateLogicExplanation(context: AIQuestionContext): string {
  return `Esta questão de **Raciocínio Lógico** envolve a aplicação de conceitos de lógica proposicional ou análise de padrões.

- Resolva passo a passo, eliminando alternativas inconsistentes.
- Verifique a validade lógica de cada proposição apresentada.`;
}

function getLawDeepDive(context: AIQuestionContext): string {
  return `\nPara aprofundamento, estude:\n- **CF/88** - Título III (Organização do Estado)\n- **Lei 9.784/99** (Processo Administrativo Federal)\n- Doutrina de **Direito Administrativo** (Maria Sylvia Zanella Di Pietro)`;
}

function getPortugueseDeepDive(context: AIQuestionContext): string {
  return `\nPara aprofundamento, estude:\n- **Nova Gramática do Português Contemporâneo** (Celso Cunha & Lindley Cintra)\n- **Gramática Normativa da Língua Portuguesa** (Rocha Lima)`;
}

function getLogicDeepDive(context: AIQuestionContext): string {
  return `\nPara aprofundamento, estude:\n- **Lógica para Concursos** (Paulo Sérgio de Oliveira)\n- **Raciocínio Lógico** (José Luiz de Morais)`;
}
