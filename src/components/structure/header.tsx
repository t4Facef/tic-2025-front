import { Link } from "react-router-dom"
import "./header.css"
import HeaderButton from "../buttons/header_button";

type HeaderProps = {
  showLoginButton?: boolean;
};


export default function Header({ showLoginButton = false }: HeaderProps) {
  return (
    <div className="divHeader">
      <Link to="/" className="linkHeader">
        <img src="./img/logo-apojobs.jpg" alt="logo-site" className="imgHeader" />
        <span className="txtHeader">Apojobs</span>
      </Link>
      <div className="buttonHeader">
        {showLoginButton && <HeaderButton />}
      </div>
    </div>
  );
}