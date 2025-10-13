import { Link, useSearchParams, useNavigate } from "react-router-dom";
import GenericBlueButton from "../components/buttons/generic_blue_button";
import GenericFormField from "../components/forms/generic_form_field";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState(searchParams.get("email") || "");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [message, setMessage] = useState("")
    const { login } = useAuth()
    const navigate = useNavigate()

    const API_BASE_URL = "http://localhost:3001"
    
    const fetchLogin = async (email: string, senha: string) => {
        setMessage("🔄️ Processando...")
        try{
            const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            })
            
            const data = await res.json()
 
            if(data.error){
                setMessage("❌ " + data.error)
            }
            else{
                setMessage("✅ Sucesso")
                // Salvar no contexto
                login(data.token, data.user, data.role, rememberMe)
                // Redirecionar baseado no role
                if(data.role === 'EMPRESA') {
                    navigate(`/companies/dashboard`)
                } else {
                    navigate(`/candidates/dashboard`)
                }
            }

            return data
        }
        catch(error: unknown){
            setMessage(error instanceof Error ? error.message : 'Erro desconhecido')
        }
    }

    const handleSubmit = async (email: string, senha: string) => {
        fetchLogin(email, senha)
        
    }

    return (
        <div className="flex justify-center text-blue3 px-4">
            <div className="w-full max-w-md my-12">
                <div className="bg-blue3 text-white text-xl font-semibold py-3 text-center rounded-t-lg border">
                    Login
                </div>
                <div className="bg-blue1 rounded-b-lg">
                    <div className="flex flex-col gap-8 justify-center py-6 px-16">
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
                                <GenericBlueButton color={3} onClick={() => handleSubmit(email, password)}>Entrar</GenericBlueButton>
                            </div>
                        </form>
                        {message && (
                            <div className={`border-2 p-2 text-center rounded-lg ${
                                message.includes('❌') 
                                    ? 'bg-red-100 border-red-300 text-red-700'
                                    : message.includes('✅')
                                    ? 'bg-green-100 border-green-300 text-green-700'
                                    : 'bg-blue-100 border-blue-300 text-blue-700'
                            }`}>
                                <p className="text-sm font-medium">{message}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}