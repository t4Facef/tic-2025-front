import { useState } from "react";
import { MapPin, Star, Clock, CreditCard, Users, Briefcase } from "lucide-react";
import JobModalDesktop from "./job_modal_desktop";
import MarkdownRenderer from "./markdown_renderer";
import { API_BASE_URL } from "../../config/api";
import { JobData } from "../../types/vagas/vaga";

interface JobPositionDesktopProps {
  jobData: JobData;
  isEditing?: boolean;
  onApplicationSuccess?: () => void;
}

export default function JobPositionDesktop({ jobData, isEditing = false, onApplicationSuccess }: JobPositionDesktopProps) {
  const [open, setOpen] = useState(false);

  if (!jobData) {
    return null;
  }

  return (
    <>
      <div 
        className="w-full bg-gray-50 rounded-xl shadow-xl border border-gray-300 hover:shadow-2xl hover:border-gray-400 transition-all duration-300 overflow-hidden cursor-pointer group"
        onClick={() => setOpen(true)}
      >
        {/* Header com empresa e compatibilidade */}
        <div className="bg-blue3 px-6 py-3 flex items-center justify-between group-hover:bg-blue3H transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full overflow-hidden border-2 border-blue1 shadow-md">
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
                <Users size={20} className="text-white" />
              </div>
            </div>
            <div>
              <p className="text-blue1 text-sm font-medium">{jobData.company}</p>
              <h3 className="text-white font-bold text-lg leading-tight">{jobData.title}</h3>
            </div>
          </div>
          
          {jobData.compatibility >= 0 && (
            <div className="bg-white text-blue3 px-3 py-1.5 rounded-full font-semibold shadow-xl border-2 border-blue1">
              <div className="flex items-center gap-1.5">
                <Star size={14} className="text-blue2" />
                <span className="text-sm">{jobData.compatibility}%</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Conteúdo principal */}
        <div className="p-4 space-y-3">
          {/* Grid de informações principais */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="p-1.5 bg-blue1 rounded-lg shadow-sm">
                <MapPin size={14} className="text-blue3" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Localização</p>
                <p className="text-sm font-semibold text-gray-800 truncate">{jobData.location || 'Não informado'}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="p-1.5 bg-blue1 rounded-lg shadow-sm">
                <Clock size={14} className="text-blue3" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Contrato</p>
                <p className="text-sm font-semibold text-gray-800">{jobData.typeContract}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="p-1.5 bg-blue1 rounded-lg shadow-sm">
                <CreditCard size={14} className="text-blue3" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Salário</p>
                <p className="text-sm font-semibold text-gray-800">{jobData.payment}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="p-1.5 bg-blue1 rounded-lg shadow-sm">
                <Briefcase size={14} className="text-blue3" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Nível</p>
                <p className="text-sm font-semibold text-gray-800">{jobData.workLevel}</p>
              </div>
            </div>
          </div>

          {/* Descrição compacta */}
          <div>
            <div className="text-gray-700 text-sm leading-relaxed overflow-hidden" 
                 style={{
                   display: '-webkit-box',
                   WebkitLineClamp: 2,
                   WebkitBoxOrient: 'vertical'
                 }}>
              <MarkdownRenderer 
                content={jobData.description} 
                className="text-sm leading-relaxed"
              />
            </div>
          </div>
          
          {/* Tags compactas */}
          <div className="flex flex-wrap gap-1.5">
            {jobData.skillsTags && jobData.skillsTags.slice(0, 4).map((skill, index) => (
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
            {((jobData.skillsTags?.length || 0) + (jobData.supportTags?.length || 0)) > 6 && (
              <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded font-medium">
                +{((jobData.skillsTags?.length || 0) + (jobData.supportTags?.length || 0)) - 6} mais
              </span>
            )}
          </div>
          
          {/* Call to action compacto */}
          <div className="pt-2 border-t border-gray-100">
            <p className="text-blue3 text-sm font-medium text-center group-hover:text-blue2 transition-colors">
              Clique para ver detalhes completos
            </p>
          </div>
        </div>
      </div>
      
      <JobModalDesktop 
        jobData={jobData}
        open={open}
        onClose={() => setOpen(false)}
        isEditing={isEditing}
        onApplicationSuccess={onApplicationSuccess}
      />
    </>
  );
}