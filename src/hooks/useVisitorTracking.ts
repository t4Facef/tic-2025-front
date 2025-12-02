import { useEffect, useRef } from 'react';
import { visitantesService } from '../services/visitantes.service';

interface UseVisitorTrackingOptions {
  origem?: string;
  enabled?: boolean;
}

export const useVisitorTracking = (options: UseVisitorTrackingOptions = {}) => {
  const { origem = 'page-load', enabled = true } = options;
  const hasTracked = useRef(false);

  useEffect(() => {
    if (enabled && !hasTracked.current) {
      hasTracked.current = true;
      
      // Pequeno delay para não interferir com o carregamento da página
      setTimeout(() => {
        visitantesService.registrarVisitante({ origem });
      }, 1000);
    }
  }, [origem, enabled]);

  const trackCustomEvent = (customOrigem: string) => {
    visitantesService.registrarVisitante({ origem: customOrigem });
  };

  return { trackCustomEvent };
};