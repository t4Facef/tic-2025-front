export interface CompanieForm1Data {
    companyName: string;
    tradeName?: string;
    cnpj: string;
    businessSector: string;
}

export interface CompanieForm2Data {
    email: string;
    businessPhone: string;
    website: string;
    postalCode: string;
    state: string;
    city: string;
    street: string;
    adressComplement?: string;
    neighborhood: string;
    streetNumber: string;
}

export interface CompanieForm3Data {
    employeeCount: string;
    employeePcdCount: string;
    foundedYear: string;
    description: string;
    history: string;
    mission: string;
}

export interface CompanieForm4Data {
    supportCapabilities: string[];
    acessibilidades?: { id: number; nome: string }[];
}

export interface CompanieForm5Data {
    password: string;
    confirmPassword: string;
    profilePicture: File | null;
}

export interface CompanieRegisterData {
    formdata1: CompanieForm1Data
    formdata2: CompanieForm2Data
    formdata3: CompanieForm3Data
    formdata4: CompanieForm4Data
    formdata5: CompanieForm5Data
}