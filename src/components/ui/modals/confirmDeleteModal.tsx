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
    title: string;       
    description: string; 
}

export default function DeleteConfirmDialog({
    trigger,
    onConfirm,
    title,
    description
}: DeleteConfirmDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="py-2 text-sm text-gray-600">
                    <p>{description}</p>
                </div>
                <DialogFooter className="mt-4 gap-2">
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