export interface JobData {
    id: number;
    idEmpresa: number;
    title: string;
    company: string;
    companyLogo: string;
    location: string;
    type: string;
    description: string;
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
        description: "Desenvolva interfaces acessíveis e inclusivas usando React e TypeScript em uma equipe que valoriza diversidade. Trabalhe em projetos que impactam milhares de usuários, incluindo pessoas com deficiência, em ambiente totalmente adaptado com tecnologias assistivas e políticas ativas de inclusão.\n\nEstamos buscando um desenvolvedor frontend apaixonado por criar interfaces acessíveis e inclusivas que impactem milhares de usuários, incluindo pessoas com deficiência. Nossa equipe valoriza a diversidade e oferece um ambiente totalmente adaptado para PCDs.\n\nVocê será responsável por desenvolver interfaces responsivas usando React e TypeScript, implementar recursos de acessibilidade seguindo padrões WCAG 2.1, colaborar com designers UX/UI para criar experiências verdadeiramente inclusivas, participar de code reviews construtivos e mentorear outros desenvolvedores. Trabalhamos com metodologias ágeis em um ambiente colaborativo onde cada voz é ouvida e valorizada.\n\nBuscamos alguém que compartilhe nossa paixão por tecnologia inclusiva e que queira fazer a diferença na vida de pessoas com diferentes habilidades através do código.",
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
        description: "Analise big data usando Python, SQL e Power BI para gerar insights que transformam negócios. Empresa que prioriza inclusão oferece mentoria especializada, plano de carreira estruturado e ambiente com workstation adaptada, horários flexíveis e acompanhamento psicológico para profissionais PCDs.\n\nJunte-se à nossa equipe de análise de dados em uma empresa que prioriza a inclusão e diversidade, onde trabalhamos com big data para gerar insights que transformam negócios. Oferecemos mentoria especializada e um plano de carreira estruturado para profissionais PCDs que desejam crescer na área de dados.\n\nComo Analista de Dados Júnior, você será responsável por analisar grandes volumes de dados usando Python e SQL, criar dashboards interativos no Power BI e Tableau, desenvolver relatórios automatizados para diferentes áreas da empresa e colaborar com equipes multidisciplinares para identificar oportunidades de melhoria. Também participará de projetos básicos de machine learning, sempre com suporte e orientação da nossa equipe sênior.\n\nBuscamos alguém curioso, analítico e que tenha paixão por descobrir histórias nos dados, contribuindo para decisões estratégicas que impactam positivamente nossos clientes e a sociedade.",
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
        description: "Lidere equipe de desenvolvimento de APIs RESTful e microserviços usando Node.js, Docker e Kubernetes. Arquitete soluções escaláveis, mentoreie desenvolvedores júnior e implemente práticas DevOps em ambiente inclusivo com políticas ativas de acessibilidade e tecnologias assistivas.\n\nProcuramos um desenvolvedor backend sênior para liderar nossa equipe de desenvolvimento de APIs e microserviços, com oportunidade de arquitetar soluções escaláveis e mentorear desenvolvedores júnior. Valorizamos a inclusão e temos políticas ativas de acessibilidade no ambiente de trabalho.\n\nNesta posição de liderança técnica, você será responsável por projetar e implementar APIs RESTful robustas, trabalhar com arquitetura de microserviços usando Docker e Kubernetes, otimizar performance de bancos de dados e implementar práticas avançadas de DevOps e CI/CD. Também liderará revisões de código, definirá padrões de desenvolvimento e contribuirá para a evolução da nossa arquitetura tecnológica.\n\nBuscamos um profissional experiente que combine excelência técnica com habilidades de liderança, capaz de inspirar e desenvolver outros desenvolvedores enquanto constrói soluções que impactam milhões de usuários.",
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
        description: "Desenvolva modelos preditivos e algoritmos de machine learning usando Python, TensorFlow e Apache Spark. Trabalhe com tecnologias de ponta em projetos que revolucionam decisões empresariais, com ferramentas adaptativas, flexibilidade de horários e suporte completo para profissionais PCDs.\n\nJunte-se ao nosso time de ciência de dados para desenvolver modelos de machine learning que revolucionam a tomada de decisões empresariais. Trabalhamos com tecnologias de ponta e oferecemos um ambiente inclusivo com total suporte para profissionais PCDs, incluindo ferramentas adaptativas e flexibilidade de horários.\n\nComo Cientista de Dados Pleno, você desenvolverá modelos preditivos usando algoritmos avançados de machine learning, criará pipelines de dados automatizados e realizará análises estatísticas complexas. Também apresentará insights estratégicos para stakeholders e colaborará estreitamente com engenheiros de dados para implementar soluções robustas em produção.\n\nProcuramos um profissional que combine sólido conhecimento técnico com capacidade analítica excepcional, capaz de transformar dados complexos em soluções práticas que geram valor real para o negócio.",
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
        description: "Lidere estratégias de marketing digital inclusivo coordenando equipes de design e conteúdo. Gerencie campanhas em redes sociais e Google Ads em agência pioneira em conteúdos acessíveis, com ambiente criativo totalmente adaptado, software de design acessível e foco na representatividade.\n\nProcuramos um coordenador criativo para liderar nossas campanhas de marketing digital inclusivo em uma agência pioneira em criar conteúdos acessíveis e representativos. Oferecemos um ambiente de trabalho totalmente adaptado, com foco na criatividade e inclusão de pessoas com deficiência.\n\nComo Coordenador de Marketing Digital, você desenvolverá estratégias inovadoras de marketing inclusivo, coordenará equipes talentosas de design e conteúdo, gerenciará campanhas impactantes em redes sociais e analisará métricas de performance para otimização contínua. Também criará briefings criativos acessíveis e apresentará resultados estratégicos para clientes e stakeholders.\n\nBuscamos um líder criativo que compartilhe nossa paixão por representatividade e inclusão, capaz de transformar ideias em campanhas que não apenas vendem, mas também educam e inspiram mudanças sociais positivas.",
        skillsTags: ["Marketing Digital", "Google Ads", "Facebook Ads", "SEO", "Analytics", "Photoshop", "Canva", "Copywriting"],
        supportTags: ["Ambiente criativo adaptado", "Software de design acessível", "Mesa regulavel", "Iluminação ajustável", "Pausas flexíveis", "Transporte próprio"],
        compatibility: 65
    }
];

export default mockJobs;