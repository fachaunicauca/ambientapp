import { Label } from "../ui/typography/label";
import { Info, Upload, File } from "lucide-react";
import { Input } from "../ui/form/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/navigation/tooltip";
import { UseFormRegisterReturn } from "react-hook-form";
import ErrorMessage from "../ui/feedback/error-message";
import { cn } from "@/utils/utils";
import { useRef } from "react";
import { Button } from "../ui/buttons/button";

interface FormFieldProps {
  id: string;
  label: string;
  tooltipText: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
  error?: string;
  type?: string;
  className?: string;
  onFileChange?: (file: File | null) => void;
}

export default function FormField({
  id,
  label,
  tooltipText,
  placeholder,
  type = "text",
  register,
  error,
  className,
  onFileChange,
}: FormFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn(className, "space-y-2")}>
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

      {type === "file" ? (
        <div className="flex items-center gap-3">
          {/* Input file oculto */}
          <Input
            id={id}
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              onFileChange?.(file);
              register?.onChange?.(e);
            }}
          />
          
          {/* Botón personalizado */}
          <Button
            type="button"
            variant="outline"
            onClick={handleFileButtonClick}
            className={cn(
              "justify-center text-blueDark/70 w-full rounded-2xl border border-blueDark/20",
              error && "border-error",
            )}
          >
            {fileInputRef.current?.files?.[0] ? <File className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
            <span className="truncate">{fileInputRef.current?.files?.[0]?.name || placeholder}</span>
          </Button>
        </div>
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          {...(register ?? {})}
          className={cn(error && "border-error", type === "date" && "input-date-wrapper")}
          step="any"
        />
      )}

      <ErrorMessage message={error} />
    </div>
  );
}