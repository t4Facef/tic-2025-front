import { Link } from "react-router-dom";
import { clearLastVisitedRoute } from "../hooks/useRoutePersistence";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-6">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-2xl font-semibold mb-2">Página não encontrada</p>
        <p className="text-center mb-6 max-w-md">
            A página que você está tentando acessar não existe ou foi movida. 
            Verifique o endereço ou volte à página inicial.
        </p>
        <Link 
        to="/" 
        onClick={() => clearLastVisitedRoute()}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
        Voltar para a Home
        </Link>
    </div>
  );
}
