// [TODO] - Linkar as APIs para o o conteúdo do Select, pegando dados especificos de subtipo de necessidade dependendo do tipo

import { useState } from "react";
import { CandidateForm4Data } from "../../../types/forms/candidate";
import TagContainer from "../../content/tag_container";
import GenericFormField from "../generic_form_field";


export default function CandidateForm4 ({ formFunc, formId, initialData } : {formFunc: (data: CandidateForm4Data) => void, formId: string, initialData?: CandidateForm4Data}){
    const [form4, setForm4] = useState<CandidateForm4Data>(initialData || {} as CandidateForm4Data)

    return (
        <form id={formId} className="flex-col text-start space-y-8" onSubmit={(e) => {
            e.preventDefault();
            formFunc(form4)
        }}>
            <h2 className="font-semibold text-[1.3rem]">Informações sobre acessibilidade</h2>
            <div className="flex flex-row gap-24">
                <GenericFormField id="candidate_type_register" type="select" options={['1', '2', '3']} placeholder="Selecione" required onChange={(e) => setForm4((prev) => ({...prev, necessityType: e.target.value}))} value={form4.necessityType || ""}>Tipo de Necessidade</GenericFormField>
                <GenericFormField id="candidate_sub_type_register" type="select" options={['1', '2', '3', '5', '6']} placeholder="Selecione" required onChange={(e) => setForm4((prev) => ({...prev, necessitySubtype: e.target.value}))} value={form4.necessitySubtype || ""}>Subtipo de Necessidade</GenericFormField>
            </div>
            <GenericFormField id="candidate_medical_report_register" type="file" required onChange={(e) => setForm4((prev) => ({...prev, medicalReport: (e.target as HTMLInputElement).files?.[0] || null}))} value={form4.medicalReport?.name || ""}>Laudo Médico</GenericFormField>
            <TagContainer edit={true} tags={form4.supportNeeds || []} onChange={(tags) => setForm4(prev => ({...prev, supportNeeds: tags}))}>Necessidades de Apoio</TagContainer>
        </form>
    )
}