// hooks/useReactiveFormHandlers.ts
import {
    postReactiveAction,
    putReactiveAction, // 👈 Importamos la acción de actualización
} from "@/actions/reactiveAction";
import { ReactiveFormValues } from "@/validations/reactiveSchema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function useReactiveFormHandlers() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Crear reactivo
    const handleCreateReactive = async (data: ReactiveFormValues) => {
        setIsSubmitting(true);
        console.log("Contenido del formulario antes de enviar:");
        Object.entries(data).forEach(([key, value]) => {
            console.log(key, value);
        });

        try {
            const res = await postReactiveAction(data);

            if (res.success) {
                toast.success("Reactivo creado correctamente");
                router.push("/dashboard/inventario");
                router.refresh();
            } else {
                toast.error(res.error || "Error al crear el reactivo");
            }
        } catch (error) {
            console.error("Error al crear el reactivo:", error);
            toast.error("Error al crear el reactivo");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Actualizar reactivo existente
    const handleUpdateReactive = async (
        id: number,
        data: ReactiveFormValues
    ) => {
        setIsSubmitting(true);
        try {
            const res = await putReactiveAction(id, data);

            if (res.success) {
                toast.success("Reactivo actualizado correctamente");
                router.push("/dashboard/inventario");
                router.refresh();
            } else {
                toast.error(res.error || "Error al actualizar el reactivo");
            }
        } catch (error) {
            console.error("Error al actualizar el reactivo:", error);
            toast.error("Error al actualizar el reactivo");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Cancelar acción
    const handleCancel = () => {
        router.push("/dashboard/inventario");
        router.refresh();
    };

    return {
        handleCreateReactive,
        handleUpdateReactive,
        handleCancel,
        isSubmitting,
    };
}
