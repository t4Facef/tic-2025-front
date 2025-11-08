import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, RotateCcw } from 'lucide-react';
import { useAccessibility } from '../../contexts/accessibilityConstants';

export default function AccessibilityButton() {
    const [isOpen, setIsOpen] = useState(false);
    const { settings, updateSetting, resetSettings } = useAccessibility();

    return createPortal(
        <>
            {/* Botão flutuante */}
            <img 
                src="/img/acessibilidade-ico.png" 
                alt="Acessibilidade" 
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-[9998] w-16 h-16 rounded-full shadow-lg border-2 border-gray-400/60 hover:border-gray-300 hover:scale-105 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue3 focus:ring-offset-2"
                style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9998 }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setIsOpen(true)}
                aria-label="Abrir configurações de acessibilidade"
                title="Configurações de Acessibilidade"
            />

            {/* Modal */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50"
                    style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999 }}
                >
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="text-xl font-semibold text-blue3">Configurações de Acessibilidade</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                aria-label="Fechar"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            {/* Tamanho da Fonte */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Tamanho da Fonte
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        { value: 'small', label: 'Pequena' },
                                        { value: 'normal', label: 'Normal' },
                                        { value: 'large', label: 'Grande' },
                                        { value: 'extra-large', label: 'Extra Grande' }
                                    ].map(option => (
                                        <button
                                            key={option.value}
                                            onClick={() => updateSetting('fontSize', option.value as any)}
                                            className={`p-2 text-sm rounded border transition-colors ${
                                                settings.fontSize === option.value
                                                    ? 'bg-blue3 text-white border-blue3'
                                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Contraste */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Contraste
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { value: 'normal', label: 'Normal' },
                                        { value: 'high', label: 'Alto' },
                                        { value: 'inverted', label: 'Invertido' }
                                    ].map(option => (
                                        <button
                                            key={option.value}
                                            onClick={() => updateSetting('contrast', option.value as any)}
                                            className={`p-2 text-sm rounded border transition-colors ${
                                                settings.contrast === option.value
                                                    ? 'bg-blue3 text-white border-blue3'
                                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Daltonismo */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Suporte para Daltonismo
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        { value: 'none', label: 'Nenhum' },
                                        { value: 'protanopia', label: 'Protanopia' },
                                        { value: 'deuteranopia', label: 'Deuteranopia' },
                                        { value: 'tritanopia', label: 'Tritanopia' },
                                        { value: 'achromatopsia', label: 'Acromatopsia' }
                                    ].map(option => (
                                        <button
                                            key={option.value}
                                            onClick={() => updateSetting('colorBlindness', option.value as any)}
                                            className={`p-2 text-sm rounded border transition-colors ${
                                                settings.colorBlindness === option.value
                                                    ? 'bg-blue3 text-white border-blue3'
                                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Fonte */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Tipo de Fonte
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { value: 'default', label: 'Padrão' },
                                        { value: 'dyslexic', label: 'Dislexia' },
                                        { value: 'serif', label: 'Serif' }
                                    ].map(option => (
                                        <button
                                            key={option.value}
                                            onClick={() => updateSetting('fontFamily', option.value as any)}
                                            className={`p-2 text-sm rounded border transition-colors ${
                                                settings.fontFamily === option.value
                                                    ? 'bg-blue3 text-white border-blue3'
                                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Opções de Toggle */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-700">
                                        Animações
                                    </label>
                                    <button
                                        onClick={() => updateSetting('animations', !settings.animations)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            settings.animations ? 'bg-blue3' : 'bg-gray-300'
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                settings.animations ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-700">
                                        Sublinhar Links
                                    </label>
                                    <button
                                        onClick={() => updateSetting('underlineLinks', !settings.underlineLinks)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            settings.underlineLinks ? 'bg-blue3' : 'bg-gray-300'
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                settings.underlineLinks ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-700">
                                        Foco Aprimorado
                                    </label>
                                    <button
                                        onClick={() => updateSetting('focusIndicator', !settings.focusIndicator)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            settings.focusIndicator ? 'bg-blue3' : 'bg-gray-300'
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                settings.focusIndicator ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-700">
                                        Botões Grandes
                                    </label>
                                    <button
                                        onClick={() => updateSetting('buttonSize', settings.buttonSize === 'large' ? 'normal' : 'large')}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            settings.buttonSize === 'large' ? 'bg-blue3' : 'bg-gray-300'
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                settings.buttonSize === 'large' ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-700">
                                        Remover Gradientes
                                    </label>
                                    <button
                                        onClick={() => updateSetting('removeGradients', !settings.removeGradients)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            settings.removeGradients ? 'bg-blue3' : 'bg-gray-300'
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                settings.removeGradients ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Reset Button */}
                            <div className="pt-4 border-t">
                                <button
                                    onClick={resetSettings}
                                    className="flex items-center gap-2 w-full justify-center p-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded transition-colors"
                                >
                                    <RotateCcw size={16} />
                                    Restaurar Padrões
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>,
        document.body
    );
}