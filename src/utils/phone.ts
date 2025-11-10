export const formatPhone = (value: string): string => {
  // Remove tudo que não é número
  const cleanValue = value.replace(/\D/g, '');
  
  // Aplica máscara baseada no tamanho
  if (cleanValue.length <= 10) {
    // Telefone fixo: (XX) XXXX-XXXX
    return cleanValue
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  } else {
    // Celular: (XX) 9XXXX-XXXX
    return cleanValue
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
  }
};

export const validatePhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\D/g, '');
  // Aceita telefone fixo (10 dígitos) ou celular (11 dígitos)
  return cleanPhone.length === 10 || cleanPhone.length === 11;
};

export const cleanPhone = (phone: string): string => {
  return phone.replace(/\D/g, '');
};