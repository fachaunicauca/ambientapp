import {
  getStatusColor,
  QuantityUnits,
  ReactiveTypes,
  RiskTypes,
  StatusTypes,
} from "@/config/inventaryConfig";
import { InventaryTableProps, ReactiveProps } from "@/types/inventaryTypes";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import { Chip } from "@heroui/chip";
import { Button } from "../ui/buttons/button";
import { deleteReactiveAction } from "@/actions/reactiveAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/modals/dialog";

export default function InventaryTable({
  reactives,
  parentHouses,
  isLoading,
  emptyMessage,
  columns,
}: InventaryTableProps) {
  const router = useRouter();
  const [localReactives, setLocalReactives] = useState<ReactiveProps[]>([]);

  const formatDate = (iso?: string) => {
    if (!iso) return "-";
    const datePart = iso.split("T")[0]; // YYYY-MM-DD
    const [year, month, day] = datePart.split("-");
    if (!year || !month || !day) return iso; // fallback
    return `${day}/${month}/${year}`;
  };

  const handleDelete = useCallback(async (id: number, name: string) => {
    const res = await deleteReactiveAction(id);
    if (res.success) {
      setLocalReactives((prev) => prev.filter((r) => r.reactiveId !== id));
      toast.success(`Reactivo "${name}" eliminado`);
    } else {
      toast.error(res.error || "No se pudo eliminar el reactivo");
    }
  }, []);

  useEffect(() => {
    setLocalReactives(reactives);
    console.log(reactives);
  }, [reactives]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-10 w-10 animate-spin text-blue" />
      </div>
    );
  }

  

  return (
    <div className="overflow-x-auto rounded-lg borderzz">
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
          {localReactives.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-4">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            // CASO DONDE HAY REACTIVOS
            localReactives.map((reactive) => (
              <tr
                key={reactive.reactiveId}
                className="hover:bg-muted/50 divide-x"
              >
                {columns.map((column) => {
                  let content;
                  //SE VERIFICAN LOS TIPOS DE REACTIVOS
                  if (column.key === "type") {
                    content = ReactiveTypes.find(
                      (t) => t.value === reactive[column.key]
                    )?.label;
                  }
                  //SE VERIFICAN LOS RIESGOS PARA MOSTRARLOS
                  else if (column.key === "riskTypes") {
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
                  } else if (column.key === "quantity") {
                    content = `${reactive[column.key]} ${
                      QuantityUnits.find(
                        (u) => u.value === reactive.measureUnit
                      )?.label
                    }`;
                    //LA CANTIDAD MÍNIMA SE MUESTRA JUNTO A SU UNIDAD
                  } else if (column.key === "minimumQuantity") {
                    content = `${reactive[column.key]} ${
                      QuantityUnits.find( 
                        (u) => u.value === reactive.measureUnit
                      )?.label
                    }`;
                    //SE ASIGNA EL NOMBRE DE LA CASA MATRIZ CON TENIENDO EN CUENTA EL ID
                  } else if (column.key === "house") {
                    content = parentHouses.find(
                      (h) => h.parentHouseId === reactive[column.key]
                    )?.name;
                    //SE ASIGNA EL ESTADO DEL REACTIVO
                  } else if (column.key === "status") {
                    const status = StatusTypes.find(
                      (s) => s.value === reactive[column.key]
                    );
                    content = (
                      <Chip
                        className={`${getStatusColor(
                          status?.value
                        )} text-white rounded-full text-xs`}
                      >
                        {status?.label}
                      </Chip>
                    );
                    // SE MUESTRA LA HOJA DE SEGURIDAD COMO ENLACE
                  } else if (column.key === "safetySheet") {
                    content = (
                      <div className="flex flex-col items-center gap-1">
                        <a
                          href={reactive.safetySheet}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue underline"
                        >
                          {reactive.safetySheet.split("/").pop()}
                        </a>
                        <div className="text-xs text-muted-foreground">
                          Vence:{" "}
                          <span className="font-medium">
                            {formatDate(reactive.safetySheetExpiration)}
                          </span>
                        </div>
                      </div>
                    );
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
                      onClick={() =>
                        router.push(
                          `/dashboard/inventario/editar-reactivo/${reactive.reactiveId}`
                        )
                      }
                      variant="outline"
                      size="sm"
                      className="bg-accesibility/40 text-accesibility hover:text-white hover:bg-accesibility border-none"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        {
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-redLight/40 text-redLight hover:text-white hover:bg-redLight border-none"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        }
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>¿Eliminar reactivo?</DialogTitle>
                        </DialogHeader>
                        <p>
                          ¿Estás seguro de que deseas eliminar el reactivo &quot;{reactive.name}&quot;?
                          <br />
                          <strong className="text-redLight">Esta acción no se puede deshacer.</strong>
                        </p>
                        <DialogFooter className="mt-4">
                          <DialogClose asChild>
                            <Button variant="secondary">Cancelar</Button>
                          </DialogClose>
                          <Button
                            className="w-full rounded-2xl"
                            variant="destructive"
                            onClick={() =>
                              handleDelete(reactive.reactiveId, reactive.name)
                            }
                          >
                            Eliminar
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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
