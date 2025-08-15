import { Link } from "react-router-dom";
import GenericBlueButton from "../components/buttons/generic_link_blue_button";

export default function Cadastrar(){
    return (
        <div className="flex justify-center">
            <div className="bg-blue1 border border-black min-w-[28rem] my-12 rounded-lg">
                <div className="flex">
                    <button className="border border-black w-[14rem] rounded-tl-md">Candidato</button>
                    <button className="border border-black w-[14rem] rounded-tr-md">Empresa</button>
                </div>
                <div className="flex justify-center">
                    <form className="flex flex-col w-[18rem] justify-center ">
                        <label htmlFor="cpfRegister">CPF</label>
                        <input type="text" id="cpfRegister" name="cpfRegister" className="border border-black rounded-md"/>
                        <label htmlFor="nomeRegister">Nome</label>
                        <input type="text" id="nomeRegister" name="nomeRegister" className="border border-black rounded-md"/>
                    </form>
                </div>
                    <div className="flex justify-between items-end pt-32">
                        <div className="flex flex-col text-[13px]">
                            <span>É sua primeira vez?</span>
                            <Link to="/login" className="underline pt-1">Cadastrar</Link>
                        </div>
                        <GenericBlueButton color={3} link="/ai" classEdit="flex items-center max-h-[10px]">Entrar</GenericBlueButton> {/* A implementar */}
                    </div>
            </div>
        </div>
    )
}
