import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import Nav from "./nav";

type LayoutProps = {
  showLoginButton?: boolean;
};

export default function Layout({ showLoginButton = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header showLoginButton = {showLoginButton}/>
      <Nav />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}