import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const EmergencyNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Só mostra se não estiver na home
  if (location.pathname === '/') {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 z-50 flex gap-2">
      <button
        onClick={() => navigate('/')}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
        aria-label="Ir para página inicial"
      >
        <Home size={20} />
      </button>
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-colors"
        aria-label="Voltar"
      >
        <ArrowLeft size={20} />
      </button>
    </div>
  );
};

export default EmergencyNavigation;