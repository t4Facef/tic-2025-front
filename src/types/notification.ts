export default interface Notification {
    notificacaoId: number,
    candidatoId?: number,
    empresaId?: number,
    lida: boolean,
    createdAt: string,
    notificacao: {
        id: number,
        titulo: string,
        conteudo: string,
        remetenteEmpresaId?: number,
        remetenteEmpresa?: {
            razaoSocial: string
        },
        createdAt: string,
        updatedAt: string
    }
}