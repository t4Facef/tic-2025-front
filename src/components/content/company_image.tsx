import { useState } from "react";
import { Building2, ExternalLink } from "lucide-react";
import { API_BASE_URL } from "../../config/api";
import { useNavigate } from "react-router-dom";

type CompanyImageProps = {
  id: number;
};

export default function CompanyImage({ id }: CompanyImageProps) {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="group relative p-0 sm:p-1 lg:p-2">
      <button
        onClick={() => navigate(`/companies/${id}/profile`)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative block transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/30 rounded-full"
      >
        {/* Main container */}
        <div className="relative w-14 h-14 sm:w-20 sm:h-20 lg:w-32 lg:h-32">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue1 to-white rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
          
          {/* Image container */}
          <div className="relative w-full h-full rounded-full overflow-hidden bg-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
            {!imageError ? (
              <img
                src={`${API_BASE_URL}/api/arquivos/empresa/${id}/foto/view`}
                alt={`Empresa ${id}`}
                onError={handleImageError}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue3 to-blue2 flex items-center justify-center">
                <Building2 size={18} className="sm:size-6 lg:size-12 text-white" />
              </div>
            )}
          </div>

          {/* Hover overlay */}
          <div className={`absolute inset-0 bg-blue3/20 rounded-full flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <ExternalLink size={14} className="sm:size-4 lg:size-6 text-white drop-shadow-lg" />
          </div>

          {/* Decorative ring */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue1 via-white to-blue1 opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
        </div>

        {/* Tooltip */}
        <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/80 text-white text-xs rounded-lg whitespace-nowrap transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          Ver perfil da empresa
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45"></div>
        </div>
      </button>
    </div>
  );
}