"use client";

import { Button } from "@/components/ui/buttons/button";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function PresentarEvaluacionSinIntentos() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const testId = Number(searchParams.get("testId"));
    const studentEmail = searchParams.get("studentEmail");

    if (!testId || !studentEmail) {
        toast.error("No se pudo identificar la evaluación o el estudiante.");
        router.replace("/dashboard/comunicacion-riesgo/evaluacion");
    }

    return (
        <div className="flex min-h-[70vh] items-center justify-center px-4">
            <div className="w-full max-w-md rounded-xl border border-blueLight/30 bg-white p-6 shadow-sm">
                <div className="space-y-4 text-center">
                    <h1 className="text-xl font-semibold text-blueDark">
                        No tienes intentos disponibles
                    </h1>

                    <p className="text-sm text-foreground leading-relaxed">
                        Has alcanzado el número máximo de intentos permitidos
                        para esta evaluación.
                        <br />
                        Si consideras que necesitas más intentos, puedes enviar
                        una solicitud al docente.
                    </p>

                    <div className="flex flex-col gap-2 pt-4 sm:flex-row sm:justify-center">
                        <Button
                            variant="secondary"
                            className="w-full sm:w-auto border border-blueLight text-blueDark hover:bg-gray-200 hover:text-blueDark"
                            onClick={() =>
                                router.replace(
                                    "/dashboard/comunicacion-riesgo/evaluacion"
                                )
                            }
                        >
                            Volver
                        </Button>

                        <Button
                            className="w-full sm:w-auto bg-blue hover:bg-blueLight text-white"
                            onClick={() =>
                                router.replace(
                                    "/dashboard/comunicacion-riesgo/evaluacion/solicitar-intentos"
                                )
                            }
                        >
                            Solicitar intentos
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
