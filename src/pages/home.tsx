import JobPosition from "../components/content/job_position"
import GenericBlueButton from "../components/buttons/generic_link_blue_button"
import CompaniesRow from "../components/content/companies_row"

const teste = ["./img/logosTeste/teste1.jpeg", "./img/logosTeste/teste2.jpeg", "./img/logosTeste/teste3.jpeg", "./img/logosTeste/teste4.png", "./img/logosTeste/teste5.jpeg"] //Depende de como é armazenado as imagens no banco

export default function Home(){
    return (
        <div>
            <section className="relative w-full h-[500px] bg-cover bg-center" style={{ backgroundImage: "url('/img/homepage/home-page-img1.jpg')" }}>
                <div className="absolute inset-0 bg-white bg-opacity-50"></div>
                <div className="relative z-10 flex items-center justify-center h-full px-2 sm:px-4 md:px-8 ">
                    <div className="bg-blue1 bg-opacity-90 rounded-xl shadow-lg p-6 sm:p-8 md:p-10 max-w-7xl flex flex-1 max-h-full">
                        <div className="flex-[8] font-georgia">
                            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
                                Conheça Apojobs!
                            </h1>
                            <p className="text-gray-700 text-base sm:text-lg">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti est autem, voluptatum eos animi error natus id corrupti assumenda nobis necessitatibus voluptas exercitationem eius, amet voluptatem cum, sint obcaecati facilis?
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis sunt omnis iste assumenda adipisci fuga odit suscipit! Illo molestias odit laborum autem praesentium soluta quos quo natus! Debitis, harum expedita.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus ab officiis, tenetur nihil natus delectus minus iste aliquam eveniet libero reiciendis quas ut et, dolore, id praesentium quos numquam consectetur?
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste voluptate dicta et quas nam magnam, quibusdam sint. In omnis, assumenda cumque id dolorem recusandae quisquam, temporibus explicabo magni soluta facilis?
                            </p>
                        </div>
                        <div className="flex-[3] flex justify-between flex-col">
                            <div>
                                <img className="bro" src="./img/homepage/Teste.png" alt="home-img-2"/>
                            </div>
                            <div className="flex justify-end items-end">
                                <GenericBlueButton color={3} link='/saiba_mais' size="mdy">Conheça Mais Sobre</GenericBlueButton> 
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div >
                <CompaniesRow teste={teste}></CompaniesRow>
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
                    <div className="my-6">
                        <GenericBlueButton color={3} link="/registrar" size="mdy">Registre-se Agora!</GenericBlueButton>
                    </div>
                </div>
            </div>
        </div>
    )
}