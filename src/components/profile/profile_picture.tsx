export default function ProfilePicture() {
  return (
    <div className="flex items-center pr-6">
      <img 
        src="/img/default-profile.jpg" 
        alt="Foto de perfil" 
        className="w-10 h-10 rounded-full border-2 border-white cursor-pointer hover:opacity-80 transition-opacity"
      />
    </div>
  );
}