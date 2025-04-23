"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Label } from "../ui/label";
import { Info, CircleX, ChevronUp, ChevronDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Chip } from "@heroui/chip";
import ErrorMessage from "../ui/error-message";

interface SelectOption {
  value: string;
  label: string;
}

interface MultipleSelectorFieldProps {
  id: string;
  label: string;
  defaultValues?: string[];
  tooltipText: string;
  options: SelectOption[];
  placeholder?: string;
  onValueChange?: (value: string[]) => void;
  error?: string;
}

export default function MultipleSelectField({
  id,
  label,
  defaultValues,
  tooltipText,
  options,
  placeholder,
  onValueChange,
  error,
}: MultipleSelectorFieldProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultValues) {
      setSelectedValues(defaultValues);
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [defaultValues]);

  const toggleOption = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    setSelectedValues(newValues);
    onValueChange?.(newValues);
  };

  const removeOption = (value: string) => {
    const newValues = selectedValues.filter((v) => v !== value);
    setSelectedValues(newValues);
    onValueChange?.(newValues);
  };

  const availableOptions = useMemo(() => {
    return options.filter((option) => !selectedValues.includes(option.value));
  }, [options, selectedValues]);

  return (
    <div className="space-y-2 w-full">
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

      <div className="relative w-full bg" ref={dropdownRef}>
        <div
          tabIndex={0}
          className="w-full px-3 py-2 border border-blueDark/20 shadow-sm rounded-2xl bg-background flex justify-between items-center ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedValues.length === 0 ? (
            <span className="text-blueDark/70 text-sm">
              {placeholder ? placeholder : "Seleccione una o varias opciones"}
            </span>
          ) : (
            <div className="flex w-[95%] gap-1 items-center overflow-x-auto rounded-md">
              {selectedValues.map((value) => {
                const option = options.find((opt) => opt.value === value);
                return (
                  <Chip
                    key={value}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="flex rounded-full bg-blue text-white select-none cursor-auto"
                    endContent={
                      <CircleX
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeOption(value);
                        }}
                        size={18}
                      ></CircleX>
                    }
                  >
                    {option?.label}
                  </Chip>
                );
              })}
            </div>
          )}
          <span className="text-blueDark/30 absolute top-1/2 right-1 transform -translate-x-1/2 -translate-y-1/2 grid place-items-center">
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border rounded-md shadow-lg max-h-60 overflow-auto">
            {availableOptions.length === 0 ? (
              <div className="p-2 text-sm text-muted-foreground">
                No hay más opciones disponibles
              </div>
            ) : (
              <ul>
                {availableOptions.map((option) => (
                  <li
                    key={option.value}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => toggleOption(option.value)}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      <ErrorMessage message={error} />
    </div>
  );
}
