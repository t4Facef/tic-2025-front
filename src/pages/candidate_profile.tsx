// [TODO] - Organizar os dados de mock e types correspondentes em uma pasta types separada

import PerfilContentSection from "../components/content/perfil_content_section";

interface InfoType {
    formationType: string;
    institut: string;
    course: string;
    startDate: string;
    endDate: string;
    status: string;
    desc: string;
}

interface DumpDataType {
    id: number;
    nome: string;
    desc: string;
    info: InfoType;
} //Só pra deixar registrado como deve ser, posteriormente vamos substituir isso pelo get no banco de dados

const dumpData: DumpDataType = {
    id: 1,
    nome: "João Guilherme",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto aut officiis, veniam harum, neque consectetur assumenda distinctio qui sequi rem, modi itaque. Harum, esse nihil. Ullam eos sapiente iusto maiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto aut officiis, veniam harum, neque consectetur assumenda distinctio qui sequi rem, modi itaque. Harum, esse nihil. Ullam eos sapiente iusto maiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto aut officiis, veniam harum, neque consectetur assumenda distinctio qui sequi rem, modi itaque. Harum, esse nihil. Ullam eos sapiente iusto maiores.",
    info: {
        formationType: "Graduação",
        institut: "Uni-FACEF",
        course: "Engenharia de Software",
        startDate: "01/2020",
        endDate: "01/2024",
        status: "Cursando",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto aut officiis, veniam harum, neque consectetur assumenda distinctio qui sequi rem, modi itaque. Harum, esse nihil. Ullam eos sapiente iusto maiores.",
    }   
}

export default function CandidateProfile(){
    return(
        <div className="px-20 py-10"> {/*Deixa px-52 definitivo e px-20 para testes, depois adicionar responsividade*/}
            <div className="flex items-center">
                <img src="/img/profile-default.svg" alt="Foto de perfil" className="w-32 h-32 rounded-full object-cover mr-5"/>
                <div>
                    <h1 className="font-bold text-[32px]">{dumpData.nome}</h1>
                    <p>
                        {dumpData.desc}
                    </p>
                </div>
            </div>
            <PerfilContentSection 
                title="Formação Acadêmica" 
                formationType={dumpData.info.formationType}
                course={dumpData.info.course}
                institut={dumpData.info.institut}
                startDate={dumpData.info.startDate}
                endDate={dumpData.info.endDate}
                status={dumpData.info.status}
                description={dumpData.info.desc}
            />
        </div>
    )
}