"use client";

import { TestInfo } from "@/api/apiEvaluation/interfaces/test-interfaces";
import { getTestInfo } from "@/api/apiEvaluation/services/test-services";
import { TestDetailsCard } from "@/components/test-components/testDetailsCard";
import TestFormModal from "@/components/test-components/testFormModal";
import { Button } from "@/components/ui/buttons/button";
import Title from "@/components/ui/typography/title";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

export default function EvaluacionGeneral() {
    const [testInfo, setTestInfo] = useState<TestInfo>();
    const [error, setError] = useState<string>();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        const fetchTestInfo = async () => {
            const test: TestInfo | string = await getTestInfo(1);

            if (test instanceof String) {
                setError(test as string);
                return;
            }

            setTestInfo(test as TestInfo);
        };

        fetchTestInfo();
    }, []);

    const handleEditSubmit = (updatedData: Partial<TestInfo>) => {
        console.log("Datos actualizados:", updatedData);
        // Aquí llamarías a tu API para actualizar el test
        setIsEditModalOpen(false);
    };

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <Title title={testInfo?.testTitle || "Evaluación General"} />
                {testInfo && (
                    <Button
                        variant="default"
                        onClick={() => setIsEditModalOpen(true)}
                        className="w-2/12 items-center gap-2 "
                    >
                        <Pencil/>
                        Editar Evaluación
                    </Button>
                )}
            </div>
            {error && <div className="text-red-500">Error: {error}</div>}

            {testInfo && <TestDetailsCard testInfo={testInfo} />}

            {testInfo && (
                <TestFormModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onSubmit={handleEditSubmit}
                    initialData={testInfo}
                    teacherEmail={testInfo.teacherEmail}
                />
            )}
        </>
    );
}
