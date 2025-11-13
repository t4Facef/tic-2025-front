import NavElement from "./nav_element"
import { useState } from "react"
import { ChevronDown, Info, HelpCircle, Settings, BookOpen } from "lucide-react"

export default function Nav(){
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

    const navItems = [
        { link: "/about", label: "Saiba Mais", icon: Info, description: "Conheça nossa missão" },
        { link: "/faq", label: "F.A.Q", icon: HelpCircle, description: "Perguntas frequentes" },
        { link: "/adaptation", label: "Adequação", icon: Settings, description: "Acessibilidade" },
        { link: "/usage", label: "Utilização", icon: BookOpen, description: "Como usar" }
    ]

    return(
        <nav className="bg-gradient-to-r from-blue4 via-blue1 to-blue4 shadow-lg border-t border-blue3/30" role="navigation" aria-label="Navegação secundária">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Desktop Navigation */}
                <div className="hidden md:flex justify-center items-center py-4">
                    <ul className="flex items-center space-x-2 lg:space-x-6" role="menubar">
                        {navItems.map((item, index) => (
                            <li key={item.link} className="relative group" role="none">
                                <NavElement 
                                    link={item.link}
                                    description={`${item.label} - ${item.description}`}
                                >
                                    {item.label}
                                </NavElement>
                                {index < navItems.length - 1 && (
                                    <div className="absolute -right-3 lg:-right-6 top-1/2 transform -translate-y-1/2 w-px h-6 bg-blue3/30" aria-hidden="true"></div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                        className="w-full flex items-center justify-center py-4 text-blue3 font-semibold hover:text-blue2 transition-all duration-200 hover:bg-white/10 rounded-lg mx-2"
                        aria-expanded={isMobileNavOpen}
                        aria-controls="mobile-nav-menu"
                        aria-label={isMobileNavOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
                        type="button"
                    >
                        <span className="text-lg">Navegar</span>
                        <ChevronDown 
                            size={20} 
                            className={`ml-2 transition-transform duration-300 ${isMobileNavOpen ? 'rotate-180' : ''}`}
                            aria-hidden="true"
                        />
                    </button>
                    
                    {isMobileNavOpen && (
                        <div id="mobile-nav-menu" className="border-t border-blue3/30 py-3 space-y-2" role="menu">
                            {navItems.map((item) => (
                                <NavElement 
                                    key={item.link}
                                    link={item.link}
                                    description={`${item.label} - ${item.description}`}
                                    mobile
                                >
                                    {item.label}
                                </NavElement>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}