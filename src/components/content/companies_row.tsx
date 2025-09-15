import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

type CompaniesRowPropries = {
  companyIds: number[];
  basePath?: string;
  extensions?: string[];
};

function CompanyImage({
  id,
  basePath = "./img/logosTeste",
  extensions = ["jpeg", "jpg", "png", "webp"]
}: {
  id: number;
  basePath?: string;
  extensions?: string[];
}) {
  const navigate = useNavigate();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const currentExt = img.src.split('.').pop() || "";
    const currentIndex = extensions.indexOf(currentExt);
    
    if (currentIndex >= 0 && currentIndex < extensions.length - 1) {
      img.src = `${basePath}/teste${id}.${extensions[currentIndex + 1]}`;
    }
  };

  return (
    <button
      onClick={() => navigate(`/companies/${id}/profile`)}
      className="transition-transform duration-200 hover:scale-110 mx-1"
    >
      <img
        src={`${basePath}/teste${id}.${extensions[0]}`}
        alt={`Company ${id}`}
        onError={handleImageError}
        className="w-32 h-32 object-cover rounded-full"
      />
    </button>
  );
}

export default function CompaniesRow({
  companyIds,
  basePath,
  extensions
}: CompaniesRowPropries) {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(
    Math.max(1, companyIds.length - 2)
  );

  useEffect(() => {
    const updateVisibleCount = () => {
      const calculatedCount = Math.max(1, companyIds.length - 2);
      setVisibleCount(calculatedCount);
    };
    
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [companyIds.length]);

  const maxStartIndex = companyIds.length - visibleCount;

  const handleLeft = () => {
    setStartIndex(prev => (prev <= 0 ? maxStartIndex : prev - 1));
  };
  
  const handleRight = () => {
    setStartIndex(prev => (prev >= maxStartIndex ? 0 : prev + 1));
  };

  const trackWidth = `${(companyIds.length / visibleCount) * 100}%`;
  const itemWidth = `${100 / companyIds.length}%`;

  return (
    <div className="flex items-center justify-between w-full overflow-hidden bg-blue2 p-3 py-4">
      <button
        onClick={handleLeft}
        className="transition-all duration-300 hover:scale-110 hover:opacity-80"
      >
        <ChevronLeft size={60} />
      </button>

      <div className="overflow-hidden flex-1 mx-2">
        <div
          className="flex transition-transform duration-300"
          style={{
            width: trackWidth,
            transform: `translateX(-${(startIndex * 100) / companyIds.length}%)`
          }}
        >
          {companyIds.map(id => (
            <div
              key={id}
              style={{ width: itemWidth }}
              className="flex justify-center"
            >
              <CompanyImage 
                id={id} 
                basePath={basePath} 
                extensions={extensions} 
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleRight}
        className="transition-all duration-300 hover:scale-110 hover:opacity-80"
      >
        <ChevronRight size={60} />
      </button>
    </div>
  );
}
