import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CircleCheck, CircleX } from "lucide-react";
import GenericBlueButton from "../components/buttons/generic_blue_button";
import GenericFormField from "../components/forms/generic_form_field";
import { API_BASE_URL } from "../config/api";

export default function ResetPasswordNew() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);
  const [passwordRequirements, setPasswordRequirements] = useState([
    { text: "Pelo menos 8 caracteres", valid: false },
    { text: "Pelo menos uma letra maiúscula", valid: false },
    { text: "Pelo menos um número", valid: false },
    { text: "Pelo menos um caractere especial", valid: false },
    { text: "As senhas coincidem", valid: false },
  ]);

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (!tokenFromUrl) {
      setTokenValid(false);
      setMessage("Token de redefinição não encontrado. Solicite um novo link.");
    } else {
      setToken(tokenFromUrl);
    }
  }, [searchParams]);

  const updatePasswordRequirements = (password: string, confirmPassword: string) => {
    setPasswordRequirements([
      { text: "Pelo menos 8 caracteres", valid: password.length >= 8 },
      { text: "Pelo menos uma letra maiúscula", valid: /[A-Z]/.test(password) },
      { text: "Pelo menos um número", valid: /[0-9]/.test(password) },
      { text: "Pelo menos um caractere especial", valid: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password) },
      { text: "As senhas coincidem", valid: password === confirmPassword && password.length > 0 },
    ])
  };

  const validatePassword = () => {
    return passwordRequirements.every(req => req.valid);
  };

  const handleResetPassword = async () => {
    if (!novaSenha || !confirmSenha) {
      setMessage("Por favor, preencha todos os campos");
      setSuccess(false);
      return;
    }

    if (!validatePassword()) {
      setMessage("Por favor, atenda a todos os requisitos de senha");
      setSuccess(false);
      return;
    }

    if (novaSenha !== confirmSenha) {
      setMessage("As senhas não coincidem");
      setSuccess(false);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, novaSenha })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Senha redefinida com sucesso! Redirecionando para o login...");
        setSuccess(true);
        setTimeout(() => {
          navigate('/auth/login');
        }, 1500);
      } else {
        setMessage(data.error || "Erro ao redefinir senha");
        setSuccess(false);
      }
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      setMessage("Erro de conexão. Tente novamente.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  if (!tokenValid) {
    return (
      <div className="mx-96 my-28 border border-black rounded-lg bg-blue1 space-y-4 flex flex-col items-center">
        <h2 className="bg-blue3 text-center text-white font-bold text-[1.4rem] p-4 rounded-t-md w-full">
          Redefinição de senha
        </h2>
        <div className="p-8">
          <div className="flex flex-row space-x-4 rounded-lg p-4 bg-red-100 text-red-700 border border-red-300">
            <CircleX />
            <div className="font-semibold">
              <p>{message}</p>
            </div>
          </div>
          <div className="flex flex-col items-center mt-6">
            <GenericBlueButton color={3} link="/auth/password/forgot">
              Solicitar novo link
            </GenericBlueButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-96 my-28 border border-black rounded-lg bg-blue1 space-y-4 flex flex-col items-center">
      <h2 className="bg-blue3 text-center text-white font-bold text-[1.4rem] p-4 rounded-t-md w-full">
        Redefinição de senha
      </h2>
      <div className="p-8">
        {message && (
          <section className={`flex flex-row space-x-4 rounded-lg p-4 mb-4 ${
            success 
              ? 'bg-green-100 text-green-700 border border-green-300'
              : 'bg-red-100 text-red-700 border border-red-300'
          }`}>
            <div>
              {success ? <CircleCheck /> : <CircleX />}
            </div>
            <div className="font-semibold">
              <p>{message}</p>
            </div>
          </section>
        )}
        
        <div className="font-medium text-blue3 my-4">
          <p>Por favor, insira sua nova senha nos campos abaixo.</p>
        </div>
        
        <div className="text-blue3 font-semibold w-full">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-14">
            <div className="w-full my-4 space-y-8">
              <div>
                <GenericFormField
                  id="reset_password_field"
                  type="password"
                  placeholder="Digite sua nova senha"
                  autoComplete="new-password"
                  value={novaSenha}
                  onChange={(e) => {
                    setNovaSenha(e.target.value);
                    updatePasswordRequirements(e.target.value, confirmSenha);
                  }}
                >
                  Nova senha
                </GenericFormField>
              </div>
              <div>
                <GenericFormField
                  id="reset_password_confirmation"
                  type="password"
                  placeholder="Confirme sua nova senha"
                  autoComplete="new-password"
                  value={confirmSenha}
                  onChange={(e) => {
                    setConfirmSenha(e.target.value);
                    updatePasswordRequirements(novaSenha, e.target.value);
                  }}
                >
                  Confirme a senha
                </GenericFormField>
              </div>
            </div>
            
            <div className="bg-white border border-gray-400 rounded-xl p-4">
              <h3 className="font-medium text-[1.15rem] mb-3">Requisitos da senha</h3>
              <ul className="space-y-3">
                {passwordRequirements.map((req, index) => (
                  <li key={index} className="flex items-center gap-3 text-base">
                    <span className={req.valid ? "text-green-500" : "text-gray-500"}>
                      {req.valid ? "✅" : "⭕"}
                    </span>
                    <span className={req.valid ? "text-green-700" : "text-gray-700"}>
                      {req.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col items-center text-blue1">
              <GenericBlueButton 
                color={3} 
                onClick={handleResetPassword}
                disabled={loading}
              >
                {loading ? "Redefinindo..." : "Redefinir senha"}
              </GenericBlueButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}