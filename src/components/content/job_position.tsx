import { ReactNode, useState } from "react";
import JobModal from "./job_modal";

interface JobPositionProps {
  profile: string;       // caminho ou URL da imagem
  title: string;         // título da vaga
  children?: ReactNode;  // descrição da vaga
}

export default function JobPosition({ profile, title, children }: JobPositionProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={`w-full flex pt-8 cursor-pointer transition-opacity ${!open ? 'hover:opacity-75' : ''}`} onClick={() => setOpen(true)} >
        <div className="w-28 h-28 bg-orange1 border-black border-2 rounded-l-md"> 
          <img src={profile} alt="perfil-img" />
        </div>
        
        <div className="flex flex-col flex-1 max-h-28">
          <div className="bg-orange1 border-black border-2 flex-[1] flex justify-between items-center px-2 rounded-tr-md">
            <span className="font-georgia">{title}</span>
          </div>

          <div className="bg-orange2 border-black border-2 flex-[3] overflow-auto p-2 break-words rounded-br-md">
            <p className="font-georgia">{children}</p>
          </div>
        </div>
      </div>
      
      <JobModal 
        open={open} 
        onClose={() => setOpen(false)}
        title={title}
      >
        {children}
      </JobModal>
    </>
  );
}
