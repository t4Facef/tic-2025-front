import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Building2, Sparkles } from "lucide-react";
import CompanyImage from "./company_image";

type CompaniesRowProps = {
  companyIds: number[];
  basePath?: string;
  extensions?: string[];
};

export default function CompaniesRow({ companyIds }: CompaniesRowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Touch/Swipe states
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  // Responsive visible count
  const getVisibleCount = useCallback(() => {
    if (typeof window !== 'undefined') {
      const w = window.innerWidth;
      // For narrow widths (mobile/tablet and similar like 820px) show 4
      if (w < 900) return Math.min(4, companyIds.length);
      // Desktop: show up to 5 companies per view
      return companyIds && companyIds.length > 0 ? Math.min(5, companyIds.length) : 5;
    }
    return 5;
  }, [companyIds]);
  
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  // Handler functions
  const handleLeft = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
  }, [isTransitioning]);

  const handleRight = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  }, [isTransitioning]);

  // Touch/Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleRight();
    } else if (isRightSwipe) {
      handleLeft();
    }
    
    // Reset auto-play after swipe
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newCount = getVisibleCount();
      setVisibleCount(newCount);
    };
    
    // Set initial value
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getVisibleCount]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      handleRight();
    }, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex, handleRight]);

  // Reset position when reaching boundaries
  useEffect(() => {
    if (!companyIds || companyIds.length === 0) return;
    
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
  }, [currentIndex, companyIds]);

  // Don't render if no companies
  if (!companyIds || companyIds.length === 0) {
    return null;
  }

  // Create infinite array
  const infiniteIds = [...companyIds, ...companyIds, ...companyIds];
  const totalItems = infiniteIds.length;

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
            className="group p-1.5 sm:p-3 lg:p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110 active:scale-95 z-10"
          >
            <ChevronLeft size={16} className="sm:size-6 lg:size-8 text-white group-hover:text-blue1 transition-colors" />
          </button>

          {/* Companies Container */}
          <div 
            className="overflow-hidden flex-1 mx-1 sm:mx-4 lg:mx-8"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
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
                  className="flex justify-center px-0.5 sm:px-1 lg:px-2"
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
            className="group p-1.5 sm:p-3 lg:p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110 active:scale-95 z-10"
          >
            <ChevronRight size={16} className="sm:size-6 lg:size-8 text-white group-hover:text-blue1 transition-colors" />
          </button>
        </div>


      </div>
    </section>
  );
}
