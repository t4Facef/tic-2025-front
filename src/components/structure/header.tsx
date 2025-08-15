import { Link } from "react-router-dom"
import HeaderButton from "../buttons/header_button";

export default function Header() {
  return (
    <div className="bg-blue2 text-white py-2 px-4 flex justify-between">
      <Link to="/" className="flex items-center">
        <img src="/img/logo-apojobs.jpg" alt="logo-site" className="rounded-2xl w-28 py-1" />
        <span className="text-6xl p-5 font-georgia">Apojobs</span>
      </Link>
      <div className="flex items-center">
        <HeaderButton />
      </div>
    </div>
  );
}