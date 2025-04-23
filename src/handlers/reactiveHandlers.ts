
import { postReactiveAction } from "@/actions/reactiveAction";
import { ReactiveFormValues } from "@/validations/reactiveSchema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function useReactiveFormHandlers() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreateReactive = async (data: ReactiveFormValues) => {
        setIsSubmitting(true);
        const newReactive = { ...data };
        console.log("Reactivo que se crea:", newReactive)
        try {
            const res = await postReactiveAction(newReactive);
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
    }

    const handleCancel = () => {
        router.push("/dashboard/inventario");
        router.refresh();
    }

    return {
        handleCreateReactive,
        handleCancel,
        isSubmitting,
    }
}