import { useState, useEffect, ReactNode } from 'react';
import { AccessibilitySettings, defaultSettings, AccessibilityContext } from './accessibilityConstants';

interface AccessibilityProviderProps {
    children: ReactNode;
}

export const AccessibilityProvider = ({ children }: AccessibilityProviderProps) => {
    const [settings, setSettings] = useState<AccessibilitySettings>(() => {
        const saved = localStorage.getItem('accessibility-settings');
        return saved ? JSON.parse(saved) : defaultSettings;
    });

    useEffect(() => {
        localStorage.setItem('accessibility-settings', JSON.stringify(settings));
        applySettings(settings);
    }, [settings]);

    const applySettings = (settings: AccessibilitySettings) => {
        const root = document.documentElement;
        const body = document.body;
        
        // Font Size
        root.classList.remove('accessibility-text-sm', 'accessibility-text-lg', 'accessibility-text-xl');
        switch (settings.fontSize) {
            case 'small':
                root.classList.add('accessibility-text-sm');
                break;
            case 'large':
                root.classList.add('accessibility-text-lg');
                break;
            case 'extra-large':
                root.classList.add('accessibility-text-xl');
                break;
        }

        // Apply CSS filters for visual effects
        const filters = [];
        
        // Contrast
        if (settings.contrast === 'high') {
            filters.push('contrast(1.5)');
        } else if (settings.contrast === 'inverted') {
            filters.push('invert(1)');
        }

        // Color Blindness Filters (equilibrados - eficazes mas não excessivos)
        switch (settings.colorBlindness) {
            case 'protanopia':
                // Protanopia: dificuldade com vermelho - ajustar para tons mais perceptíveis
                filters.push('sepia(0.4) saturate(0.7) hue-rotate(-20deg) brightness(1.1)');
                break;
            case 'deuteranopia':
                // Deuteranopia: dificuldade com verde - melhorar distinção verde/vermelho
                filters.push('sepia(0.35) saturate(0.75) hue-rotate(25deg) brightness(1.05)');
                break;
            case 'tritanopia':
                // Tritanopia: dificuldade com azul - ajustar espectro azul/amarelo
                filters.push('sepia(0.4) saturate(0.8) hue-rotate(70deg) brightness(1.1)');
                break;
            case 'achromatopsia':
                // Acromatopsia: visão apenas em tons de cinza - manter contraste
                filters.push('grayscale(1) contrast(1.1) brightness(1.05)');
                break;
        }
        
        // Apply filters only to root element, not body
        const rootElement = document.getElementById('root');
        if (rootElement) {
            rootElement.style.filter = filters.length > 0 ? filters.join(' ') : '';
        }
        // Clear any filters from body
        body.style.filter = '';

        // Focus Indicator
        if (settings.focusIndicator) {
            root.classList.add('accessibility-enhanced-focus');
        } else {
            root.classList.remove('accessibility-enhanced-focus');
        }

        // Button Size
        if (settings.buttonSize === 'large') {
            root.classList.add('accessibility-large-buttons');
        } else {
            root.classList.remove('accessibility-large-buttons');
        }

        // Font Family
        root.classList.remove('accessibility-font-mono', 'accessibility-font-serif');
        if (settings.fontFamily === 'dyslexic') {
            root.classList.add('accessibility-font-mono');
        } else if (settings.fontFamily === 'serif') {
            root.classList.add('accessibility-font-serif');
        }

        // Animations
        if (!settings.animations) {
            root.classList.add('accessibility-no-animations');
        } else {
            root.classList.remove('accessibility-no-animations');
        }

        // Underline Links
        if (settings.underlineLinks) {
            root.classList.add('accessibility-underline-links');
        } else {
            root.classList.remove('accessibility-underline-links');
        }

        // Remove Gradients
        if (settings.removeGradients) {
            root.classList.add('accessibility-no-gradients');
        } else {
            root.classList.remove('accessibility-no-gradients');
        }
    };

    const updateSetting = <K extends keyof AccessibilitySettings>(
        key: K,
        value: AccessibilitySettings[K]
    ) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const resetSettings = () => {
        setSettings(defaultSettings);
    };

    return (
        <AccessibilityContext.Provider value={{ settings, updateSetting, resetSettings }}>
            {children}
        </AccessibilityContext.Provider>
    );
};