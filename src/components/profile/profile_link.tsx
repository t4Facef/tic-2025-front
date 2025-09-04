import { useNavigate } from "react-router-dom";

interface ProfileLinkProps {
    id: number;
    imgPath: string;
}

export default function ProfileLink({id, imgPath}: ProfileLinkProps){
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(`/companies/${id}/profile`)} className="transition-all duration-300 ease-in-out hover:scale-110 hover:opacity-80">
            <img src={imgPath} alt="Logo da empresa" className="w-full h-full object-cover" />
        </button>
    )
}

