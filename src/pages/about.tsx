export default function About() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue1 to-blue4">
            {/* Hero Section */}
            <div className="bg-blue3 text-white py-16">
                <div className="max-w-6xl mx-auto px-8">
                    <h1 className="text-6xl font-bold mb-4">Sobre o Apojobs</h1>
                    <p className="text-xl opacity-90">Conectando talentos às oportunidades certas</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-8 py-12">
                {/* Projeto Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-blue3">O Projeto Apojobs</h2>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        O Apojobs é uma plataforma web inclusiva desenvolvida para conectar profissionais PCDs (Pessoas com Deficiência)
                        com recrutadores de empresas que precisam cumprir cotas de inclusão. Nossa missão é facilitar a inclusão
                        de pessoas com deficiência no mercado de trabalho de forma eficiente e humanizada.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-blue1 p-6 rounded-xl">
                            <h3 className="text-xl font-semibold text-blue3 mb-4">Principais Funcionalidades</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-center"><span className="text-blue3 mr-2">✓</span> Cadastro multi-step com campos específicos de acessibilidade</li>
                                <li className="flex items-center"><span className="text-blue3 mr-2">✓</span> Dashboard personalizado para empresas e candidatos</li>
                                <li className="flex items-center"><span className="text-blue3 mr-2">✓</span> Sistema de matching baseado em competências</li>
                                <li className="flex items-center"><span className="text-blue3 mr-2">✓</span> Interface totalmente acessível seguindo padrões WCAG 2.1</li>
                            </ul>
                        </div>
                        
                        <div className="bg-blue5 p-6 rounded-xl">
                            <h3 className="text-xl font-semibold text-blue3 mb-4">Impacto Social</h3>
                            <p className="text-gray-700">
                                O projeto visa reduzir a taxa de desemprego entre PCDs (aproximadamente 70% no Brasil)
                                e auxiliar empresas no cumprimento da Lei de Cotas (Lei 8.213/91).
                            </p>
                        </div>
                    </div>
                </div>

                {/* Equipe Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-blue3">Equipe e Desenvolvimento</h2>
                    </div>
                    
                    <p className="text-gray-700 text-lg mb-8">
                        Projeto desenvolvido como trabalho acadêmico para o TIC 2025, aplicando metodologias ágeis
                        e design inclusivo com foco em acessibilidade digital.
                    </p>
                    
                    <div className="bg-gradient-to-r from-blue1 to-blue4 p-8 rounded-xl">
                        <div className="flex flex-col lg:flex-row items-center gap-8">
                            <img src="/img/tic2.jpg" alt="Equipe TIC 2025" className="w-48 h-64 object-cover rounded-xl shadow-lg" />
                            <div className="flex-1">
                                <h3 className="text-2xl font-semibold text-blue3 mb-6">Nossa Equipe</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-white p-4 rounded-lg shadow">
                                        <p className="font-semibold text-blue3">João Pedro Lourenço</p>
                                        <p className="text-sm text-gray-600">Gerente do Grupo e FrontEnd</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg shadow">
                                        <p className="font-semibold text-blue3">Luciano Mazarão Junior</p>
                                        <p className="text-sm text-gray-600">Responsável pelo FrontEnd</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg shadow">
                                        <p className="font-semibold text-blue3">Igor Carloni</p>
                                        <p className="text-sm text-gray-600">Responsável pela Documentação</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg shadow">
                                        <p className="font-semibold text-blue3">Pedro Bertoni</p>
                                        <p className="text-sm text-gray-600">BackEnd e Banco de Dados</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
                                        <p className="font-semibold text-blue3">Eduardo Colombari</p>
                                        <p className="text-sm text-gray-600">BackEnd e Banco de Dados</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8 bg-white p-6 rounded-xl">
                            <h4 className="text-lg font-semibold text-blue3 mb-4">Competências Aplicadas</h4>
                            <div className="flex flex-wrap gap-3">
                                <span className="bg-blue3 text-white px-4 py-2 rounded-full text-sm">React/TypeScript</span>
                                <span className="bg-blue3 text-white px-4 py-2 rounded-full text-sm">Design Acessível</span>
                                <span className="bg-blue3 text-white px-4 py-2 rounded-full text-sm">Padrões WCAG</span>
                                <span className="bg-blue3 text-white px-4 py-2 rounded-full text-sm">Testes Automatizados</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stack Tecnológico */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-blue3">Stack Tecnológico</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-blue1 p-6 rounded-xl">
                            <h3 className="text-xl font-semibold text-blue3 mb-4">Frontend</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• React 19.1.1 - Interfaces componentizadas</li>
                                <li>• TypeScript 4.9.5 - Tipagem estática</li>
                                <li>• React Router DOM 7.7.1 - Roteamento</li>
                                <li>• Tailwind CSS 3.4.17 - Framework CSS</li>
                            </ul>
                        </div>
                        
                        <div className="bg-blue2 text-white p-6 rounded-xl">
                            <h3 className="text-xl font-semibold text-white mb-4">Ferramentas</h3>
                            <ul className="space-y-2 text-white">
                                <li>• Node.js & npm - Ambiente</li>
                                <li>• React Testing Library - Testes</li>
                                <li>• Create React App - Configuração</li>
                                <li>• Git - Controle de versão</li>
                            </ul>
                        </div>
                        
                        <div className="bg-blue4 p-6 rounded-xl">
                            <h3 className="text-xl font-semibold text-blue3 mb-4">Acessibilidade</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Padrões WCAG 2.1 AA</li>
                                <li>• Navegação por teclado</li>
                                <li>• Labels semânticos</li>
                                <li>• Contraste otimizado</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Agradecimentos */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-blue3">Agradecimentos</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-blue1 p-6 rounded-xl">
                            <h3 className="text-lg font-semibold text-blue3 mb-4">Apoio Institucional</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Uni-FACEF - Suporte acadêmico</li>
                                <li>• Professores e orientadores</li>
                                <li>• Coordenação do departamento</li>
                            </ul>
                        </div>
                        
                        <div className="bg-blue2 text-white p-6 rounded-xl">
                            <h3 className="text-lg font-semibold text-white mb-4">Inspiração</h3>
                            <ul className="space-y-2 text-white">
                                <li>• Comunidade PCD</li>
                                <li>• Profissionais de RH inclusivos</li>
                            </ul>
                        </div>
                        
                        <div className="bg-blue4 p-6 rounded-xl">
                            <h3 className="text-lg font-semibold text-blue3 mb-4">Comunidade Técnica</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Desenvolvedores open source</li>
                                <li>• Comunidade de acessibilidade</li>
                                <li>• Criadores de conteúdo</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="mt-8 bg-gradient-to-r from-blue3 to-blue2 text-white p-6 rounded-xl text-center">
                        <p className="text-lg font-medium">
                            Este projeto representa nosso compromisso com a construção de um mercado de trabalho
                            mais inclusivo e acessível para todos.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}