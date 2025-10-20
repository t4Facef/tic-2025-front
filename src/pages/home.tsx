import GenericBlueButton from "../components/buttons/generic_blue_button"
import CompaniesRow from "../components/content/companies_row"
import JobPosition from "../components/content/job_position"
import mockJobs from "../data/mockdata/jobs"

const companyIds = [1, 2, 3, 4, 5, 1, 2]; // IDs das empresas

export default function Home() {
    return (
        <div>
            <section className="relative w-full h-[500px] bg-cover bg-center" style={{ backgroundImage: "url('/img/homepage/home-page-img1.jpg')" }}>
                <div className="absolute inset-0 bg-white bg-opacity-50"></div>
                <div className="relative z-10 flex items-center justify-center h-full px-2 sm:px-4 md:px-8">
                    <div className="bg-blue1 bg-opacity-90 rounded-xl shadow-lg p-6 sm:p-8 md:p-10 max-w-7xl flex flex-1 max-h-full">
                        <div className="flex-[8]">
                            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
                                Conheça Apojobs!
                            </h1>
                            <p className="text-gray-700 text-base sm:text-lg mb-4">
                                Nosso site nasceu com a missão de aproximar pessoas e oportunidades, promovendo inclusão e acessibilidade no mercado de trabalho. Sabemos que encontrar vagas pode ser um desafio para profissionais com deficiência, assim como para empresas que desejam contratar e não sabem por onde começar. Por isso, criamos um espaço simples e intuitivo, onde candidatos podem descobrir vagas pensadas especialmente para PCDs e empresas comprometidas com a diversidade podem encontrar talentos qualificados. Mais do que conectar currículos a oportunidades, queremos construir pontes que incentivem práticas justas, humanas e inclusivas. Acreditamos que cada pessoa tem muito a oferecer e que ambientes diversos transformam a vida profissional e social de todos. Se você é candidato, cadastre seu perfil e explore novas possibilidades; se é empresa, publique suas vagas e faça parte dessa rede que valoriza a inclusão.
                            </p>
                        </div>
                        <div className="flex-[3] flex justify-between flex-col">
                            <div>
                                <img className="" src="./img/homepage/Teste.png" alt="home-img-2" />
                            </div>
                            <div className="flex justify-end items-end">
                                <GenericBlueButton color={3} link='/about' size="mdy">Conheça Mais Sobre</GenericBlueButton>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div >
                <CompaniesRow companyIds={companyIds} />
            </div>
            <div className="flex flex-col px-8 items-center my-8">
                <div className="flex flex-col items-end px-36 space-y-8">
                    <JobPosition jobData={mockJobs[6]} />
                    <JobPosition jobData={mockJobs[7]} />
                    <JobPosition jobData={mockJobs[8]} />
                    <GenericBlueButton color={3} link="/auth/register/main" size="mdy">Registre-se Agora!</GenericBlueButton>
                </div>
            </div>
        </div>
    )
}