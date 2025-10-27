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
  const { user, role } = useAuth();
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

    console.log('Enviando candidatura:', requestData);

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

        <div className="bg-blue1 p-6 rounded-t-xl shadow-lg flex-1 overflow-auto space-y-6">
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
              <div className="flex justify-between items-center">
                <div className="flex-[7] text-center">
                  <div className="space-y-1">
                    <h2 className="font-bold text-4xl">{jobData.title}</h2>
                    <h3 className="font-normal text-md">{jobData.company}</h3>
                    <p className="text-xs">Período de Inscrição: {jobData.startDate.toLocaleDateString('pt-BR')} até {jobData.endDate.toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
                <div className="bg-white rounded-full flex justify-center items-center w-40 h-40 m-3 ml-9 border border-black overflow-hidden">
                  <ProfileLink id={jobData.idEmpresa} imgPath={`${API_BASE_URL}/api/arquivos/empresa/${jobData.idEmpresa}/foto/view`}></ProfileLink>
                </div>
              </div>

              <MarkdownRenderer
                content={jobData.description}
                className="text-gray-700 leading-relaxed text-justify"
              />

              <div className="space-y-2 mt-6">
                <p className="font-medium">Características da vaga</p>
                <div className="bg-blue4 rounded-lg p-2">
                  <div className="flex justify-between">
                    <span>Area: <strong>{jobData.sector}</strong></span>
                    <span>Status: <strong>{jobData.status}</strong></span>
                  </div>
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

              <div className="space-y-6 mt-6">
                <TagContainer tags={jobData.skillsTags}>Habilidades esperadas</TagContainer>
                <TagContainer tags={jobData.supportTags}>Apoio da empresa</TagContainer>
              </div>
            </div>) : (
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-blue3">🎉 Que ótimo!</h2>
                  <p className="text-lg text-gray-700">Você está se candidatando para <strong>{jobData.title}</strong></p>
                </div>

                <div className="bg-blue4 rounded-lg p-6 text-left space-y-4">
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
          <div className="bg-white border border-y-black flex justify-center">
            <span className="m-2">Você é {jobData.compatibility}% compatível com essa vaga</span>
          </div>
        )}

        {(() => {
          if (role === "CANDIDATO" && !isCompleted && !hasError && !alreadyApplied) {
            return (
              <div className="flex w-full">
                <button className="bg-blue3 text-white flex-1 border-black border-2 text-4xl rounded-bl-3xl py-2" onClick={handleClose}>Fechar</button>
                <button className="bg-blue3 text-white flex-1 border-black border-2 text-4xl rounded-br-3xl py-2" onClick={handleApplying}>{isApplying ? 'Confirmar' : 'Inscrever'}</button>
              </div>
            );
          } else if (role === "EMPRESA" && user?.id === jobData.idEmpresa) {
            return (
              <div className="flex w-full">
                <button className="bg-blue3 text-white flex-1 border-black border-2 text-4xl rounded-bl-3xl py-2" onClick={handleClose}>Fechar</button>
                <button className="bg-blue3 text-white flex-1 border-black border-2 text-4xl rounded-br-3xl py-2" onClick={handleClose}>Visualizar</button>
              </div>
            );
          } else {
            return (
              <div className="flex w-full">
                <button className="bg-blue3 text-white w-full border-black border-2 text-4xl rounded-b-3xl py-2" onClick={handleClose}>Fechar</button>
              </div>
            );
          }
        })()}
      </div>
    </div>,
    document.body
  );
}