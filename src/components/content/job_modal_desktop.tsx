import { useState, useEffect } from "react";
import { 
  X, 
  MapPin, 
  Star, 
  Clock, 
  CreditCard, 
  Calendar,
  Briefcase,
  Timer,
  Building2
} from "lucide-react";
import MarkdownRenderer from "./markdown_renderer";
import { API_BASE_URL } from "../../config/api";
import { JobData } from "../../types/vagas/vaga";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface JobModalDesktopProps {
  jobData: JobData;
  open: boolean;
  onClose: () => void;
  isEditing?: boolean;
  onApplicationSuccess?: () => void;
}

export default function JobModalDesktop({ jobData, open, onClose, isEditing = false, onApplicationSuccess }: JobModalDesktopProps) {
  const [imageError, setImageError] = useState(false);
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const [isApplying, setIsApplying] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  // Fechar com ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (open) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  // Funções de candidatura
  const handleApplying = async () => {
    if (isApplying) {
      try {
        await inscreverEmVaga();
        setIsCompleted(true);
        // Chamar callback para atualizar dashboard após candidatura bem-sucedida
        console.log('Candidatura bem-sucedida, chamando callback:', !!onApplicationSuccess);
        if (onApplicationSuccess) {
          onApplicationSuccess();
        }
      } catch (error) {
        console.error('Erro ao se inscrever na vaga:', error);
        const errorMessage = (error as Error).message || '';
        if (errorMessage.includes('Você já se candidatou para esta vaga')) {
          setAlreadyApplied(true);
        } else {
          setHasError(true);
        }
      }
    } else {
      setIsApplying(true);
    }
  };

  const handleClose = () => {
    setIsApplying(false);
    setApplicationMessage('');
    setIsCompleted(false);
    setHasError(false);
    setAlreadyApplied(false);
    onClose();
  };

  const inscreverEmVaga = async () => {
    const requestData = {
      candidatoId: user?.id,
      vagaId: jobData.id,
      mensagem: applicationMessage || ''
    };

    const response = await fetch(`${API_BASE_URL}/api/candidaturas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Erro da API:', errorData);
      throw new Error(`Falha ao enviar candidatura: ${response.status} - ${errorData}`);
    }

    return response.json();
  };

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
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex-none bg-blue3 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full overflow-hidden border-3 border-blue1 shadow-lg flex-shrink-0">
              {!imageError ? (
                <img 
                  src={jobData.companyLogo || `${API_BASE_URL}/api/arquivos/empresa/${jobData.idEmpresa}/foto/view`}
                  alt={jobData.company}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-blue2 flex items-center justify-center">
                  <Building2 size={24} className="text-white" />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-blue1 font-medium mb-1 text-sm sm:text-base truncate">{jobData.company}</p>
              <h2 className="text-white font-bold text-lg sm:text-2xl leading-tight">{jobData.title}</h2>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {jobData.compatibility >= 0 && (
              <div className="bg-gradient-to-r from-white to-blue1 text-blue3 px-3 sm:px-6 py-2 sm:py-3 rounded-full font-bold shadow-xl border-2 border-blue1 transform hover:scale-105 transition-transform">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Star size={16} className="text-blue2 sm:w-5 sm:h-5" fill="currentColor" />
                  <span className="text-base sm:text-xl font-black">{jobData.compatibility}%</span>
                  <span className="text-xs sm:text-base font-semibold hidden sm:inline">MATCH</span>
                </div>
              </div>
            )}
            
            <button 
              onClick={onClose}
              className="p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors group shadow-lg"
            >
              <X size={20} className="text-white group-hover:text-blue1 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Conteúdo com scroll */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {isCompleted ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center space-y-4">
                <div className="text-6xl">✅</div>
                <h2 className="text-3xl font-bold text-green-600">Candidatura enviada!</h2>
                <p className="text-lg text-gray-700">Sua candidatura foi enviada com sucesso para <strong>{jobData.title}</strong> na empresa <strong>{jobData.company}</strong></p>
                <p className="text-sm text-gray-600">A empresa entrará em contato em breve.</p>
              </div>
            </div>
          ) : alreadyApplied ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center space-y-4">
                <div className="text-6xl">⚠️</div>
                <h2 className="text-3xl font-bold text-orange-500">Você já se candidatou!</h2>
                <p className="text-lg text-gray-700">Você já enviou uma candidatura para <strong>{jobData.title}</strong></p>
                <p className="text-sm text-gray-600">Aguarde o retorno da empresa ou verifique suas candidaturas no seu perfil.</p>
              </div>
            </div>
          ) : hasError ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center space-y-4">
                <div className="text-6xl">❌</div>
                <h2 className="text-3xl font-bold text-red-600">Erro ao enviar candidatura!</h2>
                <p className="text-lg text-gray-700">Não foi possível enviar sua candidatura para <strong>{jobData.title}</strong></p>
                <p className="text-sm text-gray-600">Tente novamente mais tarde ou entre em contato com o suporte.</p>
              </div>
            </div>
          ) : !isApplying ? (
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Compatibilidade */}
              {jobData.compatibility >= 0 && (
                <div className="bg-blue1 p-4 rounded-lg border border-blue2">
                  <div className="flex items-center justify-center gap-2">
                    <Star size={20} className="text-blue3" />
                    <span className="text-blue3 font-bold text-lg">{jobData.compatibility}% de compatibilidade</span>
                  </div>
                  <p className="text-blue3 text-center text-sm mt-1">
                    {jobData.compatibility === 0 
                      ? 'Complete seu perfil para melhor compatibilidade'
                      : 'Esta vaga é compatível com seu perfil'
                    }
                  </p>
                </div>
              )}

              {/* Grid de informações */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue1 rounded-full">
                      <MapPin size={18} className="text-blue3" />
                    </div>
                    <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Localização</span>
                  </div>
                  <p className="font-semibold text-gray-800">
                    {jobData.location || 'Não informado'}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue1 rounded-full">
                      <Clock size={18} className="text-blue3" />
                    </div>
                    <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Contrato</span>
                  </div>
                  <p className="font-semibold text-gray-800">{jobData.typeContract}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue1 rounded-full">
                      <CreditCard size={18} className="text-blue3" />
                    </div>
                    <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Salário</span>
                  </div>
                  <p className="font-semibold text-gray-800">{jobData.payment}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue1 rounded-full">
                      <Briefcase size={18} className="text-blue3" />
                    </div>
                    <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Nível</span>
                  </div>
                  <p className="font-semibold text-gray-800">{jobData.workLevel}</p>
                </div>
              </div>

              {/* Informações adicionais em linha */}
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-blue1 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={18} className="text-blue3" />
                    <span className="font-semibold text-blue3">Período</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="text-gray-600">Início: </span>
                      <span className="font-semibold">{formatDate(jobData.startDate)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Fim: </span>
                      <span className="font-semibold">{formatDate(jobData.endDate)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue1 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Timer size={18} className="text-blue3" />
                    <span className="font-semibold text-blue3">Trabalho</span>
                  </div>
                  <p className="font-semibold">{jobData.typeWork}</p>
                  <p className="text-sm text-gray-600">{jobData.timeShift}</p>
                </div>

                <div className="bg-blue1 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase size={18} className="text-blue3" />
                    <span className="font-semibold text-blue3">Setor</span>
                  </div>
                  <p className="font-semibold">{jobData.sector}</p>
                </div>
              </div>

              {/* Descrição completa */}
              <div className="bg-white border border-gray-200 p-6 rounded-xl">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-lg">
                  <Timer size={20} className="text-blue3" />
                  Descrição da Vaga
                </h3>
                <div className="prose prose-gray max-w-none">
                  <MarkdownRenderer 
                    content={jobData.description} 
                    className="text-gray-700 leading-relaxed"
                  />
                </div>
              </div>

              {/* Habilidades e Apoios lado a lado */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {jobData.skillsTags && jobData.skillsTags.length > 0 && (
                  <div className="bg-white border border-gray-200 p-6 rounded-xl">
                    <h3 className="font-bold text-gray-800 mb-4 text-lg">Habilidades Necessárias</h3>
                    <div className="flex flex-wrap gap-2">
                      {jobData.skillsTags.map((skill, index) => (
                        <span 
                          key={index}
                          className="px-4 py-2 bg-blue2 text-white rounded-lg font-medium shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {jobData.supportTags && jobData.supportTags.length > 0 && (
                  <div className="bg-white border border-gray-200 p-6 rounded-xl">
                    <h3 className="font-bold text-gray-800 mb-4 text-lg">Apoios Oferecidos</h3>
                    <div className="flex flex-wrap gap-2">
                      {jobData.supportTags.map((support, index) => (
                        <span 
                          key={index}
                          className="px-4 py-2 bg-blue1 text-blue3 rounded-lg font-medium border border-blue2"
                        >
                          {support}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-blue3">🎉 Que ótimo!</h2>
                  <p className="text-lg text-gray-700">Você está se candidatando para <strong>{jobData.title}</strong></p>
                </div>

                <div className="bg-white rounded-xl p-6 text-left space-y-4 border border-gray-200 shadow-sm">
                  <div className="space-y-2">
                    <label className="block text-xl font-medium text-gray-700">Mensagem para o recrutador (opcional)</label>
                    <p className="text-base text-gray-600">💡 Dica: Uma mensagem personalizada pode destacar sua candidatura! Conte brevemente por que você se interessa pela vaga ou mencione algo específico sobre a empresa.</p>
                  </div>
                  <textarea
                    className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue3 focus:border-transparent text-base"
                    rows={6}
                    placeholder="Ex: Olá! Tenho grande interesse nesta vaga pois..."
                    value={applicationMessage}
                    onChange={(e) => setApplicationMessage(e.target.value)}
                    maxLength={500}
                  />
                  <div className="text-right text-xs text-gray-500">{applicationMessage.length}/500 caracteres</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer com botões */}
        <div className="flex-none bg-gray-50 border-t border-gray-200 p-3 sm:p-4">
          <div className="w-full">
            {(() => {
              if (role === "CANDIDATO" && !isCompleted && !hasError && !alreadyApplied) {
                return (
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                    <button 
                      className="bg-gray-500 hover:bg-gray-600 text-white flex-1 text-base sm:text-lg rounded-lg py-3 transition-colors duration-200 font-medium" 
                      onClick={handleClose}
                    >
                      Fechar
                    </button>
                    <button 
                      className="bg-blue3 hover:bg-blue3H text-white flex-1 text-base sm:text-lg rounded-lg py-3 transition-colors duration-200 font-medium" 
                      onClick={handleApplying}
                    >
                      {isApplying ? 'Confirmar' : 'Inscrever-se'}
                    </button>
                  </div>
                );
              } else if (role === "EMPRESA" && user?.id === jobData.idEmpresa) {
                return (
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                    <button 
                      className="bg-gray-500 hover:bg-gray-600 text-white flex-1 text-base sm:text-lg rounded-lg py-3 transition-colors duration-200 font-medium" 
                      onClick={handleClose}
                    >
                      Fechar
                    </button>
                    <button 
                      className={`flex-1 text-base sm:text-lg rounded-lg py-3 transition-colors duration-200 font-medium ${
                        isEditing && (!jobData.id || jobData.id === 0)
                          ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                          : 'bg-blue3 hover:bg-blue3H text-white'
                      }`}
                      onClick={() => {
                        if (isEditing && (!jobData.id || jobData.id === 0)) {
                          return;
                        }
                        navigate(`/jobs/${jobData.id}/${isEditing ? "edit" : "view"}`);
                      }}
                      disabled={isEditing && (!jobData.id || jobData.id === 0)}
                    >
                      {isEditing ? "Editar" : "Visualizar"}
                    </button>
                  </div>
                );
              } else {
                return (
                  <button 
                    className="bg-blue3 hover:bg-blue3H text-white w-full text-base sm:text-lg rounded-lg py-3 transition-colors duration-200 font-medium" 
                    onClick={handleClose}
                  >
                    Fechar
                  </button>
                );
              }
            })()}
            {!isCompleted && !hasError && !alreadyApplied && (
              <p className="text-center text-gray-500 text-xs sm:text-sm mt-3">
                Pressione ESC para fechar
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}