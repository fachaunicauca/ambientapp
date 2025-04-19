export interface PracticeEducator {
    user: {
        name: string;
        email: string;
    };
    numberOfEstudents: number;
    practiceName: string;
    practiceDate: string;
    materials: {
        materialName: string;
        amount: number;
    }[];
    reactives: {
        sustanceName: string;
        unity: string;
        amount: number;
        concentration: number;
        type: string;
    }[];
    wastes: {
        wasteType: string;
        wasEunity: string;
        estametedAmount: number;
        wasteGenerationDate: string;
        wasteHourGenration: string;
    }[];
}