import { ReactNode } from "react";

interface JobPositionProps {
  profile: string;       // caminho ou URL da imagem
  title: string;     // título da vaga
  children?: ReactNode;  // descrição da vaga
}

export default function JobPosition({profile, title, children}: JobPositionProps){
    return (
        <div className="max-w-[120vh] min-w-[120vh] flex pt-8">
            <div className="w-28 h-28 bg-orange1 border-black border-2"> 
                <img src= {profile} alt="perfil-img" />
            </div>
            <div className="flex flex-col flex-1 max-h-28">
                <div className="bg-orange1 border-black border-2 flex-[1]">
                    <span className="font-georgia">{title}</span>
                </div>
                <div className="bg-orange2 border-black border-2 flex-[3] overflow-auto p-2 break-words">
                    <p className="font-georgia">{children}</p>
                </div>
            </div>
        </div>
    )
}