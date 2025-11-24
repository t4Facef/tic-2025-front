import { useState, useEffect } from "react";
import { 
  X, 
  MapPin, 
  Star, 
  Clock, 
  CreditCard, 
  Users, 
  Calendar,
  Briefcase,
  Timer
} from "lucide-react";
import { API_BASE_URL } from "../../config/api";
import { JobData } from "../../types/vagas/vaga";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import GenericBlueButton from "../buttons/generic_blue_button";

interface JobModalMobileProps {
  jobData: JobData;
  open: boolean;
  onClose: () => void;
  isEditing?: boolean;
}

export default function JobModalMobile({ jobData, open, onClose, isEditing = false }: JobModalMobileProps) {
  const [imageError, setImageError] = useState(false);
  const { user, role } = useAuth();
  const navigate = useNavigate();

  // Previne scroll do body quando modal está aberto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [open]);

  if (!open) return null;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full h-full bg-white flex flex-col max-h-screen" onClick={(e) => e.stopPropagation()}>
        {/* Header fixo */}
        <div className="flex-none bg-blue3 px-4 py-3 flex items-center justify-between border-b border-blue2">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 bg-white rounded-full overflow-hidden border-2 border-blue1 flex-shrink-0">
              {!imageError ? (
                <img 
                  src={jobData.companyLogo || `${API_BASE_URL}/api/arquivos/empresa/${jobData.idEmpresa}/foto/view`}
                  alt={jobData.company}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-blue2 flex items-center justify-center">
                  <Users size={20} className="text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-blue1 text-sm font-medium truncate">{jobData.company}</p>
              <h2 className="text-white font-bold text-lg leading-tight">{jobData.title}</h2>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="flex-shrink-0 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors active:scale-95"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Conteúdo com scroll otimizado */}
        <div className="flex-1 overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="p-4 space-y-6 min-h-full">{/* Garante altura mínima para scroll */}
          {/* Compatibilidade */}
          {jobData.compatibility >= 0 && (
            <div className="bg-blue1 p-4 rounded-lg border border-blue2">
              <div className="flex items-center justify-center gap-2">
                <Star size={18} className="text-blue3" />
                <span className="text-blue3 font-bold text-base">{jobData.compatibility}% de compatibilidade</span>
              </div>
              <p className="text-blue3 text-sm text-center mt-1">
                {jobData.compatibility === 0 
                  ? 'Complete seu perfil para melhor compatibilidade'
                  : 'Esta vaga é compatível com seu perfil'
                }
              </p>
            </div>
          )}

          {/* Informações da vaga */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <MapPin size={16} className="text-blue3" />
                <span className="text-xs font-medium text-gray-600">LOCALIZAÇÃO</span>
              </div>
              <p className="text-sm font-semibold text-gray-800">
                {jobData.location || 'Não informado'}
              </p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Clock size={16} className="text-blue3" />
                <span className="text-xs font-medium text-gray-600">CONTRATO</span>
              </div>
              <p className="text-sm font-semibold text-gray-800">{jobData.typeContract}</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <CreditCard size={16} className="text-blue3" />
                <span className="text-xs font-medium text-gray-600">SALÁRIO</span>
              </div>
              <p className="text-sm font-semibold text-gray-800">{jobData.payment}</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Briefcase size={16} className="text-blue3" />
                <span className="text-xs font-medium text-gray-600">NÍVEL</span>
              </div>
              <p className="text-sm font-semibold text-gray-800">{jobData.workLevel}</p>
            </div>
          </div>

          {/* Período da vaga */}
          <div className="bg-blue1 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={16} className="text-blue3" />
              <span className="text-sm font-medium text-blue3">PERÍODO DA VAGA</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div>
                <span className="text-gray-600">Início: </span>
                <span className="font-semibold text-gray-800">{formatDate(jobData.startDate)}</span>
              </div>
              <div>
                <span className="text-gray-600">Fim: </span>
                <span className="font-semibold text-gray-800">{formatDate(jobData.endDate)}</span>
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Timer size={16} className="text-blue3" />
              Descrição da Vaga
            </h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {jobData.description.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1')}
              </p>
            </div>
          </div>

          {/* Habilidades necessárias */}
          {jobData.skillsTags && jobData.skillsTags.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Habilidades Necessárias</h3>
              <div className="flex flex-wrap gap-2">
                {jobData.skillsTags.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-2 bg-blue2 text-white text-sm rounded-lg font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Apoios oferecidos */}
          {jobData.supportTags && jobData.supportTags.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Apoios Oferecidos</h3>
              <div className="flex flex-wrap gap-2">
                {jobData.supportTags.map((support, index) => (
                  <span 
                    key={index}
                    className="px-3 py-2 bg-blue1 text-blue3 text-sm rounded-lg font-medium border border-blue2"
                  >
                    {support}
                  </span>
                ))}
              </div>
            </div>
            )}
          </div>
        </div>

        {/* Footer fixo com botões */}
        <div className="flex-none bg-white border-t border-gray-200 p-4 space-y-3 safe-area-inset-bottom">
          <div className="w-full max-w-sm mx-auto space-y-3">
            {role === "CANDIDATO" ? (
              <>
                <GenericBlueButton 
                  color={3} 
                  size="lg"
                  link={`/jobs/${jobData.id}/apply`}
                >
                  Candidatar-se à Vaga
                </GenericBlueButton>
                <GenericBlueButton 
                  color={2} 
                  size="md"
                  link={`/companies/${jobData.idEmpresa}/profile`}
                >
                  Ver Perfil da Empresa
                </GenericBlueButton>
              </>
            ) : role === "EMPRESA" && user?.id === jobData.idEmpresa ? (
              <>
                <button 
                  className="w-full bg-blue3 hover:bg-blue3H text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                  onClick={() => {
                    if (isEditing && (!jobData.id || jobData.id === 0)) {
                      alert('Esta vaga ainda não foi criada. Salve a vaga primeiro para visualizá-la.');
                      return;
                    }
                    navigate(`/jobs/${jobData.id}/${isEditing ? "edit" : "view"}`);
                  }}
                  disabled={isEditing && (!jobData.id || jobData.id === 0)}
                >
                  {isEditing ? "Editar Vaga" : "Visualizar Vaga"}
                </button>
                <button 
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                  onClick={onClose}
                >
                  Fechar
                </button>
              </>
            ) : (
              <>
                <GenericBlueButton 
                  color={3} 
                  size="lg"
                  link={`/jobs/${jobData.id}/apply`}
                >
                  Candidatar-se à Vaga
                </GenericBlueButton>
                <GenericBlueButton 
                  color={2} 
                  size="md"
                  link={`/companies/${jobData.idEmpresa}/profile`}
                >
                  Ver Perfil da Empresa
                </GenericBlueButton>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}