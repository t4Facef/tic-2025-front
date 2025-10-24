interface Endereco {
  id: number;
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  complemento?: string;
}

interface Acessibilidade {
  id: number;
  nome: string;
}

interface EmpresaAcessibilidade {
  acessibilidade: Acessibilidade;
}

export default interface EmpresaProfile {
  id: number;
  razaoSocial: string;
  nomeFantasia?: string;
  email: string;
  cnpj: string;
  telefoneComercial: string;
  numFunc?: number;
  numFuncPcd?: number;
  area: string;
  site?: string;
  descricao?: string;
  historia?: string;
  missao?: string;
  valores?: string;
  certificacoes: string[];
  createdAt: string;
  updatedAt: string;
  
  // Relacionamentos
  endereco?: Endereco;
  empresaAcessibilidade: EmpresaAcessibilidade[];
}