import { useState } from "react";
import { MapPin, Star, Clock, CreditCard, Users } from "lucide-react";
import JobModalMobile from "./job_modal_mobile";
import { API_BASE_URL } from "../../config/api";
import { JobData } from "../../types/vagas/vaga";

interface JobPositionMobileProps {
  jobData: JobData;
}

export default function JobPositionMobile({ jobData }: JobPositionMobileProps) {
  const [open, setOpen] = useState(false);

  if (!jobData) {
    return null;
  }

  return (
    <>
      <div 
        className="w-full bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
        onClick={() => setOpen(true)}
      >
        {/* Header com empresa e compatibilidade */}
        <div className="bg-blue3 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full overflow-hidden border-2 border-blue1">
              <img 
                src={jobData.companyLogo || `${API_BASE_URL}/api/arquivos/empresa/${jobData.idEmpresa}/foto/view`}
                alt={jobData.company}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.parentElement?.querySelector('.fallback-icon') as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="fallback-icon hidden w-full h-full bg-blue2 items-center justify-center" style={{ display: 'none' }}>
                <Users size={16} className="text-white" />
              </div>
            </div>
            <div>
              <p className="text-blue1 text-sm font-medium">{jobData.company}</p>
              <h3 className="text-white font-semibold text-base leading-tight">{jobData.title}</h3>
            </div>
          </div>
          
          {jobData.compatibility > 0 && (
            <div className="bg-white text-blue3 px-2 py-1 rounded-full text-sm font-semibold">
              <div className="flex items-center gap-1">
                <Star size={12} className="text-blue2" />
                {jobData.compatibility}%
              </div>
            </div>
          )}
        </div>
        
        {/* Conteúdo principal */}
        <div className="p-4 space-y-3">
          {/* Informações básicas */}
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <div className="p-1 bg-blue1 rounded">
                <MapPin size={12} className="text-blue3" />
              </div>
              <span>{jobData.location || 'Localização não informada'}</span>
            </div>
            
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span className="text-xs">{jobData.typeContract}</span>
              </div>
              <div className="flex items-center gap-1">
                <CreditCard size={12} />
                <span className="text-xs">{jobData.payment}</span>
              </div>
            </div>
          </div>
          
          {/* Descrição */}
          <p className="text-gray-700 text-sm leading-relaxed overflow-hidden" 
             style={{
               display: '-webkit-box',
               WebkitLineClamp: 3,
               WebkitBoxOrient: 'vertical'
             }}>
            {jobData.description.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1')}
          </p>
          
          {/* Tags principais */}
          <div className="flex flex-wrap gap-1.5">
            {jobData.skillsTags && jobData.skillsTags.slice(0, 3).map((skill, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-blue2 text-white text-xs rounded font-medium"
              >
                {skill}
              </span>
            ))}
            {jobData.supportTags && jobData.supportTags.slice(0, 2).map((support, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-blue1 text-blue3 text-xs rounded font-medium"
              >
                {support}
              </span>
            ))}
          </div>
          
          {/* Call to action */}
          <div className="pt-2 border-t border-gray-100">
            <p className="text-blue3 text-sm font-medium text-center">
              Toque para ver mais detalhes
            </p>
          </div>
        </div>
      </div>
      
      <JobModalMobile 
        jobData={jobData}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}