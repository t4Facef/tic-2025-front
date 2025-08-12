type CompaniesRowPropries = {
    teste: string[]
}

export default function CompaniesRow({teste}: CompaniesRowPropries){ //Tipo temporario até ver como vai ficar depois da integração com banco de dados
    return (
        <div className="flex gap-4">
            {teste.map((src, index) => (
                <img 
                    key={index} 
                    src={src} 
                    alt={`Company ${index}`} 
                    className="w-16 h-16 object-cover rounded-full"
                />
            ))}
        </div>
    )
}