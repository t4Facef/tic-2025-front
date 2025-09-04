export interface JobData {
    id: number;
    idEmpresa: number;
    title: string;
    company: string;
    companyLogo: string;
    location: string;
    type: string;
    shortDescription: string;
    description1Title: string;
    description1Content: string;
    description2Title: string;
    description2Content: string;
    skillsTags: string[];
    supportTags: string[];
    compatibility: number;
}

export const mockJobs: JobData[] = [
    {
        id: 1,
        idEmpresa: 1,
        title: "Desenvolvedor Frontend Inclusivo",
        company: "TechCorp Solutions",
        companyLogo: "/img/logosTeste/teste1.jpeg",
        location: "São Paulo, SP",
        type: "CLT - Presencial",
        shortDescription: "Desenvolva interfaces acessíveis e inclusivas usando React e TypeScript em uma equipe que valoriza diversidade. Trabalhe em projetos que impactam milhares de usuários, incluindo pessoas com deficiência, em ambiente totalmente adaptado com tecnologias assistivas e políticas ativas de inclusão.",
        description1Title: "Sobre a Vaga",
        description1Content: "Estamos buscando um desenvolvedor frontend apaixonado por criar interfaces acessíveis e inclusivas. Você trabalhará em projetos que impactam milhares de usuários, incluindo pessoas com deficiência. Nossa equipe valoriza a diversidade e oferece um ambiente totalmente adaptado para PCDs.",
        description2Title: "Responsabilidades",
        description2Content: "Desenvolver interfaces responsivas usando React e TypeScript, implementar recursos de acessibilidade seguindo padrões WCAG, colaborar com designers UX/UI para criar experiências inclusivas, participar de code reviews e mentorar outros desenvolvedores, trabalhar com metodologias ágeis em um ambiente colaborativo.",
        skillsTags: ["React", "TypeScript", "HTML5", "CSS3", "JavaScript", "Git", "Acessibilidade Web"],
        supportTags: ["Rampa de acesso", "Elevador", "Banheiro adaptado", "Intérprete de Libras", "Software leitor de tela", "Mesa ajustável"],
        compatibility: 87
    },
    {
        id: 2,
        idEmpresa: 2,
        title: "Analista de Dados Júnior",
        company: "DataFlow Analytics",
        companyLogo: "/img/logosTeste/teste2.jpeg",
        location: "Rio de Janeiro, RJ",
        type: "CLT - Híbrido",
        shortDescription: "Analise big data usando Python, SQL e Power BI para gerar insights que transformam negócios. Empresa que prioriza inclusão oferece mentoria especializada, plano de carreira estruturado e ambiente com workstation adaptada, horários flexíveis e acompanhamento psicológico para profissionais PCDs.",
        description1Title: "Descrição da Oportunidade",
        description1Content: "Junte-se à nossa equipe de análise de dados em uma empresa que prioriza a inclusão e diversidade. Trabalhamos com big data para gerar insights que transformam negócios. Oferecemos mentoria especializada e um plano de carreira estruturado para profissionais PCDs que desejam crescer na área de dados.",
        description2Title: "O que você fará",
        description2Content: "Analisar grandes volumes de dados usando Python e SQL, criar dashboards interativos no Power BI e Tableau, desenvolver relatórios automatizados para diferentes áreas da empresa, colaborar com equipes multidisciplinares para identificar oportunidades de melhoria, participar de projetos de machine learning básico.",
        skillsTags: ["Python", "SQL", "Power BI", "Excel Avançado", "Estatística", "Tableau", "Machine Learning"],
        supportTags: ["Workstation adaptada", "Monitor de alta resolução", "Teclado especial", "Horário flexível", "Transporte fretado", "Acompanhamento psicológico"],
        compatibility: 72
    },
    {
        id: 3,
        idEmpresa: 1,
        title: "Desenvolvedor Backend Sênior",
        company: "TechCorp Solutions",
        companyLogo: "/img/logosTeste/teste1.jpeg",
        location: "São Paulo, SP",
        type: "CLT - Híbrido",
        shortDescription: "Lidere equipe de desenvolvimento de APIs RESTful e microserviços usando Node.js, Docker e Kubernetes. Arquitete soluções escaláveis, mentoreie desenvolvedores júnior e implemente práticas DevOps em ambiente inclusivo com políticas ativas de acessibilidade e tecnologias assistivas.",
        description1Title: "Oportunidade de Liderança",
        description1Content: "Procuramos um desenvolvedor backend sênior para liderar nossa equipe de desenvolvimento de APIs e microserviços. Você terá a oportunidade de arquitetar soluções escaláveis e mentorear desenvolvedores júnior. Valorizamos a inclusão e temos políticas ativas de acessibilidade no ambiente de trabalho.",
        description2Title: "Desafios Técnicos",
        description2Content: "Projetar e implementar APIs RESTful robustas, trabalhar com arquitetura de microserviços usando Docker e Kubernetes, otimizar performance de bancos de dados, implementar práticas de DevOps e CI/CD, liderar revisões de código e definir padrões de desenvolvimento.",
        skillsTags: ["Node.js", "Python", "Docker", "Kubernetes", "PostgreSQL", "MongoDB", "AWS", "Microserviços"],
        supportTags: ["Rampa de acesso", "Elevador", "Banheiro adaptado", "Intérprete de Libras", "Software leitor de tela", "Mesa ajustável"],
        compatibility: 91
    },
    {
        id: 4,
        idEmpresa: 2,
        title: "Cientista de Dados Pleno",
        company: "DataFlow Analytics",
        companyLogo: "/img/logosTeste/teste2.jpeg",
        location: "Rio de Janeiro, RJ",
        type: "CLT - Presencial",
        shortDescription: "Desenvolva modelos preditivos e algoritmos de machine learning usando Python, TensorFlow e Apache Spark. Trabalhe com tecnologias de ponta em projetos que revolucionam decisões empresariais, com ferramentas adaptativas, flexibilidade de horários e suporte completo para profissionais PCDs.",
        description1Title: "Inovação em IA",
        description1Content: "Junte-se ao nosso time de ciência de dados para desenvolver modelos de machine learning que revolucionam a tomada de decisões empresariais. Trabalhamos com tecnologias de ponta e oferecemos um ambiente inclusivo com total suporte para profissionais PCDs, incluindo ferramentas adaptativas e flexibilidade de horários.",
        description2Title: "Projetos Desafiadores",
        description2Content: "Desenvolver modelos preditivos usando algoritmos de machine learning, criar pipelines de dados automatizados, realizar análises estatísticas complexas, apresentar insights para stakeholders, colaborar com engenheiros de dados para implementar soluções em produção.",
        skillsTags: ["Python", "R", "TensorFlow", "Scikit-learn", "Pandas", "Apache Spark", "Deep Learning", "Estatística"],
        supportTags: ["Workstation adaptada", "Monitor de alta resolução", "Teclado especial", "Horário flexível", "Transporte fretado", "Acompanhamento psicológico"],
        compatibility: 78
    },
    {
        id: 5,
        idEmpresa: 3,
        title: "Coordenador de Marketing Digital",
        company: "CreativeHub Agency",
        companyLogo: "/img/logosTeste/teste3.jpeg",
        location: "Belo Horizonte, MG",
        type: "CLT - Híbrido",
        shortDescription: "Lidere estratégias de marketing digital inclusivo coordenando equipes de design e conteúdo. Gerencie campanhas em redes sociais e Google Ads em agência pioneira em conteúdos acessíveis, com ambiente criativo totalmente adaptado, software de design acessível e foco na representatividade.",
        description1Title: "Lidere Campanhas Inovadoras",
        description1Content: "Procuramos um coordenador criativo para liderar nossas campanhas de marketing digital inclusivo. Nossa agência é pioneira em criar conteúdos acessíveis e representativos. Oferecemos um ambiente de trabalho totalmente adaptado, com foco na criatividade e inclusão de pessoas com deficiência.",
        description2Title: "Responsabilidades Criativas",
        description2Content: "Desenvolver estratégias de marketing digital inclusivo, coordenar equipes de design e conteúdo, gerenciar campanhas em redes sociais, analisar métricas de performance, criar briefings criativos acessíveis, apresentar resultados para clientes e stakeholders.",
        skillsTags: ["Marketing Digital", "Google Ads", "Facebook Ads", "SEO", "Analytics", "Photoshop", "Canva", "Copywriting"],
        supportTags: ["Ambiente criativo adaptado", "Software de design acessível", "Mesa regulavel", "Iluminação ajustável", "Pausas flexíveis", "Transporte próprio"],
        compatibility: 65
    },
    {
        id: 6,
        idEmpresa: 3,
        title: "Designer UX/UI Inclusivo",
        company: "CreativeHub Agency",
        companyLogo: "/img/logosTeste/teste3.jpeg",
        location: "Belo Horizonte, MG",
        type: "PJ - Remoto",
        shortDescription: "Crie interfaces acessíveis seguindo diretrizes WCAG usando Figma e Adobe XD. Desenvolva protótipos inclusivos e realize testes de usabilidade com usuários PCDs em projetos que impactam pessoas com diferentes habilidades, com expertise em design universal e pesquisa em acessibilidade digital.",
        description1Title: "Design para Todos",
        description1Content: "Buscamos um designer especializado em criar experiências digitais verdadeiramente inclusivas. Você trabalhará em projetos que impactam a vida de pessoas com diferentes habilidades. Nossa equipe valoriza a diversidade e tem expertise em design universal e acessibilidade digital.",
        description2Title: "Impacto Social",
        description2Content: "Criar interfaces acessíveis seguindo diretrizes WCAG, desenvolver prototipos inclusivos no Figma, realizar testes de usabilidade com usuários PCDs, colaborar com desenvolvedores para implementação, pesquisar tendências em design inclusivo e acessibilidade.",
        skillsTags: ["Figma", "Adobe XD", "Sketch", "Acessibilidade Web", "Design System", "Prototipagem", "User Research", "WCAG"],
        supportTags: ["Ambiente criativo adaptado", "Software de design acessível", "Mesa regulavel", "Iluminação ajustável", "Pausas flexíveis", "Transporte próprio"],
        compatibility: 82
    },
    {
        id: 7,
        idEmpresa: 4,
        title: "Assistente Administrativo",
        company: "MedCare Hospital",
        companyLogo: "/img/logosTeste/teste4.png",
        location: "Salvador, BA",
        type: "CLT - Presencial",
        shortDescription: "Integre equipe administrativa de hospital inclusivo com foco no atendimento humanizado. Organize documentos médicos, atenda pacientes com cordialidade e auxilie na recepção em ambiente totalmente acessível com treinamento especializado, sinalização em Braille e apoio psicológico.",
        description1Title: "Cuidado e Organização",
        description1Content: "Junte-se à nossa equipe administrativa em um dos hospitais mais inclusivos do país. Trabalhamos com foco no atendimento humanizado e temos uma política sólida de inclusão de PCDs. Oferecemos treinamento especializado e um ambiente de trabalho totalmente acessível na área da saúde.",
        description2Title: "Atividades Diárias",
        description2Content: "Organizar documentos e prontuários médicos, atender pacientes e familiares com cordialidade, agendar consultas e exames, auxiliar na recepção e triagem, manter organização de arquivos físicos e digitais, apoiar equipe médica com tarefas administrativas.",
        skillsTags: ["Atendimento ao Cliente", "Excel", "Organização", "Comunicação", "Pacote Office", "Gestão de Agenda", "Arquivo Médico"],
        supportTags: ["Rampa hospitalar", "Elevador", "Banheiro adaptado", "Sinalização em Braille", "Cadeira ergonômica", "Apoio psicológico"],
        compatibility: 69
    },
    {
        id: 8,
        idEmpresa: 4,
        title: "Técnico em Enfermagem",
        company: "MedCare Hospital",
        companyLogo: "/img/logosTeste/teste4.png",
        location: "Salvador, BA",
        type: "CLT - Presencial",
        shortDescription: "Atue em cuidados inclusivos auxiliando enfermeiros no atendimento direto aos pacientes. Hospital referência em acessibilidade oferece capacitação contínua, equipamentos adaptados, sinalização em Braille e ambiente diverso que valoriza profissionais com deficiência na área da saúde.",
        description1Title: "Cuidado Especializado",
        description1Content: "Procuramos técnico em enfermagem para integrar nossa equipe de cuidados inclusivos. Nosso hospital é referência em acessibilidade e atendimento a PCDs. Oferecemos capacitação contínua, equipamentos adaptados e um ambiente de trabalho que valoriza a diversidade na área da saúde.",
        description2Title: "Cuidados Essenciais",
        description2Content: "Auxiliar enfermeiros no cuidado direto aos pacientes, administrar medicações conforme prescrição médica, monitorar sinais vitais, realizar curativos e procedimentos básicos, manter organização e higiene do ambiente hospitalar, dar suporte emocional aos pacientes e familiares.",
        skillsTags: ["Técnicas de Enfermagem", "Administração de Medicamentos", "Sinais Vitais", "Curativos", "Higienização", "Primeiros Socorros", "Empatia"],
        supportTags: ["Rampa hospitalar", "Elevador", "Banheiro adaptado", "Sinalização em Braille", "Cadeira ergonômica", "Apoio psicológico"],
        compatibility: 74
    },
    {
        id: 9,
        idEmpresa: 5,
        title: "Consultor Financeiro",
        company: "InvestPro Consultoria",
        companyLogo: "/img/logosTeste/teste5.jpeg",
        location: "Brasília, DF",
        type: "CLT - Híbrido",
        shortDescription: "Atenda clientes com necessidades especiais de investimento elaborando planejamentos financeiros personalizados. Empresa valoriza inclusão oferecendo produtos financeiros acessíveis, escritório totalmente adaptado, software financeiro acessível e políticas flexíveis para profissionais PCDs.",
        description1Title: "Consultoria Especializada",
        description1Content: "Junte-se à nossa equipe de consultoria financeira que atende clientes com necessidades especiais de investimento. Somos uma empresa que valoriza a inclusão e oferece produtos financeiros acessíveis. Nosso escritório é totalmente adaptado e temos políticas flexíveis para profissionais PCDs.",
        description2Title: "Assessoria Financeira",
        description2Content: "Analisar perfil de risco dos clientes, elaborar planejamentos financeiros personalizados, apresentar opções de investimento, acompanhar carteiras de investimento, realizar reuniões de acompanhamento, manter-se atualizado sobre o mercado financeiro e produtos disponíveis.",
        skillsTags: ["Planejamento Financeiro", "Análise de Investimentos", "Excel Avançado", "CPA-10", "Atendimento ao Cliente", "Mercado Financeiro", "Apresentações"],
        supportTags: ["Escritório adaptado", "Software financeiro acessível", "Mesa ajustável", "Monitor duplo", "Horário flexível", "Vale transporte especial"],
        compatibility: 71
    },
    {
        id: 10,
        idEmpresa: 5,
        title: "Analista Contábil",
        company: "InvestPro Consultoria",
        companyLogo: "/img/logosTeste/teste5.jpeg",
        location: "Brasília, DF",
        type: "CLT - Presencial",
        shortDescription: "Trabalhe com contabilidade inclusiva realizando lançamentos contábeis e elaborando demonstrações financeiras. Equipe financeira experiente oferece ambiente acessível com tecnologias assistivas, software financeiro adaptado e políticas que promovem inclusão de profissionais com deficiência.",
        description1Title: "Precisão e Organização",
        description1Content: "Procuramos analista contábil para integrar nossa equipe financeira. Trabalhamos com empresas de diversos portes e temos expertise em contabilidade inclusiva. Oferecemos um ambiente de trabalho acessível, com tecnologias assistivas e políticas que promovem a inclusão de profissionais com deficiência.",
        description2Title: "Gestão Contábil",
        description2Content: "Realizar lançamentos contábeis no sistema, elaborar demonstrações financeiras, calcular e apurar impostos, fazer conciliações bancárias, auxiliar na elaboração do balanço patrimonial, manter organização da documentação fiscal e contábil.",
        skillsTags: ["Contabilidade Geral", "Demonstrações Financeiras", "Impostos", "Conciliação Bancária", "Excel", "Sistemas Contábeis", "Legislação Fiscal"],
        supportTags: ["Escritório adaptado", "Software financeiro acessível", "Mesa ajustável", "Monitor duplo", "Horário flexível", "Vale transporte especial"],
        compatibility: 76
    }
];

export default mockJobs;