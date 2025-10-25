import TagContainer from "../components/content/tag_container";
import InfoList from "../components/content/info_list";
import { useAuth } from "../hooks/useAuth";
import NotFoundScreen from "../components/content/not_found_screen";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";
import EmpresaProfile from "../types/perfis/companie";
import GenericBlueButton from "../components/buttons/generic_blue_button";
import { PenLine } from "lucide-react";

interface editCompanyProfile {
    supportTags: string[]
}

export default function CompanyProfile() {
    const [companieInformation, setCompanyInformation] = useState<EmpresaProfile>({} as EmpresaProfile)
    const { isAuthenticated, token, user, isOwnProfile } = useAuth()
    const [isEditing, setIsEditing] = useState(false)
    const [editForm, setEditForm] = useState<editCompanyProfile>({
        supportTags: []
    })

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

    useEffect(() => {
        if (companieInformation.empresaAcessibilidade) {
            setEditForm({
                supportTags: companieInformation.empresaAcessibilidade.map(acessibilidade => acessibilidade.acessibilidade.nome)
            })
        }
    }, [companieInformation])

    if (!isAuthenticated) {
        return (
            <NotFoundScreen
                title="Acesso negado"
                message="Você precisa estar logado para acessar esta página."
                icon="🔒"
            />
        )
    }

    const img1Url = null // TODO: adicionar endpoint da imagem 1
    const img2Url = null // TODO: adicionar endpoint da imagem 2

    const companie = {
        name: companieInformation.razaoSocial,
        tradingName: companieInformation.nomeFantasia,
        description: companieInformation.descricao,
        history: companieInformation.historia,
        mission: companieInformation.missao,
        location: `${companieInformation.endereco?.cidade}, ${companieInformation.endereco?.estado}`,
        foundedYear: companieInformation.anoFundacao,
        sector: companieInformation.area,
        employeeCount: String(companieInformation.numFunc || 0),
        website: companieInformation.site || "",
        pcdEmployeeCount: String(companieInformation.numFuncPcd),
        supportTags: companieInformation.empresaAcessibilidade?.map(acessibilidade => acessibilidade.acessibilidade.nome) || []
    }

    if (companie) {
        return (
            <div className="p-12 px-60">
                <div className="flex items-center">
                    <img src={`${API_BASE_URL}/api/arquivo/empresa/${user?.id}/foto/view`} alt="Profile-pic" className="rounded-full w-52 h-52 mr-7 shadow-xl border-[0.5px]" />
                    <div className="mt-4">
                        <div className="flex justify-between">
                            <div>
                                <h1 className="font-bold text-4xl">{companie.name}</h1>
                                <h2 className="font-medium text-lg text-gray-400">{companie.tradingName}</h2>

                            </div>
                            {isOwnProfile(companieInformation.id) &&
                                <GenericBlueButton color={3} size="lg" onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Salvar Alterações" : "Editar Perfil"}</GenericBlueButton>
                            }
                        </div>
                        <div className="flex flex-col mt-5 gap-3">
                            <div className={`flex justify-end transition-all duration-300 ease-in-out overflow-hidden ${isEditing ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'
                                }`}>
                                <button className="bg-gray-300 p-3 rounded-full hover:bg-gray-200 transition-colors">
                                    <PenLine />
                                </button>
                            </div>
                            <p className="text-justify">{companie.description}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="mt-8">
                        <div className="flex justify-between items-center">
                            <h2 className="font-semibold">Nossa História</h2>
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isEditing ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'
                                }`}>
                                <button className="bg-gray-300 p-3 rounded-full hover:bg-gray-200 transition-colors">
                                    <PenLine />
                                </button>
                            </div>
                        </div>
                        <div className="flex mt-3">
                            <p className="text-justify">{companie.history}</p>
                            {img1Url && <img src={img1Url} alt="Imagem-empresa-1" className="w-72 ml-3" />}
                        </div>
                    </div>
                    <div className="my-8">
                        <div className="flex justify-between items-center">
                            <h2 className="font-semibold">Missão e valor</h2>
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isEditing ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'
                                }`}>
                                <button className="bg-gray-300 p-3 rounded-full hover:bg-gray-200 transition-colors">
                                    <PenLine />
                                </button>
                            </div>
                        </div>
                        <div className="flex mt-3">
                            {img2Url && <img src={img2Url} alt="Imagem-empresa-2" className="w-72 mr-3" />}
                            <p className="text-justify">{companie.mission}</p>
                        </div>
                    </div>
                </div>
                <div className={`flex justify-end transition-all duration-300 ease-in-out overflow-hidden ${isEditing ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <button className="bg-gray-300 p-3 rounded-full hover:bg-gray-200 transition-colors">
                        <PenLine />
                    </button>
                </div>
                <div className="bg-blue1 flex justify-between p-6 mt-2 mb-6">
                    <InfoList items={[
                        { label: "Localização", value: companie.location || "" },
                        { label: "Ano de Fundação", value: String(companie.foundedYear) },
                        { label: "Área de Atuação", value: companie.sector }
                    ]} />
                    <InfoList items={[
                        { label: "Funcionários", value: companie.employeeCount },
                        { label: "Funcionários PCDs", value: companie.pcdEmployeeCount },
                        { label: "Site", value: companie.website }
                    ]} />
                </div>
                <div className="mt-5">
                    <TagContainer
                        tags={isEditing ? editForm.supportTags : companie.supportTags }
                        edit={!!isEditing}
                        onChange={(newSupportTags) => setEditForm((prev) => ({...prev, supportTags: newSupportTags}))}
                    >
                        Capacidade de Apoio
                    </TagContainer>
                </div>
                <div className="mt-5">
                    <h3>Vagas de {companie.name}</h3>
                    <div className="bg-blue1 p-44 text-center">
                        Aqui vai ficar as vagas da empresa, sendo carregado somente se tiver alguma vaga
                    </div>
                </div>
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