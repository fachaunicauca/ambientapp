import { TestInfo } from "@/api/apiEvaluation/interfaces/test-interfaces";
import { getTestInfo } from "@/api/apiEvaluation/services/test-services";

import { Button } from "@/components/ui/buttons/button";
import Title from "@/components/ui/typography/title";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { TestDetailsCard } from "./testDetailsCard";
import QuestionsPaginationList from "../question-components/questionsPaginationList";
import TestFormModal from "./testFormModal";

interface TestInfoPageProps {
    testId: number;
}

export default function TestInfoPage({ testId }: TestInfoPageProps) {
    const [testInfo, setTestInfo] = useState<TestInfo>();
    const [error, setError] = useState<string>();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const fetchData = async () => {
        const testResult: TestInfo | string = await getTestInfo(testId);

        if (typeof testResult === "string") {
            setError(testResult);
            setTestInfo(undefined);
        } else {
            setTestInfo(testResult);
            setError(undefined);
        }
    };

    useEffect(() => {
        fetchData();
    }, [testId]);

    if (error) {
        return (
            <div className="text-center p-6 border border-dashed rounded-xl text-gray-400">
                {error
                    ? error
                    : "Ocurrió un error al cargar la informacion de la evaluación."}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between mb-4">
                <Title title={testInfo?.testTitle || "Titulo Evaluación"} />
                {testInfo && (
                    <Button
                        variant="default"
                        onClick={() => setIsEditModalOpen(true)}
                        className="w-min items-center gap-2 "
                    >
                        <Pencil size={16} />
                        Editar evaluación
                    </Button>
                )}
            </div>

            {/* Detalles del Test */}
            {testInfo && <TestDetailsCard testInfo={testInfo} />}

            <section className="pt-8">
                <QuestionsPaginationList testId={testId} onDelete={fetchData} />
            </section>

            {testInfo && (
                <TestFormModal
                    isOpen={isEditModalOpen}
                    onSuccess={fetchData}
                    onClose={() => setIsEditModalOpen(false)}
                    initialData={testInfo}
                    teacherEmail={testInfo.teacherEmail}
                />
            )}
        </div>
    );
}
