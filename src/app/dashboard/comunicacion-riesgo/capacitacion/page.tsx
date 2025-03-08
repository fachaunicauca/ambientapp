"use client";

import FileItem from "@/components/comunication-components/preparation-component/file-item";
import Title from "@/components/ui/title";
import { useRouter } from "next/navigation";

const files = [
    { name: "Taller 0", type: "pdf", url: "/Taller-0-Iot.pdf" },
];

export default function Capacitacion() {
    const router = useRouter();

    const viewFile = (file: { url: string; type: string }) => {
        router.push(`/dashboard/comunicacion-riesgo/capacitacion/visualizar?url=${file.url}&type=${file.type}`);
    };

    return (
        <section>
            <Title title="Material de Capacitación"></Title>
            <div className="mt-4">
                <ul className="space-y-3">
                    {files.map((file, index) => (
                        <FileItem key={index} file={file} onView={viewFile} />
                    ))}
                </ul>
            </div>
        </section>
    );
}
