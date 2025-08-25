// [TODO] - Organizar os dados de mock e types correspondentes em uma pasta types separada
// [TODO] - Adicionar condicionais para se existe ou não um ou resultado para a caixa (se não existir descrição, não mostrar o titulo "descrição" e por ai vai)
// [TODO] - Os dados deveriam vir em vetor, pois pode ter mais de uma formação experiencia etc

import PerfilContentSection from "../components/content/perfil_content_section";
import TagContainer from "../components/content/tag_container";

interface InfoType {
    formationType?: string;
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
    info1: InfoType;
    info2: InfoType;
    info3: InfoType;
    skills: string[];
    barriers: string[];
} //Só pra deixar registrado como deve ser, posteriormente vamos substituir isso pelo get no banco de dados

const dumpData: DumpDataType = {
    id: 1,
    nome: "João Guilherme",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto aut officiis, veniam harum, neque consectetur assumenda distinctio qui sequi rem, modi itaque. Harum, esse nihil. Ullam eos sapiente iusto maiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto aut officiis, veniam harum, neque consectetur assumenda distinctio qui sequi rem, modi itaque. Harum, esse nihil. Ullam eos sapiente iusto maiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto aut officiis, veniam harum, neque consectetur assumenda distinctio qui sequi rem, modi itaque. Harum, esse nihil. Ullam eos sapiente iusto maiores.",
    info1: {
        formationType: "Graduação",
        institut: "Uni-FACEF",
        course: "Engenharia de Software",
        startDate: "01/2020",
        endDate: "01/2024",
        status: "Cursando",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto aut officiis, veniam harum, neque consectetur assumenda distinctio qui sequi rem, modi itaque. Harum, esse nihil. Ullam eos sapiente iusto maiores.",
    }   ,
    info2: {
        formationType: "Estágio",
        institut: "Magazine",
        course: "Estágiario em desenvolvimento",
        startDate: "05/2023",
        endDate: "08/2025",
        status: "Emprego atual",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto aut officiis, veniam harum, neque consectetur assumenda distinctio qui sequi rem, modi itaque. Harum, esse nihil. Ullam eos sapiente iusto maiores.",
    },
    info3: {
        formationType: "Curso",
        institut: "Udemy",
        course: "React Avançado",
        startDate: "05/2025",
        endDate: "08/2025",
        status: "Finalizado",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto aut officiis, veniam harum, neque consectetur assumenda distinctio qui sequi rem, modi itaque. Harum, esse nihil. Ullam eos sapiente iusto maiores.",
    },
    skills: ["JavaScript", "Java", "C#", "Node.js", "React", "TypeScript", "Python", "SQL", "Git", "HTML/CSS", "MongoDB", "Express", "Docker", "AWS"],
    barriers: ["Dificuldade de locomoção", "Necessita ambiente silencioso", "Requer pausas frequentes", "Limitação visual parcial", "Sensibilidade a ruídos altos"]
}

export default function UserProfile(){
    return(
        <div className="px-20 py-10"> {/*Deixa px-52 definitivo e px-20 para testes, depois adicionar responsividade*/}
            <div className="flex items-center">
                <img src="/img/profile-default.png" alt="Foto de perfil" className="w-32 h-32 rounded-full object-cover mr-5"/>
                <div>
                    <h1 className="font-bold text-[32px]">{dumpData.nome}</h1>
                    <p>
                        {dumpData.desc}
                    </p>
                </div>
            </div>
            <PerfilContentSection 
                title="Formação Acadêmica" 
                formationType={dumpData.info1.formationType}
                course={dumpData.info1.course}
                institut={dumpData.info1.institut}
                startDate={dumpData.info1.startDate}
                endDate={dumpData.info1.endDate}
                status={dumpData.info1.status}
                description={dumpData.info1.desc}
            />

            <PerfilContentSection 
                title="Experiência Profissional" 
                formationType={dumpData.info2.formationType}
                course={dumpData.info2.course}
                institut={dumpData.info2.institut}
                startDate={dumpData.info2.startDate}
                endDate={dumpData.info2.endDate}
                status={dumpData.info2.status}
                description={dumpData.info2.desc}
            />

            <PerfilContentSection 
                title="Cursos complementares" 
                formationType={dumpData.info3.formationType}
                course={dumpData.info3.course}
                institut={dumpData.info3.institut}
                startDate={dumpData.info3.startDate}
                endDate={dumpData.info3.endDate}
                status={dumpData.info3.status}
                description={dumpData.info3.desc}
            />
            <TagContainer tags={dumpData.skills}>Habilidades</TagContainer>
            <TagContainer tags={dumpData.barriers}>Limitações</TagContainer>
        </div>
    )
}