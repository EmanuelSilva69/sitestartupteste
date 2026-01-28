import { Question } from "../types/simulation";

export const mockQuestions: Question[] = [
  {
    id: "q1",
    number: 1,
    subject: "Português",
    statement: "Qual das alternativas apresenta erro de concordância verbal?",
    alternatives: [
      { id: "a", text: "Haviam muitas pessoas na sala esperando o resultado." },
      { id: "b", text: "Faz dois anos que não nos encontramos." },
      { id: "c", text: "Deve haver soluções para esse problema." },
      { id: "d", text: "Existe uma solução para cada problema." },
      { id: "e", text: "Havia muitas opções no cardápio." }
    ],
    correctAnswer: "a"
  },
  {
    id: "q2",
    number: 2,
    subject: "Raciocínio Lógico",
    statement: "Em uma sequência, temos: 2, 6, 12, 20, 30, ... Qual é o próximo número?",
    alternatives: [
      { id: "a", text: "40" },
      { id: "b", text: "42" },
      { id: "c", text: "44" },
      { id: "d", text: "46" },
      { id: "e", text: "48" }
    ],
    correctAnswer: "b"
  },
  {
    id: "q3",
    number: 3,
    subject: "Direito",
    statement: "Segundo a Constituição Federal de 1988, são direitos sociais, EXCETO:",
    alternatives: [
      { id: "a", text: "Educação e saúde" },
      { id: "b", text: "Trabalho e moradia" },
      { id: "c", text: "Segurança e previdência social" },
      { id: "d", text: "Propriedade privada absoluta" },
      { id: "e", text: "Proteção à maternidade e à infância" }
    ],
    correctAnswer: "d"
  },
  {
    id: "q4",
    number: 4,
    subject: "Português",
    statement: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Qual figura de linguagem está presente no trecho acima?",
    alternatives: [
      { id: "a", text: "Metáfora" },
      { id: "b", text: "Metonímia" },
      { id: "c", text: "Nenhuma - é texto padrão de preenchimento" },
      { id: "d", text: "Hipérbole" },
      { id: "e", text: "Personificação" }
    ],
    correctAnswer: "c"
  },
  {
    id: "q5",
    number: 5,
    subject: "Conhecimentos Gerais",
    statement: "Qual o país com maior território na América do Sul?",
    alternatives: [
      { id: "a", text: "Argentina" },
      { id: "b", text: "Brasil" },
      { id: "c", text: "Peru" },
      { id: "d", text: "Colômbia" },
      { id: "e", text: "Venezuela" }
    ],
    correctAnswer: "b"
  },
  {
    id: "q6",
    number: 6,
    subject: "Raciocínio Lógico",
    statement: "Se todos os A são B, e alguns B são C, podemos concluir que:",
    alternatives: [
      { id: "a", text: "Todos os A são C" },
      { id: "b", text: "Alguns A são C" },
      { id: "c", text: "Nenhum A é C" },
      { id: "d", text: "Não é possível tirar conclusões sobre A e C" },
      { id: "e", text: "Todos os C são A" }
    ],
    correctAnswer: "d"
  },
  {
    id: "q7",
    number: 7,
    subject: "Direito",
    statement: "O princípio da legalidade estabelece que:",
    alternatives: [
      { id: "a", text: "Ninguém será obrigado a fazer ou deixar de fazer alguma coisa senão em virtude de lei" },
      { id: "b", text: "Todos são iguais perante a lei" },
      { id: "c", text: "A lei não retroagirá" },
      { id: "d", text: "É livre a manifestação do pensamento" },
      { id: "e", text: "É inviolável a liberdade de consciência e de crença" }
    ],
    correctAnswer: "a"
  },
  {
    id: "q8",
    number: 8,
    subject: "Português",
    statement: "Assinale a alternativa em que há ERRO de regência verbal:",
    alternatives: [
      { id: "a", text: "Assisti ao filme ontem à noite." },
      { id: "b", text: "Prefiro café do que chá." },
      { id: "c", text: "Obedeça aos sinais de trânsito." },
      { id: "d", text: "Aspiramos a uma vida melhor." },
      { id: "e", text: "Esqueci-me dos documentos em casa." }
    ],
    correctAnswer: "b"
  },
  {
    id: "q9",
    number: 9,
    subject: "Raciocínio Lógico",
    statement: "Quantos triângulos existem na figura? (Imagine uma figura com vários triângulos sobrepostos)",
    alternatives: [
      { id: "a", text: "8 triângulos" },
      { id: "b", text: "12 triângulos" },
      { id: "c", text: "16 triângulos" },
      { id: "d", text: "20 triângulos" },
      { id: "e", text: "24 triângulos" }
    ],
    correctAnswer: "d"
  },
  {
    id: "q10",
    number: 10,
    subject: "Conhecimentos Gerais",
    statement: "Em que ano foi proclamada a República no Brasil?",
    alternatives: [
      { id: "a", text: "1822" },
      { id: "b", text: "1889" },
      { id: "c", text: "1891" },
      { id: "d", text: "1930" },
      { id: "e", text: "1964" }
    ],
    correctAnswer: "b"
  },
  {
    id: "q11",
    number: 11,
    subject: "Direito",
    statement: "Considerando os Direitos Fundamentais previstos na Constituição Federal de 1988, é INCORRETO afirmar:",
    alternatives: [
      { id: "a", text: "A casa é asilo inviolável do indivíduo, ninguém nela podendo penetrar sem consentimento do morador" },
      { id: "b", text: "É livre a expressão da atividade intelectual, artística, científica e de comunicação" },
      { id: "c", text: "É plena a liberdade de associação para fins lícitos" },
      { id: "d", text: "Ninguém pode ser preso, salvo em flagrante delito ou por ordem escrita e fundamentada de autoridade judiciária competente" },
      { id: "e", text: "A lei penal pode retroagir em qualquer caso" }
    ],
    correctAnswer: "e"
  },
  {
    id: "q12",
    number: 12,
    subject: "Português",
    statement: "Na frase 'O menino cujo pai é médico passou no concurso', o pronome 'cujo' estabelece uma relação de:",
    alternatives: [
      { id: "a", text: "Posse" },
      { id: "b", text: "Tempo" },
      { id: "c", text: "Causa" },
      { id: "d", text: "Finalidade" },
      { id: "e", text: "Concessão" }
    ],
    correctAnswer: "a"
  },
  {
    id: "q13",
    number: 13,
    subject: "Raciocínio Lógico",
    statement: "Se 5 máquinas fazem 5 produtos em 5 minutos, quantas máquinas são necessárias para fazer 100 produtos em 100 minutos?",
    alternatives: [
      { id: "a", text: "5 máquinas" },
      { id: "b", text: "10 máquinas" },
      { id: "c", text: "20 máquinas" },
      { id: "d", text: "50 máquinas" },
      { id: "e", text: "100 máquinas" }
    ],
    correctAnswer: "a"
  },
  {
    id: "q14",
    number: 14,
    subject: "Conhecimentos Gerais",
    statement: "Qual destes NÃO é um órgão do Poder Judiciário brasileiro?",
    alternatives: [
      { id: "a", text: "Supremo Tribunal Federal (STF)" },
      { id: "b", text: "Superior Tribunal de Justiça (STJ)" },
      { id: "c", text: "Tribunal de Contas da União (TCU)" },
      { id: "d", text: "Tribunais Regionais Federais (TRF)" },
      { id: "e", text: "Tribunais e Juízes do Trabalho" }
    ],
    correctAnswer: "c"
  },
  {
    id: "q15",
    number: 15,
    subject: "Português",
    statement: "Qual alternativa apresenta um exemplo de oração subordinada substantiva subjetiva?",
    alternatives: [
      { id: "a", text: "É necessário que todos compareçam à reunião." },
      { id: "b", text: "Espero que você tenha sucesso." },
      { id: "c", text: "Tenho certeza de que passarei no concurso." },
      { id: "d", text: "A verdade é que ele não estudou." },
      { id: "e", text: "Informaram que o evento foi cancelado." }
    ],
    correctAnswer: "a"
  },
  {
    id: "q16",
    number: 16,
    subject: "Raciocínio Lógico",
    statement: "João é mais alto que Pedro. Pedro é mais alto que Maria. Logo:",
    alternatives: [
      { id: "a", text: "Maria é mais alta que João" },
      { id: "b", text: "João é mais alto que Maria" },
      { id: "c", text: "Maria e João têm a mesma altura" },
      { id: "d", text: "Não é possível determinar a relação entre João e Maria" },
      { id: "e", text: "Pedro é o mais alto dos três" }
    ],
    correctAnswer: "b"
  },
  {
    id: "q17",
    number: 17,
    subject: "Direito",
    statement: "Segundo a Constituição Federal, qual o prazo de mandato do Presidente da República?",
    alternatives: [
      { id: "a", text: "3 anos" },
      { id: "b", text: "4 anos" },
      { id: "c", text: "5 anos" },
      { id: "d", text: "6 anos" },
      { id: "e", text: "8 anos" }
    ],
    correctAnswer: "b"
  },
  {
    id: "q18",
    number: 18,
    subject: "Conhecimentos Gerais",
    statement: "Qual continente possui a maior população mundial?",
    alternatives: [
      { id: "a", text: "África" },
      { id: "b", text: "América" },
      { id: "c", text: "Ásia" },
      { id: "d", text: "Europa" },
      { id: "e", text: "Oceania" }
    ],
    correctAnswer: "c"
  },
  {
    id: "q19",
    number: 19,
    subject: "Português",
    statement: "Em qual alternativa o uso da crase está INCORRETO?",
    alternatives: [
      { id: "a", text: "Fui à praia ontem." },
      { id: "b", text: "Refiro-me à pessoa que chegou." },
      { id: "c", text: "Ele chegou à uma hora." },
      { id: "d", text: "Dedico este livro à minha mãe." },
      { id: "e", text: "Voltei à cidade natal." }
    ],
    correctAnswer: "c"
  },
  {
    id: "q20",
    number: 20,
    subject: "Raciocínio Lógico",
    statement: "Um relógio atrasa 3 minutos a cada hora. Se ele foi acertado às 12h, que horas ele estará marcando quando forem realmente 18h?",
    alternatives: [
      { id: "a", text: "17h42min" },
      { id: "b", text: "17h45min" },
      { id: "c", text: "17h48min" },
      { id: "d", text: "17h51min" },
      { id: "e", text: "17h54min" }
    ],
    correctAnswer: "c"
  }
];
