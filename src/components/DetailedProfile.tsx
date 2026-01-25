import { ArrowLeft, User, FileText, BarChart3, Award, Download } from "lucide-react";
import imgImage from "figma:asset/0b3edc4f7257e9376d9a28a57d620b0c4246fe9b.png";

// Mock detailed data
const mockDetailedData = {
  name: "Maria Silva Santos",
  cpf: "123.456.789-00",
  email: "maria.silva@email.com",
  telefone: "(61) 98765-4321",
  inscricao: "123456789012",
  cargo: "Analista Técnico de Políticas Sociais",
  area: "Gestão de Políticas Públicas",
  orgao: "Ministério da Gestão e da Inovação",
  localidade: "Brasília/DF",
  notaFinal: 87.5,
  notaCorte: 70.0,
  status: "Aprovado",
  posicao: 142,
  totalCandidatos: 5234,
  provas: [
    {
      nome: "Conhecimentos Básicos",
      nota: 42.5,
      notaMaxima: 50,
      percentual: 85,
      questoesCorretas: 34,
      questoesTotais: 40,
    },
    {
      nome: "Conhecimentos Específicos",
      nota: 45.0,
      notaMaxima: 50,
      percentual: 90,
      questoesCorretas: 36,
      questoesTotais: 40,
    },
  ],
  dataProva: "18 de agosto de 2024",
  dataResultado: "21 de novembro de 2024",
};

interface DetailedProfileProps {
  inscription: string;
  onBack: () => void;
}

export function DetailedProfile({ inscription, onBack }: DetailedProfileProps) {
  console.log("DetailedProfile - inscription:", inscription);

  return (
    <div className="bg-white relative min-h-screen w-full pb-24">
      {/* Background */}
      <div className="absolute h-full left-0 top-0 w-full bg-[#F8F9FA]" />
      
      {/* Header */}
      <div className="relative bg-[#1351b4] h-[111px] w-full">
        <p className="absolute font-['Inter'] font-bold text-[28px] text-white top-[23px] left-[28px] leading-[33.6px]">
          Consulta de Resultados CNU
        </p>
        <p className="absolute font-['Inter'] font-normal text-[14px] text-[#e0e6ed] top-[66px] left-[28px] leading-[21px]">
          Concurso Nacional Unificado
        </p>
      </div>

      {/* Main Content */}
      <div className="relative flex justify-center pt-8">
        <div className="w-[900px] space-y-6">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 font-['Inter'] font-medium text-[14px] text-[#1351b4] hover:text-[#0c3d8a] transition-colors"
          >
            <ArrowLeft className="size-4" />
            Voltar para resultados
          </button>

          {/* Profile Header */}
          <div className="bg-white rounded-[8px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#1351b4] rounded-full p-4">
                  <User className="size-8 text-white" />
                </div>
                <div>
                  <h1 className="font-['Inter'] font-bold text-[28px] text-[#1f2937] leading-[36px] mb-2">
                    {mockDetailedData.name}
                  </h1>
                  <p className="font-['Inter'] font-normal text-[14px] text-[#6b7280] leading-[21px]">
                    CPF: {mockDetailedData.cpf} | Inscrição: {mockDetailedData.inscricao}
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 bg-[#1351b4] h-[40px] px-4 rounded-[6px] font-['Inter'] font-medium text-[14px] text-white hover:bg-[#0c3d8a] transition-colors">
                <Download className="size-4" />
                Baixar Comprovante
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-['Inter'] font-semibold text-[12px] text-[#6b7280] leading-[18px] mb-1">
                  E-mail
                </p>
                <p className="font-['Inter'] font-normal text-[14px] text-[#1f2937] leading-[21px]">
                  {mockDetailedData.email}
                </p>
              </div>
              <div>
                <p className="font-['Inter'] font-semibold text-[12px] text-[#6b7280] leading-[18px] mb-1">
                  Telefone
                </p>
                <p className="font-['Inter'] font-normal text-[14px] text-[#1f2937] leading-[21px]">
                  {mockDetailedData.telefone}
                </p>
              </div>
            </div>
          </div>

          {/* Cargo Information */}
          <div className="bg-white rounded-[8px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="size-5 text-[#1351b4]" />
              <h2 className="font-['Inter'] font-bold text-[20px] text-[#1f2937] leading-[28px]">
                Informações do Cargo
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-['Inter'] font-semibold text-[12px] text-[#6b7280] leading-[18px] mb-1">
                  Cargo
                </p>
                <p className="font-['Inter'] font-normal text-[14px] text-[#1f2937] leading-[21px]">
                  {mockDetailedData.cargo}
                </p>
              </div>
              <div>
                <p className="font-['Inter'] font-semibold text-[12px] text-[#6b7280] leading-[18px] mb-1">
                  Área
                </p>
                <p className="font-['Inter'] font-normal text-[14px] text-[#1f2937] leading-[21px]">
                  {mockDetailedData.area}
                </p>
              </div>
              <div>
                <p className="font-['Inter'] font-semibold text-[12px] text-[#6b7280] leading-[18px] mb-1">
                  Órgão
                </p>
                <p className="font-['Inter'] font-normal text-[14px] text-[#1f2937] leading-[21px]">
                  {mockDetailedData.orgao}
                </p>
              </div>
              <div>
                <p className="font-['Inter'] font-semibold text-[12px] text-[#6b7280] leading-[18px] mb-1">
                  Localidade
                </p>
                <p className="font-['Inter'] font-normal text-[14px] text-[#1f2937] leading-[21px]">
                  {mockDetailedData.localidade}
                </p>
              </div>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-white rounded-[8px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="size-5 text-[#1351b4]" />
              <h2 className="font-['Inter'] font-bold text-[20px] text-[#1f2937] leading-[28px]">
                Desempenho Geral
              </h2>
            </div>
            
            <div className="bg-[#ecfdf5] border border-[#6ee7b7] rounded-[8px] p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-['Inter'] font-semibold text-[14px] text-[#065f46] leading-[21px] mb-1">
                    Status da Aprovação
                  </p>
                  <p className="font-['Inter'] font-bold text-[24px] text-[#059669] leading-[32px]">
                    {mockDetailedData.status.toUpperCase()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-['Inter'] font-normal text-[14px] text-[#047857] leading-[21px] mb-1">
                    Posição na Classificação
                  </p>
                  <p className="font-['Inter'] font-bold text-[32px] text-[#059669] leading-[40px]">
                    {mockDetailedData.posicao}º
                  </p>
                  <p className="font-['Inter'] font-normal text-[12px] text-[#047857] leading-[18px]">
                    de {mockDetailedData.totalCandidatos} candidatos
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#f0f4ff] rounded-[6px] p-4 text-center">
                <p className="font-['Inter'] font-normal text-[12px] text-[#6b7280] leading-[18px] mb-2">
                  Nota Final
                </p>
                <p className="font-['Inter'] font-bold text-[32px] text-[#1351b4] leading-[40px]">
                  {mockDetailedData.notaFinal}
                </p>
              </div>
              <div className="bg-[#f9fafb] rounded-[6px] p-4 text-center">
                <p className="font-['Inter'] font-normal text-[12px] text-[#6b7280] leading-[18px] mb-2">
                  Nota de Corte
                </p>
                <p className="font-['Inter'] font-bold text-[32px] text-[#374151] leading-[40px]">
                  {mockDetailedData.notaCorte}
                </p>
              </div>
              <div className="bg-[#f9fafb] rounded-[6px] p-4 text-center">
                <p className="font-['Inter'] font-normal text-[12px] text-[#6b7280] leading-[18px] mb-2">
                  Diferença
                </p>
                <p className="font-['Inter'] font-bold text-[32px] text-[#059669] leading-[40px]">
                  +{(mockDetailedData.notaFinal - mockDetailedData.notaCorte).toFixed(1)}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Scores */}
          <div className="bg-white rounded-[8px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="size-5 text-[#1351b4]" />
              <h2 className="font-['Inter'] font-bold text-[20px] text-[#1f2937] leading-[28px]">
                Detalhamento por Prova
              </h2>
            </div>

            <div className="space-y-4">
              {mockDetailedData.provas.map((prova, index) => (
                <div key={index} className="border border-[#e5e7eb] rounded-[8px] p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-['Inter'] font-semibold text-[16px] text-[#1f2937] leading-[24px]">
                      {prova.nome}
                    </h3>
                    <div className="text-right">
                      <p className="font-['Inter'] font-bold text-[20px] text-[#1351b4] leading-[28px]">
                        {prova.nota}
                      </p>
                      <p className="font-['Inter'] font-normal text-[12px] text-[#6b7280] leading-[18px]">
                        de {prova.notaMaxima}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex justify-between mb-1">
                      <p className="font-['Inter'] font-normal text-[12px] text-[#6b7280] leading-[18px]">
                        Aproveitamento
                      </p>
                      <p className="font-['Inter'] font-semibold text-[12px] text-[#1f2937] leading-[18px]">
                        {prova.percentual}%
                      </p>
                    </div>
                    <div className="bg-[#e5e7eb] h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#1351b4] h-full rounded-full transition-all"
                        style={{ width: `${prova.percentual}%` }}
                      />
                    </div>
                  </div>

                  <p className="font-['Inter'] font-normal text-[13px] text-[#6b7280] leading-[19.5px]">
                    Questões corretas: {prova.questoesCorretas} de {prova.questoesTotais}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-[8px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] p-6">
            <h2 className="font-['Inter'] font-bold text-[20px] text-[#1f2937] leading-[28px] mb-4">
              Cronologia
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-[#1351b4] rounded-full size-2 mt-2" />
                <div>
                  <p className="font-['Inter'] font-semibold text-[14px] text-[#1f2937] leading-[21px]">
                    Aplicação da Prova
                  </p>
                  <p className="font-['Inter'] font-normal text-[13px] text-[#6b7280] leading-[19.5px]">
                    {mockDetailedData.dataProva}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-[#1351b4] rounded-full size-2 mt-2" />
                <div>
                  <p className="font-['Inter'] font-semibold text-[14px] text-[#1f2937] leading-[21px]">
                    Divulgação dos Resultados
                  </p>
                  <p className="font-['Inter'] font-normal text-[13px] text-[#6b7280] leading-[19.5px]">
                    {mockDetailedData.dataResultado}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 w-full bg-white border-t border-[#e5e7eb] h-[73px] flex items-center px-[28px] justify-between">
        <div className="h-[32px] w-[96px]">
          <img alt="GOV.BR" className="h-full w-full object-contain" src={imgImage} />
        </div>
        <div className="flex gap-8">
          <button className="font-['Inter'] font-normal text-[14px] text-[#6b7280] leading-[21px] hover:text-[#1351b4]">
            Meus Dados
          </button>
          <button className="font-['Inter'] font-normal text-[14px] text-[#6b7280] leading-[21px] hover:text-[#1351b4]">
            Ajuda
          </button>
          <button className="font-['Inter'] font-normal text-[14px] text-[#6b7280] leading-[21px] hover:text-[#1351b4]">
            Acessibilidade
          </button>
        </div>
      </div>
    </div>
  );
}
