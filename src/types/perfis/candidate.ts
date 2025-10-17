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
    titulo: string;
    instituicao: string;
    dataInicio: string;
    dataFim: string;
    descricao: string;
    tipoContrato: string;
}

export interface EditProfileCandidate {
    formacao: FormacaoCandidate[];
    experiencia: ExperienciaCandidate[];
    habilidades: string[];
}