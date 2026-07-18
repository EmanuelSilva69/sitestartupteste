import { TransparencyData } from '../types/transparency';

export const mockTransparency: TransparencyData = {
  messageId: 'msg-123',
  aiResponse: 'A alternativa C está incorreta porque o artigo 5º da CF/88, inciso XI, estabelece que "a casa é asilo inviolável do indivíduo", permitindo ingresso apenas em caso de flagrante delito ou por determinação judicial. A alternativa C mencionava exceções inexistentes no texto constitucional.',
  questionData: {
    text: 'Segundo a Constituição Federal de 1988, assinale a alternativa correta sobre o direito à inviolabilidade domiciliar:\n\nA) A entrada em casa alheia sem consentimento do morador é permitida em qualquer horário mediante autorização judicial.\nB) A casa é asilo inviolável do indivíduo, ninguém nela podendo penetrar sem consentimento do morador, salvo em caso de flagrante delito ou desastre, ou para prestar socorro, ou, durante o dia, por determinação judicial.\nC) Durante a noite, é permitida a entrada em casa alheia sem consentimento para cumprimento de mandado judicial de busca e apreensão.\nD) A inviolabilidade domiciliar não se aplica a estabelecimentos comerciais durante o horário de funcionamento.',
    userAnswer: 'C',
    correctAnswer: 'B',
    examSource: 'Banca CESPE/CEBRASPE - Concurso Polícia Federal (Agente) - 2024',
    keySource: 'Gabarito Oficial Definitivo - Edital nº 1/2024 - CESPE/CEBRASPE, publicado em 15/08/2024',
  },
  traceability: {
    evidenceMap: [
      'Artigo 5º, Inciso XI, Constituição Federal de 1988',
      'Jurisprudência STF - Súmula Vinculante nº 11 (uso de algemas) - aplicação analógica do princípio da inviolabilidade',
      'Lei nº 13.869/2019 (Lei de Abuso de Autoridade) - Art. 22, que criminaliza o ingresso irregular em domicílio',
    ],
    relationship: 'A IA confrontou a alternativa C com a literalidade do Art. 5º, XI da CF/88. O inciso é expresso ao proibir entrada noturna sem consentimento, mesmo com mandado judicial. A alternativa C afirmava o oposto, configurando erro. A IA validou o gabarito B como correto por corresponder exatamente ao texto constitucional.',
    limitations: 'A IA não considerou possíveis atualizações legislativas dos últimos 30 dias. A análise baseou-se exclusivamente no texto constitucional vigente e jurisprudência consolidada do STF. Divergências doutrinárias sobre o conceito de "casa" para efeitos constitucionais (ex: quartos de hotel, trailers) não foram abordadas nesta explicação.',
  },
};

export const mockTransparencyList: TransparencyData[] = [
  mockTransparency,
  {
    messageId: 'msg-124',
    aiResponse: 'O princípio da impessoalidade está insculpido no caput do art. 37 da CF/88 e determina que a Administração Pública deve tratar todos os administrados sem discriminações, visando sempre o interesse público.',
    questionData: {
      text: 'Acerca dos princípios da Administração Pública, assinale a alternativa que apresenta o princípio previsto no caput do art. 37 da Constituição Federal:\n\nA) Moralidade\nB) Publicidade\nC) Eficiência\nD) Impessoalidade',
      userAnswer: 'A',
      correctAnswer: 'D',
      examSource: 'Banca FCC - Tribunal de Justiça de São Paulo (TJ-SP) - 2023',
      keySource: 'Gabarito Preliminar - FCC - Concurso TJ-SP 2023',
    },
    traceability: {
      evidenceMap: [
        'Artigo 37, caput, Constituição Federal de 1988',
        'Lei nº 9.784/99 (Lei do Processo Administrativo Federal) - Art. 2º',
        'Doutrina: MEIRELLES, Hely Lopes. Direito Administrativo Brasileiro',
      ],
      relationship: 'A IA comparou a alternativa A (Moralidade) com o texto do caput do art. 37. Embora a moralidade também seja um princípio administrativo, ela está prevista em parágrafo único e não no caput. O caput elenca expressamente: legalidade, impessoalidade, moralidade, publicidade e eficiência. A alternativa D (Impessoalidade) está textualmente no caput, confirmando o gabarito.',
      limitations: 'A EC nº 19/1998 inseriu o princípio da eficiência no caput do art. 37. A análise considerou a redação atual pós-EC 19.',
    },
  },
];
