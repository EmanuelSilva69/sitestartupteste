import { CheckCircle2, XCircle, AlertTriangle, ArrowLeft } from "lucide-react";
import imgImage from "figma:asset/0b3edc4f7257e9376d9a28a57d620b0c4246fe9b.png";

// Mock data for successful result
const mockCandidateData = {
  name: "Maria Silva Santos",
  cpf: "123.456.789-00",
  cargo: "Analista Técnico de Políticas Sociais",
  area: "Gestão de Políticas Públicas",
  nota: 87.5,
  notaCorte: 70.0,
  status: "Aprovado",
  posicao: 142,
  totalCandidatos: 5234,
};

type ResultType = "success" | "not-found" | "error";

function getResultType(inscription: string): ResultType {
  if (inscription === "123456789012") return "success";
  if (inscription === "000000000000") return "not-found";
  if (inscription === "999999999999") return "error";
  return "not-found";
}

interface ResultScreenProps {
  inscription: string;
  onBackToSearch: () => void;
  onViewDetails: () => void;
}

export function ResultScreen({ inscription, onBackToSearch, onViewDetails }: ResultScreenProps) {
  const resultType = getResultType(inscription);

  console.log("ResultScreen - inscription:", inscription, "type:", resultType);

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
        <div className="w-[800px]">
          {/* Back Button */}
          <button
            onClick={onBackToSearch}
            className="flex items-center gap-2 mb-6 font-['Inter'] font-medium text-[14px] text-[#1351b4] hover:text-[#0c3d8a] transition-colors"
          >
            <ArrowLeft className="size-4" />
            Voltar para busca
          </button>

          {/* Success State */}
          {resultType === "success" && (
            <div className="space-y-4">
              {/* Success Alert */}
              <div className="bg-[#ecfdf5] border border-[#6ee7b7] rounded-[8px] p-4 flex items-start gap-3">
                <CheckCircle2 className="size-6 text-[#059669] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-['Inter'] font-semibold text-[16px] text-[#065f46] leading-[24px]">
                    Inscrição Localizada
                  </h3>
                  <p className="font-['Inter'] font-normal text-[14px] text-[#047857] leading-[21px]">
                    Número de Inscrição: {inscription}
                  </p>
                </div>
              </div>

              {/* Candidate Card */}
              <div
                onClick={onViewDetails}
                className="bg-white rounded-[8px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] p-6 cursor-pointer hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="font-['Inter'] font-bold text-[24px] text-[#1f2937] leading-[32px] mb-1">
                      {mockCandidateData.name}
                    </h2>
                    <p className="font-['Inter'] font-normal text-[14px] text-[#6b7280] leading-[21px]">
                      CPF: {mockCandidateData.cpf}
                    </p>
                  </div>
                  <div className="bg-[#ecfdf5] border border-[#6ee7b7] rounded-[6px] px-4 py-2">
                    <p className="font-['Inter'] font-bold text-[14px] text-[#059669] leading-[21px]">
                      {mockCandidateData.status.toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#e5e7eb] pt-4 mb-4">
                  <p className="font-['Inter'] font-semibold text-[16px] text-[#374151] leading-[24px] mb-2">
                    {mockCandidateData.cargo}
                  </p>
                  <p className="font-['Inter'] font-normal text-[14px] text-[#6b7280] leading-[21px]">
                    {mockCandidateData.area}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 bg-[#f9fafb] rounded-[6px] p-4">
                  <div>
                    <p className="font-['Inter'] font-normal text-[12px] text-[#6b7280] leading-[18px] mb-1">
                      Sua Nota
                    </p>
                    <p className="font-['Inter'] font-bold text-[24px] text-[#1351b4] leading-[32px]">
                      {mockCandidateData.nota}
                    </p>
                  </div>
                  <div>
                    <p className="font-['Inter'] font-normal text-[12px] text-[#6b7280] leading-[18px] mb-1">
                      Nota de Corte
                    </p>
                    <p className="font-['Inter'] font-bold text-[20px] text-[#374151] leading-[28px]">
                      {mockCandidateData.notaCorte}
                    </p>
                  </div>
                  <div>
                    <p className="font-['Inter'] font-normal text-[12px] text-[#6b7280] leading-[18px] mb-1">
                      Posição
                    </p>
                    <p className="font-['Inter'] font-bold text-[20px] text-[#374151] leading-[28px]">
                      {mockCandidateData.posicao}º
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <p className="font-['Inter'] font-medium text-[14px] text-[#1351b4] leading-[21px]">
                    Clique para ver detalhes completos →
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Not Found State */}
          {resultType === "not-found" && (
            <div className="bg-white rounded-[8px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] p-12">
              <div className="flex flex-col items-center text-center">
                <div className="bg-[#fef3c7] rounded-full p-6 mb-6">
                  <AlertTriangle className="size-16 text-[#d97706]" />
                </div>
                <h2 className="font-['Inter'] font-bold text-[28px] text-[#1f2937] leading-[36px] mb-3">
                  Inscrição Não Localizada
                </h2>
                <p className="font-['Inter'] font-normal text-[16px] text-[#6b7280] leading-[24px] mb-2 max-w-md">
                  Não encontramos nenhuma inscrição com o número <strong>{inscription}</strong> em nosso sistema.
                </p>
                <p className="font-['Inter'] font-normal text-[14px] text-[#6b7280] leading-[21px] mb-8 max-w-md">
                  Verifique se o número foi digitado corretamente e tente novamente.
                </p>
                <button
                  onClick={onBackToSearch}
                  className="bg-[#1351b4] h-[48px] px-8 rounded-[6px] shadow-[0px_2px_4px_0px_rgba(19,81,180,0.2)] font-['Inter'] font-semibold text-[16px] text-white leading-[24px] hover:bg-[#0c3d8a] transition-colors"
                >
                  Tentar Novamente
                </button>
              </div>
            </div>
          )}

          {/* Error State */}
          {resultType === "error" && (
            <div className="bg-white rounded-[8px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] p-12">
              <div className="flex flex-col items-center text-center">
                <div className="bg-[#fee2e2] rounded-full p-6 mb-6">
                  <XCircle className="size-16 text-[#dc2626]" />
                </div>
                <h2 className="font-['Inter'] font-bold text-[28px] text-[#1f2937] leading-[36px] mb-3">
                  Erro de Sistema
                </h2>
                <p className="font-['Inter'] font-normal text-[16px] text-[#6b7280] leading-[24px] mb-2 max-w-md">
                  Não foi possível estabelecer conexão com o servidor no momento.
                </p>
                <p className="font-['Inter'] font-normal text-[14px] text-[#6b7280] leading-[21px] mb-8 max-w-md">
                  Por favor, tente novamente em alguns instantes. Se o problema persistir, entre em contato com o suporte.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={onBackToSearch}
                    className="bg-white border-2 border-[#1351b4] h-[48px] px-8 rounded-[6px] font-['Inter'] font-semibold text-[16px] text-[#1351b4] leading-[24px] hover:bg-[#f0f4ff] transition-colors"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-[#1351b4] h-[48px] px-8 rounded-[6px] shadow-[0px_2px_4px_0px_rgba(19,81,180,0.2)] font-['Inter'] font-semibold text-[16px] text-white leading-[24px] hover:bg-[#0c3d8a] transition-colors"
                  >
                    Tentar Novamente
                  </button>
                </div>
              </div>
            </div>
          )}
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
