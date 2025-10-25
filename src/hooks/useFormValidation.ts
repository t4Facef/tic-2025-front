import { useState } from 'react';

interface ValidationRule {
    required?: boolean;
    message?: string;
    validator?: (value: string) => boolean;
}

interface ValidationRules {
    [key: string]: ValidationRule;
}

interface ValidationErrors {
    [key: string]: string;
}

export function useFormValidation(rules: ValidationRules) {
    const [errors, setErrors] = useState<ValidationErrors>({});

    const validateField = (fieldName: string, value: string): string => {
        const rule = rules[fieldName];
        if (!rule) return '';

        // Verificar se é obrigatório
        if (rule.required && (!value || value.trim() === '' || value === 'Selecione')) {
            return rule.message || 'Este campo é obrigatório';
        }

        // Verificar validador customizado
        if (rule.validator && value && !rule.validator(value)) {
            return rule.message || 'Valor inválido';
        }

        return '';
    };

    const validateForm = (formData: Record<string, string>): boolean => {
        const newErrors: ValidationErrors = {};
        let isValid = true;

        Object.keys(rules).forEach(fieldName => {
            const error = validateField(fieldName, formData[fieldName] || '');
            if (error) {
                newErrors[fieldName] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const clearErrors = () => {
        setErrors({});
    };

    const clearFieldError = (fieldName: string) => {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[fieldName];
            return newErrors;
        });
    };

    return {
        errors,
        validateForm,
        validateField,
        clearErrors,
        clearFieldError,
        setErrors
    };
}