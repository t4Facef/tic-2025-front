export interface CandidateForm1Data {
    name: string;
    cpf: string;
    birthDate: string;
    sexuality?: string;
    gender: string;
}

export interface CandidateForm2Data {
    email: string;
    phoneNumber1: string;
    phoneNumber2?: string;
    zipCode: string;
    state: string;
    city: string;
    street: string;
    complement?: string;
    neighborhood: string;
    number: string;
}

export interface CandidateForm3Data {
    workArea?: string;
    educationType?: string;
    educationStatus?: string;
    courseName?: string;
    educationStartDate?: string;
    educationEndDate?: string;
    educationInstitution?: string;
    educationDescription?: string;
    jobTitle?: string;
    jobType?: string;
    companyName?: string;
    jobStartDate?: string;
    jobEndDate?: string;
    jobDescription?: string;
    curriculum?: File | null;
}

export interface CandidateForm4Data {
    necessityType: string;
    necessitySubtype: string;
    selectedSubtypes: { id: number; nome: string }[]; // Múltiplos subtipos selecionados
    medicalReport: File | null;
    supportNeeds: string[];
    selectedBarreirasIds?: number[]; // Nova propriedade para IDs das barreiras selecionadas
}

export interface CandidateForm5Data {
    password: string;
    confirmPassword: string;
    profilePicture: File | null;
}

export interface CandidateRegisterData {
    formdata1: CandidateForm1Data;
    formdata2: CandidateForm2Data;
    formdata3: CandidateForm3Data;
    formdata4: CandidateForm4Data;
    formdata5: CandidateForm5Data;
}