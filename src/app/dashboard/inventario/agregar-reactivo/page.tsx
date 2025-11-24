"use client";

import { getReactiveAction } from "@/actions/reactiveAction";
import InventaryForm from "@/components/inventary-components/inventaryForm";
import Title from "@/components/ui/typography/title";
import { ReactiveProps } from "@/types/inventaryTypes";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AgregarReactivo() {
  const params = useParams();
  const editedReactiveId = params?.reactiveId?.toString();
  const [editedReactive, setEditedReactive] = useState<ReactiveProps | null>(null);
  const [isLoadingEdit, setIsLoadingEdit] = useState<boolean>(false);

  useEffect(() => {
    if (!editedReactiveId) return;

    const loadReactive = async () => {
      try {
        setIsLoadingEdit(true);
        const data = await getReactiveAction(editedReactiveId);
        setEditedReactive(data);
      } catch (error) {
        console.error("Error al cargar el reactivo:", error);
      } finally {
        setIsLoadingEdit(false);
      }
    };

    loadReactive();
  }, [editedReactiveId]);

  return (
    <div className="mb-8 mx-10">
      <Title title={editedReactiveId ? "Editar reactivo" : "Agregar reactivo"} />
      <p className="text-muted-foreground mt-3 mb-5">
        {editedReactiveId
          ? "A continuación podrá modificar el reactivo seleccionado. Por favor verifique que la información ingresada es correcta e ingrese todos los campos."
          : "A continuación podrá agregar un reactivo en el sistema. Por favor verifique que la información ingresada es correcta e ingrese todos los campos."}
      </p>

      {isLoadingEdit ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-10 w-10 animate-spin text-blue" />
        </div>
      ) : (
        <InventaryForm editedReactive={editedReactive ?? undefined} />
      )}
    </div>
  );
}
