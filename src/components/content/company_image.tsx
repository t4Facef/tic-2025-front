import { useNavigate } from "react-router-dom";

type CompanyImageProps = {
  id: number;
  basePath?: string;
  extensions?: string[];
};

export default function CompanyImage({
  id,
  basePath = "./img/logosTeste",
  extensions = ["jpeg", "jpg", "png", "webp"]
}: CompanyImageProps) {
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
      className="transition-transform duration-200 hover:scale-110 hover:z-10 mx-1 relative"
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