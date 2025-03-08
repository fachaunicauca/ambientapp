"use client";

import FileItem from "@/components/comunication-components/preparation-component/file-item";
import Title from "@/components/ui/title";
import { useRouter } from "next/navigation";

const files = [
    { name: "Manual de Usuario", type: "pdf", url: "/docs/manual.pdf" },
    { name: "Presentación de Seguridad", type: "ppt", url: "/docs/seguridad.pptx" },
];

export default function CapacitationList() {
    const router = useRouter();

    const viewFile = (file: { url: string; type: string }) => {
        router.push(`/capacitation/viewer?url=${file.url}&type=${file.type}`);
    };

    return (
        <section className="p-6">
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
