import { useState } from "react";
import svgPaths from "../imports/svg-3vo5skaxth";
import imgImage from "figma:asset/0b3edc4f7257e9376d9a28a57d620b0c4246fe9b.png";

interface ConsultationFormProps {
  onSubmit: (inscription: string) => void;
}

export function ConsultationForm({ onSubmit }: ConsultationFormProps) {
  const [inscription, setInscription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with inscription:", inscription);
    if (inscription.length === 12) {
      console.log("Calling onSubmit");
      onSubmit(inscription);
    } else {
      console.log("Inscription length invalid:", inscription.length);
    }
  };

  return (
    <div className="bg-white relative min-h-screen w-full">
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
        <div className="bg-white rounded-[8px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] w-[600px] p-8">
          {/* Title */}
          <div className="flex items-center gap-3 mb-6">
            <div className="size-[24px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <path d={svgPaths.p2e9f4770} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
            <h1 className="font-['Inter'] font-semibold text-[20px] text-[#1f2937] leading-[30px]">
              Iniciar Consulta
            </h1>
          </div>

          <p className="font-['Inter'] font-normal text-[15px] text-[#6b7280] leading-[24px] mb-10">
            Insira seus dados para visualizar seu desempenho no concurso público nacional.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Número de Inscrição */}
            <div className="mb-6">
              <label className="font-['Inter'] font-semibold text-[14px] text-[#374151] leading-[21px] mb-2 block">
                Número de Inscrição
                <span className="text-[#dc2626] ml-1">*</span>
              </label>
              <input
                type="text"
                value={inscription}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 12);
                  setInscription(value);
                }}
                placeholder="Digite os 12 dígitos"
                className="w-full h-[56px] border-2 border-[#d1d5db] rounded-[6px] px-4 font-['Inter'] text-[16px] focus:outline-none focus:border-[#1351b4]"
                maxLength={12}
              />
              <p className="font-['Inter'] font-normal text-[12px] text-[#6b7280] leading-[18px] mt-1">
                Exemplo: 123456789012
              </p>
            </div>

            {/* Concurso */}
            <div className="mb-6">
              <label className="font-['Inter'] font-semibold text-[14px] text-[#374151] leading-[21px] mb-2 block">
                Concurso
              </label>
              <div className="relative bg-[#d9d9d9] h-[56px] rounded-[6px] flex items-center px-4">
                <span className="font-['Inter'] font-normal text-[13px] text-[#6b7280] leading-[19.5px] opacity-70">
                  CNU - Edição Unificada
                </span>
                <div className="absolute right-4 size-[20px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                    <path d={svgPaths.p3ec5f580} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="size-[14px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                    <path clipRule="evenodd" d={svgPaths.p1dd43980} fill="black" fillRule="evenodd" />
                  </svg>
                </div>
                <p className="font-['Inter'] font-normal text-[13px] text-[#6b7280] leading-[19.5px]">
                  Concurso fixo para esta edição
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={inscription.length !== 12}
              className="w-full bg-[#1351b4] h-[56px] rounded-[6px] shadow-[0px_2px_4px_0px_rgba(19,81,180,0.2)] font-['Inter'] font-semibold text-[16px] text-white leading-[24px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0c3d8a] transition-colors"
            >
              Consultar Resultado
            </button>
          </form>

          {/* Information Box */}
          <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-[6px] p-4 mt-6">
            <div className="flex items-start gap-3">
              <div className="size-[20px] mt-0.5">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                  <path clipRule="evenodd" d={svgPaths.p229b6af0} fill="#1e40af" fillRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-['Inter'] font-semibold text-[14px] text-[#1e40af] leading-[21px] mb-1">
                  Informações Importantes
                </p>
                <ul className="space-y-1">
                  <li className="font-['Inter'] font-normal text-[13px] text-[#1e40af] leading-[19.5px]">
                    Mantenha seu número de inscrição em local seguro
                  </li>
                  <li className="font-['Inter'] font-normal text-[13px] text-[#1e40af] leading-[19.5px]">
                    Os resultados são oficiais e atualizados em tempo real
                  </li>
                  <li className="font-['Inter'] font-normal text-[13px] text-[#1e40af] leading-[19.5px]">
                    Em caso de dúvidas, consulte o edital oficial
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Testing Instructions */}
          <div className="bg-[#f3f4f6] border border-[#d1d5db] rounded-[6px] p-3 mt-4">
            <p className="font-['Inter'] font-medium text-[12px] text-[#6b7280] leading-[18px] mb-2">
              Para testar o protótipo:
            </p>
            <ul className="space-y-1">
              <li className="font-['Inter'] font-normal text-[11px] text-[#6b7280] leading-[16.5px]">
                • Digite <strong>123456789012</strong> para ver resultado aprovado
              </li>
              <li className="font-['Inter'] font-normal text-[11px] text-[#6b7280] leading-[16.5px]">
                • Digite <strong>000000000000</strong> para ver inscrição não encontrada
              </li>
              <li className="font-['Inter'] font-normal text-[11px] text-[#6b7280] leading-[16.5px]">
                • Digite <strong>999999999999</strong> para ver erro de sistema
              </li>
            </ul>
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
