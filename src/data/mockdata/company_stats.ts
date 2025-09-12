export interface CompanyStats {
    companyId: number;
    todayApplications: number;
    openJobs: number;
    activeCandidates: number;
}

export const mockCompanyStats: CompanyStats[] = [
    {
        companyId: 1,
        todayApplications: 100,
        openJobs: 25,
        activeCandidates: 150
    },
    {
        companyId: 2,
        todayApplications: 45,
        openJobs: 12,
        activeCandidates: 89
    },
    {
        companyId: 3,
        todayApplications: 32,
        openJobs: 8,
        activeCandidates: 67
    },
    {
        companyId: 4,
        todayApplications: 78,
        openJobs: 18,
        activeCandidates: 134
    },
    {
        companyId: 5,
        todayApplications: 56,
        openJobs: 14,
        activeCandidates: 98
    }
];