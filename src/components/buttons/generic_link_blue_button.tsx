import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface GenericBlueButtonProps {
    color: number;
    link: string;
    children: ReactNode;
    classEdit?: string; //Não pode ser uma classe que ja foi aplicada, então não da pra alterar o p, px ou rounded, mas se precisar, tira esse estilo daqui e coloca onde são usados
}

const colorMap: {[key:number]: string} = {
  1: "bg-blue1",
  2: "bg-blue2 text-white",
  3: "bg-blue3 text-white",
  4: "bg-blue4",
};


export default function GenericBlueButton({color, link, children, classEdit}: GenericBlueButtonProps){
    const colorButton = colorMap[color] || "bg-blue1";
    
    const navigate = useNavigate();
    function handleClick() {
        navigate(link);
    }

    return (
        <button className={`${colorButton} p-4 px-6 rounded-md ${classEdit}`} onClick={handleClick}>{children}</button>
    )
}