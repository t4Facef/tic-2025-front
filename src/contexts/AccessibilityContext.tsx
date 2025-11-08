import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilitySettings {
    fontSize: 'small' | 'normal' | 'large' | 'extra-large';
    contrast: 'normal' | 'high' | 'inverted';
    colorBlindness: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';
    fontFamily: 'default' | 'dyslexic' | 'serif';
    animations: boolean;
    underlineLinks: boolean;
    focusIndicator: boolean;
    buttonSize: 'normal' | 'large';
    removeGradients: boolean;
}

interface AccessibilityContextType {
    settings: AccessibilitySettings;
    updateSetting: <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => void;
    resetSettings: () => void;
}

const defaultSettings: AccessibilitySettings = {
    fontSize: 'normal',
    contrast: 'normal',
    colorBlindness: 'none',
    fontFamily: 'default',
    animations: true,
    underlineLinks: false,
    focusIndicator: true,
    buttonSize: 'normal',
    removeGradients: false
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
    const context = useContext(AccessibilityContext);
    if (!context) {
        throw new Error('useAccessibility deve ser usado dentro de AccessibilityProvider');
    }
    return context;
};

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
        let filters = [];
        
        // Contrast
        if (settings.contrast === 'high') {
            filters.push('contrast(1.5)');
        } else if (settings.contrast === 'inverted') {
            filters.push('invert(1)');
        }

        // Color Blindness Filters (suavizados)
        switch (settings.colorBlindness) {
            case 'protanopia':
                filters.push('sepia(0.3) saturate(0.9) hue-rotate(-10deg)');
                break;
            case 'deuteranopia':
                filters.push('sepia(0.2) saturate(0.8) hue-rotate(15deg)');
                break;
            case 'tritanopia':
                filters.push('sepia(0.3) saturate(0.85) hue-rotate(90deg)');
                break;
            case 'achromatopsia':
                filters.push('grayscale(0.8)');
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