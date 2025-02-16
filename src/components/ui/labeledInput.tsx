// components/LabeledInput.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";

interface LabeledInputProps {
    label: string;
    id: string;
    placeholder: string;
    required?: boolean;
    type?: "text" | "password";
}

export default function LabeledInput({
    label,
    id,
    placeholder,
    required = false,
    type = "text"
}: LabeledInputProps) {
    return (
        <>
            <Label htmlFor={id} required={required}>{label}</Label>
            {type === "password" ? (
                <PasswordInput id={id} placeholder={placeholder} />
            ) : (
                <Input id={id} placeholder={placeholder} />
            )}
        </>
    );
}