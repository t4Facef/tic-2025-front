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
}

export default function GenericFormField({children, id, placeholder, options, autoComplete, onChange, value, type = "text", textOrientation = 1, disabled = false}: GenericFormFieldProps){
    const [viewPassword, setViewPassword] = useState(true)

    // Mapeamento de orientação de texto
    const textAlignClasses = {
        1: "text-left",
        2: "text-center", 
        3: "text-right"
    };

    
    const textAlign = textAlignClasses[textOrientation];
    const baseClass = "border border-gray-400 rounded-md p-2";
    
    // SELECT
    if (type === "select") {
        return (
            <div className="flex flex-col w-full">
                <label htmlFor={id} className={textAlign}>{children}</label>
                <select name={id} id={id} className={`${baseClass} ${textAlign} cursor-pointer`} onChange={onChange} value={value}>
                    {placeholder && <option value="">{placeholder}</option>}
                    {options?.map((opt, i) => (
                        <option key={i} value={typeof opt === 'string' ? opt : opt.value}>
                            {typeof opt === 'string' ? opt : opt.name}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
    
    // RADIO
    if (type === "radio") {
        return (
            <div className="flex flex-col w-full">
                <span className={`mb-2 ${textAlign}`}>{children}</span>
                <div className="flex gap-4">
                    {options?.map((opt, i) => {
                        const value = typeof opt === 'string' ? opt : opt.value;
                        const label = typeof opt === 'string' ? opt : opt.name;
                        return (
                            <label key={i} className="flex items-center gap-1">
                                <input type="radio" name={id} value={value} onChange={onChange} />
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
                <span className={`mb-2 ${textAlign}`}>{children}</span>
                <div className="flex flex-wrap gap-4">
                    {options?.map((opt, i) => {
                        const value = typeof opt === 'string' ? opt : opt.value;
                        const label = typeof opt === 'string' ? opt : opt.name;
                        return (
                            <label key={i} className="flex items-center gap-1">
                                <input type="checkbox" name={`${id}_${i}`} value={value} onChange={onChange} />
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
                <label htmlFor={id} className={textAlign}>{children}</label>
                <textarea name={id} id={id} placeholder={placeholder} className={`${baseClass} min-h-[100px] ${textAlign}`} onChange={onChange} value={value} />
            </div>
        );
    }
        
    // FILE
    if (type === "file") {
        return (
            <div className="flex flex-col w-full">
                <label htmlFor={id} className={textAlign}>{children}</label>
                <input type="file" name={id} id={id} className={`${baseClass} bg-white cursor-pointer`} onChange={onChange} />
            </div>
        );
    }

    // PASSWORD
    if (type === "password"){
        const toggleView = () => setViewPassword(!viewPassword)
        const passwordType = viewPassword ? "password" : "text"

        return (
            <div className="flex flex-col w-full">
                <label htmlFor={id} className={textAlign}>{children}</label>
                <div className="relative">
                    <input type={passwordType} name={id} id={id} placeholder={placeholder} autoComplete={autoComplete} className={`${baseClass} pr-10 w-full`} onChange={onChange} value={value} />
                    <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={toggleView}>
                        {viewPassword ? <EyeClosed size={20}/> : <Eye size={20}/>}
                    </button>
                </div>
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
                <label htmlFor={id} className={textAlign}>{children}</label>
                <input 
                    type="text" 
                    name={id} 
                    id={id} 
                    placeholder={placeholder || "R$ 0,00"} 
                    className={`${baseClass} ${textAlign}`} 
                    onChange={handleCurrencyChange}
                    value={value || "R$ "}
                />
            </div>
        );
    }
    
    // INPUT PADRÃO (text, email, password, date, etc.)
    return (
        <div className="flex flex-col w-full">
            <label htmlFor={id} className={textAlign}>{children}</label>
            <input type={type} name={id} id={id} placeholder={placeholder} autoComplete={autoComplete} className={`${baseClass} ${textAlign} ${type === 'date' ? 'cursor-pointer' : ''} ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}`} onChange={onChange} value={value} disabled={disabled} />
        </div>
    );
}