import TagContainer from "../components/content/tag_container";
import InfoList from "../components/content/info_list";
import { useAuth } from "../hooks/useAuth";
import NotFoundScreen from "../components/content/not_found_screen";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";
import EmpresaProfile from "../types/perfis/companie";

export default function CompanyProfile() {
    const [companieInformation, setCompanyInformation] = useState<EmpresaProfile>({} as EmpresaProfile)
    const { isAuthenticated, token, user } = useAuth()

    useEffect(() => {
        const getProfileInformation = async () => {
            if (!token) return
            
            try {
                const res = await fetch(`${API_BASE_URL}/api/empresa/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                if (!res.ok) {
                    console.error('Erro na requisição:', res.status, res.statusText)
                    return
                }
                
                const data = await res.json()
                setCompanyInformation(data)
            } catch (error) {
                console.error('Erro ao buscar perfil:', error)
            }
        }

        if (isAuthenticated && token) {
            getProfileInformation()
        }
    }, [token, isAuthenticated])

    if (!isAuthenticated) {
        return (
            <NotFoundScreen
                title="Acesso negado"
                message="Você precisa estar logado para acessar esta página."
                icon="🔒"
            />
        )
    }
    const companie = {
        name: companieInformation.razaoSocial,
        description: companieInformation.descricao,
        history: companieInformation.historia,
        img1: "todo",
        img2: "todo",
        mission: companieInformation.missao,
        location: companieInformation.endereco?.rua,
        foundedYear: "", //Implementar depois 
        sector: companieInformation.area,
        employeeCount: String(companieInformation.numFunc || 0),
        website: companieInformation.site || "",
        acessibilityLevel: "", //Implementar depois
        supportTags: companieInformation.empresaAcessibilidade?.map(acessibilidade => acessibilidade.acessibilidade.nome) || []
    }

    if (companie) {
        return (
            <div className="p-12 px-60">
                <div className="flex items-center">
                    <img src={`${API_BASE_URL}/api/arquivo/empresa/${user?.id}/foto/view`} alt="Profile-pic" className="rounded-full w-52 h-52 mr-7 shadow-xl border-[0.5px]" />
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
                        { label: "Localização", value: companie.location || "" },
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