import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import Nav from "./nav";
import DevMenu from "./dev_menu";
import AccessibilityButton from "../accessibility/accessibility_button";
import { useAuth } from "../../hooks/useAuth";

export default function Layout() {
  const { isAuthenticated } = useAuth()
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header showProfile={isAuthenticated} />
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <DevMenu />
      <AccessibilityButton />
    </div>
  );
}