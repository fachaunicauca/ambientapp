"use client";

import CourseFormModal from "@/components/course-components/courseFormModal";
import CoursePaginationList from "@/components/course-components/coursePaginationList";
import { Button } from "@/components/ui/buttons/button";
import Title from "@/components/ui/typography/title";
import { useAuthStore } from "@/store/authStore";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Cursos() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const email = useAuthStore.getState().profile?.email || "";

    const handleCreateSuccess = () => {
        setIsModalOpen(false);
        setRefreshKey((prev) => prev + 1); // Cambia la clave para forzar la recarga del componente de lista
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <Title title="Cursos" />
                <Button
                    onClick={() => setIsModalOpen(true)}
                    className="w-min items-center gap-2"
                >
                    <Plus size={18} />
                    Crear Curso
                </Button>
            </div>

            <CoursePaginationList key={refreshKey} />

            <CourseFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleCreateSuccess}
                teacherEmail={email}
            />
        </div>
    );
}
