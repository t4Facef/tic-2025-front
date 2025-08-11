import JobPosition from "../components/content/job_position"
import GenericBlueButton from "../components/buttons/generic_blue_button"

export default function Home(){
    return (
        <div>
            <section className="relative w-full h-[500px] bg-cover bg-center" style={{ backgroundImage: "url('/img/homepage/home-page-img1.jpg')" }}>
                <div className="absolute inset-0 bg-white bg-opacity-50"></div>
                <div className="relative z-10 flex items-center justify-center h-full px-2 sm:px-4 md:px-8">
                    <div className="bg-blue1 bg-opacity-90 rounded-xl shadow-lg p-6 sm:p-8 md:p-10 max-w-2xl text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
                            Bem-vindo ao nosso site!
                        </h1>
                        <p className="text-gray-700 text-base sm:text-lg">
                            Estamos felizes em te receber. Navegue pelo site e conheça mais sobre nosso projeto.
                        </p>
                    </div>
                </div>
            </section>
            <div className="bg-blue2 flex justify-between">
                <img src="./icons/angulo-esquerdo.svg" alt="" className="w-24 py-3"/>
                <img src="./icons/angulo-direito.svg" alt="" className="w-24 py-3"/>
            </div>
            <div className="flex flex-col px-8 items-center">
                <div className="flex flex-col items-end">
                    <JobPosition title="Titulo 1" profile="./ss">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis adipisci veniam harum doloribus ipsam qui veritatis ad officia porro totam itaque impedit corrupti, sunt consectetur voluptatem cumque deleniti dolor voluptatum!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus mollitia ipsam rerum totam aperiam laudantium nulla, aliquam omnis accusantium cum laborum facilis culpa perferendis, ullam esse dolore deserunt delectus et!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo ea cum quam eius sequi temporibus alias ad totam recusandae rem iste nemo et vel consequuntur, voluptatibus eum, blanditiis sit. Tenetur?            
                    </JobPosition>
                    <JobPosition title="Titulo 2" profile="./ss">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis adipisci veniam harum doloribus ipsam qui veritatis ad officia porro totam itaque impedit corrupti, sunt consectetur voluptatem cumque deleniti dolor voluptatum!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus mollitia ipsam rerum totam aperiam laudantium nulla, aliquam omnis accusantium cum laborum facilis culpa perferendis, ullam esse dolore deserunt delectus et!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo ea cum quam eius sequi temporibus alias ad totam recusandae rem iste nemo et vel consequuntur, voluptatibus eum, blanditiis sit. Tenetur?            
                    </JobPosition>
                    <JobPosition title="Titulo 3" profile="./ss">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis adipisci veniam harum doloribus ipsam qui veritatis ad officia porro totam itaque impedit corrupti, sunt consectetur voluptatem cumque deleniti dolor voluptatum!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus mollitia ipsam rerum totam aperiam laudantium nulla, aliquam omnis accusantium cum laborum facilis culpa perferendis, ullam esse dolore deserunt delectus et!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo ea cum quam eius sequi temporibus alias ad totam recusandae rem iste nemo et vel consequuntur, voluptatibus eum, blanditiis sit. Tenetur?            
                    </JobPosition>
                    <GenericBlueButton color={3}>Registre-se Agora!</GenericBlueButton>
                </div>
            </div>
        </div>
    )
}