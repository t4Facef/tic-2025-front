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
            description: `Para criar seu perfil:\n\n1. Clique em "Cadastrar" no menu superior\n2. Selecione "Sou Candidato PCD"\n3. Preencha seus dados pessoais\n4. Informe seu tipo de deficiência\n5. Adicione suas experiências e formações\n6. Faça upload de sua foto de perfil\n\nSeu perfil será revisado em até 24 horas e você receberá um email de confirmação.`
        },
        {
            category: "Candidatos",
            title: "Preciso comprovar minha deficiência?",
            description: `Sim, para garantir a veracidade das informações e o cumprimento das cotas de inclusão, é necessário:\n\n• Laudo médico atualizado (até 2 anos)\n• Documento de identidade\n• CPF\n\nTodos os documentos são tratados com total confidencialidade e seguem a LGPD.`
        },
        {
            category: "Empresas",
            title: "Como minha empresa pode se cadastrar?",
            description: `O cadastro empresarial inclui:\n\n1. Dados da empresa (CNPJ, razão social)\n2. Informações sobre inclusão e acessibilidade\n3. Número atual de funcionários PCDs\n4. Certificações de inclusão (se houver)\n5. Descrição da cultura inclusiva da empresa\n\nApós aprovação, você poderá publicar vagas inclusivas.`
        },
        {
            category: "Empresas",
            title: "Qual o custo para empresas?",
            description: `O Apojobs oferece diferentes planos:\n\n• **Básico**: Gratuito - até 3 vagas ativas\n• **Profissional**: R$ 299/mês - vagas ilimitadas + relatórios\n• **Enterprise**: R$ 599/mês - recursos avançados + consultoria\n\nTodos os planos incluem suporte especializado em inclusão.`
        },
        {
            category: "Vagas",
            title: "Como funciona o matching de vagas?",
            description: `Nosso algoritmo considera:\n\n• Compatibilidade entre habilidades\n• Tipo de deficiência vs. adaptações oferecidas\n• Localização e modalidade de trabalho\n• Experiência e formação\n• Preferências do candidato\n\nO percentual de compatibilidade ajuda a encontrar as melhores oportunidades.`
        },
        {
            category: "Vagas",
            title: "Posso me candidatar a qualquer vaga?",
            description: `Sim! Todas as vagas na plataforma são inclusivas. Você pode:\n\n• Filtrar por tipo de deficiência\n• Buscar por adaptações específicas\n• Ver o percentual de compatibilidade\n• Candidatar-se com um clique\n\nAs empresas são notificadas sobre sua candidatura automaticamente.`
        },
        {
            category: "Acessibilidade",
            title: "O site é acessível para pessoas com deficiência visual?",
            description: `Sim! Nosso site foi desenvolvido seguindo as diretrizes WCAG 2.1:\n\n• Compatível com leitores de tela\n• Navegação por teclado\n• Alto contraste\n• Textos alternativos em imagens\n• Estrutura semântica adequada\n\nContinuamos aprimorando a acessibilidade com feedback dos usuários.`
        },
        {
            category: "Acessibilidade",
            title: "Há suporte para diferentes tipos de deficiência?",
            description: `Atendemos todos os tipos de deficiência:\n\n• **Visual**: Cegueira, baixa visão\n• **Auditiva**: Surdez, deficiência auditiva\n• **Física**: Mobilidade reduzida, amputações\n• **Intelectual**: Deficiência intelectual, autismo\n• **Múltipla**: Combinação de deficiências\n\nCada tipo tem filtros e adaptações específicas.`
        },
        {
            category: "Conta",
            title: "Como alterar minha senha?",
            description: `Para alterar sua senha:\n\n1. Faça login na sua conta\n2. Acesse "Meu Perfil"\n3. Clique em "Configurações de Conta"\n4. Selecione "Alterar Senha"\n5. Digite a senha atual e a nova senha\n6. Confirme a alteração\n\nPor segurança, você será deslogado de outros dispositivos.`
        },
        {
            category: "Conta",
            title: "Posso excluir minha conta?",
            description: `Sim, você pode excluir sua conta a qualquer momento:\n\n1. Acesse "Configurações de Conta"\n2. Role até "Zona de Perigo"\n3. Clique em "Excluir Conta"\n4. Confirme a ação\n\n⚠️ Esta ação é irreversível. Todos os seus dados serão permanentemente removidos em 30 dias.`
        }
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