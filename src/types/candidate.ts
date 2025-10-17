export interface InfoType {
    formationType?: string;
    institut: string;
    course: string;
    startDate: string;
    endDate: string;
    status: string;
    desc: string;
}

export interface Endereco {
    id: number;
    cep: string;
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    complemento: string | null;
}

export interface Subtipo {
    id: number;
    nome: string;
    tipo: {
        id: number;
        nome: string;
    };
}

export interface CandidateSubtipo {
    candidatoId: number;
    subtipoId: number;
    subtipo: Subtipo;
}

export interface Formacao {
    id: number;
    candidatoId: number;
    nomeCurso: string;
    tipoFormacao: string;
    instituicao: string;
    situacao: string;
    dataInicio: string;
    dataFim: string;
    descricao: string;
    createdAt: string;
    updatedAt: string;
}

export interface Experiencia {
    id: number;
    candidatoId: number;
    titulo: string;
    instituicao: string;
    dataInicio: string;
    dataFim: string;
    descricao: string;
    tipoContrato: string;
}

export interface CandidateProfileType {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    dataNascimento: string;
    genero: string;
    sexo: string;
    areaInteresse: string;
    telefones: string[];
    endereco: Endereco;
    formacoes: Formacao[];
    experiencia: Experiencia[];
    habilidades: string[];
    subtipos: CandidateSubtipo[];
    foto: string | null;
    laudo: {
        type: string;
        data: any[];
    };
    createdAt: string;
    updatedAt: string;
}