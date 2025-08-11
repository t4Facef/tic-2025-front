import "../styles/home.css"
import JobPosition from "../components/content/job_position"

export default function Home(){
    return (
        <div>
            <section className="sectionImagemHome" style={{ backgroundImage: "url('/img/homepage/home-page-img1.jpg')" }}>
                <div className="bgIntruductionHome"></div>
                <div className="introductionAreaHome">
                    <div className="introductionBoxHome">
                        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
                            Bem-vindo ao nosso site!
                        </h1>
                        <p className="text-gray-700 text-base sm:text-lg">
                            Estamos felizes em te receber. Navegue pelo site e conheça mais sobre nosso projeto.
                        </p>
                    </div>
                </div>
            </section>
            <div className="topEmterprisesRow">
                <img src="./icons/angulo-esquerdo.svg" alt="" className="enterpriseRowElement"/>
                <img src="./icons/angulo-direito.svg" alt="" className="enterpriseRowElement"/>
            </div>
            <div className="flex flex-col px-8 items-center">
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
            </div>
        </div>
    )
}