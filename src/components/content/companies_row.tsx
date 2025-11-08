import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Building2, Sparkles } from "lucide-react";
import CompanyImage from "./company_image";

type CompaniesRowProps = {
  companyIds: number[];
  basePath?: string;
  extensions?: string[];
};

export default function CompaniesRow({ companyIds }: CompaniesRowProps) {
  // Don't render if no companies
  if (!companyIds || companyIds.length === 0) {
    return null;
  }
  
  const [currentIndex, setCurrentIndex] = useState(companyIds.length);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Responsive visible count
  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 2; // mobile
      if (window.innerWidth < 1024) return 3; // tablet
      return companyIds.length > 0 ? Math.min(5, companyIds.length) : 5; // desktop
    }
    return 5;
  };
  
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  // Create infinite array
  const infiniteIds = [...companyIds, ...companyIds, ...companyIds];
  const totalItems = infiniteIds.length;

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      handleRight();
    }, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

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
      }, 500);
    } else if (currentIndex >= companyIds.length * 2) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(companyIds.length);
      }, 500);
    } else {
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [currentIndex, companyIds.length]);

  const itemWidth = `${100 / totalItems}%`;
  const containerWidth = `${(totalItems / visibleCount) * 100}%`;
  const translateX = `translateX(-${(currentIndex * 100) / totalItems}%)`;

  return (
    <section className="relative bg-gradient-to-r from-blue2 via-blue3 to-blue2 py-8 lg:py-12 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue1 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue1 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building2 size={32} className="text-white" />
            <h2 className="text-2xl lg:text-3xl font-bold text-white">
              Empresas que Confiam em Nós
            </h2>
            <Sparkles size={24} className="text-blue1 animate-pulse" />
          </div>
          <p className="text-blue1 text-sm lg:text-base max-w-2xl mx-auto">
            Organizações comprometidas com a diversidade e inclusão no ambiente de trabalho
          </p>
        </div>

        {/* Carousel */}
        <div className="flex items-center justify-between">
          {/* Left Arrow */}
          <button
            onClick={() => {
              handleLeft();
              setIsAutoPlaying(false);
            }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="group p-3 lg:p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110 active:scale-95 z-10"
          >
            <ChevronLeft size={24} className="lg:size-8 text-white group-hover:text-blue1 transition-colors" />
          </button>

          {/* Companies Container */}
          <div 
            className="overflow-hidden flex-1 mx-4 lg:mx-8"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div
              className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
              style={{
                width: containerWidth,
                transform: translateX
              }}
            >
              {infiniteIds.map((id, index) => (
                <div
                  key={`${id}-${index}`}
                  style={{ width: itemWidth }}
                  className="flex justify-center px-2 lg:px-4"
                >
                  <CompanyImage id={id} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => {
              handleRight();
              setIsAutoPlaying(false);
            }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="group p-3 lg:p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110 active:scale-95 z-10"
          >
            <ChevronRight size={24} className="lg:size-8 text-white group-hover:text-blue1 transition-colors" />
          </button>
        </div>


      </div>
    </section>
  );
}
