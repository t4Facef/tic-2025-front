// [TODO] - Fazer com que a recomendações de senha mude de forma dinâmica
// [TODO] - Adicionar pacote node que permite editar a foto antes de enviar (a foto deve ser um quadrado perfeito pra não dar problema com o rounded-full)

import { CandidateForm5Data } from "../../../types/forms/candidate";
import GenericFormField from "../generic_form_field";

export default function CandidateForm5 ({ formFunc, formId, initialData } : {formFunc: (data: CandidateForm5Data) => void, formId: string, initialData?: CandidateForm5Data}){
    const [form5, setForm5] = useState<CandidateForm5Data>(initialData || {} as CandidateForm5Data)

    return (
        <form id={formId} className="flex-col text-start space-y-8" onSubmit={(e) => {
            e.preventDefault();
            formFunc(form5)
        }}>
            <div className="space-y-4">
                <h2 className="font-semibold text-[1.3rem]">Estamos Quase Lá!</h2>
                <p className="text-gray-700 leading-relaxed">Para finalizar seu cadastro, precisamos de uma senha segura para proteger sua conta e uma foto de perfil para que os recrutadores possam conhecê-lo melhor.</p>
            </div>
            
            <div className="space-y-6">
                <div className="max-w-[28rem]">
                    <GenericFormField id="candidate_profile_photo_register" type="file" required>Foto de Perfil</GenericFormField>
                    <p className="text-sm text-gray-600 mt-2">Formatos aceitos: JPG, PNG. Tamanho máximo: 5MB</p>
                </div>
                
                <div className="space-y-4 max-w-[28rem]">
                    <GenericFormField id="candidate_password_register" type="password" autoComplete="new-password" required>Senha</GenericFormField>
                    <GenericFormField id="candidate_password_confirm_register" type="password" autoComplete="new-password" required>Confirme sua Senha</GenericFormField>
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