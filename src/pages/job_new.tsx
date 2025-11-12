import GenericFormField from "../components/forms/generic_form_field";
import GenericBlueButton from "../components/buttons/generic_blue_button";
import TagContainer from "../components/content/tag_container";
import MarkdownEditor from "../components/forms/markdown_editor";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import JobPosition from "../components/content/job_position";
import { WORK_LEVELS, WORK_TYPES, CONTRACT_TYPES, SECTORS } from "../data/constants/select_options";
import { API_BASE_URL } from "../config/api";
import { useAuth } from "../hooks/useAuth";
import { JobData } from "../types/vagas/vaga";
import NotFoundScreen from "../components/content/not_found_screen";

interface sendJobData {
  idEmpresa: number,
  title: string,
  location: string,
  description: string,
  skillsTags: string[],
  supportTags: string[],
  startDate: string,
  endDate: string,
  typeContract: string,
  typeWork: string,
  payment: string,
  workLevel: string,
  timeShift: string,
  setor: string
}

export default function JobForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, role, token } = useAuth()
  const isEditing = Boolean(id);
  const [salario, setSalario] = useState("R$ ");
  const [description, setDescription] = useState("");
  const [acessibilityTags, setAcessibilityTags] = useState<string[]>([])
  const [options, setOptions] = useState<string[]>([])

  const [dataForm, setDataForm] = useState<JobData>({
    id: 0,
    idEmpresa: user?.id || 0,
    title: '',
    company: user?.nome || "",
    companyLogo: '',
    location: '',
    description: '',
    skillsTags: [],
    supportTags: [],
    compatibility: 0,
    startDate: new Date(),
    endDate: new Date(),
    typeContract: '',
    typeWork: '',
    payment: '',
    workLevel: '',
    timeShift: '',
    sector: '',
    status: '',
  })


  useEffect(() => {
    const fetchAcessibilidades = async () => {
      try {
        const { acessibilidadesService } = await import('../services/acessibilidades.service');
        const data = await acessibilidadesService.listarNomes();
        
        const opt = data.sort();
        setOptions(opt);
      } catch (error) {
        console.error("Erro ao buscar as acessibilidades:", error);
      }
    };

    const fetchJobData = async () => {
      if (isEditing && id) {
        try {
          const res = await fetch(`${API_BASE_URL}/api/vagas/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
          
          if (res.ok) {
            const jobData = await res.json()
            
            setDataForm({
              id: jobData.id,
              idEmpresa: jobData.empresaId,
              title: jobData.titulo,
              company: jobData.empresa?.razaoSocial || user?.nome || "",
              companyLogo: '',
              location: jobData.localizacao || '',
              description: jobData.descricao,
              skillsTags: jobData.habilidades || [],
              supportTags: jobData.apoios || [],
              compatibility: 0,
              startDate: new Date(jobData.dataInicio),
              endDate: new Date(jobData.dataFim),
              typeContract: jobData.tipoContrato,
              typeWork: jobData.tipoTrabalho,
              payment: jobData.pagamento || '',
              workLevel: jobData.nivelTrabalho,
              timeShift: jobData.turno || '',
              sector: jobData.setor || '',
              status: jobData.status
            })
            
            setDescription(jobData.descricao)
            setSalario(jobData.pagamento || "R$ ")
            setAcessibilityTags(jobData.apoios || [])
          } else {
            alert('Erro ao carregar dados da vaga')
            navigate('/companies/dashboard')
          }
        } catch (error) {
          console.error('Erro ao buscar dados da vaga:', error)
          alert('Erro ao carregar dados da vaga')
          navigate('/companies/dashboard')
        }
      }
    }

    fetchAcessibilidades()
    fetchJobData()
  }, [isEditing, id, token, user, navigate])

  const handleSalarioChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setSalario(e.target.value);
    setDataForm(prev => ({ ...prev, payment: e.target.value }))
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    setDataForm(prev => ({ ...prev, description: value }));
  };

  const handleAcessibilitysChange = (tags: string[]) => {
    setAcessibilityTags(tags)
    setDataForm(prev => ({ ...prev, supportTags: tags }))
  }

  const handleSubmit = async () => {
    // Validação dos campos obrigatórios
    if (!dataForm.title.trim()) {
      alert('Nome da vaga é obrigatório');
      return;
    }
    if (!dataForm.description.trim()) {
      alert('Descrição da vaga é obrigatória');
      return;
    }
    if (!dataForm.typeWork) {
      alert('Tipo de trabalho é obrigatório');
      return;
    }
    if (!dataForm.typeContract) {
      alert('Tipo de contrato é obrigatório');
      return;
    }
    if (!dataForm.workLevel) {
      alert('Nível da vaga é obrigatório');
      return;
    }
    if (!dataForm.sector) {
      alert('Área da vaga é obrigatória');
      return;
    }
    if (isNaN(dataForm.startDate.getTime()) || isNaN(dataForm.endDate.getTime())) {
      alert('Datas de início e fim são obrigatórias');
      return;
    }
    if ((dataForm.typeWork === 'Presencial' || dataForm.typeWork === 'Híbrido') && !dataForm.location?.trim()) {
      alert('Local de trabalho é obrigatório para vagas presenciais ou híbridas');
      return;
    }

    const formatedData: sendJobData = {
      idEmpresa: user?.id || 0,
      title: dataForm.title,
      location: dataForm.location || "",
      description: dataForm.description,
      skillsTags: dataForm.skillsTags,
      supportTags: acessibilityTags,
      startDate: dataForm.startDate.toISOString().split('T')[0],
      endDate: dataForm.endDate.toISOString().split('T')[0],
      typeContract: dataForm.typeContract,
      typeWork: dataForm.typeWork,
      payment: dataForm.payment,
      workLevel: dataForm.workLevel,
      timeShift: dataForm.timeShift,
      setor: dataForm.sector
    }

    try {

      
      let res;
      
      if(!isEditing){
        res = await fetch(`${API_BASE_URL}/api/vagas`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formatedData)
        })
      } else {
        res = await fetch(`${API_BASE_URL}/api/vagas/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formatedData)
        })
      }
      
      if (res.ok) {
        alert(isEditing ? 'Vaga atualizada com sucesso!' : 'Vaga cadastrada com sucesso!');
        navigate('/companies/dashboard');
      } else {
        const errorText = await res.text();
        console.error('Erro do servidor:', errorText);
        alert(`Erro ao ${isEditing ? 'atualizar' : 'cadastrar'} vaga: ${res.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro de conexão. Tente novamente.');
    }
  };

  if (role === "EMPRESA") {
    return (
      <div className="my-16 mx-64 space-y-8">
        <div>
          <div className="p-3 text-white text-[1.5rem] bg-blue3 border border-black min-w-[28rem] rounded-t-lg">
            <h2>
              {isEditing ? 'Edite sua vaga' : 'Cadastre sua vaga'}
            </h2>
          </div>
          <form className="flex-col text-start space-5 text-blue3 bg-blue1 rounded-b-lg px-12">
            <div className="p-3 space-y-5">
              <GenericFormField id="job_title" type="text" placeholder="Titulo da vaga" value={dataForm.title} onChange={(e) => setDataForm(prev => ({ ...prev, title: e.target.value }))}>
                Nome da vaga
              </GenericFormField>
              <GenericFormField id="job_sector" type="select" placeholder="Selecione" options={SECTORS} value={dataForm.sector} onChange={(e) => setDataForm(prev => ({ ...prev, sector: e.target.value }))}>
                Area da Vaga
              </GenericFormField>
              <div className="flex gap-24">
                <GenericFormField id="start_date" type="date" value={dataForm.startDate.toISOString().split('T')[0]} onChange={(e) => setDataForm(prev => ({ ...prev, startDate: e.target.value ? new Date(e.target.value) : new Date() }))}>
                  Início das inscrições
                </GenericFormField>
                <GenericFormField id="end_date" type="date" value={dataForm.endDate.toISOString().split('T')[0]} onChange={(e) => setDataForm(prev => ({ ...prev, endDate: e.target.value ? new Date(e.target.value) : new Date() }))}>
                  Fim das inscrições
                </GenericFormField>
              </div>
              <MarkdownEditor
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Descreva sua vaga aqui..."
                label="Descrição da vaga"
                key={isEditing ? `edit-${id}` : 'new'}
              />
              <GenericFormField
                id="job_salary"
                type="currency"
                placeholder="R$ 0,00"
                value={salario}
                onChange={handleSalarioChange}
              >
                Salário
              </GenericFormField>
              <GenericFormField
                id="job_level"
                type="select"
                placeholder="Selecione"
                options={[...WORK_LEVELS]}
                value={dataForm.workLevel}
                onChange={e => setDataForm(prev => ({ ...prev, workLevel: e.target.value }))}
              >
                Nível da vaga
              </GenericFormField>
              <GenericFormField id="job_workload" type="text" placeholder="Digite o horário de trabalho para o candidato" value={dataForm.timeShift} onChange={e => setDataForm(prev => ({ ...prev, timeShift: e.target.value }))}>
                Horário de trabalho
              </GenericFormField>
              <div>
                <p>Caracteristicas da vaga</p>
                <div className="p-6 bg-blue4 rounded-lg space-y-8">
                  <GenericFormField
                    id="job_type_work"
                    type="radio"
                    options={[...WORK_TYPES]}
                    value={dataForm.typeWork}
                    onChange={(e) => setDataForm(prev => ({ ...prev, typeWork: e.target.value }))}
                  >
                    <strong>Tipo de Trabalho</strong>
                  </GenericFormField>
                  <GenericFormField
                    id="job_type_contract"
                    type="radio"
                    options={[...CONTRACT_TYPES]}
                    value={dataForm.typeContract}
                    onChange={(e) => setDataForm(prev => ({ ...prev, typeContract: e.target.value }))}
                  >
                    <strong>Tipo de Contrato</strong>
                  </GenericFormField>
                </div>
              </div>
              {["Presencial", "Híbrido"].includes(dataForm.typeWork) &&
                <div>
                  <GenericFormField id="job_location" type="text" placeholder="Digite o a cidade onde será a vaga presencial" value={dataForm.location} onChange={e => setDataForm(prev => ({ ...prev, location: e.target.value }))}>
                    Local de Trabalho
                  </GenericFormField>
                </div>
              }

              <TagContainer
                tags={dataForm.skillsTags}
                edit={true}
                onChange={(tags) => setDataForm(prev => ({ ...prev, skillsTags: tags }))}
              >
                Habilidades
              </TagContainer>

              <TagContainer
                tags={acessibilityTags}
                edit={true}
                onChange={(tags) => {handleAcessibilitysChange(tags)}}
                options={options}
              >
                Apoio da Empresa
              </TagContainer>
            </div>
            <div className="flex justify-end p-4">
              <GenericBlueButton color={3} onClick={handleSubmit}>{isEditing ? 'Salvar Alterações' : 'Cadastrar Vaga'}</GenericBlueButton>
            </div>
          </form>
        </div>

        <div>
          <h3 className="font-medium">Pré-visualização da Vaga</h3>
          <JobPosition jobData={dataForm} isEditing={true}></JobPosition>
        </div>
      </div>
    );
  } else {
    return (
      <NotFoundScreen
        title="Acesso Restrito"
        message="Esta página é exclusiva para empresas cadastradas. Apenas empresas podem criar vagas."
        icon="🏢"
      />
    );
  }
}
