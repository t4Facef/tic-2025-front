import { Link } from "react-router-dom";

export default function Footer(){
    return (
        <footer className="bg-blue3 text-white py-8 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Logo e Missão */}
                <div className="md:col-span-1">
                    <div className="flex items-center mb-4">
                        <img src="/img/logo-apojobs.jpg" alt="Apojobs" className="w-12 h-12 rounded-lg mr-3" />
                        <span className="text-xl font-georgia font-bold">Apojobs</span>
                    </div>
                    <p className="text-sm text-blue1">
                        Conectando talentos PCDs às melhores oportunidades inclusivas do mercado.
                    </p>
                </div>

                {/* Navegação */}
                <div>
                    <h3 className="font-bold mb-4 text-blue1">Navegação</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-blue4 transition-colors">Início</Link></li>
                        <li><Link to="/jobs" className="hover:text-blue4 transition-colors">Vagas</Link></li>
                        <li><Link to="/about" className="hover:text-blue4 transition-colors">Sobre Nós</Link></li>
                        <li><Link to="/faq" className="hover:text-blue4 transition-colors">FAQ</Link></li>
                    </ul>
                </div>

                {/* Para Candidatos */}
                <div>
                    <h3 className="font-bold mb-4 text-blue1">Usuarios</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/auth/register/main" className="hover:text-blue4 transition-colors">Cadastre-se</Link></li>
                        <li><Link to="/auth/login" className="hover:text-blue4 transition-colors">Fazer Login</Link></li>
                        <li><Link to="/adaptation" className="hover:text-blue4 transition-colors">Processo de Adequação</Link></li>
                        <li><Link to="/usage" className="hover:text-blue4 transition-colors">Como Usar</Link></li>
                    </ul>
                </div>

                {/* Ajuda */}
                <div>
                    <h3 className="font-bold mb-4 text-blue1">Precisa de Ajuda?</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/faq" className="hover:text-blue4 transition-colors">Perguntas Frequentes</Link></li>
                        <li><Link to="/adaptation" className="hover:text-blue4 transition-colors">Processo de Adequação</Link></li>
                        <li><Link to="/usage" className="hover:text-blue4 transition-colors">Guia de Utilização</Link></li>
                        <li><Link to="/about" className="hover:text-blue4 transition-colors">Sobre Inclusão</Link></li>
                    </ul>
                </div>
            </div>

            {/* Linha divisória e copyright */}
            <div className="border-t border-blue2 mt-8 pt-6 text-center">
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-blue1">
                    <p>&copy; 2025 Apojobs - Plataforma de Empregos Inclusiva. Todos os direitos reservados.</p>
                    <div className="flex space-x-4 mt-2 md:mt-0">
                        <span>Projeto Acadêmico TIC 2025</span>
                        <span>•</span>
                        <span>Inclusão & Acessibilidade</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}