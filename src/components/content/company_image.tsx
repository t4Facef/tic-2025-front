import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/api";

type CompanyImageProps = {
  id: number;
};

export default function CompanyImage({ id }: CompanyImageProps) {
  const navigate = useNavigate();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    img.style.display = 'none';
    // Fallback: mostrar inicial da empresa ou ícone padrão
    const parent = img.parentElement;
    if (parent) {
      parent.innerHTML = `<div class="w-32 h-32 bg-blue3 rounded-full flex items-center justify-center text-white text-2xl font-bold">E</div>`;
    }
  };

  return (
    <button
      onClick={() => navigate(`/companies/${id}/profile`)}
      className="transition-transform duration-200 hover:scale-110 hover:z-10 mx-1 relative"
    >
      <img
        src={`${API_BASE_URL}/api/arquivos/empresa/${id}/foto/view`}
        alt={`Company ${id}`}
        onError={handleImageError}
        className="w-32 h-32 object-cover rounded-full shadow-lg"
      />
    </button>
  );
}