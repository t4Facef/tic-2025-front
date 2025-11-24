import { useRef, useState } from 'react';
import ReactCrop, { Crop, PixelCrop, convertToPixelCrop } from 'react-image-crop';
import { useDebounceEffect } from '../../utils/useDebounceEffect';
import { canvasPreview } from '../../utils/canvasPreview';
import 'react-image-crop/dist/ReactCrop.css';

interface CropModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageSrc: string;
    onCropComplete: (croppedFile: File) => void;
}

export default function CropModal({ isOpen, onClose, imageSrc, onCropComplete }: CropModalProps) {
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [scale] = useState(1);
    const [rotate] = useState(0);

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        const { width, height } = e.currentTarget;
        const size = Math.min(width, height) * 0.8;
        const newCrop = {
            unit: 'px' as const,
            width: size,
            height: size,
            x: (width - size) / 2,
            y: (height - size) / 2,
        };
        setCrop(newCrop);
        setCompletedCrop(convertToPixelCrop(newCrop, width, height));
    }

    async function handleConfirmCrop() {
        const image = imgRef.current;
        const previewCanvas = previewCanvasRef.current;
        if (!image || !previewCanvas || !completedCrop) {
            return;
        }

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        const offscreen = new OffscreenCanvas(
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
        );
        const ctx = offscreen.getContext('2d');
        if (!ctx) {
            return;
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
        );

        const blob = await offscreen.convertToBlob({
            type: 'image/png',
        });

        const file = new File([blob], 'cropped-image.png', { type: 'image/png' });
        onCropComplete(file);
        onClose();
    }

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    scale,
                    rotate,
                );
            }
        },
        100,
        [completedCrop, scale, rotate],
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-6xl max-h-[95vh] overflow-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Ajustar Foto de Perfil</h3>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ×
                    </button>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    <div className="flex-1">
                        <h4 className="text-sm font-medium mb-3">Ajustar imagem:</h4>
                        <div className="overflow-auto max-h-[50vh] lg:max-h-[60vh]">
                            <ReactCrop
                                crop={crop}
                                onChange={(_, percentCrop) => setCrop(percentCrop)}
                                onComplete={(c) => setCompletedCrop(c)}
                                aspect={1}
                                circularCrop
                            >
                                <img
                                    ref={imgRef}
                                    alt="Ajustar imagem"
                                    src={imageSrc}
                                    style={{ 
                                        transform: `scale(${scale}) rotate(${rotate}deg)`,
                                        maxWidth: '100%',
                                        height: 'auto'
                                    }}
                                    onLoad={onImageLoad}
                                />
                            </ReactCrop>
                        </div>
                    </div>
                    
                    <div className="flex-shrink-0 lg:w-64">
                        <h4 className="text-sm font-medium mb-3">Preview:</h4>
                        <div className="flex flex-col items-center space-y-4">
                            <canvas
                                ref={previewCanvasRef}
                                className="border border-gray-300 rounded-full"
                                style={{
                                    objectFit: 'contain',
                                    width: '150px',
                                    height: '150px',
                                }}
                            />
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                    <button 
                        onClick={onClose}
                        className="w-full sm:w-auto px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={handleConfirmCrop}
                        disabled={!completedCrop}
                        className="w-full sm:w-auto px-4 py-2 bg-blue3 text-white rounded hover:bg-blue3H disabled:opacity-50"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}