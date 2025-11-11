import { useState, useEffect } from 'react';
import CropModal from './crop_modal';

interface ImageCropperProps {
    onCropComplete?: (croppedFile: File) => void;
    initialFile?: File | null;
}

export default function ImageCropper({ onCropComplete, initialFile }: ImageCropperProps) {
    const [imgSrc, setImgSrc] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [croppedFile, setCroppedFile] = useState<File | null>(initialFile || null);
    const [previewUrl, setPreviewUrl] = useState('');

    // Restaurar preview se há arquivo inicial
    useEffect(() => {
        if (initialFile && !croppedFile) {
            setPreviewUrl(URL.createObjectURL(initialFile));
            setCroppedFile(initialFile);
        }
    }, [initialFile, croppedFile]);
    
    // Salvar arquivo inicial apenas uma vez
    useEffect(() => {
        if (initialFile && onCropComplete && !croppedFile) {
            onCropComplete(initialFile);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialFile]); // Intencionalmente omitindo onCropComplete e croppedFile para evitar loops

    function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                const result = reader.result?.toString() || '';
                setImgSrc(result);
                setIsModalOpen(true);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const handleCropComplete = (file: File) => {
        setCroppedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        if (onCropComplete) {
            onCropComplete(file);
        }
    };

    const handleChangeImage = () => {
        setCroppedFile(null);
        setPreviewUrl('');
        setImgSrc('');
    };

    if (croppedFile && previewUrl) {
        return (
            <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border border-gray-200 flex justify-center">
                    <img
                        src={previewUrl}
                        alt="Foto de perfil"
                        className="w-24 h-24 rounded-full border border-gray-300 object-cover"
                    />
                </div>
                <button 
                    onClick={handleChangeImage}
                    className="text-blue3 text-sm hover:text-blue3H underline"
                >
                    Alterar imagem
                </button>
            </div>
        );
    }

    return (
        <>
            <input 
                type="file" 
                accept="image/*" 
                onChange={onSelectFile}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue3 file:text-white hover:file:bg-blue3H"
            />
            
            <CropModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                imageSrc={imgSrc}
                onCropComplete={handleCropComplete}
            />
        </>
    );
}