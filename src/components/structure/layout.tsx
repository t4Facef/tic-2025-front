import { Outlet, useLocation } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import Nav from "./nav";

export default function Layout() {
  // Obtém a rota atual (ex: /usuarios, /home, etc)
  const location = useLocation();
  
  // Define quais rotas devem mostrar o perfil
  const profileRoutes = ['/usuarios'];
  
  // Verifica se a rota atual começa com alguma das rotas de perfil
  const showProfile = profileRoutes.some(route => location.pathname.startsWith(route));

  return (
    <div className="min-h-screen flex flex-col">
      <Header showProfile={showProfile} />
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}