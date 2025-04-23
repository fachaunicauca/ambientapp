import { Label } from "../ui/label";
import { Info } from "lucide-react";
import { Input } from "../ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { UseFormRegisterReturn } from "react-hook-form";
import ErrorMessage from "../ui/error-message";

interface FormFieldProps {
  id: string;
  label: string;
  tooltipText: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
  type?: string;
}

export default function FormField({
  id,
  label,
  tooltipText,
  placeholder,
  type,
  register,
  error,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
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
        {...register}
        className={error ? "border-error" : ""}
        step="any"
      ></Input>
      <ErrorMessage message={error} />
    </div>
  );
}
