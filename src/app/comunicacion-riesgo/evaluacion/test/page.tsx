'use client'
import { useSearchParams } from 'next/navigation';
import Test from "@/components/test-component/test";
import MainLayout from '@/components/mainLayout/mainLayout';

export default function EvaluationPage() {
    const searchParams = useSearchParams();
    const studentCode = searchParams.get('code');
    const subjectName = searchParams.get('subject');

    if (!studentCode) {
        console.error('Código del estudiante no proporcionado')
        return
    }

    if (!subjectName) {
        console.error('Nombre de la materia no proporcionado')
        return
    }

    return (
        <MainLayout>
            <section>
                <Test studentCode={studentCode} subjectName = {subjectName} />
            </section>
        </MainLayout>
    );
}
