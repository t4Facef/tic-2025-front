import GenericFormField from "../generic_form_field";

export default function JobFilters() {
    return (
        <div className="flex flex-col gap-4 w-full text-sm">
            <div className="bg-blue4 p-2 border rounded-lg flex">
                <GenericFormField type="checkbox" id="work_type_filter" options={["Presencial", "Hibrido", "Remoto"]}>Tipo de Trabalho</GenericFormField>
            </div>
        </div>
    )
}