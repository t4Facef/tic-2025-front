/**
 * Constantes da aplicação TIC 2025
 */

export const APP_CONFIG = {
  name: 'Apojobs',
  version: '1.0.0',
  description: 'Conectando Talentos às Oportunidades Certas',
  author: 'TIC 2025 Team'
} as const;

export const UI_CONFIG = {
  // Breakpoints responsivos
  breakpoints: {
    sm: '640px',
    md: '768px', 
    lg: '1024px',
    xl: '1280px'
  },
  
  // Configurações de modais
  modal: {
    maxHeight: '95vh',
    maxHeightDesktop: '90vh',
    zIndex: 9999
  },
  
  // Configurações de upload
  upload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
    allowedDocumentTypes: ['application/pdf']
  },
  
  // Configurações de formulário
  form: {
    debounceDelay: 300,
    maxTextLength: 500,
    passwordMinLength: 8
  },
  
  // Configurações de paginação
  pagination: {
    itemsPerPage: 10,
    maxPages: 100
  }
} as const;

export const ERROR_MESSAGES = {
  network: 'Erro de conexão. Verifique sua internet.',
  unauthorized: 'Acesso negado. Faça login novamente.',
  notFound: 'Recurso não encontrado.',
  validation: 'Por favor, verifique os campos preenchidos.',
  server: 'Erro interno do servidor. Tente novamente mais tarde.',
  upload: 'Erro ao fazer upload do arquivo.',
  generic: 'Ocorreu um erro inesperado.'
} as const;

export const SUCCESS_MESSAGES = {
  saved: 'Dados salvos com sucesso!',
  updated: 'Informações atualizadas!',
  deleted: 'Item removido com sucesso!',
  uploaded: 'Arquivo enviado com sucesso!',
  emailSent: 'E-mail enviado com sucesso!',
  registered: 'Cadastro realizado com sucesso!'
} as const;

export const VALIDATION_RULES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  cnpj: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
  phone: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
  cep: /^\d{5}-\d{3}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
} as const;