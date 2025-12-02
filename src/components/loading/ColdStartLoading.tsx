import React from 'react';

interface ColdStartLoadingProps {
  retryCount: number;
  onRetry: () => void;
  hasError?: boolean;
}

const ColdStartLoading: React.FC<ColdStartLoadingProps> = ({ 
  retryCount, 
  onRetry, 
  hasError = false 
}) => {
  const isFirstAttempt = retryCount === 0;
  const isColdStart = retryCount > 1;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue1 to-blue4 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          {/* Logo ou ícone */}
          <div className={`mx-auto w-20 h-20 ${hasError ? 'bg-red1/20' : 'bg-blue1'} rounded-full flex items-center justify-center mb-6`}>
            {hasError ? (
              <svg className="w-10 h-10 text-red2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-10 h-10 text-blue2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            )}
          </div>
          
          {/* Spinner animado - só mostra se não tem erro */}
          {!hasError && (
            <div className="mx-auto w-8 h-8 mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue2"></div>
            </div>
          )}
          
          <h2 className="text-2xl font-bold text-blue3 mb-2">
            {hasError ? 'Ops! Algo deu errado' : 'Preparando o TIC 2025'}
          </h2>
          
          {hasError ? (
            <div className="space-y-4">
              <p className="text-gray-600">
                Não foi possível conectar com o servidor. Verifique sua conexão e tente novamente.
              </p>
              <button
                onClick={() => {
                  console.log('Retry button clicked');
                  onRetry();
                }}
                className="bg-blue2 hover:bg-blue3 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Tentar Novamente
              </button>
            </div>
          ) : isFirstAttempt ? (
            <p className="text-gray-600">
              Verificando status do servidor...
            </p>
          ) : (
            <div className="space-y-3">
              <p className="text-blue3 font-medium">
                ⏳ Aguarde um momento...
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {isColdStart 
                  ? 'Nosso servidor está inicializando após período inativo. Isso pode levar até 1 minuto.'
                  : 'Conectando ao servidor...'
                }
              </p>
              <div className="bg-blue1/50 p-3 rounded-lg">
                <p className="text-xs text-blue3">
                  Tentativa {retryCount} de 6 • {isColdStart ? 'Aguardando servidor acordar...' : 'Conectando...'}
                </p>
                {isColdStart && (
                  <div className="mt-2 text-xs text-blue2">
                    Tempo estimado: {Math.max(60 - (retryCount * 8), 10)}s restantes
                  </div>
                )}
              </div>
              {retryCount > 2 && (
                <button
                  onClick={() => {
                    console.log('Retry button clicked (force)');
                    onRetry();
                  }}
                  className="mt-4 bg-blue2 hover:bg-blue3 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                >
                  Tentar Agora
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* Barra de progresso animada - só mostra se não tem erro */}
        {!hasError && (
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue2 to-blue3 h-2 rounded-full animate-pulse"
              style={{
                width: `${Math.min(15 + (retryCount * 13), 85)}%`,
                transition: 'width 1s ease-in-out'
              }}
            ></div>
          </div>
        )}
        
        <div className="mt-6 text-xs text-blue3/70">
          Plataforma de Inclusão • TIC 2025
        </div>
      </div>
    </div>
  );
};

export default ColdStartLoading;