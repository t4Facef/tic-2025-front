// [TODO] - Fazer com que a recomendações de senha mude de forma dinâmica

import GenericFormField from "../generic_form_field";

export default function CompanieForm4() {
    return (
        <form className="flex-col text-start space-y-8">
            <div className="space-y-4">
                <h2 className="font-semibold text-[1.3rem]">Estamos Quase Lá!</h2>
                <p className="text-gray-700 leading-relaxed">Para finalizar o cadastro da sua empresa, precisamos de uma senha segura para proteger a conta e o logo da empresa para que os candidatos possam identificá-la facilmente.</p>
            </div>
            
            <div className="space-y-6">
                <div className="max-w-[28rem]">
                    <GenericFormField id="company_logo_register" type="file">Logo da Empresa (Opcional)</GenericFormField>
                    <p className="text-sm text-gray-600 mt-2">Formatos aceitos: JPG, PNG, SVG. Tamanho máximo: 5MB</p>
                </div>
                
                <div className="space-y-4 max-w-[28rem]">
                    <GenericFormField id="company_password_register" type="password" autoComplete="new-password" required>Senha</GenericFormField>
                    <GenericFormField id="company_password_confirm_register" type="password" autoComplete="new-password" required>Confirme sua Senha</GenericFormField>
                </div>
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