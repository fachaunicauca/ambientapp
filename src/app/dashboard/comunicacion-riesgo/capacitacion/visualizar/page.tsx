"use client";

import { Button } from "@/components/ui/buttons/button";
import { Skeleton } from "@/components/ui/skeletons/skeleton";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

function CapacitationViewerContent(){
    const searchParams = useSearchParams();
    const router = useRouter();

    const fileUrl = searchParams.get("url");
    const fileType = searchParams.get("type");

    return (
        <section className="p-6">
            <Button onClick={() => router.back()} className="w-75 mb-2" variant='secondary'>
                Volver
            </Button>
            {fileUrl && fileType === "pdf" ? (
                <iframe src={fileUrl} width="100%" height="600px" className="border"></iframe>
            ):(
                <p>Archivo no encontrado.</p>
            )}
        </section>
    );

}

export default function CapacitationViewer() {
    return (
        <Suspense fallback={<Skeleton />}>
            <CapacitationViewerContent />
        </Suspense>
    );
}
