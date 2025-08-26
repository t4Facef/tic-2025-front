export default function JobNew(){
    return (
        <div className="p-12">
            <div className="bg-blue1 p-6">
                <form>
                    <div className="flex flex-col">
                        <label htmlFor="vaga-titulo">Titulo</label>
                        <input type="text" id="vaga-titulo" name=""/>
                    </div>
                </form>
            </div>
        </div>
    )
}