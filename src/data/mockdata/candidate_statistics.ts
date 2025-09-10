interface CandidateStatisticsType {
    candidateId: number;
    applicationsThisMonth: number;
    totalApplications: number;
    openApplications: number;
    profileViews: number;
    lastActivity: string;
}

const candidateStatistics: CandidateStatisticsType[] = [
    {
        candidateId: 1, // João Guilherme
        applicationsThisMonth: 8,
        totalApplications: 23,
        openApplications: 5,
        profileViews: 142,
        lastActivity: "2024-01-15"
    },
    {
        candidateId: 2, // Maria Silva Santos
        applicationsThisMonth: 12,
        totalApplications: 45,
        openApplications: 8,
        profileViews: 287,
        lastActivity: "2024-01-14"
    },
    {
        candidateId: 3, // Carlos Eduardo Lima
        applicationsThisMonth: 6,
        totalApplications: 18,
        openApplications: 3,
        profileViews: 98,
        lastActivity: "2024-01-13"
    }
];

export default candidateStatistics;
export type { CandidateStatisticsType };