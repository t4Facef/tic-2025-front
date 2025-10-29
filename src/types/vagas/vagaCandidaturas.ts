import { Endereco } from "../candidate";

// Interface para a resposta da rota GET /api/vagas/:id
export interface VagaComCandidaturas {
  id: number;
  titulo: string;
  localizacao: string;
  descricao: string;
  habilidades: string[];
  apoios: string[];
  compatibilidade: number | null;
  dataInicio: string;
  dataFim: string;
  tipoContrato: string;
  tipoTrabalho: string;
  pagamento: string;
  nivelTrabalho: string;
  turno: string;
  status: string;
  setor: string | null;
  empresaId: number;
  createdAt: string;
  updatedAt: string;
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
    anoFundacao: number | null;
    certificacoes: string[];
    enderecoId: number | null;
    createdAt: string;
    updatedAt: string;
  };
  candidaturas: {
    id: number;
    candidatoId: number;
    mensagem: string | null;
    vagaId: number;
    status: 'PENDENTE' | 'APROVADO' | 'RECUSADO';
    dataCandidatura: string;
    candidato: {
      nome: string;
      email: string;
      telefones: string[];
      endereco: Endereco
      subtipos: {
        subtipo: {
          nome: string;
        };
      }[];
    };
  }[];
}
