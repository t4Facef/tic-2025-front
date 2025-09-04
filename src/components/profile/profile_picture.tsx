export default function ProfilePicture() {
  return (
    <div className="flex items-center pr-6">
      
      <img 
        src="/img/profile-default.png" //Colocar como props depois para receber um caminho para a imagem de perfil
        alt="Foto de perfil" 
        className={`w-16 h-16 rounded-full border-2 border-white cursor-pointer hover:opacity-80 transition-opacity bg-white`}
      />
    </div>
  );
}