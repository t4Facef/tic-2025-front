// [TODO] - Adicionar pacote node que permite editar a foto antes de enviar (a foto deve ser um quadrado perfeito pra não dar problema com o rounded-full)

import { useRef, useState } from "react";
import { CandidateForm5Data } from "../../../types/forms/candidate";
import GenericFormField from "../generic_form_field";
import ReactCrop, {
    Crop,
    PixelCrop,
    convertToPixelCrop,
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { useDebounceEffect } from "../../../utils/useDebounceEffect";
import { canvasPreview } from "../../../utils/canvasPreview";


export default function CandidateForm5({ formFunc, formId, initialData }: { formFunc: (data: CandidateForm5Data) => void, formId: string, initialData?: CandidateForm5Data }) {
    const [form5, setForm5] = useState<CandidateForm5Data>(initialData || {} as CandidateForm5Data)
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

    // Organizar melhor depois

    const [imgSrc, setImgSrc] = useState('')
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const hiddenAnchorRef = useRef<HTMLAnchorElement>(null)
    const blobUrlRef = useRef('')
    const [crop, setCrop] = useState<Crop>()
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    const [scale] = useState(1)
    const [rotate] = useState(0)

    function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined) // Makes crop preview update between images.
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
            )
            reader.readAsDataURL(e.target.files[0])
        }
    }

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        const { width, height } = e.currentTarget
        const size = Math.min(width, height) * 0.9 // pega 90% do menor lado
        const newCrop = {
            unit: 'px' as const,
            width: size,
            height: size,
            x: (width - size) / 2,
            y: (height - size) / 2,
        }
        setCrop(newCrop)
        setCompletedCrop(convertToPixelCrop(newCrop, width, height))
    }

    async function onDownloadCropClick() {
        const image = imgRef.current
        const previewCanvas = previewCanvasRef.current
        if (!image || !previewCanvas || !completedCrop) {
            throw new Error('Crop canvas does not exist')
        }

        // This will size relative to the uploaded image
        // size. If you want to size according to what they
        // are looking at on screen, remove scaleX + scaleY
        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height

        const offscreen = new OffscreenCanvas(
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
        )
        const ctx = offscreen.getContext('2d')
        if (!ctx) {
            throw new Error('No 2d context')
        }

        ctx.drawImage(
            previewCanvas,
            0,
            0,
            previewCanvas.width,
            previewCanvas.height,
            0,
            0,
            offscreen.width,
            offscreen.height,
        )
        // You might want { type: "image/jpeg", quality: <0 to 1> } to
        // reduce image size
        const blob = await offscreen.convertToBlob({
            type: 'image/png',
        })

        if (blobUrlRef.current) {
            URL.revokeObjectURL(blobUrlRef.current)
        }
        blobUrlRef.current = URL.createObjectURL(blob)

        if (hiddenAnchorRef.current) {
            hiddenAnchorRef.current.href = blobUrlRef.current
            hiddenAnchorRef.current.click()
        }
    }

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                // We use canvasPreview as it's much faster than imgPreview.
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    scale,
                    rotate,
                )
            }
        },
        100,
        [completedCrop, scale, rotate],
    )




    return (
        <form id={formId} className="flex-col text-start space-y-8" onSubmit={(e) => {
            e.preventDefault();
            setPasswordError('')

            if (passwordRequirements.every(req => req.valid)) {
                formFunc(form5)
            } else {
                setPasswordError('Por favor, atenda a todos os requisitos de senha antes de continuar.')
            }
        }}>
            <div className="space-y-4">
                <h2 className="font-semibold text-[1.3rem]">Estamos Quase Lá!</h2>
                <p className="text-gray-700 leading-relaxed">Para finalizar seu cadastro, precisamos de uma senha segura para proteger sua conta e uma foto de perfil para que os recrutadores possam conhecê-lo melhor.</p>
            </div>

            <input type="file" accept="image/*" onChange={onSelectFile} />
            
            {
                !!imgSrc && (
                    <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={1}
                        locked
                    // circularCrop
                    >
                        <img
                            ref={imgRef}
                            alt="Crop me"
                            src={imgSrc}
                            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                            onLoad={onImageLoad}
                        />
                    </ReactCrop>
                )
            }
            {
                !!completedCrop && (
                    <div>
                        <div>
                            <canvas
                                ref={previewCanvasRef}
                                style={{
                                    border: '1px solid black',
                                    objectFit: 'contain',
                                    width: completedCrop.width,
                                    height: completedCrop.height,
                                }}
                            />
                        </div>
                        <div>
                            <button onClick={onDownloadCropClick}>Download Crop</button>
                            <div style={{ fontSize: 12, color: '#666' }}>
                                If you get a security error when downloading try opening the
                                Preview in a new tab (icon near top right).
                            </div>
                            <a
                                href="#hidden"
                                ref={hiddenAnchorRef}
                                download
                                style={{
                                    position: 'absolute',
                                    top: '-200vh',
                                    visibility: 'hidden',
                                }}
                            >
                                Hidden download
                            </a>
                        </div>
                    </div>
                )}
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
        </form >
    )
}