import { Link } from "react-router-dom";
import GenericBlueButton from "../components/buttons/generic_blue_button";
import GenericFormField from "../components/forms/generic_form_field";

export default function Login(){
    return (
        <div className="flex justify-center">
            <div className="bg-blue1 border border-black min-w-[28rem] my-12 rounded-md">
                <span className="flex justify-center border-b border-black text-[20px] font-semibold py-2">Login</span>
                <div className="flex justify-center pb-5">
                    <form className="flex flex-col min-w-[18rem] space-y-4">
                        <GenericFormField id="user" type="text" placeholder="E-mail, CPF ou CNPJ" autoComplete="username">Usuário</GenericFormField>
                        <GenericFormField id="senha" type="password" placeholder="Digite sua senha" autoComplete="current-password">Senha</GenericFormField>
                        <div className="flex justify-between text-[14px] py-2">
                            <Link to="/auth/password/forgot" className="underline">Esqueci a senha</Link>
                            <label htmlFor="rememberMe">
                                <input type="checkbox" id="rememberMe"/>
                                <span> Lembre de mim</span>
                            </label>
                        </div>
                        <div className="flex justify-between items-end pt-32">
                            <div className="flex flex-col text-[13px]">
                                <span>É sua primeira vez?</span>
                                <Link to="/auth/register/main" className="underline pt-1">CADASTRAR</Link>
                            </div>
                            <GenericBlueButton color={3} link="/candidates/1/dashboard">Entrar</GenericBlueButton> {/* A implementar */}
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}