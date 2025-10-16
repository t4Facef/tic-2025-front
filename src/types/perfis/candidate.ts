export interface FormacaoCandidate {
    candidatoId: number;
    nomeCurso: string;
    tipoFormacao: string;
    instituicao: string;
    situacao: string;
    dataInicio: string;
    dataFim: string;
    descricao: string;
}

export interface ExperienciaCandidate {
    candidatoId: number;
    empresa: string;
    cargo: string;
    dataInicio: string;
    dataFim: string;
    descricao: string;
}

export interface EditProfileCandidate {
    formacao: FormacaoCandidate[];
    experiencia: ExperienciaCandidate[];
    habilidades: string[];
}