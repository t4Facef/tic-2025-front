import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getLastVisitedRoute } from '../../hooks/useRoutePersistence';

export const RouteRestorer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Só tentar restaurar se estiver na página inicial
    if (location.pathname !== '/') return;

    const lastRoute = getLastVisitedRoute();
    if (!lastRoute) return;

    // Verificar se é uma rota pública que pode ser restaurada
    const publicRoutes = ['/about', '/faq', '/usage', '/adaptation', '/jobs'];
    const isPublicRoute = publicRoutes.some(route => lastRoute.startsWith(route));

    if (isPublicRoute) {
      // Aguardar um pequeno delay para garantir que tudo foi carregado
      const timer = setTimeout(() => {
        navigate(lastRoute, { replace: true });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [navigate, location.pathname]);

  return null;
};

export default RouteRestorer;