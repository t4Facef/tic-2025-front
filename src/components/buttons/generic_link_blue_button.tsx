import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type GenericBlueButtonProps = {
    color: number;
    link: string;
    children: ReactNode
}

const colorMap: {[key:number]: string} = {
  1: "bg-blue1",
  2: "bg-blue2 text-white",
  3: "bg-blue3 text-white",
  4: "bg-blue4",
};


export default function GenericBlueButton({color, link, children}: GenericBlueButtonProps){
    const colorButton = colorMap[color] || "bg-blue1";
    
    const navigate = useNavigate();
    function handleClick() {
        navigate(link);
    }

    return (
        <button className={`${colorButton} p-4 px-6 rounded-md`} onClick={handleClick}>{children}</button>
    )
}