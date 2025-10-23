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
      <div className="w-24 h-24 rounded-full overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
        <img
          src={role === 'CANDIDATO' 
            ? `${API_BASE_URL}/api/arquivos/candidato/${user?.id}/foto/view`
            : `${API_BASE_URL}/api/arquivo/empresa/${user?.id}/foto/view`
          }
          alt="Foto de perfil"
          className={`w-full h-full cursor-pointer hover:opacity-90 transition-opacity object-cover`}
          onClick={onToggle}
        />
      </div>
      {isOpen && (
        <div className="absolute z-50 bg-white right-0 mt-2 w-72 shadow-lg p-4 rounded-lg border border-gray-300 text-black space-y-4">
          <div className="flex-1 flex flex-row">
            <div className="flex-[2] h-max">
              <img
                src={role === 'CANDIDATO' 
                  ? `${API_BASE_URL}/api/arquivos/candidato/${user?.id}/foto/view` 
                  : `${API_BASE_URL}/api/arquivo/empresa/${user?.id}/foto/view`
                }
                alt="Foto de perfil"
                className={`w-full h-full rounded-full object-cover shadow-md`}
              />
            </div>
            <div className="flex-[6] px-3">
              <p className="font-semibold">{displayName}</p>
              <p className="text-sm text-justify">{user?.email}</p>
              <p className="text-xs text-gray-500 capitalize">{role === 'CANDIDATO' ? 'Candidato' : 'Empresa'}</p>
            </div>
          </div>
          <div className="flex flex-col items-center w-full gap-4 justify-center">
            <Link to={role === 'CANDIDATO' ? '/candidates/profile' : '/companies/profile'}>
              <GenericBlueButton color={3}>Visitar meu perfil</GenericBlueButton>
            </Link>
            <Link to={role === 'CANDIDATO' ? '/candidates/dashboard' : '/companies/dashboard'}>
              <GenericBlueButton color={4}>Visitar meu Dashboard</GenericBlueButton>
            </Link>
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