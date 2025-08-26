import { Link } from "react-router-dom";
import GenericBlueButton from "../components/buttons/generic_link_blue_button";

export default function Register(){
    return (
        <div className="flex justify-center">
            <div className="bg-blue1 border border-black w-[28rem] my-12 rounded-lg">
                <div className="flex border-b border-black">
                    <button className="border-r border-black w-[14rem] rounded-tl-md text-[21px] p-2">Candidato</button>
                    <button className="border-l border-black w-[14rem] rounded-tr-md text-[21px] p-2">Empresa</button>
                </div>
                <div className="flex flex-col items-center">
                    <form className="flex flex-col w-[18rem] justify-center py-5">
                        <label htmlFor="cpfRegister">CPF</label>
                        <input type="text" id="cpfRegister" name="cpfRegister" placeholder="Digite o CPF" className="border border-black rounded-md p-2 pl-2"/>
                        <label htmlFor="nomeRegister" className="pt-6">Nome</label>
                        <input type="text" id="nomeRegister" name="nomeRegister" placeholder="Digite o nome" className="border border-black rounded-md p-2 pl-2"/>
                        <div className="flex justify-between items-end pt-[9.5rem]">
                            <div className="flex flex-col text-[13px]">
                                <span>Não é sua primeira vez?</span>
                                <Link to="/auth/login" className="underline pt-1">ENTRAR</Link>
                            </div>
                            <GenericBlueButton color={3} link="/ai" classEdit="flex items-center max-h-[10px]">Registrar</GenericBlueButton> {/* A implementar */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
