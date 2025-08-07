import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}