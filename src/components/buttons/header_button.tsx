import { useNavigate } from "react-router-dom";

export default function HeaderButton(){
    const navigate = useNavigate();
    function handleClickLogin() {
        navigate("/auth/login");
    }
    function handleClickRegister() {
        navigate("/auth/register/main");

    }

    return (
        <div className="flex pr-6">
            <button className="bg-blue4 rounded-tl-md rounded-bl-md p-2 text-black px-6" onClick={handleClickLogin}>
                Login        
            </button>
            <button className="bg-blue3 rounded-r-md rounded-br-md p-2 px-4" onClick={handleClickRegister}>
                Registrar
            </button>
        </div>
    )
}