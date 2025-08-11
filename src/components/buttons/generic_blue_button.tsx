import { ReactNode } from "react";

type GenericBlueButtonProps = {
    color: number;
    children: ReactNode
}

const colorMap: {[key:number]: string} = {
  1: "bg-blue1",
  2: "bg-blue2 text-white",
  3: "bg-blue3 text-white",
  4: "bg-blue4",
};

export default function GenericBlueButton({color, children}: GenericBlueButtonProps){
    const colorButton = colorMap[color] || "bg-blue1";
    return (
        <button className={`${colorButton} my-5 p-4 px-6 rounded-md`} >{children}</button>
    )
}