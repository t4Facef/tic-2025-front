import TextSection from "../components/content/text_section";

export default function About() {
    return (
        <div className="p-8 flex flex-col font-georgia bg-blue1 m-16 rounded-2xl">
            <h1 className="text-5xl font-bold py-4">Sobre</h1>
            <TextSection title="O Projeto Apojobs" id="1">
                O Apojobs é uma plataforma web inclusiva desenvolvida para conectar profissionais PCDs (Pessoas com Deficiência)
                com recrutadores de empresas que precisam cumprir cotas de inclusão. Nossa missão é facilitar a inclusão
                de pessoas com deficiência no mercado de trabalho de forma eficiente e humanizada.
                <br /><br />
                <strong>Principais Funcionalidades:</strong><br />
                • Cadastro multi-step com campos específicos de acessibilidade<br />
                • Dashboard personalizado para empresas e candidatos<br />
                • Sistema de matching baseado em competências e necessidades<br />
                • Interface totalmente acessível seguindo padrões WCAG 2.1<br />
                <br />
                <strong>Impacto Social:</strong><br />
                O projeto visa reduzir a taxa de desemprego entre PCDs (aproximadamente 70% no Brasil)
                e auxiliar empresas no cumprimento da Lei de Cotas (Lei 8.213/91).
            </TextSection>

            <TextSection title="Equipe e Desenvolvimento" id="2">
                Projeto desenvolvido como trabalho acadêmico para o TIC 2025, aplicando metodologias ágeis
                e design inclusivo com foco em acessibilidade digital.
                <br /><br />
                <div className="flex items-center gap-6">
                    <img src="/img/tic2.jpg" alt="imagem-grupo" className="w-32 h-48 object-cover" />
                    <div className="flex flex-col justify-between h-32">
                        <p>• João Pedro Lourenço - Gerente do Grupo e Responsável pelo FrontEnd</p>
                        <p>• Luciano Mazarão Junior - Responsável pelo FrontEnd</p>
                        <p>• Igor Carloni - Responsável pela Documentação</p>
                        <p>• Pedro Bertoni - Responsável pelo BackEnd e Banco de Dados</p>
                        <p>• Eduardo Colombari - Responsável pelo BackEnd e Banco de Dados</p>
                    </div>
                </div>
                <br />
                <strong>Competências Aplicadas:</strong><br />
                • Desenvolvimento React/TypeScript • Design acessível • Padrões WCAG • Testes automatizados
            </TextSection>
            <TextSection title="Stack Tecnológico" id="3">
                <strong>Frontend:</strong><br />
                • React 19.1.1 - Biblioteca para interfaces componentizadas<br />
                • TypeScript 4.9.5 - Tipagem estática para maior segurança<br />
                • React Router DOM 7.7.1 - Roteamento client-side<br />
                • Tailwind CSS 3.4.17 - Framework CSS utilitário e responsivo<br />
                <br />
                <strong>Ferramentas:</strong><br />
                • Node.js & npm - Ambiente e gerenciamento de pacotes<br />
                • React Testing Library & Jest - Testes automatizados<br />
                • Create React App - Configuração otimizada<br />
                • Git - Controle de versão<br />
                <br />
                <strong>Acessibilidade:</strong><br />
                • Padrões WCAG 2.1 AA • Navegação por teclado • Labels semânticos • Contraste otimizado
            </TextSection>

            <TextSection title="Agradecimentos" id="4">
                <strong>Apoio Institucional:</strong><br />
                • Uni-FACEF - Suporte acadêmico e infraestrutura<br />
                • Professores e orientadores - Conhecimento técnico e metodológico<br />
                • Coordenação do departamento de computação da Uni-FACEF - Incentivo à inovação social<br />
                <br />
                <strong>Inspiração:</strong><br />
                • Comunidade PCD - Insights sobre necessidades reais de acessibilidade<br />
                • Profissionais de RH especializados em contratação inclusiva<br />
                <br />
                <strong>Comunidade Técnica:</strong><br />
                • Desenvolvedores das tecnologias open source utilizadas<br />
                • Comunidade de acessibilidade web e padrões WCAG<br />
                • Criadores de conteúdo educacional em tecnologia<br />
                <br />
                Este projeto representa nosso compromisso com a construção de um mercado de trabalho
                mais inclusivo e acessível para todos.
            </TextSection>
        </div>
    )
}