'use client'
import { useState } from 'react';
import { fetchStudentData } from '@/lib/query';
import { useRouter } from 'next/navigation'; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MainLayout from '@/components/mainLayout/mainLayout';
import Title from '@/components/ui/title';

export default function LoginTest() {
    const [studentInfo, setStudentInfo] = useState({ code: "", subject: "", teacher: "" });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); 

        const result = await fetchStudentData(studentInfo);

        if (result.error) {
            setError(result.error); 
            return;
        } else {
            
            router.push(`/comunicacion-riesgo/evaluacion/test?code=${studentInfo.code}&subject=${studentInfo.subject}`);  
        }
    };

    return (
        <MainLayout>
            <Title title="Iniciar Evaluación" />
            <div className=" mt-16 flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
                    <h3 className="text-lg font-semibold tracking-1.25 leading-19 text-center m-2">Información del Estudiante</h3>
                    {error && <p className="text-error text-center m-2 text-sm">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                            <Input 
                                type="text" 
                                placeholder="Código de estudiante" 
                                value={studentInfo.code}
                                onChange={(e) => setStudentInfo({ ...studentInfo, code: e.target.value })}
                                className="border-grayScale71"
                            />
                            <Input 
                                type="text" 
                                placeholder="Materia" 
                                value={studentInfo.subject}
                                onChange={(e) => setStudentInfo({ ...studentInfo, subject: e.target.value })}
                                className="border-grayScale71"
                            />
                            <Input 
                                type="text" 
                                placeholder="Docente" 
                                value={studentInfo.teacher}
                                onChange={(e) => setStudentInfo({ ...studentInfo, teacher: e.target.value })} 
                                className="border-grayScale71"
                            />
                        <div className="flex justify-center">
                            <Button type="submit" className="rounded-full w-4xl">
                                Iniciar Evaluación
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}
