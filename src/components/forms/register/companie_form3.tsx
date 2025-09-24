import TagContainer from "../../content/tag_container";

export default function CompanieForm3({ formFunc, formId, initialData }: { formFunc: (data: CandidateForm1Data) => void, formId: string, initialData?: CandidateForm1Data }) {
    return (
        <form className="flex-col text-start space-y-8">
            <h2 className="font-semibold text-[1.3rem]">Informações de Inclusão</h2>
            <p className="text-gray-700 leading-relaxed">
                    Informe as capacidades de apoio que sua empresa oferece para pessoas com deficiência. 
                Essas informações ajudam os candidatos a entender como sua empresa promove a inclusão 
                e quais recursos estão disponíveis para garantir um ambiente de trabalho acessível e acolhedor.
            </p>
            <TagContainer edit={true}>
                Capacidades de Apoio
            </TagContainer>
        </form>
    )
}