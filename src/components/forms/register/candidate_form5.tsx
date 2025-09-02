// [TODO] - Fazer com que a recomendações de senha mude de forma dinâmica

import GenericFormField from "../generic_form_field";

export default function CandidateForm5 (){
    return (
        <form className="flex-col text-start space-y-8">
            <h2 className="font-semibold text-[1.3rem]">Estamos quase lá!</h2>
            <p>Para finalizar seu cadastro, vamos criar uma senha segura para proteger sua conta e garantir que apenas você tenha acesso às suas informações.</p>
            <div className="space-y-4 max-w-[28rem]">
                <GenericFormField id="Candidate_password_register" type="password" autoComplete="new-password">Senha</GenericFormField>
                <GenericFormField id="Candidate_password_confirm_register" type="password" autoComplete="new-password">Confirme sua senha</GenericFormField>
            </div>
            <div className="bg-white border border-gray-400 rounded-xl p-4">
                <h3 className="font-medium text-[1.15rem] mb-3">Requisitos da senha</h3>
                <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-base">
                        <span className="text-gray-500">⭕</span>
                        <span>Pelo menos 8 caracteres</span>
                    </li>
                    <li className="flex items-center gap-3 text-base">
                        <span className="text-gray-500">⭕</span>
                        <span>Pelo menos uma letra maiúscula</span>
                    </li>
                    <li className="flex items-center gap-3 text-base">
                        <span className="text-gray-500">⭕</span>
                        <span>Pelo menos um número</span>
                    </li>
                    <li className="flex items-center gap-3 text-base">
                        <span className="text-gray-500">⭕</span>
                        <span>Pelo menos um caractere especial (!@#$%)</span>
                    </li>
                    <li className="flex items-center gap-3 text-base">
                        <span className="text-gray-500">⭕</span>
                        <span>As senhas coincidem</span>
                    </li>
                </ul>
            </div>
        </form>
    )
}