import { QuantityUnits, ReactiveTypes, RiskTypes, StatusTypes } from "@/config/inventaryConfig";
import { InventaryTableProps } from "@/types/inventaryTypes";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import React from "react";
import { Chip } from "@heroui/chip";
import { Button } from "../ui/buttons/button";

export default function InventaryTable({
  reactives,
  isLoading,
  emptyMessage,
  columns,
}: InventaryTableProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-10 w-10 animate-spin text-blue" />
      </div>
    );
  }

  return (
    <div className="overflow-hidden overflow-x-auto rounded-lg border">
      <table className="table-auto w-full">
        <thead className="bg-muted">
          <tr className="divide-x">
            {columns.map((column) => (
              <th
                key={column.key}
                className="whitespace-nowrap px-4 py-3 text-center font-bold text-blue"
              >
                {column.header}
              </th>
            ))}
            <th className="whitespace-nowrap px-4 py-3 text-center font-bold text-blue">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody className="divide-y text-center">
          {/* CASO DONDE NO HAY REACTIVOS */}
          {reactives.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-4">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            // CASO DONDE HAY REACTIVOS
            reactives.map((reactive) => (
              <tr key={reactive.reactiveId} className="hover:bg-muted/50 divide-x">
                {columns.map((column) => {
                  let content;
                  //SE VERIFICAN LOS TIPOS DE REACTIVOS
                  if(column.key === "reactiveType") {	
                    content = ReactiveTypes.find((t) => t.value === reactive[column.key])?.label;
                  }
                  //SE VERIFICAN LOS RIESGOS PARA MOSTRARLOS
                  else if (column.key === "reactiveRisk") {
                    content = (
                      <div className="flex flex-wrap gap-1 justify-center">
                        {reactive[column.key].map((risk) => (
                          <Chip
                            key={risk}
                            className=" bg-blue text-white rounded-full text-xs"
                          >
                            {RiskTypes.find((r) => r.value === risk)?.label}
                          </Chip>
                        ))}
                      </div>
                    );
                    //LA CANTIDAD SE MUESTRA JUNTO A SU UNIDAD
                  } else if (column.key === "reactiveQuantity") {
                    content = `${reactive[column.key]} ${
                      QuantityUnits.find((u) => u.value === reactive.reactiveUnit)?.label
                    }`;
                    //SE MUESTRA EL CONTENIDO DE LA COLUMNA
                  } else if (column.key === "reactiveStatus") {
                    content = StatusTypes.find((s) => s.value === reactive[column.key])?.label;
                  } else {
                    content = reactive[column.key];
                  }
                  return (
                    <td key={column.key} className="px-4 py-3">
                      {content}
                    </td>
                  );
                })}
                <td className="px-4 py-3 justify-items-center">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-accesibility/40 text-accesibility hover:text-white hover:bg-accesibility border-none"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-redLight/40 text-redLight hover:text-white hover:bg-redLight border-none"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
