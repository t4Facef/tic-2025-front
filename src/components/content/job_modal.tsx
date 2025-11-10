// [TODO] - Fazer com que os campos só apareçam na visualização se existir o dado no banco (pra evitar ficar espaço vazio)
// [TODO] - Adicionar uma view diferente caso seja um usuario não logado, logado e dono da vaga

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import TagContainer from "./tag_container";
import ProfileLink from "../profile/profile_link";
import MarkdownRenderer from "./markdown_renderer";
import { useAuth } from "../../hooks/useAuth";
import { API_BASE_URL } from "../../config/api";
import { JobData } from "../../types/vagas/vaga";
import { useNavigate } from "react-router-dom";


interface JobModalProps {
  open: boolean;
  onClose: () => void;
  jobData: JobData;
  isEditing: boolean
}

export default function JobModal({
  open,
  onClose,
  jobData,
  isEditing
}: JobModalProps) {
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const [isApplying, setIsApplying] = useState(false)
  const [applicationMessage, setApplicationMessage] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [alreadyApplied, setAlreadyApplied] = useState(false)

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

  const handleApplying = async () => {
    if (isApplying) {
      try {
        await inscreverEmVaga()
        setIsCompleted(true)
      } catch (error) {
        console.error('Erro ao se inscrever na vaga:', error)
        const errorMessage = (error as Error).message || ''
        if (errorMessage.includes('Você já se candidatou para esta vaga')) {
          setAlreadyApplied(true)
        } else {
          setHasError(true)
        }
      }
    } else {
      setIsApplying(true)
    }
  }

  const handleClose = () => {
    setIsApplying(false)
    setApplicationMessage('')
    setIsCompleted(false)
    setHasError(false)
    setAlreadyApplied(false)
    onClose()
  }


  const inscreverEmVaga = async () => {
    const requestData = {
      candidatoId: user?.id,
      vagaId: jobData.id,
      mensagem: applicationMessage || ''
    };



    const response = await fetch('http://localhost:3001/api/candidaturas', {
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

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4" style={{ zIndex: 9999 }} onClick={handleClose}>
      <div className="w-full max-w-4xl max-h-[95vh] flex flex-col" onClick={(e) => e.stopPropagation()}>

        <div className="bg-blue1 p-6 rounded-t-xl shadow-lg flex-1 overflow-auto space-y-6 border border-blue2">
          {isCompleted ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="text-6xl">✅</div>
                <h2 className="text-3xl font-bold text-green-600">Candidatura enviada!</h2>
                <p className="text-lg text-gray-700">Sua candidatura foi enviada com sucesso para <strong>{jobData.title}</strong> na empresa <strong>{jobData.company}</strong></p>
                <p className="text-sm text-gray-600">A empresa entrará em contato em breve.</p>
              </div>
            </div>
          ) : alreadyApplied ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="text-6xl">⚠️</div>
                <h2 className="text-3xl font-bold text-orange1">Você já se candidatou!</h2>
                <p className="text-lg text-gray-700">Você já enviou uma candidatura para <strong>{jobData.title}</strong></p>
                <p className="text-sm text-gray-600">Aguarde o retorno da empresa ou verifique suas candidaturas no seu perfil.</p>
              </div>
            </div>
          ) : hasError ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="text-6xl">❌</div>
                <h2 className="text-3xl font-bold text-red-600">Erro ao enviar candidatura!</h2>
                <p className="text-lg text-gray-700">Não foi possível enviar sua candidatura para <strong>{jobData.title}</strong></p>
                <p className="text-sm text-gray-600">Tente novamente mais tarde ou entre em contato com o suporte.</p>
              </div>
            </div>
          ) : !isApplying ?
            (<div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex-[7] text-center">
                  <div className="space-y-2">
                    <h2 className="font-bold text-3xl text-blue3">{jobData.title}</h2>
                    <h3 className="font-medium text-lg text-blue2">{jobData.company}</h3>
                    <p className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full inline-block border border-blue2">Período de Inscrição: {jobData.startDate.toLocaleDateString('pt-BR')} até {jobData.endDate.toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
                <div className="bg-white rounded-full flex justify-center items-center w-40 h-40 m-3 ml-9 border-2 border-blue3 overflow-hidden shadow-lg">
                  <ProfileLink id={jobData.idEmpresa} imgPath={`${API_BASE_URL}/api/arquivos/empresa/${jobData.idEmpresa}/foto/view`}></ProfileLink>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-blue3 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-blue3 rounded-full"></div>
                  Descrição da Vaga
                </h3>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-blue2">
                  <MarkdownRenderer
                    content={jobData.description}
                    className="text-gray-700 leading-relaxed text-justify"
                  />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-blue3 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-blue3 rounded-full"></div>
                  Características da Vaga
                </h3>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-blue2">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue3 rounded-full"></div>
                      <span className="text-gray-600">Área:</span> <strong className="text-blue3">{jobData.sector}</strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue3 rounded-full"></div>
                      <span className="text-gray-600">Status:</span> <strong className="text-blue3">{jobData.status}</strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue3 rounded-full"></div>
                      <span className="text-gray-600">Modalidade:</span> <strong className="text-blue3">{jobData.typeWork}</strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue3 rounded-full"></div>
                      <span className="text-gray-600">Localização:</span> <strong className="text-blue3">{jobData.location}</strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue3 rounded-full"></div>
                      <span className="text-gray-600">Nível:</span> <strong className="text-blue3">{jobData.workLevel}</strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue3 rounded-full"></div>
                      <span className="text-gray-600">Horário:</span> <strong className="text-blue3">{jobData.timeShift}</strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue3 rounded-full"></div>
                      <span className="text-gray-600">Pagamento:</span> <strong className="text-blue3">{jobData.payment}</strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue3 rounded-full"></div>
                      <span className="text-gray-600">Contrato:</span> <strong className="text-blue3">{jobData.typeContract}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue3 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-blue3 rounded-full"></div>
                  Requisitos e Benefícios
                </h3>
                <div className="space-y-4">
                  <TagContainer tags={jobData.skillsTags}>Habilidades esperadas</TagContainer>
                  <TagContainer tags={jobData.supportTags}>Apoio da empresa</TagContainer>
                </div>
              </div>
            </div>) : (
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-blue3">🎉 Que ótimo!</h2>
                  <p className="text-lg text-gray-700">Você está se candidatando para <strong>{jobData.title}</strong></p>
                </div>

                <div className="bg-white rounded-xl p-6 text-left space-y-4 border border-blue2 shadow-sm">
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
            )
          }

        </div>
        {role === "CANDIDATO" && (
          <div className="bg-gradient-to-r from-blue3 to-blue2 text-white flex justify-center items-center py-3 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <span className="font-medium">Você é {jobData.compatibility}% compatível com essa vaga</span>
            </div>
          </div>
        )}

        {(() => {
          if (role === "CANDIDATO" && !isCompleted && !hasError && !alreadyApplied) {
            return (
              <div className="flex w-full">
                <button className="bg-blue3 hover:bg-blue3H text-white flex-1 text-3xl rounded-bl-3xl py-3 transition-colors duration-200 font-semibold" onClick={handleClose}>Fechar</button>
                <button className="bg-blue2 hover:bg-blue3 text-white flex-1 border-blue2 border-2 text-3xl rounded-br-3xl py-3 transition-colors duration-200 font-semibold" onClick={handleApplying}>{isApplying ? 'Confirmar' : 'Inscrever'}</button>
              </div>
            );
          } else if (role === "EMPRESA" && user?.id === jobData.idEmpresa) {
            return (
              <div className="flex w-full">
                <button className="bg-blue3 hover:bg-blue3H text-white flex-1 text-3xl rounded-bl-3xl py-3 transition-colors duration-200 font-semibold" onClick={handleClose}>Fechar</button>
                <button 
                  className={`flex-1 border-blue2 border-2 text-3xl rounded-br-3xl py-3 transition-colors duration-200 font-semibold ${
                    isEditing && (!jobData.id || jobData.id === 0)
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                      : 'bg-blue2 hover:bg-blue3 text-white'
                  }`}
                  onClick={() => {
                    if (isEditing && (!jobData.id || jobData.id === 0)) {
                      alert('Esta vaga ainda não foi criada. Salve a vaga primeiro para visualizá-la.');
                      return;
                    }
                    navigate(`/jobs/${jobData.id}/${isEditing ? "edit" : "view"}`);
                  }}
                  disabled={isEditing && (!jobData.id || jobData.id === 0)}
                >
                  {isEditing ? "Editar" : "Vizualizar"}
                </button>
              </div>
            );
          } else {
            return (
              <div className="flex w-full">
                <button className="bg-blue3 hover:bg-blue3H text-white w-full text-3xl rounded-b-3xl py-3 transition-colors duration-200 font-semibold" onClick={handleClose}>Fechar</button>
              </div>
            );
          }
        })()}
      </div>
    </div>,
    document.body
  );
}