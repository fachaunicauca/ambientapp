"use client";

import { Info } from "lucide-react";
import { Input } from "@/components/ui/form/input";
import { Label } from "@/components/ui/typography/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/navigation/tooltip";
import ErrorMessage from "@/components/ui/feedback/error-message";
import type { UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps {
    id: string;
    label: string;
    tooltipText: string;
    placeholder?: string;
    register?: UseFormRegisterReturn;
    error?: string;
    type?: string;
    className?: string;
    value?: string | number;
    disabled?: boolean;
}

export const FormField = ({
    id,
    label,
    tooltipText,
    placeholder,
    register,
    error,
    type = "text",
    className = "",
    value,
    disabled = false,
}: FormFieldProps) => {
    return (
        <div className={`space-y-2 ${className}`}>
            <div className="flex items-center gap-2">
                <Label htmlFor={id}>{label}</Label>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{tooltipText}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <Input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                {...register}
                className={error ? "border-error" : ""}
            />
            <ErrorMessage message={error} />
        </div>
    );
};