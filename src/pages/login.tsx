import { Link } from "react-router-dom";
import GenericBlueButton from "../components/buttons/generic_link_blue_button";

export default function Login(){
    return (
        <div className="flex justify-center">
            <div className="bg-blue1 border border-black min-w-[28rem] my-12 rounded-md">
                <span className="flex justify-center border-b border-black text-[20px] font-semibold py-2">Login</span>
                <div className="flex justify-center pb-5">
                    <form className="flex flex-col min-w-[18rem]">
                        <label htmlFor="user" className="pt-5">Usuário</label>
                        <input type="text" id="user" name="user" placeholder="E-mail, CPF ou CNPJ" className="p-2 rounded-md border border-black"/>
                        <label htmlFor="senha" className="pt-4">Senha</label>
                        <input type="password" id="senha" name="senha" placeholder="*********" className="p-2 pb-1 rounded-md border border-black"/>
                        <div className="flex justify-between text-[14px] py-2">
                            <Link to="/ai" className="underline">Esqueci a senha</Link> {/* A implementar */}
                            <label htmlFor="rememberMe">
                                <input type="checkbox" id="rememberMe"/>
                                <span> Lembre de mim</span>
                            </label>
                        </div>
                        <div className="flex justify-between items-end pt-32">
                            <div className="flex flex-col text-[13px]">
                                <span>É sua primeira vez?</span>
                                <Link to="/registrar" className="underline pt-1">CADASTRAR</Link>
                            </div>
                            <GenericBlueButton color={3} link="/usuarios/1" classEdit="flex items-center max-h-[10px]">Entrar</GenericBlueButton> {/* A implementar */}
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}