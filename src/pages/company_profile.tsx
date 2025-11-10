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
    const { isAuthenticated, token, user, isOwnProfile, role } = useAuth()
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
            
            if (data === null) {
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

    if (role === 'ADMIN') {
        return (
            <NotFoundScreen
                title="Acesso negado"
                message="Administradores não podem acessar perfis de empresa."
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

    // Imagens adicionais da empresa (não implementado)
    const img1Url = null
    const img2Url = null

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
            <div className="min-h-screen bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header Section */}
                    <div className="bg-white rounded-3xl p-8 mb-8 border border-blue3 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div className="flex flex-col lg:flex-row items-center gap-6">
                                <div className="relative">
                                    <img 
                                        src={`${API_BASE_URL}/api/arquivos/empresa/${id || user?.id}/foto/view`} 
                                        alt="Logo da empresa" 
                                        className="w-52 h-52 rounded-3xl object-cover shadow-lg" 
                                    />
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue2 rounded-full border-4 border-white"></div>
                                </div>
                                <div className="text-center lg:text-left">
                                    <h1 className="text-4xl font-bold text-blue3 mb-2">{companie.name}</h1>
                                    <h2 className="text-xl text-blue2 font-semibold mb-4">{companie.tradingName}</h2>
                                    {(companie.description || isEditing) && !editFields.isEditingDesc && (
                                        <div className="bg-blue1 p-4 rounded-2xl border border-blue2">
                                            <p className="text-blue3 max-w-2xl leading-relaxed">{companie.description}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {companieInformation && isOwnProfile(companieInformation.id) && role !== 'ADMIN' && (
                                <div className="flex gap-3">
                                    <GenericBlueButton color={3} size="lg" onClick={() => handleSaveEdit()}>
                                        {isEditing ? "Salvar Alterações" : "Editar Perfil"}
                                    </GenericBlueButton>
                                </div>
                            )}
                        </div>
                        
                        {/* Editable Description */}
                        {(companie.description || isEditing) && (
                            <div className="mt-6">
                                <div className={`flex justify-end transition-all duration-300 ease-in-out overflow-hidden ${isEditing ? 'max-h-16 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                                    <button 
                                        className="bg-blue2 hover:bg-blue3 text-white p-3 rounded-2xl transition-colors"
                                        onClick={() => { handleCancelEdit(); setEditFields((prev) => ({ ...prev, isEditingDesc: !prev.isEditingDesc })); }}
                                    >
                                        <PenLine className="w-4 h-4" />
                                    </button>
                                </div>
                                {editFields.isEditingDesc && (
                                    <div className="bg-blue1 border border-blue2 rounded-2xl p-6 space-y-4">
                                        <GenericFormField 
                                            type="textarea" 
                                            id="edit_desc" 
                                            value={editForm.descricao} 
                                            onChange={(e) => setEditForm(prev => ({ ...prev, descricao: e.target.value }))} 
                                            rows={6}
                                        >
                                            Descrição da empresa
                                        </GenericFormField>
                                        <div className="flex justify-end gap-2">
                                            <GenericBlueButton color={3} size="sm" onClick={() => { handleCancelEdit(); setEditFields(prev => ({...prev, isEditingDesc: false})); }}>
                                                Cancelar
                                            </GenericBlueButton>
                                            <GenericBlueButton color={2} size="sm" onClick={async () => { await updateCompanieProfile(); setEditFields(prev => ({...prev, isEditingDesc: false})); }}>
                                                Salvar
                                            </GenericBlueButton>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    
                    {/* Content Sections */}
                    <div className="space-y-8">
                        {/* History Section */}
                        {(companie.history || isEditing) && (
                            <div className="bg-white rounded-3xl border border-blue3 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                                <div className="bg-blue3 px-6 py-4 border-b border-blue3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-xl font-bold text-white">Nossa História</h2>
                                        </div>
                                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isEditing ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <button 
                                                className="bg-white hover:bg-blue1 text-blue3 p-3 rounded-2xl transition-colors"
                                                onClick={() => { handleCancelEdit(); setEditFields((prev) => ({ ...prev, isEditingHistory: !prev.isEditingHistory })); }}
                                            >
                                                <PenLine className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex gap-8">
                                        {!editFields.isEditingHistory ? (
                                            <div className="bg-blue1 p-6 rounded-2xl border border-blue2 flex-1">
                                                <p className="text-blue3 leading-relaxed">{companie.history}</p>
                                            </div>
                                        ) : (
                                            <div className="bg-blue1 rounded-2xl p-6 flex-1 space-y-4 border border-blue2">
                                                <GenericFormField 
                                                    type="textarea" 
                                                    id="edit_history" 
                                                    value={editForm.historia} 
                                                    onChange={(e) => setEditForm(prev => ({ ...prev, historia: e.target.value }))} 
                                                    rows={6}
                                                >
                                                    História da empresa
                                                </GenericFormField>
                                                <div className="flex justify-end gap-2">
                                                    <GenericBlueButton color={3} size="sm" onClick={() => { handleCancelEdit(); setEditFields(prev => ({...prev, isEditingHistory: false})); }}>
                                                        Cancelar
                                                    </GenericBlueButton>
                                                    <GenericBlueButton color={2} size="sm" onClick={async () => { await updateCompanieProfile(); setEditFields(prev => ({...prev, isEditingHistory: false})); }}>
                                                        Salvar
                                                    </GenericBlueButton>
                                                </div>
                                            </div>
                                        )}
                                        {img1Url && <img src={img1Url} alt="Imagem da empresa" className="w-72 rounded-2xl object-cover border-2 border-blue2" />}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Mission Section */}
                        {(companie.mission || isEditing) && (
                            <div className="bg-white rounded-3xl border border-blue3 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                                <div className="bg-blue3 px-6 py-4 border-b border-blue3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-xl font-bold text-white">Missão e Valores</h2>
                                        </div>
                                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isEditing ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <button 
                                                className="bg-white hover:bg-blue1 text-blue3 p-3 rounded-2xl transition-colors"
                                                onClick={() => { handleCancelEdit(); setEditFields((prev) => ({ ...prev, isEditingMission: !prev.isEditingMission })); }}
                                            >
                                                <PenLine className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex gap-8">
                                        {img2Url && <img src={img2Url} alt="Missão da empresa" className="w-72 rounded-2xl object-cover border-2 border-blue2" />}
                                        {!editFields.isEditingMission ? (
                                            <div className="bg-blue1 p-6 rounded-2xl border border-blue2 flex-1">
                                                <p className="text-blue3 leading-relaxed">{companie.mission}</p>
                                            </div>
                                        ) : (
                                            <div className="bg-blue1 rounded-2xl p-6 flex-1 space-y-4 border border-blue2">
                                                <GenericFormField 
                                                    type="textarea" 
                                                    id="edit_mission" 
                                                    value={editForm.missao} 
                                                    onChange={(e) => setEditForm(prev => ({ ...prev, missao: e.target.value }))} 
                                                    rows={6}
                                                >
                                                    Missão da empresa
                                                </GenericFormField>
                                                <div className="flex justify-end gap-2">
                                                    <GenericBlueButton color={3} size="sm" onClick={() => { handleCancelEdit(); setEditFields(prev => ({...prev, isEditingMission: false})); }}>
                                                        Cancelar
                                                    </GenericBlueButton>
                                                    <GenericBlueButton color={2} size="sm" onClick={async () => { await updateCompanieProfile(); setEditFields(prev => ({...prev, isEditingMission: false})); }}>
                                                        Salvar
                                                    </GenericBlueButton>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Company Information */}
                        <div className="bg-white rounded-3xl border border-blue3 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                            <div className="bg-blue2 px-6 py-4 border-b border-blue3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold text-white">Informações da Empresa</h2>
                                    </div>
                                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isEditing ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <button 
                                            className="bg-white hover:bg-blue1 text-blue3 p-3 rounded-2xl transition-colors"
                                            onClick={() => { handleCancelEdit(); setEditFields((prev) => ({ ...prev, isEditingInfoList: !prev.isEditingInfoList })); }}
                                        >
                                            <PenLine className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 bg-blue1">
                                {!editFields.isEditingInfoList ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="bg-white p-6 rounded-2xl border border-blue2">
                                            <InfoList items={[
                                                { label: "Localização", value: companie.location || "" },
                                                ...(companie.foundedYear ? [{ label: "Ano de Fundação", value: String(companie.foundedYear) }] : []),
                                                ...(companie.sector ? [{ label: "Área de Atuação", value: companie.sector }] : [])
                                            ]} />
                                        </div>
                                        <div className="bg-white p-6 rounded-2xl border border-blue2">
                                            <InfoList items={[
                                                ...(companie.employeeCount ? [{ label: "Funcionários", value: companie.employeeCount }] : []),
                                                ...(companie.pcdEmployeeCount ? [{ label: "Funcionários PCDs", value: companie.pcdEmployeeCount }] : []),
                                                ...(companie.website ? [{ label: "Site", value: companie.website }] : [])
                                            ]} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6 bg-white p-6 rounded-2xl border border-blue2">
                                        <GenericFormField 
                                            id="edit_employees" 
                                            type="number" 
                                            value={editForm.numFunc?.toString() || ''} 
                                            onChange={(e) => setEditForm(prev => ({ ...prev, numFunc: parseInt(e.target.value) || null }))}
                                        >
                                            Funcionários
                                        </GenericFormField>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <GenericFormField 
                                                id="edit_founded" 
                                                type="number" 
                                                value={editForm.anoFundacao?.toString() || ''} 
                                                onChange={(e) => setEditForm(prev => ({ ...prev, anoFundacao: parseInt(e.target.value) || null }))}
                                            >
                                                Ano de fundação
                                            </GenericFormField>
                                            <GenericFormField 
                                                id="edit_pcd_employees" 
                                                type="number" 
                                                value={editForm.numFuncPcd?.toString() || ''} 
                                                onChange={(e) => setEditForm(prev => ({ ...prev, numFuncPcd: parseInt(e.target.value) || null }))}
                                            >
                                                Funcionários PCDs
                                            </GenericFormField>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <GenericFormField 
                                                id="edit_area" 
                                                type="select" 
                                                options={SECTORS} 
                                                value={editForm.area} 
                                                onChange={(e) => setEditForm(prev => ({ ...prev, area: e.target.value }))}
                                            >
                                                Área de atuação
                                            </GenericFormField>
                                            <GenericFormField 
                                                id="edit_website" 
                                                value={editForm.site} 
                                                onChange={(e) => setEditForm(prev => ({ ...prev, site: e.target.value }))}
                                            >
                                                Site
                                            </GenericFormField>
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            <GenericBlueButton color={3} size="sm" onClick={() => { handleCancelEdit(); setEditFields(prev => ({...prev, isEditingInfoList: false})); }}>
                                                Cancelar
                                            </GenericBlueButton>
                                            <GenericBlueButton color={2} size="sm" onClick={async () => { await updateCompanieProfile(); setEditFields(prev => ({...prev, isEditingInfoList: false})); }}>
                                                Salvar
                                            </GenericBlueButton>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Support Capabilities */}
                        <div className="bg-white rounded-3xl border border-blue3 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                            <div className="bg-blue3 px-6 py-4 border-b border-blue3">
                                <div>
                                    <h2 className="text-xl font-bold text-white">Capacidade de Apoio</h2>
                                    <p className="text-blue1 mt-1">Recursos e acessibilidades oferecidos pela empresa</p>
                                </div>
                            </div>
                            <div className="p-8">
                                <TagContainer
                                    tags={isEditing ? editForm.acessibilidades : companie.supportTags}
                                    edit={!!isEditing}
                                    onChange={(newSupportTags) => setEditForm((prev) => ({ ...prev, acessibilidades: newSupportTags }))}
                                    options={supportOptions}
                                >
                                    Recursos de Acessibilidade
                                </TagContainer>
                            </div>
                        </div>

                        {/* Company Jobs Section */}
                        <div className="bg-white rounded-3xl border border-blue3 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                            <div className="bg-blue2 px-6 py-4 border-b border-blue3">
                                <div>
                                    <h2 className="text-xl font-bold text-white">Vagas Disponíveis</h2>
                                    <p className="text-blue1 mt-1">Oportunidades de trabalho em {companie.name}</p>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="bg-blue1 border border-blue2 rounded-2xl p-16 text-center">
                                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 border border-blue2">
                                        <span className="text-4xl text-blue2">?</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-blue3 mb-2">Em breve</h3>
                                    <p className="text-blue3 max-w-md mx-auto">
                                        As vagas desta empresa serão exibidas aqui quando estiverem disponíveis
                                    </p>
                                </div>
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