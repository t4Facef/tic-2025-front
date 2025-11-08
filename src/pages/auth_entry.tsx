

import { Link, useNavigate } from "react-router-dom";
import GenericBlueButton from "../components/buttons/generic_blue_button";
import { useState } from "react";
import { CircleX } from "lucide-react";

export default function AuthEntry() {
    const [email, setEmail] = useState("")
    const [noEmail, setNoEmail] = useState(false)
    const navigate = useNavigate()

    return (
        <div className="bg-blue1 m-24 rounded-md shadow-md">
            <div className="flex flex-col items-center p-10 px-36">
                <h1 className="font-bold text-6xl py-10">Seja bem vindo!</h1>
                <div className="flex flex-col items-center justify-center py-6 w-full">
                    {noEmail &&
                        <div className="flex flex-row p-3 bg-red-300 text-red2 font-semibold rounded-lg space-x-3 mb-4">
                            <CircleX />
                            <div >
                                <p>Por favor, digite um endereço de e-mail</p>
                            </div>
                        </div>
                    }
                    <label htmlFor="auth_email" className="py-6">Digite um endereço de e-mail para prosseguir</label>
                    <input type="text" placeholder="nome@email.com" name="auth_email" id="auth_email" className="w-full py-4 border border-black rounded-md text-center text-lg" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="my-5">
                    <GenericBlueButton color={3} size="lg" onClick={handleContinue}>Continuar</GenericBlueButton>
                </div>
                <div className="flex flex-col text-[1.2rem] items-center my-12">
                    <span>É sua primeira vez?</span>
                    <Link to="/auth/register/main" className="underline pt-1">Cadastrar</Link>
                </div>
            </div>
        </div>
    )

    async function handleContinue() {
        const API_BASE_URL = 'http://localhost:3001'
        if (!email.trim()) {
            setNoEmail(true)
            return
        }
        else {
            try {
                const response = await fetch(`${API_BASE_URL}/api/auth/check-email?email=${email}`)
                const data = await response.json()

                if (data.exists) {
                    navigate(`/auth/login?email=${email}`)
                }

                else {
                    navigate("/auth/register/main")
                }
            }
            catch (error) {
                console.error('Erro ao verificar email:', error)
                // Fallback: redirecionar para registro em caso de erro
                navigate("/auth/register/main")
            }
        }
    }

}