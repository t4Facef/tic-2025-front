import { Link, useNavigate } from "react-router-dom";
import GenericBlueButton from "../components/buttons/generic_blue_button";
import GenericFormField from "../components/forms/generic_form_field";
import { useState } from "react";
import { CircleX, CircleCheck } from "lucide-react";
import { API_BASE_URL } from "../config/api";

export function ResetPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleResetPassword = async () => {
        if (!email || !email.includes('@')) {
            setMessage("Por favor, digite um email válido");
            setSuccess(false);
            return;
        }

        setLoading(true);
        setMessage("");
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Email de redefinição enviado com sucesso! Verifique sua caixa de entrada.");
                setSuccess(true);
            } else {
                setMessage(data.error || "Erro ao enviar email de redefinição");
                setSuccess(false);
            }
        } catch (error) {
            setMessage("Erro de conexão. Tente novamente.");
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-96 my-24 border border-black rounded-lg bg-blue1 space-y-5 flex flex-col items-center">
            <h2 className=" bg-blue3 text-center text-white font-bold text-[1.4rem] p-4 rounded-t-md w-full">Redefinição de senha</h2>
            <div className="p-8">
                <div className="w-full flex flex-col items-center">
                    <p className="font-semibold text-blue3 text-[1.2rem] mb-6">
                        Digite seu e-mail no campo abaixo para realizar a redefinição de senha!
                    </p>
                    {message && (
                        <div className={`self-start flex flex-row p-3 font-semibold rounded-lg space-x-3 mb-4 ${
                            success 
                                ? 'bg-green-100 text-green-700 border border-green-300'
                                : 'bg-red1 text-red2'
                        }`}>
                            {success ? <CircleCheck/> : <CircleX/>}
                            <div>
                                <p>{message}</p>
                            </div>
                        </div>
                    )}
                    <div className="text-blue3 font-semibold w-full">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="w-full my-6">
                                <GenericFormField
                                    id="reset_password_email"
                                    type="email"
                                    placeholder="Digite seu e-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}>
                                    E-mail
                                </GenericFormField>
                            </div>
                            <div className="flex flex-col items-center my-8">
                                <GenericBlueButton 
                                    color={3} 
                                    onClick={handleResetPassword}
                                    disabled={loading}
                                >
                                    {loading ? "Enviando..." : "Enviar email de redefinição"}
                                </GenericBlueButton>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="text-blue3">
                    <p>Lembrou sua senha? <Link to={"/auth/login"} className="underline">Faça o login</Link></p>
                </div>
            </div>
        </div>
    )
}