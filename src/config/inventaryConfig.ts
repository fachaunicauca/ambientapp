import { Column } from "@/types/inventaryTypes";

export const columns: Column[] = [
    { key: "name", header: "Compuesto" },
    { key: "formula", header: "Formula" },
    { key: "code", header: "Codigo" },
    { key: "type", header: "Tipo" },
    { key: "quantity", header: "Cantidad" },
    { key: "minimumQuantity", header: "Cantidad mínima" },
    { key: "riskTypes", header: "Riesgo" },
    { key: "house", header: "Casa Matriz" },
    { key: "safetySheet", header: "Hoja de Seguridad" },
    { key: "status", header: "Estado" },
]

export const ReactiveTypes = [
    { value: "5-ALDEHIDOS", label: "5-ALDEHIDOS" },
    { value: "METALES_Y_ELEMENTOS_ACTIVOS_No22_Y_POCO_ACTIVOS_23", label: "METALES Y ELEMENTOS ACTIVOS No22 Y POCO ACTIVOS 23" },
    { value: "SALES_DE_ACIDOS_INORGANICOS/ORGANICOS_No38_(SULFATOS_Y_TARTRATOS)", label: "SALES DE ACIDOS INORGANICOS/ORGANICOS No38 (SULFATOS Y TARTRATOS)" },
    { value: "1-ACIDOS_INORGANICOS_NO_OXIDANTES", label: "1-ACIDOS INORGANICOS NO OXIDANTES" },
    { value: "2-ACIDOS_INORGANICOS_OXIDANTES", label: "2-ACIDOS INORGANICOS OXIDANTES" },
    { value: "AGENTES_INORGANICOS_OXIDANTES_NITRATOS_No27-CLORATOS_No44-PEROXIDOS,_CROMATOS_Y_DICROMATOS", label: "AGENTES INORGANICOS OXIDANTES NITRATOS No27-CLORATOS No44-PEROXIDOS, CROMATOS Y DICROMATOS" },
    { value: "AMIDAS_No6-AMINAS_E_HIDROXILAMINAS_No7,_COMPUESTOS_AZO_No8,_BASES,_OXIDOS,_CARBONATOS,_AMONIACO_Y_DERIVADOS_No10", label: "AMIDAS No6-AMINAS E HIDROXILAMINAS No7, COMPUESTOS AZO No8, BASES, OXIDOS, CARBONATOS, AMONIACO Y DERIVADOS No10" },
    { value: "COMPUESTOS_INORGANICOS_ENTRE_REDUCTORES_Y_OXIDANTES_No46_(CLORUROS)", label: "COMPUESTOS INORGANICOS ENTRE REDUCTORES Y OXIDANTES No46 (CLORUROS)" },
    { value: "ESTERES_No13", label: "ESTERES No13" },
    { value: "4-ALCOHOLES,_14_ETERES,_19-CETONAS,_31-FENOLES", label: "4-ALCOHOLES, 14 ETERES, 19-CETONAS, 31-FENOLES" },
    { value: "39-SALES_DE_BASES_INORGANICAS/ORGANICAS_(FOSFATOS_Y_OTROS)", label: "39-SALES DE BASES INORGANICAS/ORGANICAS (FOSFATOS Y OTROS)" },
    { value: "ACIDOS_CARBOXILICOS_U_ORGANICOS", label: "ACIDOS CARBOXILICOS U ORGANICOS" },
    { value: "98-COMPUESTOS_INERTES", label: "98-COMPUESTOS INERTES" },
    { value: "16-HIDROCARBUROS_AROMATICOS_(INDICADORES)", label: "16-HIDROCARBUROS AROMATICOS (INDICADORES)" }
]

export const QuantityUnits = [
    { value: "G", label: "g" },
    { value: "MG", label: "mg" },
    { value: "L", label: "L" },
    { value: "ML", label: "ml" }
]

export const RiskTypes = [
    { value: "INFLAMABLE", label: "INFLAMABLE" },
    { value: "NOCIVO", label: "NOCIVO" },
    { value: "TOXICO", label: "TÓXICO" },
    { value: "FRAGMENTOS", label: "FRAGMENTOS" },
    { value: "CORROSIVO", label: "CORROSIVO" },
    { value: "IRRITANTE", label: "IRRITANTE" },
    { value: "VENENO", label: "VENENO" },
    { value: "COMBUSTIBLE", label: "COMBUSTIBLE" },
    { value: "CARCINOGENO", label: "CARCINÓGENO" },
    { value: "CANCERIGENO", label: "CANCERÍGENO" },
    { value: "DANIO_POR_EXPOSICION", label: "DAÑO POR EXPOSICIÓN" },
    { value: "PELIGROSO", label: "PELIGROSO" },
    { value: "OXIDANTE_FUERTE", label: "OXIDANTE FUERTE" },
    { value: "COMBURENTE", label: "COMBURENTE" },
    { value: "EXPLOSIVO", label: "EXPLOSIVO" },
    { value: "QUEMADURAS", label: "QUEMADURAS" },
    { value: "PRECAUCION", label: "PRECAUCIÓN" },
    { value: "PERJUDICIAL", label: "PERJUDICIAL" },
    { value: "ADVERTENCIA", label: "ADVERTENCIA" }
]

export const StatusTypes = [
    { value: "DISPONIBLE", label: "DISPONIBLE" },
    { value: "BAJO_STOCK", label: "BAJO STOCK" },
    { value: "AGOTADO", label: "AGOTADO" },
    { value: "VENCIDO", label: "VENCIDO" },
    { value: "DESECHADO", label: "DESECHADO" }
]

export const getStatusColor = (status: string | undefined) => {
    switch (status) {
        case "DISPONIBLE":
            return "bg-green";
        case "BAJO_STOCK":
            return "bg-orange";
        case "AGOTADO":
            return "bg-red";
        case "VENCIDO":
            return "bg-purple-700";
        case "DESECHADO":
            return "bg-black";
        default:
            return "bg-gray-300";
    }
};

