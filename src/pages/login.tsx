import { Link, useSearchParams } from "react-router-dom";
import GenericBlueButton from "../components/buttons/generic_blue_button";
import GenericFormField from "../components/forms/generic_form_field";
import { useState } from "react";

export default function Login() {
    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState(searchParams.get("email") || "");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <div className="flex justify-center text-blue3 px-4">
            <div className="w-full max-w-md my-12">
                <div className="bg-blue3 text-white text-xl font-semibold py-3 text-center rounded-t-lg border border-black">
                    Login
                </div>
                <div className="bg-blue1 border-x border-b border-black rounded-b-lg">
                    <div className="flex justify-center py-6 px-16">
                        <form className="flex flex-col w-full space-y-4">
                            <GenericFormField id="user" type="text" placeholder="E-mail, CPF ou CNPJ" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)}>Usuário</GenericFormField>
                            <GenericFormField id="senha" type="password" placeholder="Digite sua senha" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)}>Senha</GenericFormField>

                            <div className="flex flex-col sm:flex-row sm:justify-between text-sm py-2 gap-2">
                                <Link to="/auth/password/forgot" className="underline">Esqueci a senha</Link>
                                <label htmlFor="rememberMe" className="flex items-center">
                                    <input type="checkbox" id="rememberMe" className="mr-2" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                                    <span>Lembre de mim</span>
                                </label>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end pt-12 gap-4">
                                <div className="flex flex-col text-sm">
                                    <span>É sua primeira vez?</span>
                                    <Link to="/auth/register/main" className="underline pt-1 font-semibold">CADASTRAR</Link>
                                </div>
                                <GenericBlueButton color={3} link="/candidates/1/dashboard">Entrar</GenericBlueButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}