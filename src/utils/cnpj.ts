export function formatCNPJ(value: string): string {
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 5) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
    if (numbers.length <= 8) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
    if (numbers.length <= 12) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`;
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`;
}

export function validateCNPJ(cnpj: string): boolean {
    const numbers = cnpj.replace(/\D/g, '');
    
    if (numbers.length !== 14) return false;
    if (/^(\d)\1+$/.test(numbers)) return false;
    
    let sum = 0;
    let weight = 5;
    
    for (let i = 0; i < 12; i++) {
        sum += parseInt(numbers[i]) * weight;
        weight = weight === 2 ? 9 : weight - 1;
    }
    
    const digit1 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (parseInt(numbers[12]) !== digit1) return false;
    
    sum = 0;
    weight = 6;
    
    for (let i = 0; i < 13; i++) {
        sum += parseInt(numbers[i]) * weight;
        weight = weight === 2 ? 9 : weight - 1;
    }
    
    const digit2 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return parseInt(numbers[13]) === digit2;
}