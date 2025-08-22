import { ChevronLeft, ChevronRight } from "lucide-react"


type CompaniesRowPropries = {
    teste: string[]
}

export default function CompaniesRow({teste}: CompaniesRowPropries){ //Tipo temporario até ver como vai ficar depois da integração com banco de dados
    return (
        <div className="bg-blue2 p-3 py-4 flex justify-between items-center">
            <ChevronLeft size={150}/>
            {teste.map((src, index) => (
                <img 
                key={index} 
                src={src} 
                alt={`Company ${index+1}`} 
                className="w-32 h-32 object-cover rounded-full"
                />
            ))}
            <ChevronRight size={150}/>
        </div>
    )
}