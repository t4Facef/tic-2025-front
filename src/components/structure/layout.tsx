import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import Nav from "./nav";

import AccessibilityButton from "../accessibility/accessibility_button";
import { useAuth } from "../../hooks/useAuth";

export default function Layout() {
  const { isAuthenticated } = useAuth()
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header showProfile={isAuthenticated} />
      <Nav />
      <main id="main-content" className="flex-1" role="main" aria-label="Conteúdo principal">
        <Outlet />
      </main>
      <Footer />

      <AccessibilityButton />
    </div>
  );
}