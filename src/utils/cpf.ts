export const validateCPF = (cpf: string): boolean => {
  const cleanCPF = cpf.replace(/\D/g, '');
  
  if (cleanCPF.length !== 11 || /^(\d)\1{10}$/.test(cleanCPF)) return false;
  
  const calcDigit = (base: number) => {
    let sum = 0;
    for (let i = 0; i < base; i++) {
      sum += parseInt(cleanCPF[i]) * (base + 1 - i);
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };
  
  return calcDigit(9) === parseInt(cleanCPF[9]) && calcDigit(10) === parseInt(cleanCPF[10]);
};

export const formatCPF = (cpf: string): string => {
  const cleanCPF = cpf.replace(/\D/g, '');
  if (cleanCPF.length <= 3) return cleanCPF;
  if (cleanCPF.length <= 6) return cleanCPF.replace(/(\d{3})(\d+)/, '$1.$2');
  if (cleanCPF.length <= 9) return cleanCPF.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
  return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};