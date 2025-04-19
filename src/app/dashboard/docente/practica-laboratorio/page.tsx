"use client";

import { useState, useEffect } from "react";
import PracticeTable from "@/components/educator/table/practiceTable";
import { fetchPractices } from "@/actions/educatorAction";
import { PracticeEducator } from "@/interface/educator";
import { columns as practiceColumns } from "@/types/practiceType";

export default function Practices() {
    const [practices, setPractices] = useState<PracticeEducator[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        async function loadPractices() {
            setIsLoading(true);
            try {
                const response = await fetchPractices();
                // Asumimos que fetchPractices retorna un objeto con propiedad data que contiene las prácticas.
                // Si no es el caso, ajusta la acción para retornar las prácticas.
                if (response.success && response.data) {
                    setPractices(Array.isArray(response.data) ? response.data : [response.data]);
                }
            } catch (error) {
                console.error("Error fetching practices", error);
            } finally {
                setIsLoading(false);
            }
        }

        loadPractices();
    }, []);

    return (
        <div className="flex flex-col gap-6 pb-10">
            <PracticeTable
                practices={practices}
                isLoading={isLoading}
                emptyMessage="No se encontraron prácticas"
                columns={practiceColumns}
            />
        </div>
    );
}