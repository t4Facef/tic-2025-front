import { Link } from "react-router-dom"
import HeaderButton from "../buttons/header_button";
import ProfilePicture from "../profile/profile_picture";

interface HeaderProps {
  showProfile?: boolean;
}

export default function Header({ showProfile = false }: HeaderProps) {
  return (
    <div className="bg-blue2 text-white py-2 px-4 flex justify-between">
      <Link to="/" className="flex items-center">
        <img src="/img/logo-apojobs.jpg" alt="logo-site" className="rounded-2xl w-28 py-1" />
        <span className="text-6xl p-5 font-georgia">Apojobs</span>
      </Link>
      <div className="flex items-center">
        {showProfile ? <ProfilePicture/> : <HeaderButton />}
      </div>
    </div>
  );
}