import { PracticeEducator } from "@/interface/educator";

export interface PracticeHeaderProps {
    title: string;
    description?: string;
    onSearch?: (value: string) => void;
    onFilter?: (filterType: string, value?: string) => void;
    searchTerm?: string;
    activeFilters?: FilterState;
    practices: PracticeEducator[]
}

export interface PracticeTableProps {
    practices: PracticeEducator[];
    isLoading: boolean;
    emptyMessage: string;
    columns: Column[];
}

export const columns: Column[] = [
    { key: "practiceName", header: "Nombre de Práctica" },
    { key: "practiceDate", header: "Fecha de Práctica" },
    { key: "numberOfEstudents", header: "Estudiantes" },
    { key: "user", header: "Usuario" },
];

export interface Column {
    key: keyof PracticeEducator;
    header: string;
}

export interface FilterState {
    date?: string;
    status?: string;
    type?: string;
};