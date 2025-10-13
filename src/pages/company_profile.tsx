// [TODO] - Inicialmente implementar logica simples de react, depois usar fetch/useEffect
// [TODO] - Verificar viabilidade de alterar cor das caixas de conteudo para cinza
// [TODO] - Fazer as imagens serem opcionais
// [TODO] - Adicionar redes sociais e suas apis se tiver

import TagContainer from "../components/content/tag_container";
import InfoList from "../components/content/info_list";
import { mockCompanies } from "../data/mockdata/companies";
import { useAuth } from "../hooks/useAuth";
import NotFoundScreen from "../components/content/not_found_screen";

export default function CompanyProfile() {
    const { user, isAuthenticated } = useAuth()
    
    if (!isAuthenticated) {
        return (
            <NotFoundScreen 
                title="Acesso negado"
                message="Você precisa estar logado para acessar esta página."
                icon="🔒"
            />
        )
    }

    const companie = mockCompanies.find(comp => comp.id === user?.id)

    if (companie) {
        return (
            <div className="p-12 px-60">
                <div className="flex items-center">
                    <img src={companie.logo} alt="Profile-pic" className="rounded-full w-52 h-52 mr-7 shadow-xl border-[0.5px]" />
                    <div className="mt-4">
                        <h1 className="font-bold text-4xl">{companie.name}</h1>
                        <p className="mt-3 text-justify">{companie.description}</p>
                    </div>
                </div>
                <div>
                    <div className="mt-8">
                        <h2 className="font-semibold">Nossa História</h2>
                        <div className="flex mt-3">
                            <p className="text-justify">{companie.history}</p>
                            <img src={companie.img1} alt="Imagem-empresa-1" className="w-72 ml-3" />
                        </div>
                    </div>
                    <div className="my-8">
                        <h2 className="font-semibold">Missão e Valor</h2>
                        <div className="flex mt-3">
                            <img src={companie.img2} alt="Imagem-empresa-2" className="w-72 mr-3" />
                            <p className="text-justify">{companie.mission}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-blue1 flex justify-between p-6 my-6">
                    <InfoList items={[
                        { label: "Localização", value: companie.location },
                        { label: "Ano de Fundação", value: String(companie.foundedYear) },
                        { label: "Área de Atuação", value: companie.sector }
                    ]} />
                    <InfoList items={[
                        { label: "Funcionários", value: companie.employeeCount },
                        { label: "Nivel de Acessibilidade", value: companie.acessibilityLevel },
                        { label: "Site", value: companie.website }
                    ]} />
                </div>
                <div className="mt-5">
                    <TagContainer tags={companie.supportTags}>Capacidade de Apoio</TagContainer>
                </div>
                <img src="/img/tester.png" alt="" className="py-6 h-96 w-full object-cover" />
            </div>
        )
    }
    else {
        return (
            <NotFoundScreen
                title="Empresa não encontrada"
                message="O perfil que você está procurando não existe ou foi removido."
                icon="👤"
            />
        )
    }
}