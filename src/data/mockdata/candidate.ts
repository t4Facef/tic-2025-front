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

const candidates = [
{
    id: 1,
    nome: "João Guilherme",
    desc: "Desenvolvedor Full-Stack apaixonado por tecnologia e inclusão digital. Com 4+ anos de experiência transformando ideias em soluções web robustas e acessíveis, especializo-me em React, Node.js e arquiteturas escaláveis. Atualmente no Magazine Luiza, lidero iniciativas de acessibilidade que impactam milhões de usuários diariamente, implementando recursos como navegação por teclado, compatibilidade com leitores de tela e interfaces de alto contraste. Minha jornada começou na ETEC Franca, onde desenvolvi meu primeiro sistema com foco em acessibilidade, e continuou na Uni-FACEF, onde aprofundei conhecimentos em engenharia de software e metodologias ágeis. Acredito que a tecnologia deve ser para todos - cada linha de código que escrevo carrega essa missão de democratizar o acesso digital. Tenho experiência sólida em JavaScript, TypeScript, Python, Java e C#, sempre priorizando clean code e arquiteturas que facilitem manutenção e escalabilidade. Busco desafios que me permitam crescer tecnicamente enquanto contribuo para um mundo digital mais inclusivo, onde barreiras tecnológicas sejam eliminadas e oportunidades sejam criadas para todos.",
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
},
{
    id: 2,
    nome: "Maria Silva Santos",
    desc: "Designer UX/UI com alma de pesquisadora e coração voltado para inclusão. Nos últimos 5 anos, transformei complexidade em simplicidade para mais de 80 milhões de usuários no Nubank, onde lidero projetos que redefinem como pessoas com deficiência interagem com produtos financeiros digitais. Minha especialidade? Criar interfaces que funcionam perfeitamente para todos, especialmente para pessoas com deficiência visual, auditiva e motora. Cada pixel, cada interação é pensada para quebrar barreiras, não criar novas. Minha trajetória inclui passagem pelo iFood, onde criei o primeiro guia de design inclusivo da empresa, e formação sólida no Mackenzie em Design Gráfico, complementada por pós-graduação na FIAP em UX Design. Sou certificada internacionalmente em acessibilidade digital pelo Nielsen Norman Group e Google, além de ser mentora ativa de novos talentos na área. Domino ferramentas como Figma, Adobe XD, Sketch e tenho conhecimentos técnicos em HTML/CSS que me permitem colaborar efetivamente com desenvolvedores. Acredito que design verdadeiramente bom é aquele que ninguém precisa 'aprender' a usar - deve ser intuitivo, acessível e empático desde o primeiro contato.",
    education: [
        {
            formationType: "Pós-graduação",
            institut: "FIAP",
            course: "UX Design e Arquitetura da Informação",
            startDate: "03/2022",
            endDate: "12/2023",
            status: "Concluído",
            desc: "Especialização avançada em experiência do usuário com ênfase em acessibilidade digital, design inclusivo e metodologias ágeis. Projeto final: redesign completo de aplicativo bancário com foco em usuários com deficiência visual, resultando em 40% de melhoria na usabilidade.",
        },
        {
            formationType: "Graduação",
            institut: "Universidade Mackenzie",
            course: "Design Gráfico",
            startDate: "02/2018",
            endDate: "12/2021",
            status: "Concluído",
            desc: "Formação sólida em design visual, tipografia, teoria das cores e comunicação visual. TCC sobre 'Design Inclusivo para Pessoas com Deficiência Visual' premiado como melhor projeto da turma. Participação ativa em projetos sociais de design para ONGs.",
        }
    ],
    experience: [
        {
            formationType: "CLT",
            institut: "Nubank",
            course: "UX Designer Sênior",
            startDate: "01/2023",
            endDate: "Atual",
            status: "Efetiva",
            desc: "Liderança de projetos de UX para produtos financeiros com mais de 80 milhões de usuários. Responsável pela implementação de diretrizes de acessibilidade em toda a plataforma, resultando em certificação WCAG 2.1 AA. Mentoria de designers juniores e condução de workshops sobre design inclusivo.",
        },
        {
            formationType: "CLT",
            institut: "iFood",
            course: "UX Designer Pleno",
            startDate: "06/2021",
            endDate: "12/2022",
            status: "Finalizado",
            desc: "Desenvolvimento de interfaces para aplicativo de delivery com foco em acessibilidade. Criação do primeiro guia de design inclusivo da empresa. Liderança técnica na implementação de recursos para usuários com deficiência, incluindo navegação por voz e alto contraste.",
        }
    ],
    courses: [
        {
            formationType: "Certificação",
            institut: "Google",
            course: "UX Design Professional Certificate",
            startDate: "08/2021",
            endDate: "11/2021",
            status: "Certificado",
            desc: "Programa abrangente do Google sobre UX Design, incluindo pesquisa com usuários, prototipagem, testes de usabilidade e design de alta fidelidade. Projeto final: aplicativo de transporte público acessível para pessoas com deficiência, com foco em navegação por áudio.",
        },
        {
            formationType: "Workshop",
            institut: "Nielsen Norman Group",
            course: "Accessibility: How to Design for All",
            startDate: "05/2022",
            endDate: "05/2022",
            status: "Concluído",
            desc: "Workshop intensivo sobre design acessível ministrado por especialistas mundiais em UX. Abordagem prática sobre WCAG, testes com usuários com deficiência e implementação de soluções inclusivas. Certificação internacional em Design Acessível.",
        }
    ],
    skills: ["Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator", "Principle", "InVision", "Miro", "HTML/CSS", "Design System", "Acessibilidade", "WCAG", "User Research", "Prototipagem"],
    barriers: ["Deficiência auditiva parcial", "Necessita comunicação visual", "Prefere ambientes bem iluminados"]
},
{
    id: 3,
    nome: "Carlos Eduardo Lima",
    desc: "Estatístico e cientista de dados que enxerga histórias onde outros veem apenas números. Especializado em transformar big data em insights que geram impacto social real, especialmente na área de acessibilidade e inclusão digital. No Banco Inter, meus modelos preditivos não apenas detectam fraudes com 95% de precisão - eles identificam barreiras digitais, analisam padrões de uso por pessoas com deficiência e propõem soluções inclusivas que resultaram em 35% de aumento na adoção de serviços bancários por PCDs. Minha formação pela USP em Estatística me proporcionou base sólida em análise matemática e probabilística, complementada por certificações Microsoft Azure e especialização em Machine Learning pela Stanford/Coursera. Tenho experiência prática com Python, R, SQL, Power BI, Tableau e frameworks como TensorFlow e Scikit-learn. Meu trabalho anterior na Prefeitura de São Paulo focou em otimização de transporte público acessível, onde desenvolvi algoritmos que melhoraram em 15% a eficiência das rotas adaptadas. Sou movido pela convicção de que dados bem analisados podem construir uma sociedade mais justa e inclusiva. Cada dashboard que crio, cada modelo que desenvolvo tem um propósito maior: tornar o mundo mais acessível para todos, usando a ciência de dados como ferramenta de transformação social.",
    education: [
        {
            formationType: "Graduação",
            institut: "USP - Universidade de São Paulo",
            course: "Estatística",
            startDate: "02/2019",
            endDate: "12/2022",
            status: "Concluído",
            desc: "Formação sólida em estatística aplicada, probabilidade, análise de dados e modelagem matemática. TCC sobre 'Análise Estatística de Dados de Acessibilidade em Transporte Público' com foco em melhorias para pessoas com deficiência. Bolsista de iniciação científica por 2 anos.",
        }
    ],
    experience: [
        {
            formationType: "CLT",
            institut: "Banco Inter",
            course: "Analista de Dados Pleno",
            startDate: "03/2023",
            endDate: "Atual",
            status: "Efetivo",
            desc: "Desenvolvimento de modelos preditivos para análise de crédito e detecção de fraudes. Criação de dashboards executivos em Power BI e Tableau. Liderança do projeto de análise de acessibilidade digital, identificando barreiras e propondo melhorias que resultaram em 35% de aumento no uso por PCDs.",
        },
        {
            formationType: "Estágio",
            institut: "Prefeitura de São Paulo",
            course: "Estagiário em Análise de Dados",
            startDate: "08/2022",
            endDate: "02/2023",
            status: "Finalizado",
            desc: "Análise de dados de transporte público com foco em acessibilidade. Desenvolvimento de relatórios sobre utilização de recursos para PCDs. Criação de modelo preditivo para otimização de rotas acessíveis, contribuindo para melhoria de 15% na eficiência do transporte adaptado.",
        }
    ],
    courses: [
        {
            formationType: "Certificação",
            institut: "Microsoft",
            course: "Azure Data Scientist Associate",
            startDate: "01/2023",
            endDate: "03/2023",
            status: "Certificado",
            desc: "Certificação oficial Microsoft em ciência de dados na nuvem. Abordagem prática em machine learning, análise preditiva e implementação de modelos em produção. Projeto prático: modelo de recomendação de recursos de acessibilidade baseado em perfil do usuário.",
        },
        {
            formationType: "Curso",
            institut: "Coursera - Stanford",
            course: "Machine Learning Specialization",
            startDate: "06/2022",
            endDate: "10/2022",
            status: "Concluído",
            desc: "Especialização completa em Machine Learning ministrada por Andrew Ng. Abordagem teórica e prática em algoritmos de aprendizado supervisionado e não supervisionado. Projeto final: sistema de classificação automática de necessidades de acessibilidade baseado em dados comportamentais.",
        }
    ],
    skills: ["Python", "R", "SQL", "Power BI", "Tableau", "Excel Avançado", "Machine Learning", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "Azure", "Statistics", "Data Visualization"],
    barriers: ["Deficiência motora nas mãos", "Utiliza tecnologia assistiva para digitação", "Necessita mesa ajustável", "Requer pausas para fisioterapia"]
}
];

export default candidates as CandidateProfileType[];
export { candidates };