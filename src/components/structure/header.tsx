import { Link } from "react-router-dom"
import HeaderButton from "../buttons/header_button";
import UserInfo from "../profile/user_info";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  showProfile?: boolean;
}

export default function Header({ showProfile = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue2 to-blue3 text-white shadow-lg z-50" role="banner">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 hover:opacity-90 transition-opacity group"
            aria-label="Apojobs - Ir para página inicial"
          >
            <div className="relative">
              <img 
                src="/img/logo-apojobs.jpg" 
                alt="Logo da Apojobs" 
                className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl shadow-md group-hover:shadow-lg transition-shadow" 
              />
              <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-white to-blue1 bg-clip-text text-transparent">
                Apojobs
              </h1>
              <p className="text-xs lg:text-sm text-blue1 font-medium -mt-1">
                Conectando talentos
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Navegação principal">
            {showProfile ? <UserInfo/> : <HeaderButton />}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label={isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              type="button"
            >
              {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav 
            id="mobile-navigation"
            className="md:hidden border-t border-white/20 py-4 animate-in slide-in-from-top-2 duration-200"
            role="navigation"
            aria-label="Menu de navegação mobile"
          >
            <div className="flex flex-col space-y-4">
              {/* Mobile Logo Text */}
              <div className="sm:hidden text-center pb-2">
                <span className="text-xl font-bold">Apojobs</span>
                <p className="text-xs text-blue1">Conectando talentos</p>
              </div>
              
              {/* Mobile Auth/Profile */}
              <div className="flex justify-center">
                {showProfile ? <UserInfo/> : <HeaderButton />}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}