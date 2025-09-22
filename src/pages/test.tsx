import { useState } from 'react';
import CandidateForm5 from '../components/forms/register/candidate_form5';
import { CandidateForm5Data } from '../types/forms/candidate';

export default function TestPage() {
    const [formData, setFormData] = useState<CandidateForm5Data>({} as CandidateForm5Data);

    const handleFormSubmit = (data: CandidateForm5Data) => {
        console.log('Form submitted:', data);
        setFormData(data);
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Página de Testes</h1>
            
            <div className="bg-blue1 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Teste do CandidateForm5</h2>
                <CandidateForm5 
                    formFunc={handleFormSubmit}
                    formId="testForm"
                />
                
                <button 
                    type="submit" 
                    form="testForm"
                    className="mt-4 bg-blue3 text-white px-6 py-2 rounded hover:bg-blue3H"
                >
                    Testar Submit
                </button>
            </div>

            {Object.keys(formData).length > 0 && (
                <div className="mt-8 bg-gray-100 p-4 rounded">
                    <h3 className="font-semibold mb-2">Dados do Formulário:</h3>
                    <pre className="text-sm">{JSON.stringify(formData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}