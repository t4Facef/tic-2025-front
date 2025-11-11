import { useState } from "react";
import { MapPin, Star } from "lucide-react";
import JobModal from "./job_modal";
import ProfileLink from "../profile/profile_link";
import { API_BASE_URL } from "../../config/api";
import { JobData } from "../../types/vagas/vaga";

interface JobPositionProps {
  jobData: JobData;
  isEditing?: boolean;
}

export default function JobPosition({ jobData, isEditing=false }: JobPositionProps) {
  const [open, setOpen] = useState(false);

  if (!jobData) {
    return null;
  }

  return (
    <>
      <div 
        className="w-full bg-blue1 rounded-xl shadow-sm hover:shadow-lg border border-blue2 hover:border-blue3 cursor-pointer transition-all duration-300 overflow-hidden"
        onClick={() => setOpen(true)}
      >
        <div className="flex min-h-36">
          {/* Logo da empresa */}
          <div className="w-40 bg-blue4 border-r border-blue2 flex items-center justify-center p-4">
            <div className="w-32 h-32 bg-white rounded-xl shadow-md overflow-hidden border-2 border-blue3">
              <ProfileLink 
                id={jobData.idEmpresa} 
                imgPath={`${API_BASE_URL}/api/arquivos/empresa/${jobData.idEmpresa}/foto/view`}
              />
            </div>
          </div>
          
          {/* Conteúdo da vaga */}
          <div className="flex-1 flex flex-col">
            {/* Header com título e compatibilidade */}
            <div className="bg-blue3 px-4 py-2 flex justify-between items-center">
              <div>
                <h3 className="font-medium text-white text-sm">{jobData.title}</h3>
                <p className="text-xs text-blue4">{jobData.company}</p>
              </div>
              
              {jobData.compatibility > 0 && (
                <div className="bg-white text-blue3 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-blue2" />
                    {jobData.compatibility}%
                  </div>
                </div>
              )}
            </div>
            
            {/* Conteúdo principal */}
            <div className="bg-white flex-1 p-4 rounded-br-xl">
              {/* Localização e tipo */}
              <div className="bg-blue1 rounded-lg p-3 mb-3 border border-blue2">
                <div className="flex items-center gap-4 text-sm text-blue3">
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-blue4 rounded">
                      <MapPin size={12} />
                    </div>
                    <span className="font-medium">{jobData.location || 'Não informado'}</span>
                  </div>
                  <span className="text-blue2">•</span>
                  <span className="font-medium">{jobData.typeContract}</span>
                  <span className="text-blue2">•</span>
                  <span className="font-medium">{jobData.typeWork}</span>
                </div>
              </div>
              
              {/* Descrição */}
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                {jobData.description.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').substring(0, 350)}
                {jobData.description.length > 350 ? '...' : ''}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {jobData.skillsTags && jobData.skillsTags.slice(0, 4).map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue2 text-white text-xs rounded-full font-medium shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
                {jobData.supportTags && jobData.supportTags.slice(0, 2).map((support, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue4 text-blue3 text-xs rounded-full font-medium border border-blue2 shadow-sm"
                  >
                    {support}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <JobModal 
        jobData={jobData}
        open={open}
        isEditing={isEditing}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
