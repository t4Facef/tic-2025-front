import * as XLSX from 'xlsx';

interface Candidate {
    candidato: {
        nome: string;
        telefones?: string[];
        email?: string;
    };
}

export const exportApprovedCandidates = (candidates: Candidate[], jobTitle: string) => {
    const approvedCandidates = candidates.map(c => ({
        'Nome': c.candidato.nome.split(' ')[0],
        'Telefone1': c.candidato.telefones?.[0] || 'N/A',
        'Telefone2': c.candidato.telefones?.[1] || 'N/A',
        'Email': c.candidato.email || 'N/A'
    }))
    
    const ws = XLSX.utils.json_to_sheet(approvedCandidates)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Aprovados')
    
    const fileName = `aprovados_${jobTitle.replace(/[^a-zA-Z0-9]/g, '_')}.xlsx`
    XLSX.writeFile(wb, fileName)
}