import "../styles/home.css"

export default function Home(){
    return (
        <div>
            <section className="sectionImagemHome" style={{ backgroundImage: "url('/img/homepage/home-page-img1.jpg')" }}>
                <div className="bgIntruductionHome"></div>
                <div className="introductionAreaHome">
                    <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6 sm:p-8 md:p-10 max-w-2xl text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
                            Bem-vindo ao nosso site!
                        </h1>
                        <p className="text-gray-700 text-base sm:text-lg">
                            Estamos felizes em te receber. Navegue pelo site e conheça mais sobre nosso projeto.
                        </p>
                    </div>
                </div>
            </section>
            <section>

            </section>
        </div>
    )
}