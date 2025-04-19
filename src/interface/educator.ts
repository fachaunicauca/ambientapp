export interface PracticeEducator {
    user: {
        name: string;
        code: string;
        id: number;
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
        code: string;
        unity: string;
        amount: number;
        concentration: number;
        reactiveID: number;
    }[];
    wastes: {
        wasteType: string;
        wasEunity: string;
        estametedAmount: number;
        wasteGenerationDate: string;
        wasteHourGenration: string;
    }[];
}