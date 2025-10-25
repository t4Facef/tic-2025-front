import TagContainer from "../components/content/tag_container";
import InfoList from "../components/content/info_list";
import { useAuth } from "../hooks/useAuth";
import NotFoundScreen from "../components/content/not_found_screen";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import EmpresaProfile from "../types/perfis/companie";
import GenericBlueButton from "../components/buttons/generic_blue_button";
import { PenLine } from "lucide-react";
import GenericFormField from "../components/forms/generic_form_field";
import { SECTORS } from "../data/constants/select_options";

interface editCompanyProfile {
    acessibilidades: string[]
    descricao: string
    missao: string
    historia: string
    area: string
    anoFundacao: number | null
    numFunc: number | null
    numFuncPcd: number | null
    site: string
}

interface Acessibilidade {
    id: number;
    nome: string;
}

export default function CompanyProfile() {
    const [companieInformation, setCompanyInformation] = useState<EmpresaProfile | null>(null)
    const [loading, setLoading] = useState(true)
    const { isAuthenticated, token, user, isOwnProfile } = useAuth()
    const { id } = useParams<{ id: string }>()
    const [isEditing, setIsEditing] = useState(false)
    const [editFields, setEditFields] = useState({
        isEditingDesc: false,
        isEditingHistory: false,
        isEditingMission: false,
        isEditingInfoList: false
    })
    const [supportOptions, setSupportOptions] = useState<string[]>([])
    const [acessibilidades, setAcessibilidades] = useState<Acessibilidade[]>([])
    const [editForm, setEditForm] = useState<editCompanyProfile>({
        acessibilidades: [],
        descricao: "",
        missao: "",
        historia: "",
        area: "",
        anoFundacao: null,
        numFunc: null,
        numFuncPcd: null,
        site: ""
    })

    const getProfileInformation = useCallback(async () => {
        try {
            setLoading(true)
            const endpoint = id 
                ? `${API_BASE_URL}/api/empresa/${id}/profile`
                : `${API_BASE_URL}/api/empresa/profile`;
            
            const headers: HeadersInit = {
                'Content-Type': 'application/json'
            };
            
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            console.log('Fazendo requisição para:', endpoint)
            const res = await fetch(endpoint, {
                method: 'GET',
                headers
            });

            if (!res.ok) {
                console.error('Erro na requisição:', res.status, res.statusText)
                setLoading(false)
                return
            }

            const data = await res.json()
            console.log('Dados recebidos:', data)
            
            if (data === null) {
                console.log('Empresa não encontrada')
                setCompanyInformation(null)
                setLoading(false)
                return
            }
            
            setCompanyInformation(data)
            setLoading(false)
        } catch (error) {
            console.error('Erro ao buscar perfil:', error)
            setLoading(false)
        }
    }, [token, id])

    useEffect(() => {
        getProfileInformation()
    }, [getProfileInformation])

    useEffect(() => {
        const fetchAcessibilidades = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/acessibilidades`)
                const data = await response.json()
                setAcessibilidades(data)
                setSupportOptions(data.map((acc: Acessibilidade) => acc.nome))
            } catch (error) {
                console.error('Erro ao carregar acessibilidades:', error)
            }
        }

        fetchAcessibilidades()
    }, [])

    useEffect(() => {
        if (companieInformation?.razaoSocial) {
            setEditForm({
                acessibilidades: companieInformation.empresaAcessibilidade?.map(acessibilidade => acessibilidade.acessibilidade.nome) || [],
                descricao: companieInformation.descricao || '',
                missao: companieInformation.missao || '',
                historia: companieInformation.historia || '',
                area: companieInformation.area || '',
                anoFundacao: companieInformation.anoFundacao || null,
                numFunc: companieInformation.numFunc || null,
                numFuncPcd: companieInformation.numFuncPcd || null,
                site: companieInformation.site || ''
            })
        }
    }, [companieInformation])

    const updateCompanieProfile = async () => {
        try {
            // Atualizar dados localmente primeiro
            setCompanyInformation(prev => {
                if (!prev) return prev;
                return {
                    ...prev,
                    descricao: editForm.descricao,
                    historia: editForm.historia,
                    missao: editForm.missao,
                    area: editForm.area,
                    anoFundacao: editForm.anoFundacao || prev.anoFundacao || 0,
                    numFunc: editForm.numFunc || undefined,
                    numFuncPcd: editForm.numFuncPcd || undefined,
                    site: editForm.site,
                    empresaAcessibilidade: editForm.acessibilidades.map(nome => {
                        const acess = acessibilidades.find(a => a.nome === nome)
                        return { acessibilidade: { nome, id: acess?.id || 0 } }
                    })
                };
            })

            const acessibilidadeIds = editForm.acessibilidades.map(nome => {
                const acess = acessibilidades.find(a => a.nome === nome)
                return acess ? acess.id : null
            }).filter(id => id !== null)

            const payload = {
                descricao: editForm.descricao,
                historia: editForm.historia,
                missao: editForm.missao,
                area: editForm.area,
                anoFundacao: editForm.anoFundacao,
                numFunc: editForm.numFunc,
                numFuncPcd: editForm.numFuncPcd,
                site: editForm.site,
                acessibilidades: acessibilidadeIds
            }

            const res = await fetch(`${API_BASE_URL}/api/empresa/${user?.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            
            if (!res.ok) {
                console.error('Erro ao salvar:', await res.text())
                // Reverter mudanças locais se falhar
                await getProfileInformation()
            }
        } catch (err) {
            console.error('Erro ao salvar perfil:', err)
            // Reverter mudanças locais se falhar
            await getProfileInformation()
        }
    }

    const handleCancelEdit = () => {
        // Restaurar valores originais
        if (!companieInformation) return;
        setEditForm({
            acessibilidades: companieInformation.empresaAcessibilidade?.map(acessibilidade => acessibilidade.acessibilidade.nome) || [],
            descricao: companieInformation.descricao || '',
            missao: companieInformation.missao || '',
            historia: companieInformation.historia || '',
            area: companieInformation.area || '',
            anoFundacao: companieInformation.anoFundacao || null,
            numFunc: companieInformation.numFunc || null,
            numFuncPcd: companieInformation.numFuncPcd || null,
            site: companieInformation.site || ''
        })
    }

    const handleSaveEdit = async () => {
        if (isEditing) {
            await updateCompanieProfile()
            setIsEditing(false)
            setEditFields({
                isEditingDesc: false,
                isEditingHistory: false,
                isEditingMission: false,
                isEditingInfoList: false
            })
        }
        else {
            setIsEditing(true)
        }
    }

    if (!id && !isAuthenticated) {
        return (
            <NotFoundScreen
                title="Acesso negado"
                message="Você precisa estar logado para acessar esta página."
                icon="🔒"
            />
        )
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl">Carregando...</div>
            </div>
        )
    }

    if (!companieInformation) {
        return (
            <NotFoundScreen
                title="Empresa não encontrada"
                message="O perfil que você está procurando não existe ou foi removido."
                icon="👤"
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

    if (companieInformation) {
        return (
            <div className="p-12 px-60">
                <div className="flex items-center">
                    <img src={`${API_BASE_URL}/api/arquivo/empresa/${id || user?.id}/foto/view`} alt="Profile-pic" className="rounded-full w-52 h-52 mr-7 shadow-xl border-[0.5px]" />
                    <div className="w-full space-y-4">
                        <div className="flex justify-between">
                            <div>
                                <h1 className="font-bold text-4xl">{companie.name}</h1>
                                <h2 className="font-medium text-lg text-gray-400">{companie.tradingName}</h2>
                            </div>
                            {companieInformation && isOwnProfile(companieInformation.id) &&
                                <GenericBlueButton color={3} size="lg" onClick={() => handleSaveEdit()}>{isEditing ? "Salvar Alterações" : "Editar Perfil"}</GenericBlueButton>
                            }
                        </div>
                        {(companie.description || isEditing) && (
                            <div className="flex flex-col space-y-3">
                                <div className={`flex justify-end transition-all duration-300 ease-in-out overflow-hidden ${isEditing ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'
                                    }`}>
                                    <button className="bg-gray-300 p-3 rounded-full hover:bg-gray-200 transition-colors" onClick={() => { handleCancelEdit(); setEditFields((prev) => ({ ...prev, isEditingDesc: !prev.isEditingDesc })); }}>
                                        <PenLine />
                                    </button>
                                </div>
                                {!editFields.isEditingDesc ?
                                    <p className="text-justify">{companie.description}</p> :
                                    <div className="bg-blue1 rounded-lg p-6 space-y-4">
                                        <GenericFormField type="textarea" id="edit_desc" value={editForm.descricao} onChange={(e) => setEditForm(prev => ({ ...prev, descricao: e.target.value }))} rows={8}>Descrição da empresa</GenericFormField>
                                        <div className="flex justify-end gap-2">
                                            <GenericBlueButton color={3} size="sm" onClick={() => { handleCancelEdit(); setEditFields(prev => ({...prev, isEditingDesc: false})); }}>Cancelar</GenericBlueButton>
                                            <GenericBlueButton color={3} size="sm" onClick={async () => { await updateCompanieProfile(); setEditFields(prev => ({...prev, isEditingDesc: false})); }}>Salvar</GenericBlueButton>
                                        </div>
                                    </div>
                                }
                            </div>
                        )}
                    </div>
                </div>
                <div className="space-y-8">
                    {(companie.history || isEditing) && (
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <h2 className="font-semibold">Nossa História</h2>
                                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isEditing ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'
                                    }`}>
                                    <button className="bg-gray-300 p-3 rounded-full hover:bg-gray-200 transition-colors" onClick={() => { handleCancelEdit(); setEditFields((prev) => ({ ...prev, isEditingHistory: !prev.isEditingHistory })); }}>
                                        <PenLine />
                                    </button>
                                </div>
                            </div>
                            <div className="flex">
                            {!editFields.isEditingHistory ?
                                <p className="text-justify">{companie.history}</p> :
                                <div className="bg-blue1 rounded-lg p-6 flex-1 space-y-4">
                                    <GenericFormField type="textarea" id="edit_history" value={editForm.historia} onChange={(e) => setEditForm(prev => ({ ...prev, historia: e.target.value }))} rows={8}>História da empresa</GenericFormField>
                                    <div className="flex justify-end gap-2">
                                        <GenericBlueButton color={3} size="sm" onClick={() => { handleCancelEdit(); setEditFields(prev => ({...prev, isEditingHistory: false})); }}>Cancelar</GenericBlueButton>
                                        <GenericBlueButton color={3} size="sm" onClick={async () => { await updateCompanieProfile(); setEditFields(prev => ({...prev, isEditingHistory: false})); }}>Salvar</GenericBlueButton>
                                    </div>
                                </div>
                            }
                            {img1Url && <img src={img1Url} alt="Imagem-empresa-1" className="w-72 ml-3" />}
                            </div>
                        </div>
                    )}
                    {(companie.mission || isEditing) && (
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <h2 className="font-semibold">Missão e valor</h2>
                                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isEditing ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'
                                    }`}>
                                    <button className="bg-gray-300 p-3 rounded-full hover:bg-gray-200 transition-colors" onClick={() => { handleCancelEdit(); setEditFields((prev) => ({ ...prev, isEditingMission: !prev.isEditingMission })); }}>
                                        <PenLine />
                                    </button>
                                </div>
                            </div>
                            <div className="flex">
                                    {img2Url && <img src={img2Url} alt="Imagem-empresa-2" className="w-72 mr-3" />}
                                    {!editFields.isEditingMission ?
                                        <p className="text-justify">{companie.mission}</p> :
                                        <div className="bg-blue1 rounded-lg p-6 flex-1 space-y-4">
                                            <GenericFormField type="textarea" id="edit_mission" value={editForm.missao} onChange={(e) => setEditForm(prev => ({ ...prev, missao: e.target.value }))} rows={8}>Missão da empresa</GenericFormField>
                                            <div className="flex justify-end gap-2">
                                                <GenericBlueButton color={3} size="sm" onClick={() => { handleCancelEdit(); setEditFields(prev => ({...prev, isEditingMission: false})); }}>Cancelar</GenericBlueButton>
                                                <GenericBlueButton color={3} size="sm" onClick={async () => { await updateCompanieProfile(); setEditFields(prev => ({...prev, isEditingMission: false})); }}>Salvar</GenericBlueButton>
                                            </div>
                                        </div>
                                    }
                            </div>
                        </div>
                    )}
                    <div className="space-y-2">
                        <div className={`flex justify-end transition-all duration-300 ease-in-out overflow-hidden ${isEditing ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                            <button className="bg-gray-300 p-3 rounded-full hover:bg-gray-200 transition-colors" onClick={() => { handleCancelEdit(); setEditFields((prev) => ({ ...prev, isEditingInfoList: !prev.isEditingInfoList })); }}>
                                <PenLine />
                            </button>
                        </div>
                        <div className="bg-blue1 rounded-lg p-8">
                    {!editFields.isEditingInfoList ? (
                        <div className="flex justify-between">
                            <InfoList items={[
                                { label: "Localização", value: companie.location || "" },
                                ...(companie.foundedYear ? [{ label: "Ano de Fundação", value: String(companie.foundedYear) }] : []),
                                ...(companie.sector ? [{ label: "Área de Atuação", value: companie.sector }] : [])
                            ]} />
                            <InfoList items={[
                                ...(companie.employeeCount ? [{ label: "Funcionários", value: companie.employeeCount }] : []),
                                ...(companie.pcdEmployeeCount ? [{ label: "Funcionários PCDs", value: companie.pcdEmployeeCount }] : []),
                                ...(companie.website ? [{ label: "Site", value: companie.website }] : [])
                            ]} />
                        </div>
                    ) : (
                        <div className="w-full space-y-6">
                            <GenericFormField id="edit_employees" type="number" value={editForm.numFunc?.toString() || ''} onChange={(e) => setEditForm(prev => ({ ...prev, numFunc: parseInt(e.target.value) || null }))}>Funcionários</GenericFormField>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <GenericFormField id="edit_founded" type="number" value={editForm.anoFundacao?.toString() || ''} onChange={(e) => setEditForm(prev => ({ ...prev, anoFundacao: parseInt(e.target.value) || null }))}>Ano de fundação</GenericFormField>
                                    <GenericFormField id="edit_area" type="select" options={SECTORS} value={editForm.area} onChange={(e) => setEditForm(prev => ({ ...prev, area: e.target.value }))}>Area de atuação</GenericFormField>
                                </div>
                                <div className="space-y-6">
                                    <GenericFormField id="edit_pcd_employees" type="number" value={editForm.numFuncPcd?.toString() || ''} onChange={(e) => setEditForm(prev => ({ ...prev, numFuncPcd: parseInt(e.target.value) || null }))}>Funcionários PCDs</GenericFormField>
                                    <GenericFormField id="edit_website" value={editForm.site} onChange={(e) => setEditForm(prev => ({ ...prev, site: e.target.value }))}>Site</GenericFormField>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <GenericBlueButton color={3} size="sm" onClick={() => { handleCancelEdit(); setEditFields(prev => ({...prev, isEditingInfoList: false})); }}>Cancelar</GenericBlueButton>
                                <GenericBlueButton color={3} size="sm" onClick={async () => { await updateCompanieProfile(); setEditFields(prev => ({...prev, isEditingInfoList: false})); }}>Salvar</GenericBlueButton>
                            </div>
                        </div>
                    )}
                        </div>
                    </div>
                    <div className="space-y-5">
                        <TagContainer
                            tags={isEditing ? editForm.acessibilidades : companie.supportTags}
                            edit={!!isEditing}
                            onChange={(newSupportTags) => setEditForm((prev) => ({ ...prev, acessibilidades: newSupportTags }))}
                            options={supportOptions}
                        >
                            Capacidade de Apoio
                        </TagContainer>
                        <div>
                            <h3>Vagas de {companie.name}</h3>
                            <div className="bg-blue1 p-44 text-center">
                                Aqui vai ficar as vagas da empresa, sendo carregado somente se tiver alguma vaga
                            </div>
                        </div>
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