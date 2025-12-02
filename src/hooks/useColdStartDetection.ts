import { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../config/api';

interface ColdStartState {
  isLoading: boolean;
  isColdStart: boolean;
  error: boolean;
  retryCount: number;
}

interface UseColdStartOptions {
  enabled?: boolean;
}

export const useColdStartDetection = (options: UseColdStartOptions = {}) => {
  const { enabled = true } = options;
  
  const [state, setState] = useState<ColdStartState>({
    isLoading: enabled,
    isColdStart: false,
    error: false,
    retryCount: 0
  });

  const checkServerStatus = useCallback(async (attempt = 1): Promise<void> => {
    if (!enabled) {
      setState({
        isLoading: false,
        isColdStart: false,
        error: false,
        retryCount: 0
      });
      return;
    }

    const maxRetries = 6;
    const baseDelay = 3000; // 3 segundos base

    try {
      setState(prev => ({ 
        ...prev, 
        isLoading: true, 
        retryCount: attempt,
        isColdStart: attempt > 1 // Se é uma retry, provavelmente é cold start
      }));

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout para dar tempo do servidor inicializar

      const response = await fetch(`${API_BASE_URL}/api/auth/debug`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
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
      
      console.log(`Tentativa ${attempt} de ${maxRetries} falhou:`, errorMessage);
      
      if (attempt < maxRetries) {
        // Determina se é provável que seja cold start baseado no tipo de erro e tentativa
        const isColdStartLikely = 
          errorName === 'AbortError' || 
          errorMessage.includes('fetch') ||
          errorMessage.includes('network') ||
          errorMessage.includes('signal is aborted') ||
          attempt >= 2;

        setState(prev => ({ 
          ...prev, 
          isColdStart: isColdStartLikely,
          retryCount: attempt 
        }));

        // Backoff exponencial: 3s, 4.5s, 6.75s, 10s, 15s, 20s
        const delay = Math.min(baseDelay * Math.pow(1.5, attempt - 1), 20000);
        setTimeout(() => {
          checkServerStatus(attempt + 1);
        }, delay);
      } else {
        setState({
          isLoading: false,
          isColdStart: false,
          error: true,
          retryCount: attempt
        });
      }
    }
  }, [enabled]);

  useEffect(() => {
    checkServerStatus();
  }, [checkServerStatus]);

  return {
    ...state,
    retry: () => checkServerStatus(1)
  };
};