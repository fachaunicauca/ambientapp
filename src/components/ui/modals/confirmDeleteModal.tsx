"use client";

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/modals/dialog";
import { Button } from "@/components/ui/buttons/button";

interface DeleteConfirmDialogProps {
    trigger: React.ReactNode;
    onConfirm: () => void;
    name : string
}

export default function DeleteConfirmDialog({
    trigger,
    onConfirm,
    name
}: DeleteConfirmDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>¿Eliminar archivo?</DialogTitle>
                </DialogHeader>
                <p>¿Estás seguro de que deseas eliminar {name}? Esta acción no se puede deshacer.</p>
                <DialogFooter className="mt-4">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancelar</Button>
                    </DialogClose>
                    <Button variant="destructive" onClick={onConfirm}>
                        Eliminar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
