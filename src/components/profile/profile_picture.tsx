// [TODO] - Tornar a pagina dinamica para cada usuario quando fazer uma context api

import { Link, useNavigate } from "react-router-dom";
import GenericBlueButton from "../buttons/generic_blue_button";
import { useAuth } from "../../hooks/useAuth";

interface ProfilePictureProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function ProfilePicture({ isOpen, onToggle }: ProfilePictureProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate('/');
  }

  return (
    <div className="relative">
      <div className="bg-white rounded-full w-max h-max">
        <img
          src="/img/profile-default.png" //Colocar como props depois para receber um caminho para a imagem de perfil
          alt="Foto de perfil"
          className={`w-16 h-16 rounded-full border-2 border-white cursor-pointer hover:opacity-80 transition-opacity`}
          onClick={onToggle}
        />
      </div>
      {isOpen && (
        <div className="absolute z-50 bg-white right-0 mt-2 w-72 shadow-lg p-4 rounded-lg border border-gray-300 text-black space-y-4">
          <div className="flex-1 flex flex-row">
            <div className="flex-[2] h-max">
              <img
                src="/img/profile-default.png" //Colocar como props depois para receber um caminho para a imagem de perfil
                alt="Foto de perfil"
                className={`w-full h-full rounded-full object-cover shadow-md`}
              />
            </div>
            <div className="flex-[6] px-3">
              <p className="font-semibold">Nome do Usuario</p>
              <p className="text-sm text-justify">Desc curta? ou coisa semelhante  Delectus ipsa dolorem consequatur culpa persp Aperiam cum facilis accusantium vitae labore.</p>
            </div>
          </div>
          <div className="flex w-full justify-center">
            <GenericBlueButton color={3}>Visitar minha pagina</GenericBlueButton>
          </div>
          <hr className="border-gray-300" />
          <div className="space-y-2 flex flex-col ">
            <Link to={"/"} className="text-gray-400 text-md flex justify-center">Configurações</Link> 
            <button type="button" className="text-gray-400 text-md flex justify-center" onClick={() => handleLogOut()}>Sair</button>
          </div>
        </div>
      )}
    </div>
  );
}