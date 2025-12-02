import { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../config/api';

interface ColdStartState {
  isLoading: boolean;
  isColdStart: boolean;
  error: boolean;
  retryCount: number;
}

export const useColdStartDetection = () => {
  const [state, setState] = useState<ColdStartState>({
    isLoading: true,
    isColdStart: false,
    error: false,
    retryCount: 0
  });

  const checkServerStatus = useCallback(async (attempt = 1): Promise<void> => {
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
      const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout para dar tempo do servidor inicializar

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
          attempt >= 2;

        setState(prev => ({ 
          ...prev, 
          isColdStart: isColdStartLikely,
          retryCount: attempt 
        }));

        // Delay progressivo: 3s, 4s, 5s, 6s, 7s, 8s
        const delay = baseDelay + (attempt * 1000);
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
  }, []);

  useEffect(() => {
    checkServerStatus();
  }, [checkServerStatus]);

  return {
    ...state,
    retry: () => checkServerStatus(1)
  };
};