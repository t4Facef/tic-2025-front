import { useState } from "react";
import { CompanieForm3Data } from "../../../types/forms/companie";
import GenericFormField from "../generic_form_field";

export default function CompanieForm3({ formFunc, formId, initialData }: { formFunc: (data: CompanieForm3Data) => void, formId: string, initialData?: CompanieForm3Data }) {
    const [form3, setForm3] = useState<CompanieForm3Data>(initialData || {} as CompanieForm3Data)

    return (
        <form id={formId} className="flex-col text-start space-y-6" onSubmit={(e) => {
            e.preventDefault()
            formFunc(form3)
        }}>
            <div className="space-y-4">
                <h2 className="font-semibold text-[1.3rem]">Perfil da Empresa</h2>
                <p className="text-gray-700 leading-relaxed">Conte-nos mais sobre sua empresa para criar um perfil atrativo para os candidatos.</p>
            </div>

            <div className="flex gap-8">
                <GenericFormField 
                    id="companie_employees_register" 
                    type="number" 
                    placeholder="Ex: 50" 
                    required 
                    onChange={(e) => setForm3((prev) => ({ ...prev, employeeCount: e.target.value }))} 
                    value={form3.employeeCount || ""}
                >
                    Número total de funcionários
                </GenericFormField>
                <GenericFormField 
                    id="companie_employees_pcd_register" 
                    type="number" 
                    placeholder="Ex: 5" 
                    onChange={(e) => setForm3((prev) => ({ ...prev, employeePcdCount: e.target.value }))} 
                    value={form3.employeePcdCount || ""}
                >
                    Funcionários PCDs atuais
                </GenericFormField>
            </div>

            <GenericFormField 
                id="companie_founded_year_register" 
                type="number" 
                placeholder="Ex: 2010" 
                required 
                onChange={(e) => setForm3((prev) => ({ ...prev, foundedYear: e.target.value }))} 
                value={form3.foundedYear || ""}
            >
                Ano de fundação
            </GenericFormField>

            <GenericFormField 
                id="companie_description_register" 
                type="textarea" 
                placeholder="Descreva brevemente sua empresa, seus principais serviços e diferenciais..." 
                required 
                onChange={(e) => setForm3((prev) => ({ ...prev, description: e.target.value }))} 
                value={form3.description || ""}
            >
                Descrição da empresa
            </GenericFormField>

            <GenericFormField 
                id="companie_history_register" 
                type="textarea" 
                placeholder="Conte a história da sua empresa, como começou, principais marcos..." 
                onChange={(e) => setForm3((prev) => ({ ...prev, history: e.target.value }))} 
                value={form3.history || ""}
            >
                Nossa história
            </GenericFormField>

            <GenericFormField 
                id="companie_mission_register" 
                type="textarea" 
                placeholder="Descreva a missão, visão e valores da sua empresa..." 
                onChange={(e) => setForm3((prev) => ({ ...prev, mission: e.target.value }))} 
                value={form3.mission || ""}
            >
                Missão e valores
            </GenericFormField>
        </form>
    )
}