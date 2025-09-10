import { useEffect } from "react";
import TextSection from "./text_section";
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
        <div className="bg-blue1 p-6 rounded-t-xl shadow-lg flex-1 overflow-auto">
          <div className="flex flex-1 justify-between">
            <div className="flex-[7]">
              <h2 className="text-xl font-bold mb-4 text-[70px] py-7">{jobData.title}</h2>
              <div className="">{jobData.description.split('\n')[0]}</div>
            </div>
            <div className="bg-white rounded-full flex justify-center items-center w-40 h-40 m-3 ml-9 border border-black overflow-hidden">
              <ProfileLink id={jobData.idEmpresa} imgPath={jobData.companyLogo}></ProfileLink>
            </div>
          </div>
          <div className="my-3">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {jobData.description}
            </div>
          </div>
          <div>
            <TagContainer tags={jobData.skillsTags}>Habilidades esperadas</TagContainer>
            <TagContainer tags={jobData.supportTags}>Apoio da empresa</TagContainer>
          </div>
        </div>
        <div className="bg-white border border-y-black flex justify-center py-2">
          <span>Você é {jobData.compatibility}% compátivel com essa vaga</span>
        </div>
        <div className="flex flex-1">
          <button className="bg-blue3 text-white flex-[5] border-black border-[2px] text-[35px] rounded-bl-3xl py-2" onClick={onClose}>Fechar</button>
          <button className="bg-blue3 text-white flex-[5] border-black border-[2px] text-[35px] rounded-br-3xl py-2" onClick={onClose}>Inscrever</button>
        </div>
      </div>
    </div>
  );
}