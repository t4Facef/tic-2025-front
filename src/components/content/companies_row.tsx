type CompaniesRowPropries = {
    teste: string[]
}

export default function CompaniesRow({teste}: CompaniesRowPropries){ //Tipo temporario até ver como vai ficar depois da integração com banco de dados
    return (
        <div className="bg-blue2 p-3 py-4 flex justify-between">
            <img src="./icons/angulo-esquerdo.svg" alt="" className="w-24 py-3"/>
            {teste.map((src, index) => (
                <img 
                key={index} 
                src={src} 
                alt={`Company ${index+1}`} 
                className="w-32 h-32 object-cover rounded-full"
                />
            ))}
            <img src="./icons/angulo-direito.svg" alt="" className="w-24 py-3"/>
        </div>
    )
}