"use client";

import { useState } from "react";
import Title from "@/components/ui/typography/title";
import { Button } from "@/components/ui/buttons/button";
import { Upload } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import TestGuideFormModal from "@/components/communication-components/preparation-components/testGuideFormModal";
import TestGuidePaginationList from "@/components/communication-components/preparation-components/testGuidePaginationList";

export default function Capacitacion() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const email = useAuthStore.getState().profile?.email || "";

    const roles = useAuthStore.getState().profile?.roles ?? [];
    const canUpload = roles.includes("ADMIN") || roles.includes("TEACHER");

    const handleCreateSuccess = () => {
        setRefreshKey((prev) => prev + 1);
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col gap-4 mx-2 mt-4">
            <div className="flex items-center justify-between mb-2">
                <Title title="Guias de Apoyo" />

                {canUpload && (
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="w-2/12 items-center gap-2"
                    >
                        <Upload size={18} />
                        Subir Guia
                    </Button>
                )}
            </div>

            <TestGuidePaginationList key={refreshKey} />

            <TestGuideFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleCreateSuccess}
                teacherEmail={email}
            />
        </div>
    );
}
