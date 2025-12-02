import { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../config/api';
import { visitantesService } from '../services/visitantes.service';

let serverStatus: 'unknown' | 'available' | 'unavailable' = 'unknown';
let lastCheckTime = 0;
const CHECK_COOLDOWN = 30000; // 30 segundos

interface ColdStartState {
  isLoading: boolean;
  isColdStart: boolean;
  error: boolean;
  retryCount: number;
}

interface UseServerStatusOptions {
  enableColdStartScreen?: boolean;
  skipInitialCheck?: boolean;
}

export const useServerStatus = (options: UseServerStatusOptions = {}) => {
  const { enableColdStartScreen = false, skipInitialCheck = false } = options;
  
  const [state, setState] = useState<ColdStartState>({
    isLoading: enableColdStartScreen && !skipInitialCheck,
    isColdStart: false,
    error: false,
    retryCount: 0
  });

  const checkServerStatus = useCallback(async (attempt = 1, force = false): Promise<void> => {
    console.log(`🔄 Verificando servidor - Tentativa ${attempt}, Force: ${force}`);
    
    const now = Date.now();
    
    // Se já sabemos que o servidor está disponível e não é forçado, pular verificação
    if (serverStatus === 'available' && !force && (now - lastCheckTime) < CHECK_COOLDOWN) {
      setState({
        isLoading: false,
        isColdStart: false,
        error: false,
        retryCount: 0
      });
      return;
    }

    if (!enableColdStartScreen && !force) {
      return;
    }

    const maxRetries = 6;
    const baseDelay = 2000;

    try {
      if (enableColdStartScreen) {
        setState(prev => ({ 
          ...prev, 
          isLoading: true, 
          retryCount: attempt,
          isColdStart: attempt > 1,
          error: false // Sempre limpar erro ao tentar
        }));
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        console.log(`⏰ Timeout após 15s - Tentativa ${attempt}`);
        controller.abort();
      }, 15000);

      console.log(`📡 Fazendo requisição para ${API_BASE_URL}/api/auth/debug`);
      
      const response = await fetch(`${API_BASE_URL}/api/auth/debug`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        console.log('✅ Servidor disponível!');
        serverStatus = 'available';
        lastCheckTime = now;
        
        // Registrar visitante quando servidor fica disponível após cold start
        if (enableColdStartScreen && attempt > 1) {
          visitantesService.registrarVisitante({ 
            origem: `cold-start-success-attempt-${attempt}` 
          });
        }
        
        setState({
          isLoading: false,
          isColdStart: false,
          error: false,
          retryCount: 0
        });
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorName = error instanceof Error ? error.name : 'Error';
      
      console.log(`❌ Tentativa ${attempt} de ${maxRetries} falhou:`, errorMessage);
      
      if (attempt < maxRetries) {
        const isColdStartLikely = 
          errorName === 'AbortError' || 
          errorMessage.includes('fetch') ||
          errorMessage.includes('network') ||
          errorMessage.includes('signal is aborted') ||
          attempt >= 2;

        if (enableColdStartScreen) {
          setState(prev => ({ 
            ...prev, 
            isColdStart: isColdStartLikely,
            retryCount: attempt,
            error: false // Não marcar como erro ainda
          }));
        }

        // Backoff exponencial: 2s, 3s, 4.5s, 6.75s, 10s, 15s
        const delay = Math.min(baseDelay * Math.pow(1.5, attempt - 1), 15000);
        console.log(`⏳ Aguardando ${delay}ms antes da próxima tentativa`);
        
        setTimeout(() => {
          checkServerStatus(attempt + 1, force);
        }, delay);
      } else {
        console.log('🚫 Máximo de tentativas atingido');
        serverStatus = 'unavailable';
        setState({
          isLoading: false,
          isColdStart: false,
          error: enableColdStartScreen,
          retryCount: attempt
        });
      }
    }
  }, [enableColdStartScreen]);

  // Função de retry que força uma nova verificação
  const retry = useCallback(() => {
    console.log('🔄 Retry manual iniciado');
    serverStatus = 'unknown'; // Reset status
    checkServerStatus(1, true);
  }, [checkServerStatus]);

  useEffect(() => {
    if (!skipInitialCheck) {
      checkServerStatus();
    }
  }, [checkServerStatus, skipInitialCheck]);

  return {
    ...state,
    retry,
    checkStatus: () => checkServerStatus(1, true),
    serverStatus
  };
};