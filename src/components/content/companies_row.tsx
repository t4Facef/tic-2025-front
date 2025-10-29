import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CompanyImage from "./company_image";

type CompaniesRowProps = {
  companyIds: number[];
  basePath?: string;
  extensions?: string[];
};

export default function CompaniesRow({ companyIds, basePath, extensions }: CompaniesRowProps) {
  const [currentIndex, setCurrentIndex] = useState(companyIds.length);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const visibleCount = Math.min(5, companyIds.length);

  // Create infinite array: [...original, ...original, ...original]
  const infiniteIds = [...companyIds, ...companyIds, ...companyIds];
  const totalItems = infiniteIds.length;

  const handleLeft = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
  };

  const handleRight = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  };

  // Reset position when reaching boundaries
  useEffect(() => {
    if (currentIndex <= 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(companyIds.length);
      }, 300);
    } else if (currentIndex >= companyIds.length * 2) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(companyIds.length);
      }, 300);
    } else {
      setTimeout(() => setIsTransitioning(false), 300);
    }
  }, [currentIndex, companyIds.length]);

  const itemWidth = `${100 / totalItems}%`;
  const containerWidth = `${(totalItems / visibleCount) * 100}%`;
  const translateX = `translateX(-${(currentIndex * 100) / totalItems}%)`;

  return (
    <div className="flex items-center justify-between w-full overflow-hidden bg-blue2 p-3 py-4">
      <button
        onClick={handleLeft}
        className="transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft size={120} color="white" className="brightness-90"/>
      </button>

      <div className="overflow-hidden flex-1 mx-2 py-4">
        <div
          className={`flex ${isTransitioning ? 'transition-transform duration-300' : ''}`}
          style={{
            width: containerWidth,
            transform: translateX
          }}
        >
          {infiniteIds.map((id, index) => (
            <div
              key={`${id}-${index}`}
              style={{ width: itemWidth }}
              className="flex justify-center px-2"
            >
              <CompanyImage id={id} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleRight}
        className="transition-all duration-300 hover:scale-110"
      >
        <ChevronRight size={120} color="white" className="brightness-90"/>
      </button>
    </div>
  );
}
