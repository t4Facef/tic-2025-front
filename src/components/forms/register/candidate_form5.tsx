// [TODO] - Adicionar pacote node que permite editar a foto antes de enviar (a foto deve ser um quadrado perfeito pra não dar problema com o rounded-full)

import { useState, lazy, Suspense } from "react";
import { CandidateForm5Data } from "../../../types/forms/candidate";
import GenericFormField from "../generic_form_field";
import { CircleCheckBig, CircleX } from "lucide-react";

// Importação dinâmica para evitar problemas no Vercel
const ImageCropper = lazy(() => import("../../image/image_cropper"));


export default function CandidateForm5({ formFunc, formId, initialData, fileStorage }: { formFunc: (data: CandidateForm5Data) => void, formId: string, initialData?: CandidateForm5Data, fileStorage: { saveFile: (key: string, file: File) => void, hasFile: (key: string) => boolean, getFile: (key: string) => File | undefined } }) {
    const [form5, setForm5] = useState<CandidateForm5Data>(() => {
        const data = initialData || {} as CandidateForm5Data;
        // Se não há foto no form mas há no storage, usar a do storage
        if (!data.profilePicture && fileStorage.hasFile('foto')) {
            data.profilePicture = fileStorage.getFile('foto') || null;
        }
        return data;
    })
    const [passwordError, setPasswordError] = useState<string>('')
    const [passwordRequirements, setPasswordRequirements] = useState([
        { text: "Pelo menos 8 caracteres", valid: (form5.password || "").length >= 8 },
        { text: "Pelo menos uma letra maiúscula", valid: (/[A-Z]/.test(form5.password)) },
        { text: "Pelo menos um número", valid: (/[0-9]/.test(form5.password)) },
        { text: "Pelo menos um caractere especial", valid: (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(form5.password || "")) },
        { text: "As senhas coincidem", valid: form5.password === form5.confirmPassword },
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
        setForm5(prev => ({ ...prev, password: newPassword }))
        updatePasswordRequirements(newPassword, form5.confirmPassword || "")
    }

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const newConfirmPassword = e.target.value
        setForm5(prev => ({ ...prev, confirmPassword: newConfirmPassword }))
        updatePasswordRequirements(form5.password || "", newConfirmPassword)
    }

    const handleCroppedImage = (croppedFile: File) => {
        setForm5(prev => ({ ...prev, profilePicture: croppedFile }))
        handleFileUpload(croppedFile, 'foto')
    }

    const handleFileUpload = (file: File, tipo: string) => {
        fileStorage.saveFile(tipo, file)
    }

    const loadDefaultProfileImage = async () => {
        try {
            const response = await fetch('/img/profile-default.jpg')
            const blob = await response.blob()
            const defaultFile = new File([blob], 'profile-default.jpg', { type: 'image/jpeg' })
            handleFileUpload(defaultFile, 'foto')
        } catch (error) {
            console.warn('Erro ao carregar imagem padrão:', error)
        }
    }

    return (
        <form id={formId} className="flex-col text-start space-y-8" onSubmit={async (e) => {
            e.preventDefault();
            setPasswordError('')

            if (passwordRequirements.every(req => req.valid)) {
                if (!form5.profilePicture && !fileStorage.hasFile('foto')) {
                    await loadDefaultProfileImage()
                }
                formFunc(form5)
            } else {
                setPasswordError('Por favor, atenda a todos os requisitos de senha antes de continuar.')
            }
        }}>
            <div className="space-y-4">
                <h2 className="font-semibold text-[1.3rem]">Estamos Quase Lá!</h2>
                <p className="text-gray-700 leading-relaxed">Para finalizar seu cadastro, precisamos de uma senha segura para proteger sua conta e uma foto de perfil para que os recrutadores possam conhecê-lo melhor.</p>
            </div>

            <div className="max-w-[28rem]">
                <label className="block text-sm font-medium text-gray-700 mb-2">Foto de Perfil (Opcional)</label>
                <Suspense fallback={<div className="p-4 text-center text-gray-500">🔄 Carregando editor de imagem...</div>}>
                    <ImageCropper onCropComplete={handleCroppedImage} initialFile={form5.profilePicture || null} />
                </Suspense>
                <p className="text-sm text-gray-600 mt-2">Formatos aceitos: JPG, PNG. Tamanho máximo: 5MB</p>
                {fileStorage.hasFile('foto') && (
                    <p className="text-sm text-green-600 mt-1">✅ Foto salva: {fileStorage.getFile('foto')?.name}</p>
                )}
                {form5.profilePicture && !fileStorage.hasFile('foto') && (
                    <p className="text-sm text-blue-600 mt-1">Processando foto...</p>
                )}
            </div>
            <div className="space-y-6">
                <div className="space-y-4 max-w-[28rem]">
                    <GenericFormField id="candidate_password_register" type="password" autoComplete="new-password" required onChange={(e) => handlePasswordChange(e)} value={form5.password || ""}>Senha</GenericFormField>
                    <GenericFormField id="candidate_password_confirm_register" type="password" autoComplete="new-password" required onChange={(e) => handleConfirmPasswordChange(e)} value={form5.confirmPassword || ""}>Confirme sua Senha</GenericFormField>
                    {passwordError && (
                        <p className="text-red-600 text-sm mt-1">❌ {passwordError}</p>
                    )}
                </div>
            </div>
            <div className="bg-white border border-gray-400 rounded-xl p-4">
                <h3 className="font-medium text-[1.15rem] mb-3">Requisitos da senha</h3>
                <ul className="space-y-3">
                    {passwordRequirements.map((req, index) => (
                        <li key={index} className="flex items-center gap-3 text-base">
                            {req.valid ? (
                                <CircleCheckBig className="w-5 h-5 text-green-500" />
                            ) : (
                                <CircleX className="w-5 h-5 text-red-400" />
                            )}
                            <span className={req.valid ? "text-green-700" : "text-gray-700"}>
                                {req.text}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </form >
    )
}