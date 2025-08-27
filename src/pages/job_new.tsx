export default function JobNew(){
    return (
        <div className="m-12 bg-blue1">
            <form className="p-6">
                <div className="flex flex-col max-w-[25rem]">
                    <div className="flex flex-col w-full space-y-4">
                        <label htmlFor="vaga-titulo" className="font-medium">Titulo</label>
                        <input type="text" id="vaga-titulo" name="vaga-titulo" className="border border-gray-400 rounded-md"/>
                        <div className="flex space-x-5 justify-between">
                            <div>
                                <label htmlFor="vaga-prazo" className="font-medium">Inicio</label>
                                <input 
                                    type="date" 
                                    id="vaga-prazo-i" 
                                    name="vaga-prazo-i" 
                                    className="border border-gray-400 rounded-md p-2 w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="vaga-prazo" className="font-medium">Fim</label>
                                <input 
                                    type="date" 
                                    id="vaga-prazo-i" 
                                    name="vaga-prazo-i" 
                                    className="border border-gray-400 rounded-md p-2 w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    
                </div>
            </form>
        </div>
    )
}