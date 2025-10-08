import { useState } from "react";
import CompanieForm3 from "../components/forms/register/companie_form3";
import { CompanieForm3Data } from "../types/forms/companie";

export default function TestPage() {
    const [formData, setFormData] = useState<CompanieForm3Data>({ supportCapabilities: [] })
    
    const handleFormSubmit = (data: CompanieForm3Data) => {
        console.log('Form submitted:', data)
        setFormData(data)
    }
    
    return (
        <div className="flex flex-col items-center justify-center p-8 m-16 bg-blue-200 space-y-4">
            <h1 className="text-2xl font-bold">Teste CompanieForm3</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                <CompanieForm3 
                    formFunc={handleFormSubmit} 
                    formId="testForm3" 
                    initialData={formData}
                />
                
                <button 
                    type="submit" 
                    form="testForm3"
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Testar Submit
                </button>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg w-full max-w-2xl">
                <h3 className="font-semibold mb-2">Dados do Form:</h3>
                <pre className="text-sm">{JSON.stringify(formData, null, 2)}</pre>
            </div>
        </div>
    );
}