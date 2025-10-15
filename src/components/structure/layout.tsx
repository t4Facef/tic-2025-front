import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import Nav from "./nav";
import DevMenu from "./dev_menu";
import { useAuth } from "../../hooks/useAuth";

export default function Layout() {
  const { isAuthenticated } = useAuth()
  return (
    <div className="min-h-screen flex flex-col ">
      <Header showProfile={isAuthenticated} />
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <DevMenu />
    </div>
  );
}