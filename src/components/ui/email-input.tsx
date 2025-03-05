"use client"

import * as React from "react";
import { CircleCheck, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const EmailInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, onChange, ...props }, ref) => {
        const [isValidEmail, setIsValidEmail] = React.useState<null | boolean>(null);

        // Handler que combina la validación interna con el onChange de React Hook Form
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            
            // Validación del dominio de correo institucional
            if (newValue.includes("@")) {
                setIsValidEmail(/@unicauca\.edu\.co$/.test(newValue));
            } else {
                setIsValidEmail(null);
            }
            
            // El onChange original también se ejecuta
            if (onChange) {
                onChange(e);
            }
        };

        return (
            <div className="relative flex items-center">
                <input
                    type="email"
                    className={cn(
                        "flex h-8 md:h-9 w-full rounded-2xl border border-blueDark/20 bg-transparent px-3 py-1 text-[12px] md:text-sm shadow-sm transition-colors placeholder:text-blueDark/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                        "pr-9",
                        className
                    )}
                    ref={ref}
                    onChange={handleChange}
                    {...props}
                />

                {isValidEmail !== null && (
                    <div className="absolute right-3">
                        {isValidEmail ? (
                            <CircleCheck className="h-5 w-5 text-accesibility/70" />
                        ) : (
                            <XCircle className="h-5 w-5 text-error/70" />
                        )}
                    </div>
                )}
            </div>
        );
    }
);

EmailInput.displayName = "EmailInput";

export { EmailInput };