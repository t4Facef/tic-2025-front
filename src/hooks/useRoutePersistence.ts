import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Rotas que devem ser persistidas (páginas que faz sentido voltar)
const PERSISTABLE_ROUTES = [
  '/candidates/dashboard',
  '/candidates/profile',
  '/companies/dashboard', 
  '/companies/profile',
  '/jobs',
  '/notifications',
  '/admin/dashboard',
  '/about',
  '/faq',
  '/usage',
  '/adaptation'
];

// Rotas que NÃO devem ser persistidas (auth, registro, etc)
const NON_PERSISTABLE_ROUTES = [
  '/auth/',
  '/reset-password',
  '/register'
];

export const useRoutePersistence = () => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    
    // Não persistir rotas de auth/registro
    const shouldNotPersist = NON_PERSISTABLE_ROUTES.some(route => 
      currentPath.includes(route)
    );
    
    if (shouldNotPersist) {
      return;
    }

    // Persistir rotas específicas ou rotas com parâmetros dinâmicos
    const shouldPersist = PERSISTABLE_ROUTES.includes(currentPath) || 
                         PERSISTABLE_ROUTES.some(route => currentPath.startsWith(route));

    if (shouldPersist) {
      localStorage.setItem('lastVisitedRoute', currentPath + location.search);
    }
  }, [location]);
};

export const getLastVisitedRoute = (): string | null => {
  return localStorage.getItem('lastVisitedRoute');
};

export const clearLastVisitedRoute = () => {
  localStorage.removeItem('lastVisitedRoute');
};