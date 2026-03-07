export interface CalculatedContributionLine {
    pensionAmount: number;
    medicalAmount: number;
    maternityAmount: number;
    total: number;
}

export const CalculatedContributionLine = (grossSalary: number): CalculatedContributionLine => {
    const pensionAmount = grossSalary * 0.06;
    const medicalAmount = grossSalary * 0.075;
    const maternityAmount = grossSalary * 0.003;
    const total = pensionAmount + medicalAmount + maternityAmount;

    return { pensionAmount, medicalAmount, maternityAmount, total };
};
