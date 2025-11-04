import NavElement from "./nav_element"
import { useState } from "react"
import { ChevronDown, Info, HelpCircle, Settings, BookOpen, Sparkles } from "lucide-react"

export default function Nav(){
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

    const navItems = [
        { link: "/about", label: "Saiba Mais", icon: Info, description: "Conheça nossa missão" },
        { link: "/faq", label: "F.A.Q", icon: HelpCircle, description: "Perguntas frequentes" },
        { link: "/adaptation", label: "Adequação", icon: Settings, description: "Acessibilidade" },
        { link: "/usage", label: "Utilização", icon: BookOpen, description: "Como usar" }
    ]

    return(
        <nav className="bg-gradient-to-r from-blue4 via-blue1 to-blue4 shadow-lg border-t border-blue3/30 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            <div className="absolute top-0 left-1/4 w-32 h-1 bg-gradient-to-r from-transparent via-blue2 to-transparent"></div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Desktop Navigation */}
                <div className="hidden md:flex justify-center items-center py-4">
                    <div className="flex items-center space-x-2 lg:space-x-6">
                        {navItems.map((item, index) => (
                            <div key={item.link} className="relative group">
                                <NavElement 
                                    link={item.link} 
                                    icon={item.icon}
                                    description={item.description}
                                >
                                    {item.label}
                                </NavElement>
                                {index < navItems.length - 1 && (
                                    <div className="absolute -right-3 lg:-right-6 top-1/2 transform -translate-y-1/2 w-px h-6 bg-blue3/30"></div>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    {/* Decorative element */}
                    <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                        <Sparkles size={16} className="text-blue2/50 animate-pulse" />
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                        className="w-full flex items-center justify-center py-4 text-blue3 font-semibold hover:text-blue2 transition-all duration-200 hover:bg-white/10 rounded-lg mx-2"
                    >
                        <span className="text-lg">Navegar</span>
                        <ChevronDown 
                            size={20} 
                            className={`ml-2 transition-transform duration-300 ${isMobileNavOpen ? 'rotate-180' : ''}`} 
                        />
                    </button>
                    
                    {isMobileNavOpen && (
                        <div className="border-t border-blue3/30 py-3 space-y-2 animate-in slide-in-from-top-3 duration-300 bg-white/5 backdrop-blur-sm rounded-b-lg mx-2 mb-2">
                            {navItems.map((item) => (
                                <NavElement 
                                    key={item.link}
                                    link={item.link} 
                                    icon={item.icon}
                                    description={item.description}
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