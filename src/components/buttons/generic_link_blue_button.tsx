import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface GenericBlueButtonProps {
    color: number;              
    link: string;              
    children: ReactNode;        
    size?: 'sm' | 'md' | 'lg'; 
}

// Mapeamento de cores - cada número corresponde a uma cor da paleta dentre os tons de azul
const colorMap: {[key:number]: string} = {
  1: "bg-blue1 hover:bg-blue2",        // Azul claro com hover azul médio
  2: "bg-blue2 text-white hover:bg-blue3", // Azul médio com texto branco
  3: "bg-blue3 text-white hover:bg-blue2", // Azul escuro com texto branco (mais usado)
  4: "bg-blue4 hover:bg-blue1",        // Azul suave
};

// Tamanhos disponíveis - controla padding e tamanho do texto, caso precise de um botão diferente e queira usar esse componente pode adicionar mais algum, só não pode esquecer de adicionar no prop tbm
const sizeMap = {
  sm: "px-3 py-1 text-sm",  // Pequeno: menos padding, texto menor
  md: "px-4 py-2",          // Médio: padrão
  lg: "px-6 py-3 text-lg"   // Grande: mais padding, texto maior
};



export default function GenericBlueButton({
  color, 
  link, 
  children, 
  size = 'md'        // Valor padrão: médio
}: GenericBlueButtonProps){
    // Pega as classes CSS baseadas nas props
    const colorButton = colorMap[color] || "bg-blue1";  // Se cor inválida, usa blue1
    const sizeButton = sizeMap[size];
    
    // Hook para navegação entre páginas
    const navigate = useNavigate();
    function handleClick() {
        navigate(link); // Vai para a rota especificada na prop 'link', em formato de texto mesmo
    }

    return (
        <button 
          className={`${colorButton} ${sizeButton} rounded-md flex justify-center items-center transition-colors`} 
          onClick={handleClick}
        >
          {children}
        </button>
    )
}