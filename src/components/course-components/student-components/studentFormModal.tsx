import { StudentInfo } from "@/api/apiCourses/interfaces/student-interfaces";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../ui/modals/dialog";
import { Input } from "../../ui/form/input";
import { Button } from "../../ui/buttons/button";
import { saveStudent } from "@/api/apiCourses/services/student-services";

interface StudentFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialData?: StudentInfo | null;
}

export default function StudentFormModal({
    isOpen,
    onClose,
    onSuccess,
    initialData,
}: StudentFormModalProps) {
    const [formData, setFormData] = useState({
        studentFirstName: "",
        studentLastName: "",
        studentEmail: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const isValidEmail = (email: string) =>
        /^[A-Za-z0-9._%+-]+@unicauca\.edu\.co$/.test(email);

    useEffect(() => {
        if (initialData) {
            setFormData({
                studentFirstName: initialData.studentFirstName,
                studentLastName: initialData.studentLastName,
                studentEmail: initialData.studentEmail,
            });
        } else {
            setFormData({
                studentFirstName: "",
                studentLastName: "",
                studentEmail: "",
            });
        }
        setErrors({});
    }, [initialData, isOpen]);

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        const submitData: any = {
            studentFirstName: formData.studentFirstName.trim(),
            studentLastName: formData.studentLastName.trim(),
            studentEmail: formData.studentEmail.trim(),
        };

        if (initialData) {
            submitData.studentId = initialData.studentId;
        }

        if (!isValidEmail(formData.studentEmail)) {
            setErrors({
                studentEmail: "El correo debe terminar en @unicauca.edu.co",
            });
            return;
        }

        const result = await saveStudent(submitData);

        if (result === true) {
            onSuccess();
            handleClose();
            return;
        }

        setErrors(result as Record<string, string>);
    };

    const handleClose = () => {
        setErrors({});
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {initialData ? "Editar Estudiante" : "Crear Estudiante"}
                    </DialogTitle>
                    <DialogDescription>
                        {initialData
                            ? "Modifica los datos del estudiante."
                            : "Completa el formulario para registrar un nuevo estudiante."}
                    </DialogDescription>
                </DialogHeader>

                {/* Nombres */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        Nombres *
                    </label>
                    <Input
                        value={formData.studentFirstName}
                        onChange={(e) =>
                            handleChange("studentFirstName", e.target.value)
                        }
                        className={
                            errors.studentFirstName ? "border-redLight" : ""
                        }
                    />
                    {errors.studentFirstName && (
                        <p className="mt-1 text-xs text-redLight">
                            {errors.studentFirstName}
                        </p>
                    )}
                </div>

                {/* Apellidos */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        Apellidos *
                    </label>
                    <Input
                        value={formData.studentLastName}
                        onChange={(e) =>
                            handleChange("studentLastName", e.target.value)
                        }
                        className={
                            errors.studentLastName ? "border-redLight" : ""
                        }
                    />
                    {errors.studentLastName && (
                        <p className="mt-1 text-xs text-redLight">
                            {errors.studentLastName}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        Correo electrónico *
                    </label>
                    <Input
                        type="email"
                        value={formData.studentEmail}
                        onChange={(e) =>
                            handleChange("studentEmail", e.target.value)
                        }
                        className={errors.studentEmail ? "border-redLight" : ""}
                    />
                    {errors.studentEmail && (
                        <p className="mt-1 text-xs text-redLight">
                            {errors.studentEmail}
                        </p>
                    )}
                </div>

                <DialogFooter className="mt-6 gap-4">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancelar</Button>
                    </DialogClose>

                    <Button variant="default" onClick={handleSubmit}>
                        {initialData ? "Guardar Cambios" : "Crear Estudiante"}
                    </Button>
                </DialogFooter>

                {errors.general && (
                    <p className="mt-4 text-sm text-redLight text-center">
                        {errors.general}
                    </p>
                )}
            </DialogContent>
        </Dialog>
    );
}
