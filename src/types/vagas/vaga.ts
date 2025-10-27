export interface Vaga {
  id: number;
  titulo: string;
  localizacao: string;
  descricao: string;
  habilidades: string[];
  apoios: string[];
  compatibilidade: number | null;
  compatibilidadeCalculada?: number;
  compatibilidadeFormatada?: string;
  dataInicio: string; // ISO date string
  dataFim: string; // ISO date string
  tipoContrato: string;
  tipoTrabalho: string;
  pagamento: string;
  nivelTrabalho: string;
  turno: string;
  status: string;
  empresaId: number;
  createdAt: string;
  updatedAt: string;
  setor: string;
  empresa: {
    id: number;
    razaoSocial: string;
    nomeFantasia: string | null;
    email: string;
    cnpj: string;
    telefoneComercial: string;
    numFunc: number | null;
    numFuncPcd: number | null;
    area: string;
    site: string | null;
    descricao: string | null;
    historia: string | null;
    missao: string | null;
    valores: string | null;
    foto: string | null;
    certificacoes: string[];
    enderecoId: number | null;
    createdAt: string;
    updatedAt: string;
  };
  candidaturas: Array<{ id: number }>;
}

export interface JobData {
  id: number;
  idEmpresa: number;
  title: string;
  company: string;
  companyLogo: string;
  location: string | undefined;
  description: string;
  skillsTags: string[];
  supportTags: string[];
  compatibility: number;
  startDate: Date;
  endDate: Date;
  typeContract: string;
  typeWork: string;
  payment: string;
  workLevel: string;
  timeShift: string;
  status: string;
  sector: string;
}