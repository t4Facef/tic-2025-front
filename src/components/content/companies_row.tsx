import { ChevronLeft, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

type CompaniesRowPropries = {
    companyIds: number[];
    basePath?: string;
    extensions?: string[];
}

function CompanyImage({ id, basePath = "./img/logosTeste", extensions = ["jpeg", "jpg", "png", "webp"] }: { id: number, basePath?: string, extensions?: string[] }) {
    const navigate = useNavigate();
    
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget;
        const currentSrc = img.src;
        const currentExt = currentSrc.split('.').pop();
        const currentIndex = extensions.indexOf(currentExt || '');
        
        if (currentIndex < extensions.length - 1) {
            const nextExt = extensions[currentIndex + 1];
            img.src = `${basePath}/teste${id}.${nextExt}`;
        }
    };

    return (
        <button 
            onClick={() => navigate(`/companies/${id}/profile`)}
            className="transition-all duration-300 ease-in-out hover:scale-110"
        >
            <img 
                src={`${basePath}/teste${id}.${extensions[0]}`}
                alt={`Company ${id}`}
                className="w-32 h-32 object-cover rounded-full"
                onError={handleImageError}
            />
        </button>
    );
}

export default function CompaniesRow({companyIds, basePath, extensions}: CompaniesRowPropries){
    return (
        <div className="bg-blue2 p-3 py-4 flex justify-between items-center">
            <button className="transition-all duration-300 ease-in-out hover:scale-110 hover:opacity-80">
                <ChevronLeft size={150}/>
            </button>
            {companyIds.map((id) => (
                <CompanyImage key={id} id={id} basePath={basePath} extensions={extensions} />
            ))}
            <button className="transition-all duration-300 ease-in-out hover:scale-110 hover:opacity-80">
                <ChevronRight size={150}/>
            </button>
        </div>
    )
}
