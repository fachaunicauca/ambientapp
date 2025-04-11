import { Info } from "lucide-react";
import { Label } from "../ui/typography/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/navigation/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/form/select";
import ErrorMessage from "../ui/feedback/error-message";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  id: string;
  label: string;
  tooltipText: string;
  options: SelectOption[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  error?: string;
  className?: string;
  placeholder?: string;
}

export default function SelectField({
  id,
  label,
  tooltipText,
  options,
  defaultValue,
  onValueChange,
  error,
  placeholder,
//   className = "",
}: SelectFieldProps) {
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

      <Select defaultValue={defaultValue} onValueChange={onValueChange}>
        <SelectTrigger className={error ? "border-error" : ""}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ErrorMessage message={error} />
    </div>
  );
}
