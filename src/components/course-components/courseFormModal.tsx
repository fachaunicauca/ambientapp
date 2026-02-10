import { CourseInfo } from "@/api/apiCourses/interfaces/course-interfaces";
import { saveCourse } from "@/api/apiCourses/services/course-services";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/modals/dialog";
import { Input } from "../ui/form/input";
import { Button } from "../ui/buttons/button";

interface CourseFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialData?: CourseInfo | null;
    teacherEmail: string;
}

export default function CourseFormModal({
    isOpen,
    onClose,
    onSuccess,
    initialData,
    teacherEmail,
}: CourseFormModalProps) {
    const [formData, setFormData] = useState({
        courseName: "",
        courseDescription: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                courseName: initialData.courseName,
                courseDescription: initialData.courseDescription,
            });
        } else {
            setFormData({
                courseName: "",
                courseDescription: "",
            });
        }

        setErrors({});
    }, [initialData, isOpen]);

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        const submitData: any = {
            courseName: formData.courseName.trim(),
            teacherEmail: teacherEmail,
            courseDescription: formData.courseDescription.trim(),
        };

        if (initialData) {
            submitData.courseId = initialData.courseId;
        }

        const result = await saveCourse(submitData);

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
                        {initialData ? "Editar Curso" : "Crear Curso"}
                    </DialogTitle>
                    <DialogDescription>
                        {initialData
                            ? "Modifica la información del curso."
                            : "Completa el formulario para crear un nuevo curso."}
                    </DialogDescription>
                </DialogHeader>

                {/* Nombre del curso */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        Nombre del curso *
                    </label>
                    <Input
                        value={formData.courseName}
                        onChange={(e) =>
                            handleChange("courseName", e.target.value)
                        }
                        className={errors.courseName ? "border-redLight" : ""}
                    />
                    {errors.courseName && (
                        <p className="mt-1 text-xs text-redLight">
                            {errors.courseName}
                        </p>
                    )}
                </div>

                {/* Descripción */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        Descripción
                    </label>
                    <Input
                        value={formData.courseDescription}
                        onChange={(e) =>
                            handleChange("courseDescription", e.target.value)
                        }
                    />
                </div>

                <DialogFooter className="mt-6 gap-4">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancelar</Button>
                    </DialogClose>

                    <Button variant="default" onClick={handleSubmit}>
                        {initialData ? "Guardar Cambios" : "Crear Curso"}
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
