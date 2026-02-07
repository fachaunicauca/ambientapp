"use client";

import StudentFormModal from "@/components/student-components/studentFormModal";
import StudentsPaginationTable from "@/components/student-components/studentPaginationTable";
import { Button } from "@/components/ui/buttons/button";
import Title from "@/components/ui/typography/title";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Estudiantes() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleCreateSuccess = () => {
        setRefreshKey((prev) => prev + 1);
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between mb-2">
                <Title title="Estudiantes" />
                <Button
                    onClick={() => setIsModalOpen(true)}
                    className="w-2/12 items-center gap-2"
                >
                    <Plus size={18} />
                    Registrar Estudiante
                </Button>
            </div>

            <StudentsPaginationTable key={refreshKey} />

            <StudentFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleCreateSuccess}
                initialData={null}
            />
        </div>
    );
}
