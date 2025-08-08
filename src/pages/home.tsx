import "../styles/home.css"

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
        </div>
    )
}