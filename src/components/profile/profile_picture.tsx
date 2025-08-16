type profilePictureProps = {
  radius: string;
}

export default function ProfilePicture({radius}: profilePictureProps) {
  return (
    <div className="flex items-center pr-6">
      <img 
        src="/img/profile-default.svg" //Colocar como props depois para receber um caminho para a imagem de perfil
        alt="Foto de perfil" 
        className={`w-${radius} h-${radius} rounded-full border-2 border-white cursor-pointer hover:opacity-80 transition-opacity bg-white`}
      />
    </div>
  );
}