import { Link } from "react-router-dom";

export default function DevMenu() {
    const routes = [
        { path: "/", name: "Home" },
        { path: "/about", name: "Sobre" },
        { path: "/faq", name: "FAQ" },
        { path: "/usage", name: "Utilização" },
        { path: "/adaptation", name: "Adequação" },
        { path: "/auth/entry", name: "Auth Entry" },
        { path: "/auth/login", name: "Login" },
        { path: "/auth/register/main", name: "Registro Principal" },
        { path: "/auth/register/candidates", name: "Registro Candidatos" },
        { path: "/auth/register/companies", name: "Registro Empresas" },
        { path: "/auth/register/success", name: "Sucesso Cadastro" },
        { path: "/auth/password/forgot", name: "Esqueci Senha" },
        { path: "/auth/password/reset", name: "Redefinir Senha" },
        { path: "/jobs", name: "Vagas" },
        { path: "/candidates/1/dashboard", name: "Dashboard Candidato" },
        { path: "/candidates/1/profile", name: "Perfil Candidato" },
        { path: "/companies/1/dashboard", name: "Dashboard Empresa" },
        { path: "/companies/1/profile", name: "Perfil Empresa" },
        { path: "/jobs/new", name: "Nova Vaga" },
        { path: "/notifications", name: "Notificações" },
        { path: "/test", name: "Testes" },
    ];

    return (
        <div className="fixed top-0 left-0 h-full w-2 z-50 group">
            <div className="absolute left-0 top-0 h-full w-2 bg-gray-800 group-hover:w-48 transition-all duration-300">
                <div className="hidden group-hover:block bg-gray-800 text-white h-full w-48 p-4 shadow-lg overflow-y-auto">
                    <h3 className="text-sm font-bold mb-4">Dev Menu</h3>
                    <div className="space-y-1">
                        {routes.map((route) => (
                            <Link
                                key={route.path}
                                to={route.path}
                                className="block text-xs hover:bg-gray-700 p-2 rounded transition-colors"
                            >
                                {route.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}