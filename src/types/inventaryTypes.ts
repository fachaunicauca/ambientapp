export interface ReactiveProps {
    reactiveId: number;
    name: string;
    formula: string;
    type: ReactiveType;
    code: string;
    quantity: number;
    minimumQuantity: number;
    measureUnit: Unit;
    riskTypes: RiskType[];
    status: Status;
    house: number;
    safetySheet: string;
}

export const reactiveTypes = [
    "5-ALDEHIDOS",
    "METALES_Y_ELEMENTOS_ACTIVOS_No22_Y_POCO_ACTIVOS_23",
    "SALES_DE_ACIDOS_INORGANICOS/ORGANICOS_No38_(SULFATOS_Y_TARTRATOS)",
    "1-ACIDOS_INORGANICOS_NO_OXIDANTES",
    "2-ACIDOS_INORGANICOS_OXIDANTES",
    "AGENTES_INORGANICOS_OXIDANTES_NITRATOS_No27-CLORATOS_No44-PEROXIDOS,_CROMATOS_Y_DICROMATOS",
    "AMIDAS_No6-AMINAS_E_HIDROXILAMINAS_No7,_COMPUESTOS_AZO_No8,_BASES,_OXIDOS,_CARBONATOS,_AMONIACO_Y_DERIVADOS_No10",
    "COMPUESTOS_INORGANICOS_ENTRE_REDUCTORES_Y_OXIDANTES_No46_(CLORUROS)",
    "ESTERES_No13",
    "4-ALCOHOLES,_14_ETERES,_19-CETONAS,_31-FENOLES",
    "39-SALES_DE_BASES_INORGANICAS/ORGANICAS_(FOSFATOS_Y_OTROS)",
    "ACIDOS_CARBOXILICOS_U_ORGANICOS",
    "98-COMPUESTOS_INERTES",
    "16-HIDROCARBUROS_AROMATICOS_(INDICADORES)"
] as const;
export type ReactiveType = (typeof reactiveTypes)[number];

export const units = ["G", "MG", "L", "ML"] as const;
export type Unit = (typeof units)[number];

export const riskTypes = [
    "INFLAMABLE",
    "NOCIVO",
    "TOXICO",
    "FRAGMENTOS",
    "CORROSIVO",
    "IRRITANTE",
    "VENENO",
    "COMBUSTIBLE",
    "CARCINOGENO",
    "CANCERIGENO",
    "DANIO_POR_EXPOSICION",
    "PELIGROSO",
    "OXIDANTE_FUERTE",
    "COMBURENTE",
    "EXPLOSIVO",
    "QUEMADURAS",
    "PRECAUCION",
    "PERJUDICIAL",
    "ADVERTENCIA"
] as const;
export type RiskType = (typeof riskTypes)[number];

export const statusTypes = [
    "DISPONIBLE",
    "BAJO_STOCK",
    "AGOTADO",
    "VENCIDO",
    "DESECHADO"
] as const;
export type Status = (typeof statusTypes)[number];

export interface InventaryTableProps {
    reactives: ReactiveProps[];
    parentHouses: ParentHouseProps[];
    isLoading: boolean;
    emptyMessage: string;
    columns: Column[];
}

export interface Column {
    key: keyof ReactiveProps;
    header: string;
}

export interface ParentHouseProps {
    parentHouseId: number;
    name: string;
}
