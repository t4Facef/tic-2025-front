import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface GenericBlueButtonProps {
    color: number;              
    link?: string;              // Para navegação
    onClick?: () => void;       // Para funções
    children: ReactNode;        
    size?: 'sm' | 'md' | 'mdy' | 'lg';
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';  // Para bordas arredondadas
    submit?: boolean;           // Para type="submit"
    form?: string;              // Para conectar com formulário específico
}

// Mapeamento de cores - cada número corresponde a uma cor da paleta dentre os tons de azul
const colorMap: {[key:number]: string} = {
  1: "bg-blue1",        
  2: "bg-blue2 text-white",
  3: "bg-blue3 text-white hover:bg-blue3H",
  4: "bg-blue4 hover:bg-blue1",
  5: "bg-black text-white"
};

// Tamanhos disponíveis - controla padding e tamanho do texto
const sizeMap = {
  sm: "px-3 py-1 text-sm",     // Pequeno: menos padding, texto menor
  md: "px-7 py-2",             // Médio: padrão
  mdy: "px-7 py-3",            // Médio um pouco maior no eixo y
  lg: "px-24 py-3 text-[1.5rem]"  // Grande: mais padding, texto maior
};

// Arredondamento disponível - controla bordas
const roundedMap = {
  none: "rounded-none",        // Sem arredondamento
  sm: "rounded-sm",           // Pequeno
  md: "rounded-md",           // Médio: padrão
  lg: "rounded-lg",           // Grande
  full: "rounded-full"        // Totalmente redondo
};

export default function GenericBlueButton({
  color, 
  link, 
  onClick,
  children, 
  size = 'md',       // Valor padrão: médio
  rounded = 'md',    // Valor padrão: arredondamento médio
  submit = false,    // Valor padrão: não é submit
  form               // ID do formulário para conectar
}: GenericBlueButtonProps){
    // Pega as classes CSS baseadas nas props
    const colorButton = colorMap[color] || "bg-blue1";  // Se cor inválida, usa blue1
    const sizeButton = sizeMap[size];
    const roundedButton = roundedMap[rounded];
    
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
          type={submit ? "submit" : "button"}
          form={form}
          className={`${colorButton} ${sizeButton} ${roundedButton} flex justify-center items-center transition-colors whitespace-nowrap`} 
          onClick={handleClick}
        >
          {children}
        </button>
    )
}