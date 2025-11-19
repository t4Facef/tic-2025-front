import { BookOpen, Users, Building, Search, Heart, Shield, Zap, Check, X, Mail, BarChart3, FileText, Sparkles, RotateCcw } from "lucide-react";
import AnchorListItem from "../components/content/anchor_list_item";
import TextSection from "../components/content/text_section";

export default function Usage(){
    return(
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                {/* Sidebar Navigation */}
                <nav className="hidden lg:block w-80 shrink-0 bg-blue3 text-white sticky top-0 h-screen overflow-y-auto">
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-8">
                            <BookOpen size={32} />
                            <h1 className="text-2xl font-bold">Guia Completo</h1>
                        </div>
                        
                        <div className="space-y-2">
                            <div className="text-sm font-semibold text-blue1 mb-3">PRIMEIROS PASSOS</div>
                            <AnchorListItem id="introducao">Introdução ao Apojobs</AnchorListItem>
                            <AnchorListItem id="cadastro">Como se Cadastrar</AnchorListItem>
                            <AnchorListItem id="perfil">Criando seu Perfil</AnchorListItem>
                            
                            <div className="text-sm font-semibold text-blue1 mb-3 mt-6">PARA CANDIDATOS</div>
                            <AnchorListItem id="busca-vagas">Buscando Vagas</AnchorListItem>
                            <AnchorListItem id="candidatura">Processo de Candidatura</AnchorListItem>
                            <AnchorListItem id="matching">Sistema de Matching</AnchorListItem>
                            
                            <div className="text-sm font-semibold text-blue1 mb-3 mt-6">PARA EMPRESAS</div>
                            <AnchorListItem id="publicar-vagas">Publicando Vagas</AnchorListItem>
                            <AnchorListItem id="gestao-candidatos">Gestão de Candidatos</AnchorListItem>
                            <AnchorListItem id="relatorios">Relatórios e Métricas</AnchorListItem>
                            
                            <div className="text-sm font-semibold text-blue1 mb-3 mt-6">RECURSOS AVANÇADOS</div>
                            <AnchorListItem id="acessibilidade">Recursos de Acessibilidade</AnchorListItem>
                            <AnchorListItem id="notificacoes">Sistema de Notificações</AnchorListItem>
                            <AnchorListItem id="suporte">Suporte e Ajuda</AnchorListItem>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="flex-1 p-4 md:p-8 flex flex-col items-center">
                    <div className="max-w-4xl w-full">
                        {/* Header */}
                        <div className="mb-8 md:mb-12">
                            <h1 className="text-2xl md:text-4xl font-bold text-blue3 mb-4">Guia de Utilização do Apojobs</h1>
                            <p className="text-lg md:text-xl text-gray-600">
                                Aprenda a usar todas as funcionalidades da nossa plataforma de inclusão profissional
                            </p>
                        </div>

                        {/* Introduction */}
                        <TextSection id="introducao" title="Introdução ao Apojobs">
                            <div className="bg-blue1 rounded-lg p-6 mb-6">
                                <h3 className="font-semibold text-blue3 mb-3">Bem-vindo ao Apojobs!</h3>
                                <p className="text-gray-700">
                                    O Apojobs é uma plataforma inovadora dedicada à inclusão de pessoas com deficiência (PCDs) no mercado de trabalho. Nossa missão é conectar talentos PCDs com empresas comprometidas com a diversidade e inclusão.
                                </p>
                            </div>
                            
                            <h3 className="text-xl font-semibold text-blue3 mb-4">O que você encontrará aqui:</h3>
                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border">
                                    <Users className="text-blue3 mt-1" size={20} />
                                    <div>
                                        <h4 className="font-semibold">Para Candidatos</h4>
                                        <p className="text-sm text-gray-600">Crie seu perfil, busque vagas inclusivas e conecte-se com empresas</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border">
                                    <Building className="text-blue3 mt-1" size={20} />
                                    <div>
                                        <h4 className="font-semibold">Para Empresas</h4>
                                        <p className="text-sm text-gray-600">Publique vagas, encontre talentos e cumpra suas metas de inclusão</p>
                                    </div>
                                </div>
                            </div>
                        </TextSection>

                        <TextSection id="cadastro" title="Como se Cadastrar">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-blue3 mb-3">Passo a Passo para Candidatos:</h3>
                                    <ol className="list-decimal list-inside space-y-2 text-gray-700">
                                        <li>Acesse a página inicial e clique em "Cadastrar"</li>
                                        <li>Selecione "Sou Candidato PCD"</li>
                                        <li>Preencha seus dados pessoais (nome, email, CPF, telefone)</li>
                                        <li>Informe seu tipo de deficiência e especificações</li>
                                        <li>Adicione seu endereço completo</li>
                                        <li>Confirme seu email através do link enviado</li>
                                    </ol>
                                </div>
                                
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-yellow-800 mb-2">📋 Documentos Necessários:</h4>
                                    <ul className="text-sm text-yellow-700 space-y-1">
                                        <li>• Documento de identidade com foto</li>
                                        <li>• CPF</li>
                                        <li>• Comprovante de deficiência (quando aplicável)</li>
                                    </ul>
                                </div>
                            </div>
                        </TextSection>

                        <TextSection id="perfil" title="Criando seu Perfil">
                            <div className="space-y-6">
                                <p className="text-gray-700">
                                    Um perfil completo aumenta suas chances de ser encontrado por recrutadores. Siga estas dicas:
                                </p>
                                
                                <div className="grid gap-4">
                                    <div className="bg-white border rounded-lg p-4">
                                        <h4 className="font-semibold text-blue3 mb-2">📸 Foto de Perfil</h4>
                                        <p className="text-sm text-gray-600">Use uma foto profissional, com boa iluminação e fundo neutro. Nossa ferramenta de crop ajuda a ajustar a imagem perfeitamente.</p>
                                    </div>
                                    
                                    <div className="bg-white border rounded-lg p-4">
                                        <h4 className="font-semibold text-blue3 mb-2">🎓 Formação Acadêmica</h4>
                                        <p className="text-sm text-gray-600">Adicione todos os seus cursos, desde o ensino médio até especializações. Inclua instituição, período e status.</p>
                                    </div>
                                    
                                    <div className="bg-white border rounded-lg p-4">
                                        <h4 className="font-semibold text-blue3 mb-2">💼 Experiência Profissional</h4>
                                        <p className="text-sm text-gray-600">Descreva suas experiências anteriores, destacando conquistas e responsabilidades principais.</p>
                                    </div>
                                    
                                    <div className="bg-white border rounded-lg p-4">
                                        <h4 className="font-semibold text-blue3 mb-2">🛠️ Habilidades</h4>
                                        <p className="text-sm text-gray-600">Adicione suas competências técnicas e comportamentais relevantes para as vagas desejadas.</p>
                                    </div>
                                </div>
                            </div>
                        </TextSection>

                        <TextSection id="busca-vagas" title="Buscando Vagas">
                            <div className="space-y-6">
                                <div className="flex items-start gap-3 mb-4">
                                    <Search className="text-blue3 mt-1" size={24} />
                                    <div>
                                        <h3 className="text-lg font-semibold text-blue3">Sistema de Busca Inteligente</h3>
                                        <p className="text-gray-600">Nossa busca considera suas preferências e compatibilidade com as vagas.</p>
                                    </div>
                                </div>
                                
                                <div className="bg-white border rounded-lg p-6">
                                    <h4 className="font-semibold mb-4">Filtros Disponíveis:</h4>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <h5 className="font-medium text-blue3 mb-2">Localização</h5>
                                            <ul className="text-sm text-gray-600 space-y-1">
                                                <li>• Estado e cidade</li>
                                                <li>• Modalidade (presencial, remoto, híbrido)</li>
                                                <li>• Distância máxima</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="font-medium text-blue3 mb-2">Características da Vaga</h5>
                                            <ul className="text-sm text-gray-600 space-y-1">
                                                <li>• Tipo de contrato (CLT, PJ, estágio)</li>
                                                <li>• Nível de experiência</li>
                                                <li>• Setor de atuação</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="font-medium text-blue3 mb-2">Acessibilidade</h5>
                                            <ul className="text-sm text-gray-600 space-y-1">
                                                <li>• Tipo de deficiência</li>
                                                <li>• Adaptações oferecidas</li>
                                                <li>• Recursos de apoio</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="font-medium text-blue3 mb-2">Outros</h5>
                                            <ul className="text-sm text-gray-600 space-y-1">
                                                <li>• Faixa salarial</li>
                                                <li>• Data de publicação</li>
                                                <li>• Compatibilidade mínima</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TextSection>

                        <TextSection id="candidatura" title="Processo de Candidatura">
                            <div className="space-y-6">
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-green-800 mb-2">✅ Candidatura Simplificada</h4>
                                    <p className="text-green-700 text-sm">
                                        Com seu perfil completo, você pode se candidatar a qualquer vaga com apenas um clique!
                                    </p>
                                </div>
                                
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-blue3">Status da Candidatura:</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                            <div>
                                                <span className="font-medium">Enviada</span>
                                                <p className="text-sm text-gray-600">Sua candidatura foi recebida pela empresa</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                            <div>
                                                <span className="font-medium">Em Análise</span>
                                                <p className="text-sm text-gray-600">O recrutador está avaliando seu perfil</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                            <div>
                                                <span className="font-medium">Aprovada</span>
                                                <p className="text-sm text-gray-600">Parabéns! Você foi selecionado para a próxima etapa</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TextSection>

                        <TextSection id="matching" title="Sistema de Matching">
                            <div className="space-y-6">
                                <div className="flex items-start gap-3">
                                    <Zap className="text-blue3 mt-1" size={24} />
                                    <div>
                                        <h3 className="text-lg font-semibold text-blue3 mb-2">Como Funciona o Matching</h3>
                                        <p className="text-gray-600">
                                            Nosso algoritmo inteligente calcula a compatibilidade entre seu perfil e as vagas disponíveis.
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="bg-white border rounded-lg p-6">
                                    <h4 className="font-semibold mb-4">Critérios de Compatibilidade:</h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center p-3 bg-green-50 rounded border-l-4 border-green-500">
                                            <div>
                                                <span className="font-medium">Acessibilidade</span>
                                                <p className="text-sm text-gray-600">Compatibilidade entre deficiência e adaptações</p>
                                            </div>
                                            <span className="text-green-600 font-bold text-lg">50%</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded border-l-4 border-blue-500">
                                            <div>
                                                <span className="font-medium">Habilidades</span>
                                                <p className="text-sm text-gray-600">Correspondência entre competências e requisitos</p>
                                            </div>
                                            <span className="text-blue-600 font-bold text-lg">40%</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded border-l-4 border-purple-500">
                                            <div>
                                                <span className="font-medium">Apoios da Vaga</span>
                                                <p className="text-sm text-gray-600">Recursos de suporte e benefícios oferecidos</p>
                                            </div>
                                            <span className="text-purple-600 font-bold text-lg">10%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TextSection>

                        <TextSection id="acessibilidade" title="Recursos de Acessibilidade">
                            <div className="space-y-6">
                                <div className="flex items-start gap-3">
                                    <Heart className="text-blue3 mt-1" size={24} />
                                    <div>
                                        <h3 className="text-lg font-semibold text-blue3 mb-2">Compromisso com a Acessibilidade</h3>
                                        <p className="text-gray-600">
                                            Nossa plataforma foi desenvolvida com foco na acessibilidade para garantir acesso a todos os usuários.
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-white border rounded-lg p-4">
                                        <h4 className="font-semibold text-blue3 mb-3">👁️ Deficiência Visual</h4>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• Compatibilidade com leitores de tela</li>
                                            <li>• Navegação por teclado</li>
                                            <li>• Alto contraste</li>
                                            <li>• Textos alternativos em imagens</li>
                                            <li>• Estrutura semântica adequada</li>
                                        </ul>
                                    </div>
                                    
                                    <div className="bg-white border rounded-lg p-4">
                                        <h4 className="font-semibold text-blue3 mb-3">👂 Deficiência Auditiva</h4>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• Legendas em vídeos</li>
                                            <li>• Transcrições de áudio</li>
                                            <li>• Indicadores visuais</li>
                                            <li>• Chat de suporte</li>
                                            <li>• Comunicação por texto</li>
                                        </ul>
                                    </div>
                                    
                                    <div className="bg-white border rounded-lg p-4">
                                        <h4 className="font-semibold text-blue3 mb-3">🦽 Deficiência Física</h4>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• Interface adaptável</li>
                                            <li>• Botões grandes e espaçados</li>
                                            <li>• Navegação simplificada</li>
                                            <li>• Suporte a dispositivos assistivos</li>
                                            <li>• Tempo estendido para ações</li>
                                        </ul>
                                    </div>
                                    
                                    <div className="bg-white border rounded-lg p-4">
                                        <h4 className="font-semibold text-blue3 mb-3">🧠 Deficiência Intelectual</h4>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• Linguagem clara e simples</li>
                                            <li>• Instruções passo a passo</li>
                                            <li>• Ícones explicativos</li>
                                            <li>• Feedback constante</li>
                                            <li>• Suporte personalizado</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </TextSection>

                        <TextSection id="publicar-vagas" title="Publicando Vagas (Empresas)">
                            <div className="space-y-6">
                                <p className="text-gray-700">
                                    Para empresas cadastradas, publicar vagas inclusivas é simples e eficiente:
                                </p>
                                
                                <div className="bg-white border rounded-lg p-6">
                                    <h4 className="font-semibold mb-4">Informações Obrigatórias:</h4>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <h5 className="font-medium text-blue3 mb-2">Dados Básicos</h5>
                                            <ul className="text-sm text-gray-600 space-y-1">
                                                <li>• Título da vaga</li>
                                                <li>• Descrição detalhada</li>
                                                <li>• Localização</li>
                                                <li>• Modalidade de trabalho</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="font-medium text-blue3 mb-2">Requisitos</h5>
                                            <ul className="text-sm text-gray-600 space-y-1">
                                                <li>• Habilidades necessárias</li>
                                                <li>• Experiência mínima</li>
                                                <li>• Formação acadêmica</li>
                                                <li>• Tipo de contrato</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="font-medium text-blue3 mb-2">Inclusão</h5>
                                            <ul className="text-sm text-gray-600 space-y-1">
                                                <li>• Tipos de deficiência aceitos</li>
                                                <li>• Adaptações oferecidas</li>
                                                <li>• Recursos de apoio</li>
                                                <li>• Acessibilidade do local</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="font-medium text-blue3 mb-2">Benefícios</h5>
                                            <ul className="text-sm text-gray-600 space-y-1">
                                                <li>• Salário (opcional)</li>
                                                <li>• Benefícios oferecidos</li>
                                                <li>• Horário de trabalho</li>
                                                <li>• Oportunidades de crescimento</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TextSection>

                        <TextSection id="gestao-candidatos" title="Gestão de Candidatos">
                            <div className="space-y-6">
                                <div className="flex items-start gap-3">
                                    <Users className="text-blue3 mt-1" size={24} />
                                    <div>
                                        <h3 className="text-lg font-semibold text-blue3 mb-2">Painel de Candidaturas</h3>
                                        <p className="text-gray-600">
                                            Gerencie todas as candidaturas recebidas de forma organizada e eficiente.
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="bg-white border rounded-lg p-6">
                                    <h4 className="font-semibold mb-4">Funcionalidades Disponíveis:</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                                            <div className="w-8 h-8 md:w-8 md:h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-semibold shrink-0">
                                                <Check size={16} />
                                            </div>
                                            <div>
                                                <h5 className="font-medium">Aprovar Candidatos</h5>
                                                <p className="text-sm text-gray-600">Selecione os candidatos que atendem aos requisitos da vaga</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                                            <div className="w-8 h-8 md:w-8 md:h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-semibold shrink-0">
                                                <X size={16} />
                                            </div>
                                            <div>
                                                <h5 className="font-medium">Recusar Candidatos</h5>
                                                <p className="text-sm text-gray-600">Decline candidaturas que não se adequam à posição</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                                            <div className="w-8 h-8 md:w-8 md:h-8 bg-blue3 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-semibold shrink-0">
                                                <Mail size={16} />
                                            </div>
                                            <div>
                                                <h5 className="font-medium">Enviar Notificações</h5>
                                                <p className="text-sm text-gray-600">Comunique-se diretamente com os candidatos aprovados ou recusados</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                                            <div className="w-8 h-8 md:w-8 md:h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-semibold shrink-0">
                                                <BarChart3 size={16} />
                                            </div>
                                            <div>
                                                <h5 className="font-medium">Exportar Dados</h5>
                                                <p className="text-sm text-gray-600">Baixe planilhas Excel com dados dos candidatos aprovados</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TextSection>

                        <TextSection id="relatorios" title="Relatórios e Métricas">
                            <div className="space-y-6">
                                <div className="flex items-start gap-3">
                                    <Building className="text-blue3 mt-1" size={24} />
                                    <div>
                                        <h3 className="text-lg font-semibold text-blue3 mb-2">Dashboard Empresarial</h3>
                                        <p className="text-gray-600">
                                            Acompanhe métricas importantes sobre suas vagas e processo de inclusão.
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-white border rounded-lg p-4">
                                        <h4 className="font-semibold text-blue3 mb-3">📈 Métricas de Vagas</h4>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• Total de vagas publicadas</li>
                                            <li>• Candidaturas recebidas</li>
                                            <li>• Taxa de conversão</li>
                                            <li>• Tempo médio de preenchimento</li>
                                            <li>• Vagas mais populares</li>
                                        </ul>
                                    </div>
                                    
                                    <div className="bg-white border rounded-lg p-4">
                                        <h4 className="font-semibold text-blue3 mb-3">👥 Dados de Inclusão</h4>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• Candidatos por tipo de deficiência</li>
                                            <li>• Distribuição geográfica</li>
                                            <li>• Níveis de experiência</li>
                                            <li>• Áreas de formação</li>
                                            <li>• Compatibilidade média</li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div className="bg-blue1 rounded-lg p-6">
                                    <h4 className="font-semibold text-blue3 mb-3">📋 Relatórios Personalizados</h4>
                                    <p className="text-gray-700 mb-3">
                                        Gere relatórios detalhados para acompanhar o progresso das suas metas de inclusão:
                                    </p>
                                    <ul className="text-sm text-gray-700 space-y-1">
                                        <li>• Relatório mensal de contratações PCD</li>
                                        <li>• Análise de efetividade das vagas</li>
                                        <li>• Comparativo com metas de inclusão</li>
                                        <li>• Feedback dos candidatos</li>
                                    </ul>
                                </div>
                            </div>
                        </TextSection>

                        <TextSection id="notificacoes" title="Sistema de Notificações">
                            <div className="space-y-6">
                                <div className="flex items-start gap-3">
                                    <Heart className="text-blue3 mt-1" size={24} />
                                    <div>
                                        <h3 className="text-lg font-semibold text-blue3 mb-2">Mantenha-se Informado</h3>
                                        <p className="text-gray-600">
                                            Receba notificações importantes sobre candidaturas, vagas e atualizações da plataforma.
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="bg-white border rounded-lg p-6">
                                    <h4 className="font-semibold mb-4">Tipos de Notificações:</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                                            <div className="w-8 h-8 md:w-8 md:h-8 bg-blue3 rounded-full flex items-center justify-center text-white text-xs md:text-sm shrink-0">
                                                <FileText size={16} />
                                            </div>
                                            <div>
                                                <h5 className="font-medium">Novas Candidaturas</h5>
                                                <p className="text-sm text-gray-600">Seja notificado quando alguém se candidatar às suas vagas</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                                            <div className="w-8 h-8 md:w-8 md:h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs md:text-sm shrink-0">
                                                <Sparkles size={16} />
                                            </div>
                                            <div>
                                                <h5 className="font-medium">Novas Vagas</h5>
                                                <p className="text-sm text-gray-600">Candidatos recebem alertas de vagas compatíveis com seu perfil</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                                            <div className="w-8 h-8 md:w-8 md:h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs md:text-sm shrink-0">
                                                <RotateCcw size={16} />
                                            </div>
                                            <div>
                                                <h5 className="font-medium">Status de Candidatura</h5>
                                                <p className="text-sm text-gray-600">Atualizações sobre aprovação, recusa ou próximas etapas</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                                            <div className="w-8 h-8 md:w-8 md:h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs md:text-sm shrink-0">
                                                <Zap size={16} />
                                            </div>
                                            <div>
                                                <h5 className="font-medium">Atualizações da Plataforma</h5>
                                                <p className="text-sm text-gray-600">Novos recursos, melhorias e comunicados importantes</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-800 mb-2">⚙️ Configurações</h4>
                                    <p className="text-sm text-gray-600">
                                        Você pode personalizar suas preferências de notificação no seu perfil, 
                                        escolhendo receber alertas por email, SMS ou apenas na plataforma.
                                    </p>
                                </div>
                            </div>
                        </TextSection>

                        <TextSection id="suporte" title="Suporte e Ajuda">
                            <div className="space-y-6">
                                <div className="flex items-start gap-3">
                                    <Shield className="text-blue3 mt-1" size={24} />
                                    <div>
                                        <h3 className="text-lg font-semibold text-blue3 mb-2">Estamos Aqui para Ajudar</h3>
                                        <p className="text-gray-600">
                                            Nossa equipe de suporte está preparada para atender suas necessidades específicas.
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="bg-blue1 rounded-lg p-6">
                                    <h4 className="font-semibold text-blue3 mb-3">💡 Dica Importante</h4>
                                    <p className="text-gray-700">
                                        Mantenha sempre seu perfil atualizado para receber as melhores oportunidades. 
                                        Nosso sistema de matching funciona melhor com informações completas e precisas.
                                    </p>
                                </div>
                            </div>
                        </TextSection>
                    </div>
                </div>
            </div>
        </div>
    )
}