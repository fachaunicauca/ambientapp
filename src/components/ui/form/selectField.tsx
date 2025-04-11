"use client"

import { Info } from "lucide-react"
import { Label } from "@/components/ui/typography/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/navigation/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/form/select"
import ErrorMessage from "@/components/ui/feedback/error-message"

interface SelectOption {
    value: string
    label: string
}

interface SelectFieldProps {
    id: string
    label: string
    tooltipText: string
    options: SelectOption[]
    value?: string
    defaultValue?: string
    onValueChange: (value: string) => void
    error?: string
    className?: string
    placeholder?: string
}

export const SelectField = ({
    id,
    label,
    tooltipText,
    options,
    defaultValue,
    value,
    onValueChange,
    error,
    className = "",
    placeholder = "Select an option",
}: SelectFieldProps) => {
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

            <div className="flex flex-col gap-1">
                <Select defaultValue={defaultValue} value={value} onValueChange={onValueChange}>
                    <SelectTrigger id={id} className={error ? "border-error" : ""}>
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


        </div>
    )
}
