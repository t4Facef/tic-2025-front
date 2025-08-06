import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";

function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}