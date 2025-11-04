import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";

export default function HeaderButton(){
    const navigate = useNavigate();
    
    function handleClickLogin() {
        navigate("/auth/entry");
    }
    
    function handleClickRegister() {
        navigate("/auth/register/main");
    }

    return (
        <div className="flex items-center space-x-2">
            <button 
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 lg:px-4 lg:py-2 text-white font-medium transition-all duration-200 hover:scale-105 active:scale-95" 
                onClick={handleClickLogin}
            >
                <LogIn size={16} className="lg:size-4" />
                <span className="text-sm lg:text-base">Login</span>
            </button>
            <button 
                className="flex items-center space-x-2 bg-white text-blue3 hover:bg-blue1 hover:text-blue3 rounded-lg px-3 py-2 lg:px-4 lg:py-2 font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg" 
                onClick={handleClickRegister}
            >
                <UserPlus size={16} className="lg:size-4" />
                <span className="text-sm lg:text-base">Registrar</span>
            </button>
        </div>
    )
}