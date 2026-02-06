"use client";

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
    DialogDescription
} from "@/components/ui/modals/dialog";
import { Button } from "@/components/ui/buttons/button";

interface ConfirmDialogProps {
    trigger: React.ReactNode;
    title: string;
    description?: string;

    confirmText?: string;
    cancelText?: string;
    confirmVariant?: "default" | "destructive" | "secondary" | "outline";

    onConfirm: () => void;
}

export default function ConfirmDialog({
    trigger,
    title,
    description,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    confirmVariant = "default",
    onConfirm,
}: ConfirmDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                        {description ? description : "¿Estás seguro de que deseas realizar esta acción?"}
                </DialogDescription>

                <DialogFooter className="mt-4 gap-2">
                    <DialogClose asChild>
                        <Button variant="outline">{cancelText}</Button>
                    </DialogClose>

                    <DialogClose asChild>
                        <Button variant={confirmVariant} onClick={onConfirm}>
                            {confirmText}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
