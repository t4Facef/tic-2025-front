import { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../config/api';

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
    const baseDelay = 3000;

    try {
      if (enableColdStartScreen) {
        setState(prev => ({ 
          ...prev, 
          isLoading: true, 
          retryCount: attempt,
          isColdStart: attempt > 1
        }));
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s por tentativa (máximo 36s total)

      const response = await fetch(`${API_BASE_URL}/api/auth/debug`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        serverStatus = 'available';
        lastCheckTime = now;
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
        const isColdStartLikely = 
          errorName === 'AbortError' || 
          errorMessage.includes('fetch') ||
          errorMessage.includes('network') ||
          attempt >= 2;

        if (enableColdStartScreen) {
          setState(prev => ({ 
            ...prev, 
            isColdStart: isColdStartLikely,
            retryCount: attempt 
          }));
        }

        const delay = baseDelay + (attempt * 1000);
        setTimeout(() => {
          checkServerStatus(attempt + 1, force);
        }, delay);
      } else {
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

  useEffect(() => {
    if (!skipInitialCheck) {
      checkServerStatus();
    }
  }, [checkServerStatus, skipInitialCheck]);

  return {
    ...state,
    retry: () => checkServerStatus(1, true),
    checkStatus: () => checkServerStatus(1, true),
    serverStatus
  };
};