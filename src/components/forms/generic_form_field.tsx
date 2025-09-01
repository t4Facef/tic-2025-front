/*
  COMO USAR O GenericFormField:
  
  Exemplos:
  - Texto: <GenericFormField id="nome">Nome</GenericFormField>
  - Select: <GenericFormField id="estado" type="select" options={["SP", "RJ"]}>Estado</GenericFormField>
  - Radio: <GenericFormField id="genero" type="radio" options={["M", "F"]}>Gênero</GenericFormField>
  - Checkbox: <GenericFormField id="skills" type="checkbox" options={["JS", "React"]}>Habilidades</GenericFormField>
  - Textarea: <GenericFormField id="desc" type="textarea">Descrição</GenericFormField>
*/

interface GenericFormFieldProps {
    children?: React.ReactNode;
    id: string;
    type?: string;
    placeholder?: string;
    options?: string[] | {name: string, value: string}[];
    autoComplete?: string;
}

export default function GenericFormField({children, id, placeholder, type = "text", options, autoComplete}: GenericFormFieldProps){
    const baseClass = "border border-gray-400 rounded-md p-2";
    
    // SELECT
    if (type === "select") {
        return (
            <div className="flex flex-col w-full">
                <label htmlFor={id}>{children}</label>
                <select name={id} id={id} className={baseClass}>
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
                <span className="mb-2">{children}</span>
                <div className="flex gap-4">
                    {options?.map((opt, i) => {
                        const value = typeof opt === 'string' ? opt : opt.value;
                        const label = typeof opt === 'string' ? opt : opt.name;
                        return (
                            <label key={i} className="flex items-center gap-1">
                                <input type="radio" name={id} value={value} />
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
                <span className="mb-2">{children}</span>
                <div className="flex flex-wrap gap-4">
                    {options?.map((opt, i) => {
                        const value = typeof opt === 'string' ? opt : opt.value;
                        const label = typeof opt === 'string' ? opt : opt.name;
                        return (
                            <label key={i} className="flex items-center gap-1">
                                <input type="checkbox" name={`${id}_${i}`} value={value} />
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
                <label htmlFor={id}>{children}</label>
                <textarea name={id} id={id} placeholder={placeholder} className={`${baseClass} min-h-[100px]`} />
            </div>
        );
    }
    
    // INPUT PADRÃO (text, email, password, date, etc.)
    return (
        <div className="flex flex-col w-full">
            <label htmlFor={id}>{children}</label>
            <input type={type} name={id} id={id} placeholder={placeholder} autoComplete={autoComplete} className={baseClass} />
        </div>
    );
}