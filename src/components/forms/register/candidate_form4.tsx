// [TODO] - Linkar as APIs para o o conteúdo do Select, pegando dados especificos de subtipo de necessidade dependendo do tipo

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
                <GenericFormField id="candidate_type_register" type="select" options={['W', 'I', 'P']} placeholder="Selecione" required>Tipo de Necessidade</GenericFormField>
                <GenericFormField id="candidate_sub_type_register" type="select" options={['W', 'I', 'P']} placeholder="Selecione" required>Subtipo de Necessidade</GenericFormField>
            </div>
            <GenericFormField id="candidate_medical_report_register" type="file" required>Laudo Médico</GenericFormField>
            <TagContainer edit={true}>Necessidades de Apoio</TagContainer>
            {/* Verificar viabilidade dessa parte
            <div className="bg-blue4 p-6 space-y-4 rounded-lg">
                <h3 className="font-semibold text-[20px]">Por que pedimos um laudo médico?</h3>
                <p>Falar um pouco da importânica, tratamento dos dados etc etc Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod est optio cupiditate deserunt error necessitatibus mollitia asperiores quo porro, vero doloribus quam voluptatem repudiandae! Dolor quis perferendis animi voluptatem corrupti. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam eaque aliquam earum atque sequi expedita, laboriosam minus sint error vel unde nisi. Fugit facere dolorum rerum soluta laborum optio placeat? Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore maiores, rerum molestiae fugit itaque quod rem corporis consectetur suscipit blanditiis, dolor ab sit eaque aliquam illo obcaecati? Maxime, odio dolor.</p>
            </div>
            */}

        </form>
    )
}