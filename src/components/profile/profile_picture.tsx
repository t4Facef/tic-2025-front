interface ProfilePictureProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function ProfilePicture({ isOpen, onToggle }: ProfilePictureProps) {
  return (
    <div className="relative">
      <div className="bg-white rounded-full w-max h-max">
        <img
          src="/img/profile-default.png" //Colocar como props depois para receber um caminho para a imagem de perfil
          alt="Foto de perfil"
          className={`w-16 h-16 rounded-full border-2 border-white cursor-pointer hover:opacity-80 transition-opacity bg-white`}
          onClick={onToggle}
        />
      </div>
      {isOpen && (
        <div className="absolute z-50 bg-white right-0 mt-2 w-60 shadow-lg p-4 rounded-lg border border-gray-300">
          teste
        </div>
      )}
    </div>
  );
}