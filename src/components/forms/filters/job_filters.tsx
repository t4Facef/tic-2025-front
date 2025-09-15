// [TODO] - Conciliar informações de filtros e cadastro
// [TODO] - Organizar as options dos selects


import GenericFormField from "../generic_form_field";
import FilterCamp from "./filter_camp";

export default function JobFilters() {
    return (
        <div className="flex flex-col gap-4 w-full text-sm items-center">
            <FilterCamp>
                <GenericFormField type="checkbox" id="work_type_filter" options={["Presencial", "Hibrido", "Remoto"]}>Tipo de Trabalho</GenericFormField>
            </FilterCamp>
            <FilterCamp>
                <GenericFormField type="checkbox" id="contract_type_filter" options={["CLT", "PJ", "Estágio", "Freelancer", "Temporário"]} itemsOrientation={2}>Tipo de Contrato</GenericFormField>
            </FilterCamp>
            <FilterCamp>
                <GenericFormField type="select" id="location_filter" options={["W", "I", "P"]} itemsOrientation={2} placeholder="Selecione">Localização</GenericFormField>
            </FilterCamp>
            <FilterCamp>
                <GenericFormField type="select" id="work_level_filter" options={["W", "I", "P"]} itemsOrientation={2} placeholder="Selecione">Nivel de Trabalho</GenericFormField>
            </FilterCamp>
            <FilterCamp>
                <GenericFormField type="select" id="sector_filter" options={["W", "I", "P"]} itemsOrientation={2} placeholder="Selecione">Setor</GenericFormField>
            </FilterCamp>
            <FilterCamp>
                <GenericFormField type="radio" id="recommended_filter" options={["Sim", "Não"]} itemsOrientation={2} placeholder="Selecione">Somente Recomendadas Para Mim?</GenericFormField>
            </FilterCamp>
        </div>
    )
}