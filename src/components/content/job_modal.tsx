// [TODO] - Fazer com que os campos só apareçam na visualização se existir o dado no banco (pra evitar ficar espaço vazio)

import { useEffect } from "react";
import TagContainer from "./tag_container";
import ProfileLink from "../profile/profile_link";
import { JobData } from "../../data/mockdata/jobs";

interface JobModalProps {
  open: boolean;
  onClose: () => void;
  jobData: JobData;
}

export default function JobModal({
  open,
  onClose,
  jobData
}: JobModalProps) {

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="w-full max-w-4xl max-h-[95vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="bg-blue1 p-6 rounded-t-xl shadow-lg flex-1 overflow-auto space-y-6">
          <div className="flex justify-between">
            <div className="flex-[7] space-y-4">
              <div className="space-y-1">
                <h2 className="font-bold text-4xl">{jobData.title}</h2>
                <p className="text-xs">Período de Inscrição: {jobData.startDate.toLocaleDateString('pt-BR')} até {jobData.endDate.toLocaleDateString('pt-BR')}</p>
              </div>
              <div>{jobData.description.split('\n')[0]}</div>
            </div>
            <div className="bg-white rounded-full flex justify-center items-center w-40 h-40 m-3 ml-9 border border-black overflow-hidden">
              <ProfileLink id={jobData.idEmpresa} imgPath={jobData.companyLogo}></ProfileLink>
            </div>
          </div>

          <div className="whitespace-pre-line text-gray-700 leading-relaxed">
            {jobData.description}
          </div>

          <div className="space-y-2">
            <p className="font-medium">Características da vaga</p>
            <div className="bg-blue4 rounded-lg p-2">
              <div className="flex justify-between">
                <span>Modalidade: <strong>{jobData.typeWork}</strong></span>
                <span>Localização: <strong>{jobData.location}</strong></span>
              </div>
              <div className="flex justify-between">
                <span>Nivel da Vaga: <strong>{jobData.workLevel}</strong></span>
                <span>Horário de Trabalho: <strong>{jobData.timeShift}</strong></span>
              </div>
              <div className="flex justify-between">
                <span>Pagamento: <strong>{jobData.payment}</strong></span>
                <span>Contrato: <strong>{jobData.typeContract}</strong></span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <TagContainer tags={jobData.skillsTags}>Habilidades esperadas</TagContainer>
            <TagContainer tags={jobData.supportTags}>Apoio da empresa</TagContainer>
          </div>
        </div>

        <div className="bg-white border border-y-black flex justify-center">
          <span className="m-2">Você é {jobData.compatibility}% compatível com essa vaga</span>
        </div>

        <div className="flex">
          <button className="bg-blue3 text-white flex-1 border-black border-2 text-4xl rounded-bl-3xl" onClick={onClose}>Fechar</button>
          <button className="bg-blue3 text-white flex-1 border-black border-2 text-4xl rounded-br-3xl" onClick={onClose}>Inscrever</button>
        </div>
      </div>
    </div>
  );
}