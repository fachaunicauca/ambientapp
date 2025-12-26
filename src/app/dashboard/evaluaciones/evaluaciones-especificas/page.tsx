"use client";

import TestFormModal from "@/components/test-components/testFormModal";
import TestsPaginationList from "@/components/test-components/testPaginationList";
import { Button } from "@/components/ui/buttons/button";
import Title from "@/components/ui/typography/title";
import { useAuthStore } from "@/store/authStore";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function EvaluacionesEspecificas() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const email = useAuthStore.getState().profile?.email || "";
    
    const handleCreateSuccess = () => {
        setRefreshKey((prev) => prev + 1);
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col gap-8 mx-2 mt-4">
            {/* Header con estilo limpio */}
            <div className="flex items-center justify-between mb-4">
                <Title title="Evaluaciones Específicas" />

                <Button
                    onClick={() => setIsModalOpen(true)}
                    className="w-2/12 items-center gap-2"
                >
                    <Plus size={18} />
                    Crear Evaluación
                </Button>
            </div>

            {/* Listado principal */}
            <TestsPaginationList key={refreshKey} />

            {/* Modal de Creación */}
            <TestFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleCreateSuccess}
                teacherEmail={email}
                initialData={null}
            />
        </div>
    );
}
