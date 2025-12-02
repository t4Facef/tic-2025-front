import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getLastVisitedRoute, clearLastVisitedRoute } from '../../hooks/useRoutePersistence';

export const RouteRestorer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // Só tentar restaurar na primeira carga da aplicação
    if (!isInitialLoad.current) return;
    if (location.pathname !== '/') {
      isInitialLoad.current = false;
      return;
    }

    const lastRoute = getLastVisitedRoute();
    if (!lastRoute) {
      isInitialLoad.current = false;
      return;
    }

    // Verificar se é uma rota pública que pode ser restaurada
    const publicRoutes = ['/about', '/faq', '/usage', '/adaptation', '/jobs'];
    const isPublicRoute = publicRoutes.some(route => lastRoute.startsWith(route));

    if (isPublicRoute) {
      // Aguardar um pequeno delay para garantir que tudo foi carregado
      const timer = setTimeout(() => {
        navigate(lastRoute, { replace: true });
        isInitialLoad.current = false;
      }, 100);

      return () => clearTimeout(timer);
    } else {
      isInitialLoad.current = false;
    }
  }, [navigate, location.pathname]);

  // Em navegações subsequentes para home, limpar a rota salva
  useEffect(() => {
    if (!isInitialLoad.current && location.pathname === '/') {
      clearLastVisitedRoute();
    }
  }, [location.pathname]);

  return null;
};

export default RouteRestorer;