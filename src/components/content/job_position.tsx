import { ReactNode, useState } from "react";
import { User } from "lucide-react"

interface JobPositionProps {
  profile: string;       // caminho ou URL da imagem
  title: string;         // título da vaga
  children?: ReactNode;  // descrição da vaga
}

export default function JobPosition({ profile, title, children }: JobPositionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`max-w-[140vh] min-w-[140vh] flex pt-8 cursor-pointer transition-opacity ${!open ? 'hover:opacity-75' : ''}`} onClick={() => setOpen(true)} >
      <div className="w-28 h-28 bg-orange1 border-black border-2"> 
        <img src={profile} alt="perfil-img" />
      </div>
      
      <div className="flex flex-col flex-1 max-h-28">
        <div className="bg-orange1 border-black border-2 flex-[1] flex justify-between items-center px-2">
          <span className="font-georgia">{title}</span>
        </div>

        <div className="bg-orange2 border-black border-2 flex-[3] overflow-auto p-2 break-words">
          <p className="font-georgia">{children}</p>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-hidden" onClick={() => setOpen(false)}>
          <div className="bg-blue4 p-6 rounded-xl shadow-lg max-w-[190vh] w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between">
                <h2 className="text-xl font-bold mb-4 text-[60px] py-7">{title}</h2>
                <div className="bg-white rounded-full inline-flex justify-center items-center w-20 h-20">
                    <User size={60}/>
                </div>
            </div>
            <div className="text-gray-700">{children}</div>

            <button onClick={() => setOpen(false)} className="mt-4 px-3 py-1 bg-red-500 text-white rounded-lg">
              Fechar
            </button>
          </div>
        </div>
    )}
    </div>
  );
}
