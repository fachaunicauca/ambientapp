'use client'
import { useSearchParams } from 'next/navigation';
import Test from "@/components/comunication-components/test-component/test";
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeletons/skeleton';

function EvaluationPageContent() {
    const searchParams = useSearchParams();
    const studentCode = searchParams.get('code');
    const subjectName = searchParams.get('subject');

    if (!studentCode) {
        console.error('Código del estudiante no proporcionado');
        return <div>Error: Código del estudiante no proporcionado</div>;
    }

    if (!subjectName) {
        console.error('Nombre de la materia no proporcionado');
        return <div>Error: Nombre de la materia no proporcionado</div>;
    }

    return (
        <section>
            <Test studentCode={studentCode} subjectName={subjectName} />
        </section>
    );
}

export default function EvaluationPage() {
    return (
        <Suspense fallback={<Skeleton />}>
            <EvaluationPageContent />
        </Suspense>
    );
}
