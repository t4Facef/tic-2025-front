export interface CompanyData {
    id: number;
    name: string;
    logo: string;
    description: string;
    history: string;
    mission: string;
    img1: string;
    img2: string;
    location: string;
    foundedYear: number;
    sector: string;
    employeeCount: string;
    acessibilityLevel: string;
    website: string;
    supportTags: string[];
}

export const mockCompanies: CompanyData[] = [
    {
        id: 1,
        name: "TechCorp Solutions",
        logo: "/img/logosTeste/teste1.jpeg",
        description: "Empresa líder em soluções tecnológicas inclusivas, especializada em desenvolvimento de software acessível e inovação digital. Com mais de uma década de experiência, a TechCorp Solutions se destaca por criar produtos que quebram barreiras digitais e promovem a inclusão tecnológica. Nossa equipe multidisciplinar trabalha constantemente para desenvolver ferramentas que atendam às necessidades de todos os usuários, independentemente de suas habilidades ou limitações. Comprometida com a diversidade e inclusão no ambiente de trabalho, a empresa mantém programas ativos de capacitação, mentoria e desenvolvimento profissional para pessoas com deficiência.",
        history: "Fundada em 2010 por um grupo de desenvolvedores apaixonados por tecnologia inclusiva, a TechCorp nasceu com o propósito de democratizar o acesso à tecnologia. Nossa história começou quando nossos fundadores, incluindo dois profissionais com deficiência visual, perceberam as enormes lacunas de acessibilidade no mercado tecnológico. Ao longo dos anos, crescemos de uma startup de 5 pessoas trabalhando em um pequeno escritório compartilhado para uma empresa de referência em soluções acessíveis, com mais de 800 funcionários e escritórios em 12 cidades brasileiras. Sempre mantivemos nosso compromisso com a inovação responsável, investindo 15% de nossa receita anual em pesquisa e desenvolvimento de tecnologias assistivas. Fomos pioneiros no desenvolvimento de interfaces adaptáveis, sistemas de navegação por voz e ferramentas de automação que hoje são padrão na indústria.",
        mission: "Nossa missão é criar tecnologias que conectem pessoas e quebrem barreiras, transformando limitações em possibilidades através da inovação inclusiva. Acreditamos que a verdadeira inovação acontece quando todos têm acesso às mesmas oportunidades digitais, independentemente de suas habilidades físicas, cognitivas ou sensoriais. Trabalhamos incansavelmente para construir um futuro onde a tecnologia seja verdadeiramente inclusiva e transformadora, onde cada interface seja intuitiva, cada aplicativo seja acessível e cada solução digital seja pensada para a diversidade humana. Nossos valores fundamentais incluem a equidade digital, a inovação colaborativa e o empoderamento através da tecnologia.",
        img1: "/img/tester.png",
        img2: "/img/tester.png",
        location: "São Paulo, SP",
        foundedYear: 2010,
        sector: "Tecnologia da Informação",
        employeeCount: "500-1000",
        acessibilityLevel: "Excelente",
        website: "www.techcorp.com.br",
        supportTags: ["Rampa de acesso", "Elevador", "Banheiro adaptado", "Intérprete de Libras", "Software leitor de tela", "Mesa ajustável"]
    },
    {
        id: 2,
        name: "DataFlow Analytics",
        logo: "/img/logosTeste/teste2.jpeg",
        description: "Especialista em análise de big data e business intelligence, a DataFlow Analytics oferece soluções inovadoras para transformação digital que revolucionam a tomada de decisões empresariais. Nossa expertise abrange desde a coleta e processamento de grandes volumes de dados até a criação de dashboards interativos e relatórios personalizados. Utilizamos as mais avançadas tecnologias de machine learning e inteligência artificial para extrair insights valiosos que impulsionam o crescimento dos nossos clientes. Mantemos um ambiente inclusivo e diverso, especialmente voltado para profissionais PCDs, oferecendo oportunidades de crescimento em uma das áreas mais promissoras da tecnologia atual.",
        history: "Nascida em 2015 no coração do Rio de Janeiro, a DataFlow surgiu da necessidade de transformar dados em insights valiosos para empresas de todos os portes, com um diferencial único: nossa equipe fundadora era composta por estatísticos, cientistas de dados e profissionais PCDs que trouxeram perspectivas inovadoras para a análise de informações. Nossa jornada começou com a visão de que dados bem interpretados podem revolucionar negócios e criar oportunidades mais justas no mercado, especialmente quando analisados por equipes diversas que enxergam padrões que outros não conseguem identificar. Ao longo de nossa trajetória, desenvolvemos metodologias proprietárias de análise inclusiva, onde consideramos variáveis de diversidade e acessibilidade em todos os nossos modelos preditivos.",
        mission: "Transformamos dados em oportunidades reais, criando um ambiente onde a diversidade de pensamento gera insights únicos e revolucionários. Nossa missão é democratizar o acesso à inteligência de dados, promovendo um mercado mais inclusivo e baseado em evidências científicas sólidas. Acreditamos que os melhores insights surgem quando diferentes perspectivas se encontram, por isso cultivamos uma cultura onde profissionais com e sem deficiência colaboram para descobrir padrões ocultos nos dados. Nosso compromisso vai além da análise: buscamos usar o poder dos dados para identificar e combater vieses inconscientes, promover equidade salarial e criar algoritmos que reflitam a diversidade da sociedade brasileira.",
        img1: "/img/tester.png",
        img2: "/img/tester.png",
        location: "Rio de Janeiro, RJ",
        foundedYear: 2015,
        sector: "Análise de Dados",
        employeeCount: "100-500",
        acessibilityLevel: "Muito Bom",
        website: "www.dataflow.com.br",
        supportTags: ["Workstation adaptada", "Monitor de alta resolução", "Teclado especial", "Horário flexível", "Transporte fretado", "Acompanhamento psicológico"]
    },
    {
        id: 3,
        name: "Creative Marketing Hub",
        logo: "/img/logosTeste/teste3.jpeg",
        description: "Agência de marketing digital focada em campanhas inclusivas e acessíveis, a Creative Marketing Hub revoluciona a forma como as marcas se comunicam com seus públicos. Especializada em estratégias digitais que celebram a diversidade, desenvolvemos campanhas autênticas que conectam marcas com audiências reais e diversificadas. Nossa abordagem inovadora combina criatividade, dados e responsabilidade social para criar conteúdos que não apenas vendem, mas também educam e inspiram. Pioneira em comunicação que valoriza a diversidade e representatividade, trabalhamos com influenciadores PCDs, criamos conteúdos acessíveis e promovemos narrativas inclusivas que refletem a verdadeira face da sociedade brasileira.",
        history: "Estabelecida em 2018 em Belo Horizonte, a Creative Marketing Hub nasceu da paixão por criar campanhas que realmente representam a diversidade brasileira, fundada por uma equipe multidisciplinar que incluía publicitários, designers, influenciadores PCDs e ativistas sociais. Começamos como um coletivo criativo trabalhando em projetos voluntários para ONGs de inclusão e evoluímos para uma agência que coloca a inclusão no centro de cada projeto comercial. Nossa primeira grande campanha foi para uma marca de cosméticos, onde conseguimos aumentar as vendas em 300% ao apresentar modelos com diferentes tipos de deficiência de forma natural e empoderada. Desde então, desenvolvemos mais de 500 campanhas inclusivas, criamos o primeiro manual de comunicação inclusiva do setor publicitário brasileiro e formamos mais de 2.000 profissionais em marketing de diversidade.",
        mission: "Criamos comunicação que inspira, inclui e transforma percepções sobre diversidade e capacidade humana. Nossa missão é desenvolver campanhas autênticas que celebram a diversidade em todas as suas formas, quebrando estereótipos prejudiciais e construindo pontes genuínas entre marcas e pessoas reais. Acreditamos que marketing verdadeiro é aquele que representa todos os brasileiros, incluindo os 45 milhões de pessoas com deficiência que historicamente foram invisibilizadas pela publicidade tradicional. Nosso compromisso vai além da representação: buscamos educar o mercado sobre a importância da inclusão, capacitar outros profissionais para criar conteúdos acessíveis e provar que campanhas inclusivas não são apenas socialmente responsáveis, mas também extremamente eficazes comercialmente.",
        img1: "/img/tester.png",
        img2: "/img/tester.png",
        location: "Belo Horizonte, MG",
        foundedYear: 2018,
        sector: "Marketing e Publicidade",
        employeeCount: "50-100",
        acessibilityLevel: "Bom",
        website: "www.creativehub.com.br",
        supportTags: ["Ambiente criativo adaptado", "Ferramentas de design acessíveis", "Comunicação em Libras", "Espaço colaborativo", "Tecnologia assistiva"]
    },
    {
        id: 4,
        name: "InnovaFinance Corp",
        logo: "/img/logosTeste/teste4.png",
        description: "Fintech inovadora especializada em soluções financeiras digitais acessíveis, a InnovaFinance Corp está transformando o setor bancário brasileiro através da tecnologia inclusiva. Desenvolvemos produtos financeiros que atendem especificamente às necessidades de pessoas com deficiência, oferecendo desde aplicativos com interface adaptada até cartões com recursos táteis e sonoros. Nossa plataforma digital conta com recursos de acessibilidade avançados, incluindo navegação por voz, alto contraste e compatibilidade total com leitores de tela. Comprometida com a inclusão financeira e diversidade no setor bancário, a empresa mantém parcerias com organizações de apoio a PCDs e oferece produtos financeiros especializados que promovem a independência econômica.",
        history: "Fundada em 2012 em Brasília por uma economista com deficiência auditiva e um engenheiro de software cego, a InnovaFinance revolucionou o setor financeiro brasileiro ao criar as primeiras soluções bancárias verdadeiramente acessíveis. Nossa história começou quando nossos fundadores enfrentaram inúmeras barreiras para acessar serviços financeiros básicos e decidiram que era hora de transformar o sistema por completo. Fomos a primeira fintech do país a desenvolver um aplicativo bancário com navegação 100% por voz, cartões com identificação em Braille e atendimento especializado em Libras. Nossa trajetória é marcada pela constante inovação em produtos financeiros que atendem a todos os públicos, especialmente aqueles historicamente excluídos do sistema bancário tradicional. Hoje, atendemos mais de 2 milhões de clientes, sendo 60% pessoas com algum tipo de deficiência.",
        mission: "Democratizamos o acesso aos serviços financeiros através da tecnologia inclusiva e inovação social, construindo pontes onde antes existiam barreiras intransponíveis. Nossa missão é construir um sistema financeiro verdadeiramente justo e acessível, onde cada pessoa tenha as ferramentas necessárias para alcançar seus objetivos financeiros e construir patrimônio, independentemente de suas limitações físicas, sensoriais ou cognitivas. Acreditamos que a independência financeira é um direito fundamental e trabalhamos incansavelmente para eliminar todas as barreiras que impedem pessoas com deficiência de acessar crédito, investimentos e serviços bancários. Nosso compromisso vai além dos produtos: educamos nossos clientes sobre finanças pessoais através de conteúdos acessíveis e oferecemos consultoria financeira especializada.",
        img1: "/img/tester.png",
        img2: "/img/tester.png",
        location: "Brasília, DF",
        foundedYear: 2012,
        sector: "Serviços Financeiros",
        employeeCount: "1000+",
        acessibilityLevel: "Excelente",
        website: "www.innovafinance.com.br",
        supportTags: ["Segurança adaptada", "Sistema bancário acessível", "Atendimento especializado", "Treinamento em inclusão", "Ambiente corporativo adaptado"]
    },
    {
        id: 5,
        name: "EcoSustain Industries",
        logo: "/img/logosTeste/teste5.jpeg",
        description: "Empresa de consultoria em sustentabilidade e responsabilidade social, a EcoSustain Industries é especializada em projetos de impacto ambiental e inclusão social corporativa que transformam organizações em agentes de mudança positiva. Nossa abordagem única integra práticas sustentáveis com políticas de diversidade e inclusão, criando soluções que beneficiam tanto o meio ambiente quanto as comunidades locais. Desenvolvemos programas customizados de ESG (Environmental, Social and Governance) que incluem desde a implementação de tecnologias verdes até a criação de políticas inclusivas para pessoas com deficiência. Trabalhamos com empresas de todos os portes para construir um futuro mais sustentável e inclusivo, oferecendo consultoria estratégica, treinamentos especializados e acompanhamento contínuo de resultados.",
        history: "Criada em 2016 em Curitiba por uma equipe interdisciplinar de biólogos, engenheiros ambientais, ativistas da inclusão social e consultores especializados em acessibilidade, a EcoSustain nasceu da urgência de conectar sustentabilidade ambiental com responsabilidade social de forma inovadora e transformadora. Nossa fundação aconteceu quando percebemos que as soluções ambientais mais eficazes e duradouras surgem quando incluímos todas as perspectivas e experiências humanas no processo de criação, especialmente as vozes historicamente marginalizadas de pessoas com deficiência. Começamos desenvolvendo projetos de energia renovável em comunidades carentes e rapidamente descobrimos que pessoas com deficiência tinham insights únicos sobre eficiência energética, design universal e sustentabilidade que revolucionaram completamente nossas abordagens metodológicas. Ao longo de nossa trajetória de mais de 8 anos, implementamos mais de 200 projetos sustentáveis em todo o Brasil, sempre com equipes mistas que incluem profissionais PCDs, comunidades locais e especialistas técnicos. Fomos pioneiros em criar metodologias de consultoria ambiental que consideram acessibilidade desde o planejamento inicial, desenvolvemos o primeiro protocolo de construção sustentável e inclusiva do país e criamos programas de capacitação que já formaram mais de 5.000 profissionais em sustentabilidade inclusiva.",
        mission: "Construímos um futuro sustentável através da inclusão social radical e inovação responsável, onde a proteção ambiental caminha lado a lado com a justiça social, a equidade e o empoderamento de comunidades vulneráveis. Nossa missão é desenvolver soluções ambientais revolucionárias que não apenas protegem o planeta e combatem as mudanças climáticas, mas também criam oportunidades justas, dignas e transformadoras para todas as pessoas, especialmente aquelas em situação de vulnerabilidade social e pessoas com deficiência. Acreditamos profundamente que a crise climática e a exclusão social são problemas estruturalmente interconectados que exigem soluções integradas, colaborativas e verdadeiramente inclusivas. Trabalhamos incansavelmente para que cada projeto sustentável que desenvolvemos seja também um projeto de inclusão e empoderamento, onde pessoas com deficiência não sejam apenas beneficiárias passivas, mas protagonistas ativas da transformação ambiental e social. Nosso compromisso inabalável é criar um modelo de desenvolvimento que seja simultaneamente ecologicamente responsável, socialmente inclusivo, economicamente viável e culturalmente respeitoso, demonstrando que é possível e necessário construir um mundo melhor para todos.",
        img1: "/img/tester.png",
        img2: "/img/tester.png",
        location: "Curitiba, PR",
        foundedYear: 2016,
        sector: "Consultoria Ambiental",
        employeeCount: "200-500",
        acessibilityLevel: "Muito Bom",
        website: "www.ecosustain.com.br",
        supportTags: ["Escritório sustentável", "Transporte ecológico", "Acessibilidade verde", "Programas de bem-estar", "Inclusão social"]
    }
];