interface InfoType {
    formationType?: string;
    institut: string;
    course: string;
    startDate: string;
    endDate: string;
    status: string;
    desc: string;
}

interface CandidateProfileType {
    id: number;
    nome: string;
    desc: string;
    education: InfoType[];
    experience: InfoType[];
    courses: InfoType[];
    skills: string[];
    barriers: string[];
}

export default {
    id: 1,
    nome: "João Guilherme",
    desc: "Desenvolvedor Full-Stack especializado em tecnologias modernas e soluções inclusivas. Com sólida formação em Engenharia de Software e experiência prática no desenvolvimento de plataformas e-commerce, busco oportunidades que valorizem a diversidade e promovam ambientes de trabalho verdadeiramente acessíveis. Comprometido com código limpo, boas práticas e desenvolvimento centrado no usuário.",
    education: [
        {
            formationType: "Graduação",
            institut: "Uni-FACEF",
            course: "Engenharia de Software",
            startDate: "01/2020",
            endDate: "12/2024",
            status: "Cursando - 8º período",
            desc: "Formação sólida em desenvolvimento de software com ênfase em metodologias ágeis (Scrum, Kanban), arquitetura de sistemas distribuídos e engenharia de requisitos. Participação ativa em projetos de extensão focados em tecnologia assistiva e desenvolvimento de aplicações web acessíveis. TCC em andamento sobre 'Implementação de Recursos de Acessibilidade em Plataformas E-commerce'.",
        },
        {
            formationType: "Técnico",
            institut: "ETEC Franca",
            course: "Técnico em Informática",
            startDate: "01/2017",
            endDate: "12/2019",
            status: "Concluído",
            desc: "Formação técnica abrangente em desenvolvimento de sistemas, banco de dados e redes de computadores. Projeto de conclusão: sistema de gestão escolar com interface adaptada para deficientes visuais. Reconhecimento como melhor aluno da turma com média final 9.8.",
        }
    ],
    experience: [
        {
            formationType: "CLT",
            institut: "Magazine Luiza",
            course: "Desenvolvedor Full-Stack Júnior",
            startDate: "05/2023",
            endDate: "Atual",
            status: "Efetivado em Janeiro/2024",
            desc: "Atuação no desenvolvimento e manutenção de funcionalidades críticas da plataforma e-commerce, atendendo mais de 40 milhões de usuários mensais. Responsável pela implementação de melhorias de performance que resultaram em 25% de redução no tempo de carregamento. Liderança técnica na implementação de recursos de acessibilidade (WCAG 2.1), incluindo navegação por teclado, leitores de tela e alto contraste.",
        },
        {
            formationType: "Freelancer",
            institut: "Autônomo",
            course: "Desenvolvedor Web",
            startDate: "08/2022",
            endDate: "04/2023",
            status: "Finalizado",
            desc: "Desenvolvimento de sites institucionais e e-commerce para pequenas e médias empresas da região. Especialização em WordPress customizado e soluções React. Destaque para projeto de loja virtual para empresa de produtos inclusivos, com foco total em acessibilidade e usabilidade para PCDs. Mais de 15 projetos entregues com 100% de satisfação dos clientes.",
        }
    ],
    courses: [
        {
            formationType: "Certificação",
            institut: "Rocketseat",
            course: "Ignite ReactJS - Especialização Avançada",
            startDate: "03/2023",
            endDate: "07/2023",
            status: "Concluído com Distinção",
            desc: "Programa intensivo de especialização em React com TypeScript, abordando arquiteturas avançadas, otimização de performance, testes automatizados (Jest, Testing Library) e deploy em produção. Desenvolvimento de 6 projetos práticos incluindo SPA complexas, dashboards administrativos e aplicações mobile com React Native. Projeto destaque: plataforma de gestão de tarefas com recursos de acessibilidade completos.",
        },
        {
            formationType: "Curso",
            institut: "Alura",
            course: "Formação Acessibilidade Web",
            startDate: "01/2022",
            endDate: "03/2022",
            status: "Certificado",
            desc: "Formação completa em acessibilidade digital abordando WCAG 2.1, ARIA, testes com leitores de tela e ferramentas de auditoria. Desenvolvimento prático de componentes acessíveis e técnicas de inclusão digital. Projeto final: refatoração completa de site institucional para conformidade total com padrões de acessibilidade.",
        }
    ],
    skills: ["JavaScript", "Java", "C#", "Node.js", "React", "TypeScript", "Python", "SQL", "Git", "HTML/CSS", "MongoDB", "Express", "Docker", "AWS"],
    barriers: ["Dificuldade de locomoção", "Necessita ambiente silencioso", "Requer pausas frequentes", "Limitação visual parcial", "Sensibilidade a ruídos altos"]
} as CandidateProfileType;