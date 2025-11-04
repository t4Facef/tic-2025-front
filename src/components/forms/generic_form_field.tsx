/*
  COMO USAR O GenericFormField:
  
  Exemplos:
  - Texto: <GenericFormField id="nome">Nome</GenericFormField>
  - Select: <GenericFormField id="estado" type="select" options={["SP", "RJ"]}>Estado</GenericFormField>
  - Radio: <GenericFormField id="genero" type="radio" options={["M", "F"]}>Gênero</GenericFormField>
  - Checkbox: <GenericFormField id="skills" type="checkbox" options={["JS", "React"]}>Habilidades</GenericFormField>
  - Textarea: <GenericFormField id="desc" type="textarea">Descrição</GenericFormField>
*/

import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

interface GenericFormFieldProps {
    children?: React.ReactNode;
    id: string;
    type?: string;
    placeholder?: string;
    options?: string[] | {name: string, value: string}[];
    textOrientation?: 1 | 2 | 3;
    autoComplete?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    value?: string;
    disabled?: boolean;
    itemsOrientation?: 1 | 2;
    required?: boolean;
    accept?: string;
    rows?: number;
    error?: string;
}

export default function GenericFormField({children, id, placeholder, options, autoComplete, onChange, value, type = "text", textOrientation = 1, itemsOrientation = 1, disabled = false, required = false, accept, rows, error}: GenericFormFieldProps){
    const [viewPassword, setViewPassword] = useState(true)

    // Mapeamento de orientação de texto
    const textAlignClasses = {
        1: "text-left",
        2: "text-center", 
        3: "text-right"
    };

    const itemsOrientationClasses = {
        1: "flex flex-row gap-4",
        2: "flex flex-col gap-2"
    }

    
    const textAlign = textAlignClasses[textOrientation];
    const baseClass = `border ${error ? 'border-red-500' : 'border-gray-400'} rounded-md p-2`;
    
    // SELECT
    if (type === "select") {
        return (
            <div className="flex flex-col w-full">
                <label htmlFor={id} className={textAlign}>
                    {children}
                    {required && <span className="text-black ml-1">*</span>}
                </label>
                <select name={id} id={id} className={`${baseClass} ${textAlign} cursor-pointer`} onChange={onChange} value={value} required={required}>
                    {placeholder && <option value="">{placeholder}</option>}
                    {options?.map((opt, i) => (
                        <option key={i} value={typeof opt === 'string' ? opt : opt.value}>
                            {typeof opt === 'string' ? opt : opt.name}
                        </option>
                    ))}
                </select>
                {error && <p className="text-red-600 text-sm mt-1">❌ {error}</p>}
            </div>
        );
    }
    
    // RADIO
    if (type === "radio") {
        return (
            <div className="flex flex-col w-full">
                <span className={`mb-2 ${textAlign} font-semibold`}>
                    {children}
                    {required && <span className="text-black ml-1">*</span>}
                </span>
                <div className={`${itemsOrientationClasses[itemsOrientation]}`}>
                    {options?.map((opt, i) => {
                        const optValue = typeof opt === 'string' ? opt : opt.value;
                        const label = typeof opt === 'string' ? opt : opt.name;
                        return (
                            <label key={i} className="flex items-center gap-1">
                                <input 
                                    type="radio" 
                                    name={id} 
                                    value={optValue} 
                                    checked={value === optValue}
                                    onChange={onChange} 
                                    required={required} 
                                />
                                {label}
                            </label>
                        );
                    })}
                </div>
            </div>
        );
    }
    
    // CHECKBOX
    if (type === "checkbox") {
        return (
            <div className="flex flex-col w-full">
                <span className={`mb-2 ${textAlign} font-semibold`}>
                    {children}
                    {required && <span className="text-black ml-1">*</span>}
                </span>
                <div className={`${itemsOrientationClasses[itemsOrientation]}`}>
                    {options?.map((opt, i) => {
                        const value = typeof opt === 'string' ? opt : opt.value;
                        const label = typeof opt === 'string' ? opt : opt.name;
                        return (
                            <label key={i} className="flex items-center gap-1">
                                <input type="checkbox" name={`${id}_${i}`} value={value} onChange={onChange} required={required} />
                                {label}
                            </label>
                        );
                    })}
                </div>
            </div>
        );
    }
    
    // TEXTAREA
    if (type === "textarea") {
        return (
            <div className="flex flex-col w-full">
                <label htmlFor={id} className={textAlign}>
                    {children}
                    {required && <span className="text-black ml-1">*</span>}
                </label>
                <textarea name={id} id={id} placeholder={placeholder} className={`${baseClass} min-h-[100px] ${textAlign}`} onChange={onChange} value={value} required={required} rows={rows} />
                {error && <p className="text-red-600 text-sm mt-1">❌ {error}</p>}
            </div>
        );
    }
        
    // FILE
    if (type === "file") {
        return (
            <div className="flex flex-col w-full">
                <label htmlFor={id} className={textAlign}>
                    {children}
                    {required && <span className="text-black ml-1">*</span>}
                </label>
                <div className="relative">
                    <input 
                        type="file" 
                        name={id} 
                        id={id} 
                        accept={accept} 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                        onChange={onChange} 
                        required={required} 
                    />
                    <div className={`${baseClass} bg-white cursor-pointer flex items-center justify-center py-6 text-gray-700 text-lg font-medium hover:bg-gray-50 transition-colors`}>
                        📁 Clique para selecionar arquivo
                    </div>
                </div>
                {error && <p className="text-red-600 text-sm mt-1">❌ {error}</p>}
            </div>
        );
    }

    // PASSWORD
    if (type === "password"){
        const toggleView = () => setViewPassword(!viewPassword)
        const passwordType = viewPassword ? "password" : "text"

        return (
            <div className="flex flex-col w-full">
                <label htmlFor={id} className={textAlign}>
                    {children}
                    {required && <span className="text-black ml-1">*</span>}
                </label>
                <div className="relative">
                    <input type={passwordType} name={id} id={id} placeholder={placeholder} autoComplete={autoComplete} className={`${baseClass} pr-10 w-full`} onChange={onChange} value={value} required={required} />
                    <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={toggleView}>
                        {viewPassword ? <EyeClosed size={20}/> : <Eye size={20}/>}
                    </button>
                </div>
                {error && <p className="text-red-600 text-sm mt-1">❌ {error}</p>}
            </div>
        )
    }
    
    
    // CURRENCY (for salary formatting)
    if (type === "currency") {
        const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value;
            
            // Remove tudo exceto números
            const numbers = inputValue.replace(/[^\d]/g, '');
            
            let formattedValue;
            
            // Se não há números, mantém apenas "R$ "
            if (!numbers) {
                formattedValue = "R$ ";
            } else {
                // Converte centavos para reais
                const valueInReais = parseInt(numbers) / 100;
                formattedValue = valueInReais.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2
                });
            }
            
            // Cria evento com valor formatado
            const syntheticEvent = {
                ...e,
                target: {
                    ...e.target,
                    value: formattedValue
                }
            };
            
            if (onChange) onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>);
        };

        return (
            <div className="flex flex-col w-full">
                <label htmlFor={id} className={textAlign}>
                    {children}
                    {required && <span className="text-black ml-1">*</span>}
                </label>
                <input 
                    type="text" 
                    name={id} 
                    id={id} 
                    placeholder={placeholder || "R$ 0,00"} 
                    className={`${baseClass} ${textAlign}`} 
                    onChange={handleCurrencyChange}
                    value={value || "R$ "}
                    required={required}
                />
                {error && <p className="text-red-600 text-sm mt-1">❌ {error}</p>}
            </div>
        );
    }
    
    // INPUT PADRÃO (text, email, password, date, etc.)
    return (
        <div className="flex flex-col w-full">
            <label htmlFor={id} className={textAlign}>
                {children}
                {required && <span className="text-black ml-1">*</span>}
            </label>
            <input type={type} name={id} id={id} placeholder={placeholder} autoComplete={autoComplete} className={`${baseClass} ${textAlign} ${type === 'date' ? 'cursor-pointer' : ''} ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}`} onChange={onChange} value={value} disabled={disabled} required={required} />
            {error && <p className="text-red-600 text-sm mt-1">❌ {error}</p>}
        </div>
    );
}