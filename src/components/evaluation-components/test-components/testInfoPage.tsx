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
        } else {
            setTestInfo(testResult);
        }
    };

    useEffect(() => {
        fetchData();
    }, [testId]);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between mb-4">
                <Title title={testInfo?.testTitle || "Titulo Evaluación"} />
                {testInfo && (
                    <Button
                        variant="default"
                        onClick={() => setIsEditModalOpen(true)}
                        className="w-2/12 items-center gap-2 "
                    >
                        <Pencil size={16} />
                        Editar Información
                    </Button>
                )}
            </div>

            {error && (
                <div className="text-red-500 mb-4 font-medium">
                    Error: {error}
                </div>
            )}

            {/* Detalles del Test */}
            {testInfo && <TestDetailsCard testInfo={testInfo} />}

            <section className="border-t pt-8">
                <QuestionsPaginationList testId={testId} onDelete={fetchData}/>
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
