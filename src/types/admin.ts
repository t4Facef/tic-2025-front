export interface TipoDeficiencia {
    id: number;
    nome: string;
    subtipos: SubtipoDeficiencia[];
}

export interface SubtipoDeficiencia {
    id: number;
    nome: string;
    tipoId: number;
    barreiras?: Barreira[]; // Opcional pois pode não vir da API inicialmente
}

export interface Barreira {
    id: number;
    nome: string;
    subtipoId: number;
    acessibilidades?: Acessibilidade[]; // Opcional
}

export interface Acessibilidade {
    id: number;
    nome: string;
    barreiraId: number;
}