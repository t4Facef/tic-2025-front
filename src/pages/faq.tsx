import { useState } from "react";
import { Search, Users, Building, Briefcase, Shield, Heart } from "lucide-react";
import Question from "../components/content/question";
import LinkListItem from "../components/content/list_link_item";

export default function Faq() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todas");

    const categories = ["Todas", "Candidatos", "Empresas", "Vagas", "Acessibilidade", "Conta"];

    const questions = [
        {
            category: "Candidatos",
            title: "Como criar meu perfil de candidato PCD?",
            description: `Para criar seu perfil:\n\n1. Clique em "Cadastrar" no menu superior\n2. Selecione "Sou Candidato PCD"\n3. Preencha seus dados pessoais\n4. Informe seu tipo de deficiência\n5. Adicione suas experiências e formações\n6. Faça upload de sua foto de perfil\n\nSeu perfil será criado imediatamente após o cadastro.`
        },
        {
            category: "Candidatos",
            title: "Preciso comprovar minha deficiência?",
            description: `Para manter a integridade da plataforma, solicitamos:\n\n• CPF\n• Laudo médico comprovando a deficiência\n\nTodos os dados são tratados com confidencialidade e seguem as melhores práticas de segurança.`
        },
        {
            category: "Empresas",
            title: "Como minha empresa pode se cadastrar?",
            description: `O cadastro empresarial inclui:\n\n1. Dados da empresa (CNPJ, razão social)\n2. Informações sobre inclusão e acessibilidade\n3. Número atual de funcionários PCDs\n4. Certificações de inclusão (se houver)\n5. Descrição da cultura inclusiva da empresa\n\nApós o cadastro, você já poderá publicar vagas inclusivas.`
        },
        {
            category: "Empresas",
            title: "Qual o custo para empresas?",
            description: `O Apojobs é uma plataforma 100% gratuita:\n\n• <strong>Cadastro</strong>: Totalmente gratuito para candidatos e empresas\n• <strong>Publicação de vagas</strong>: Sem limites ou custos\n• <strong>Todas as funcionalidades</strong>: Disponíveis sem custo\n\nNossa missão é promover a inclusão sem barreiras financeiras.`
        },
        {
            category: "Vagas",
            title: "Como funciona o matching de vagas?",
            description: `Nosso algoritmo considera:\n\n• <strong>Acessibilidade</strong>: 50% - Compatibilidade entre tipo de deficiência e adaptações oferecidas\n• <strong>Habilidades</strong>: 40% - Correspondência entre suas competências e requisitos da vaga\n• <strong>Apoios da Vaga</strong>: 10% - Recursos de suporte e benefícios oferecidos\n\nO percentual de compatibilidade ajuda a encontrar as melhores oportunidades.`
        },
        {
            category: "Vagas",
            title: "Posso me candidatar a qualquer vaga?",
            description: `Sim! Todas as vagas na plataforma são inclusivas. Recomendamos que:\n\n• Se candidate em vagas com alto índice de compatibilidade\n• Verifique se as acessibilidades são compatíveis com suas necessidades\n• Analise os recursos de apoio oferecidos\n• Considere a localização e modalidade de trabalho\n\nAs empresas são notificadas sobre sua candidatura automaticamente.`
        },
        {
            category: "Acessibilidade",
            title: "O site é acessível para pessoas com deficiência visual?",
            description: `Sim! Nosso site foi desenvolvido com foco na acessibilidade:\n\n• Estrutura semântica adequada\n• Navegação intuitiva\n• Contraste otimizado\n\nContinuamos aprimorando a acessibilidade com feedback dos usuários.`
        },
        {
            category: "Acessibilidade",
            title: "Há suporte para diferentes tipos de deficiência?",
            description: `Atendemos todos os tipos de deficiência:\n\n• <strong>Visual</strong>: Cegueira, baixa visão\n• <strong>Auditiva</strong>: Surdez, deficiência auditiva\n• <strong>Física</strong>: Mobilidade reduzida, amputações\n• <strong>Intelectual</strong>: Deficiência intelectual, autismo\n• <strong>Múltipla</strong>: Combinação de deficiências\n\nCada tipo tem filtros e adaptações específicas.`
        },
        {
            category: "Conta",
            title: "Como alterar minha senha?",
            description: `Para alterar sua senha:\n\n1. Faça login na sua conta\n2. Acesse "Meu Perfil"\n3. Clique em "Configurações de Conta"\n4. Selecione "Alterar Senha"\n5. Digite a senha atual e a nova senha\n6. Confirme a alteração\n\nPor segurança, você será deslogado de outros dispositivos.`
        },
        {
            category: "Candidatos",
            title: "Como editar meu perfil?",
            description: `Para editar seu perfil:\n\n1. Acesse seu dashboard\n2. Clique em "Visitar meu perfil"\n3. Clique no botão "Editar Perfil"\n4. Faça as alterações desejadas\n5. Clique em "Salvar Alterações"\n\nVocê pode editar formações, experiências, habilidades e foto de perfil.`
        },
        {
            category: "Empresas",
            title: "Como gerenciar candidaturas recebidas?",
            description: `No seu dashboard empresarial:\n\n1. Acesse a seção "Candidaturas"\n2. Visualize todos os candidatos por vaga\n3. Aprove ou recuse candidaturas\n4. Envie notificações aos candidatos\n5. Exporte dados dos aprovados para Excel\n\nTodos os candidatos recebem feedback sobre o status.`
        },
        {
            category: "Vagas",
            title: "O que significa o percentual de compatibilidade?",
            description: `O percentual indica quão compatível você é com a vaga:\n\n• <strong>90-100%</strong>: Excelente compatibilidade\n• <strong>70-89%</strong>: Boa compatibilidade\n• <strong>50-69%</strong>: Compatibilidade moderada\n• <strong>Abaixo de 50%</strong>: Baixa compatibilidade\n\nRecomendamos focar em vagas com 70% ou mais de compatibilidade.`
        },
        {
            category: "Acessibilidade",
            title: "Como reportar problemas de acessibilidade?",
            description: `Se encontrar dificuldades de acesso:\n\n1. Anote a página e o problema encontrado\n2. Entre em contato conosco\n3. Descreva sua deficiência e tecnologia assistiva usada\n4. Informe o navegador utilizado\n\nSeu feedback é essencial para melhorarmos a plataforma.`
        },

    ];

    const filteredQuestions = questions.filter(q => {
        const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            q.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "Todas" || q.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const getCategoryIcon = (category: string) => {
        switch(category) {
            case "Candidatos": return <Users size={16} />;
            case "Empresas": return <Building size={16} />;
            case "Vagas": return <Briefcase size={16} />;
            case "Acessibilidade": return <Heart size={16} />;
            case "Conta": return <Shield size={16} />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-blue3 mb-4">Perguntas Frequentes</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Encontre respostas para as dúvidas mais comuns sobre nossa plataforma de inclusão profissional
                    </p>
                </div>

                <div className="flex gap-8">
                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Search and Filters */}
                        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                            <div className="relative mb-6">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Buscar perguntas..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue3 focus:border-transparent"
                                />
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                            selectedCategory === category
                                                ? 'bg-blue3 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {getCategoryIcon(category)}
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Questions */}
                        <div className="space-y-4">
                            {filteredQuestions.length > 0 ? (
                                filteredQuestions.map((q, index) => (
                                    <Question
                                        key={index}
                                        title={q.title}
                                        description={q.description}
                                        category={q.category}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-lg">Nenhuma pergunta encontrada para sua busca.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="w-80">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                            <h2 className="text-xl font-semibold text-blue3 mb-6">Links Úteis</h2>
                            <div className="space-y-3">
                                <LinkListItem path="/about">Sobre o Apojobs</LinkListItem>
                                <LinkListItem path="/usage">Guia de Utilização</LinkListItem>
                                <LinkListItem path="/adaptation">Processo de Adequação</LinkListItem>
                                <LinkListItem path="/auth/register/main">Criar Conta</LinkListItem>
                                <LinkListItem path="/jobs">Buscar Vagas</LinkListItem>
                            </div>
                            
                            <div className="mt-8 p-4 bg-blue1 rounded-lg">
                                <h3 className="font-semibold text-blue3 mb-2">Precisa de mais ajuda?</h3>
                                <p className="text-sm text-gray-600 mb-3">
                                    Nossa equipe está pronta para ajudar você!
                                </p>
                                <button className="w-full bg-blue3 text-white py-2 px-4 rounded-lg hover:bg-blue3H transition-colors">
                                    Entrar em Contato
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}