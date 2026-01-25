import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import imgImage from "figma:asset/0b3edc4f7257e9376d9a28a57d620b0c4246fe9b.png";

interface ProcessingScreenProps {
  inscription: string;
  onComplete: () => void;
}

export function ProcessingScreen({ inscription, onComplete }: ProcessingScreenProps) {
  useEffect(() => {
    console.log("ProcessingScreen mounted, inscription:", inscription);
    
    // Simulate processing time - 3 seconds to see animation
    const timer = setTimeout(() => {
      console.log("Processing complete, calling onComplete");
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [inscription, onComplete]);

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

      {/* Loading Content */}
      <div className="relative flex justify-center items-center pt-20">
        <div className="bg-white rounded-[8px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] w-[600px] p-12 flex flex-col items-center">
          <Loader2 className="size-16 text-[#1351b4] animate-spin mb-6" />
          <h2 className="font-['Inter'] font-semibold text-[24px] text-[#1f2937] leading-[32px] mb-2">
            Processando sua consulta
          </h2>
          <p className="font-['Inter'] font-normal text-[15px] text-[#6b7280] leading-[24px] text-center">
            Aguarde enquanto buscamos os dados da inscrição <strong>{inscription}</strong>
          </p>
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
