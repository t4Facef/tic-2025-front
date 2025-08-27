/*
  COMO USAR O GenericFormField:
  
  Props:
  - children: Texto do label (ex: "Nome", "Email")
  - id: ID único do campo (ex: "nome", "email") só que bem especifico
  - type: Tipo do input (ex: "text", "email", "password") - padrão é "text"
*/

interface GenericFormFieldProps {
    children: React.ReactNode;  // Texto que aparece no label
    id: string;                 // ID único do campo
    type?: string;              // Tipo do input (text, email, password, etc.)
    placeholder?: string;
}

export default function GenericFormField({children, id, placeholder, type = "text"}: GenericFormFieldProps){
    return (
        <div className="flex flex-col w-full">
            <label htmlFor={id}>{children}</label>
            <input type={type} name={id} id={id} placeholder={placeholder} className="border border-gray-400 rounded-md p-2"/>
        </div>
    )
}