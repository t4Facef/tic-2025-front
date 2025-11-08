import { createContext, useContext } from 'react';

export interface AccessibilitySettings {
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

export interface AccessibilityContextType {
    settings: AccessibilitySettings;
    updateSetting: <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => void;
    resetSettings: () => void;
}

export const defaultSettings: AccessibilitySettings = {
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

export const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
    const context = useContext(AccessibilityContext);
    if (!context) {
        throw new Error('useAccessibility deve ser usado dentro de AccessibilityProvider');
    }
    return context;
};