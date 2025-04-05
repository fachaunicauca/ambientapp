import { ReactiveProps } from "@/types/inventaryTypes";

export const reactives: ReactiveProps[] = [
  {
      reactiveId: 1,
      reactiveName: "Ácido Sulfúrico",
      reactiveFormula: "H2SO4",
      reactiveType: "1-ACIDOS_INORGANICOS_NO_OXIDANTES",
      reactiveCode: "H2SO4-001",
      reactiveQuantity: 500,
      reactiveUnit: "ML",
      reactiveRisk: ["CORROSIVO", "TOXICO"],
      reactiveStatus: "DISPONIBLE",
      reactiveParentHouse: "Proquim"
  },
  {
      reactiveId: 2,
      reactiveName: "Cloruro de Sodio",
      reactiveFormula: "NaCl",
      reactiveType: "COMPUESTOS_INORGANICOS_ENTRE_REDUCTORES_Y_OXIDANTES_No46_(CLORUROS)",
      reactiveCode: "NaCl-002",
      reactiveQuantity: 1000,
      reactiveUnit: "G",
      reactiveRisk: ["PRECAUCION"],
      reactiveStatus: "DISPONIBLE",
      reactiveParentHouse: "Quimicel"
  },
  {
      reactiveId: 3,
      reactiveName: "Acetona",
      reactiveFormula: "C3H6O",
      reactiveType: "4-ALCOHOLES,_14_ETERES,_19-CETONAS,_31-FENOLES",
      reactiveCode: "C3H6O-003",
      reactiveQuantity: 250,
      reactiveUnit: "ML",
      reactiveRisk: ["INFLAMABLE", "IRRITANTE"],
      reactiveStatus: "BAJO_STOCK",
      reactiveParentHouse: "Quimicas S.A."
  },
  {
      reactiveId: 4,
      reactiveName: "Ácido Clorhídrico",
      reactiveFormula: "HCl",
      reactiveType: "1-ACIDOS_INORGANICOS_NO_OXIDANTES",
      reactiveCode: "HCl-004",
      reactiveQuantity: 150,
      reactiveUnit: "ML",
      reactiveRisk: ["CORROSIVO", "TOXICO"],
      reactiveStatus: "DISPONIBLE",
      reactiveParentHouse: "Alkimia"
  },
  {
      reactiveId: 5,
      reactiveName: "Sulfato de Cobre",
      reactiveFormula: "CuSO4",
      reactiveType: "SALES_DE_ACIDOS_INORGANICOS/ORGANICOS_No38_(SULFATOS_Y_TARTRATOS)",
      reactiveCode: "CuSO4-005",
      reactiveQuantity: 500,
      reactiveUnit: "G",
      reactiveRisk: ["TOXICO", "PERJUDICIAL"],
      reactiveStatus: "AGOTADO",
      reactiveParentHouse: "Synthex"
  },
  {
      reactiveId: 6,
      reactiveName: "Nitrato de Potasio",
      reactiveFormula: "KNO3",
      reactiveType: "AGENTES_INORGANICOS_OXIDANTES_NITRATOS_No27-CLORATOS_No44-PEROXIDOS,_CROMATOS_Y_DICROMATOS",
      reactiveCode: "KNO3-006",
      reactiveQuantity: 1000,
      reactiveUnit: "G",
      reactiveRisk: ["OXIDANTE_FUERTE"],
      reactiveStatus: "DISPONIBLE",
      reactiveParentHouse: "Bioquim"
  },
  {
      reactiveId: 7,
      reactiveName: "Metanol",
      reactiveFormula: "CH3OH",
      reactiveType: "4-ALCOHOLES,_14_ETERES,_19-CETONAS,_31-FENOLES",
      reactiveCode: "CH3OH-007",
      reactiveQuantity: 200,
      reactiveUnit: "ML",
      reactiveRisk: ["INFLAMABLE", "TOXICO"],
      reactiveStatus: "BAJO_STOCK",
      reactiveParentHouse: "Alkpharma"
  },
  {
      reactiveId: 8,
      reactiveName: "Hidróxido de Sodio",
      reactiveFormula: "NaOH",
      reactiveType: "1-ACIDOS_INORGANICOS_NO_OXIDANTES",
      reactiveCode: "NaOH-008",
      reactiveQuantity: 300,
      reactiveUnit: "G",
      reactiveRisk: ["CORROSIVO", "IRRITANTE"],
      reactiveStatus: "DISPONIBLE",
      reactiveParentHouse: "Proquim"
  },
  {
      reactiveId: 9,
      reactiveName: "Ácido Acético",
      reactiveFormula: "CH3COOH",
      reactiveType: "ACIDOS_CARBOXILICOS_U_ORGANICOS",
      reactiveCode: "CH3COOH-009",
      reactiveQuantity: 250,
      reactiveUnit: "ML",
      reactiveRisk: ["CORROSIVO", "IRRITANTE"],
      reactiveStatus: "VENCIDO",
      reactiveParentHouse: "Cepa Química"
  },
  {
      reactiveId: 10,
      reactiveName: "Benceno",
      reactiveFormula: "C6H6",
      reactiveType: "16-HIDROCARBUROS_AROMATICOS_(INDICADORES)",
      reactiveCode: "C6H6-010",
      reactiveQuantity: 100,
      reactiveUnit: "ML",
      reactiveRisk: ["CARCINOGENO", "TOXICO"],
      reactiveStatus: "DISPONIBLE",
      reactiveParentHouse: "Solventex"
  }
];
