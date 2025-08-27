import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface GenericBlueButtonProps {
    color: number;              
    link?: string;              // Para navegação
    onClick?: () => void;       // Para funções
    children: ReactNode;        
    size?: 'sm' | 'md' | 'mdy' | 'lg'; 
}

// Mapeamento de cores - cada número corresponde a uma cor da paleta dentre os tons de azul
const colorMap: {[key:number]: string} = {
  1: "bg-blue1 hover:bg-blue2",        
  2: "bg-blue2 text-white hover:bg-blue3",
  3: "bg-blue3 text-white hover:bg-blue2",
  4: "bg-blue4 hover:bg-blue1",        
};

// Tamanhos disponíveis - controla padding e tamanho do texto
const sizeMap = {
  sm: "px-3 py-1 text-sm",     // Pequeno: menos padding, texto menor
  md: "px-7 py-2",             // Médio: padrão
  mdy: "px-7 py-3",            // Médio um pouco maior no eixo y
  lg: "px-24 py-3 text-[1.5rem]"  // Grande: mais padding, texto maior
};

export default function GenericBlueButton({
  color, 
  link, 
  onClick,
  children, 
  size = 'md'        // Valor padrão: médio
}: GenericBlueButtonProps){
    // Pega as classes CSS baseadas nas props
    const colorButton = colorMap[color] || "bg-blue1";  // Se cor inválida, usa blue1
    const sizeButton = sizeMap[size];
    
    // Hook para navegação entre páginas
    const navigate = useNavigate();
    
    function handleClick() {
        if (link) {
            navigate(link);      // Se tem link, navega
        } else if (onClick) {
            onClick();           // Se tem função, executa
        }
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