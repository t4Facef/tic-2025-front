import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GenericBlueButton from "../buttons/generic_blue_button";
import { useAuth } from "../../hooks/useAuth";
import { API_BASE_URL } from "../../config/api";

interface ProfilePictureProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function ProfilePicture({ isOpen, onToggle }: ProfilePictureProps) {
  const { logout, user, role, token } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState<string>('');
  


  useEffect(() => {
    if (role === 'EMPRESA' && user?.id) {
      fetch(`${API_BASE_URL}/api/empresas/${user.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => setDisplayName(data.razaoSocial || user.nome || 'Empresa'))
      .catch(() => setDisplayName(user.nome || 'Empresa'))
    } else {
      setDisplayName(user?.nome || 'Usuário')
    }
  }, [role, user, token])

  const handleLogOut = () => {
    logout();
    navigate('/');
  }

  return (
    <div className="relative">
      <button 
        onClick={onToggle}
        className="w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden ring-2 ring-white/30 hover:ring-white/50 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-white/70"
      >
        <img
          src={role === 'CANDIDATO' 
            ? `${API_BASE_URL}/api/arquivos/candidato/${user?.id}/foto/view`
            : role === 'EMPRESA'
            ? `${API_BASE_URL}/api/arquivos/empresa/${user?.id}/foto/view`
            : '/img/profile-default.jpg'
          }
          alt="Foto de perfil"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '/img/profile-default.jpg'
          }}
        />
      </button>
      {isOpen && (
        <div className="absolute z-50 bg-white right-0 md:right-0 mt-3 w-72 max-w-[calc(100vw-2rem)] md:w-72 shadow-xl p-4 rounded-xl border border-gray-200 text-black space-y-4 animate-in slide-in-from-top-2 duration-200 transform md:transform-none -translate-x-1/2 md:translate-x-0 left-1/2 md:left-auto">
          <div className="flex-1 flex flex-row">
            <div className="flex-[2] h-max">
              <img
                src={role === 'CANDIDATO' 
                  ? `${API_BASE_URL}/api/arquivos/candidato/${user?.id}/foto/view` 
                  : role === 'EMPRESA'
                  ? `${API_BASE_URL}/api/arquivos/empresa/${user?.id}/foto/view`
                  : '/img/profile-default.jpg'
                }
                alt="Foto de perfil"
                className={`w-full h-full rounded-full object-cover shadow-md`}
                onError={(e) => {
                  e.currentTarget.src = '/img/profile-default.jpg'
                }}
              />
            </div>
            <div className="flex-[6] px-3">
              <p className="font-semibold text-sm md:text-base break-words">{displayName}</p>
              <p className="text-xs md:text-sm break-all">{user?.email}</p>
              <p className="text-xs text-gray-500 capitalize">
                {role === 'CANDIDATO' ? 'Candidato' : role === 'EMPRESA' ? 'Empresa' : 'Administrador'}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center w-full gap-3 justify-center">
            {role === 'ADMIN' ? (
              <Link to="/admin/dashboard" className="w-full">
                <GenericBlueButton color={3} size="mdxMax">Painel Administrativo</GenericBlueButton>
              </Link>
            ) : (
              <>
                <Link to={role === 'CANDIDATO' ? '/candidates/profile' : '/companies/profile'} className="w-full">
                  <GenericBlueButton color={3} size="mdxMax">Visitar meu perfil</GenericBlueButton>
                </Link>
                <Link to={role === 'CANDIDATO' ? '/candidates/dashboard' : '/companies/dashboard'} className="w-full">
                  <GenericBlueButton color={4} size="mdxMax">Visitar meu Dashboard</GenericBlueButton>
                </Link>
              </>
            )}
          </div>
          <hr className="border-gray-300" />
          <div className="space-y-2 flex flex-col ">
            <button type="button" className="text-gray-400 text-md flex justify-center" onClick={() => handleLogOut()}>Sair</button>
          </div>
        </div>
      )}
    </div>
  );
}