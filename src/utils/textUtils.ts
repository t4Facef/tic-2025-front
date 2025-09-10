/**
 * Remove tags HTML e limita o texto para preview
 * @param html - String HTML do React Quill
 * @param maxLength - Número máximo de caracteres (padrão: 200)
 * @returns Texto limpo e limitado
 */
export function stripHtmlAndTruncate(html: string, maxLength: number = 200): string {
  // Remove todas as tags HTML
  const textOnly = html.replace(/<[^>]*>/g, '');
  
  // Remove espaços extras e quebras de linha
  const cleanText = textOnly.replace(/\s+/g, ' ').trim();
  
  // Limita caracteres e adiciona "..."
  if (cleanText.length <= maxLength) return cleanText;
  
  // Corta no último espaço antes do limite para não quebrar palavras
  const truncated = cleanText.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + '...';
}

/**
 * Sanitiza HTML básico (opcional, para segurança extra)
 * @param html - String HTML
 * @returns HTML sanitizado
 */
export function sanitizeHtml(html: string): string {
  // Lista de tags permitidas (React Quill já sanitiza, mas por segurança)
  const allowedTags = ['p', 'strong', 'em', 'u', 'ol', 'ul', 'li', 'br'];
  
  // Remove tags não permitidas (implementação básica)
  return html.replace(/<(?!\/?(?:p|strong|em|u|ol|ul|li|br)\b)[^>]*>/gi, '');
}