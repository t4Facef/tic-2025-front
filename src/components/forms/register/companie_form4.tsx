import { useState } from "react";
import { CompanieForm4Data } from "../../../types/forms/companie";
import GenericFormField from "../generic_form_field";
import ImageCropper from "../../image/image_cropper";

export default function CompanieForm4({ formFunc, formId, initialData, archives }: { formFunc: (data: CompanieForm4Data) => void, formId: string, initialData?: CompanieForm4Data, archives: FormData }) {
    const [form4, setForm4] = useState<CompanieForm4Data>(initialData || {} as CompanieForm4Data)
    const [passwordError, setPasswordError] = useState<string>('')
    const [passwordRequirements, setPasswordRequirements] = useState([
        { text: "Pelo menos 8 caracteres", valid: (form4.password || "").length >= 8 },
        { text: "Pelo menos uma letra maiúscula", valid: (/[A-Z]/.test(form4.password)) },
        { text: "Pelo menos um número", valid: (/[0-9]/.test(form4.password)) },
        { text: "Pelo menos um caractere especial", valid: (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(form4.password || "")) },
        { text: "As senhas coincidem", valid: form4.password === form4.confirmPassword },
    ])

    const updatePasswordRequirements = (password: string, confirmPassword: string) => {
        setPasswordRequirements([
            { text: "Pelo menos 8 caracteres", valid: password.length >= 8 },
            { text: "Pelo menos uma letra maiúscula", valid: /[A-Z]/.test(password) },
            { text: "Pelo menos um número", valid: /[0-9]/.test(password) },
            { text: "Pelo menos um caractere especial", valid: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password) },
            { text: "As senhas coincidem", valid: password === confirmPassword && password.length > 0 },
        ])
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const newPassword = e.target.value
        setForm4(prev => ({ ...prev, password: newPassword }))
        updatePasswordRequirements(newPassword, form4.confirmPassword || "")
    }

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const newConfirmPassword = e.target.value
        setForm4(prev => ({ ...prev, confirmPassword: newConfirmPassword }))
        updatePasswordRequirements(form4.password || "", newConfirmPassword)
    }

    const handleCroppedImage = (croppedFile: File) => {
        setForm4(prev => ({ ...prev, profilePicture: croppedFile }))
        handleFileUpload(croppedFile, 'foto')
    }

    const handleFileUpload = (file: File, tipo: string) => {
        // Limpar arquivo anterior do mesmo tipo se existir
        if (archives.has(tipo)) {
            archives.delete(tipo)
        }
        // Adicionar novo arquivo
        archives.append(tipo, file)
    }

    const loadDefaultCompanyLogo = async () => {
        try {
            const response = await fetch('/img/profile-default.jpg')
            const blob = await response.blob()
            const defaultFile = new File([blob], 'profile-default.jpg', { type: 'image/jpeg' })
            handleFileUpload(defaultFile, 'foto')
        } catch (error) {
            console.warn('Erro ao carregar logo padrão:', error)
        }
    }


    return (
        <form id={formId} className="flex-col text-start space-y-8" onSubmit={async (e) => {
            e.preventDefault();
            setPasswordError('')

            if (passwordRequirements.every(req => req.valid)) {
                if (!form4.profilePicture && !archives.has('foto')) {
                    try {
                        await loadDefaultCompanyLogo()
                    } catch (error) {
                        console.warn('Continuando sem logo padrão:', error)
                    }
                }
                formFunc(form4)
            } else {
                setPasswordError('Por favor, atenda a todos os requisitos de senha antes de continuar.')
            }
        }}>
            <div className="space-y-4">
                <h2 className="font-semibold text-[1.3rem]">Estamos Quase Lá!</h2>
                <p className="text-gray-700 leading-relaxed">Para finalizar o cadastro da sua empresa, precisamos de uma senha segura para proteger a conta e o logo da empresa para que os candidatos possam identificá-la facilmente.</p>
            </div>

            <div className="space-y-6">
                <div className="max-w-[28rem]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Foto de Perfil</label>
                    <ImageCropper onCropComplete={handleCroppedImage} initialFile={form4.profilePicture || null} />
                    <p className="text-sm text-gray-600 mt-2">Formatos aceitos: JPG, PNG. Tamanho máximo: 5MB</p>
                    {form4.profilePicture && (
                        <p className="text-sm text-green-600 mt-1">✓ Foto selecionada: {form4.profilePicture.name}</p>
                    )}
                </div>
                <div className="space-y-6">
                    <div className="space-y-4 max-w-[28rem]">
                        <GenericFormField id="candidate_password_register" type="password" autoComplete="new-password" required onChange={(e) => handlePasswordChange(e)} value={form4.password || ""}>Senha</GenericFormField>
                        <GenericFormField id="candidate_password_confirm_register" type="password" autoComplete="new-password" required onChange={(e) => handleConfirmPasswordChange(e)} value={form4.confirmPassword || ""}>Confirme sua Senha</GenericFormField>
                        {passwordError && (
                            <p className="text-red-600 text-sm mt-1">❌ {passwordError}</p>
                        )}
                    </div>
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
        </form>
    )
}