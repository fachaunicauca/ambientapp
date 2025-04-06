"use client";
import { Chip } from "@heroui/chip";
import { useMemo, useState } from "react";
import { Listbox, ListboxItem } from "@heroui/listbox";
import type { Selection } from "@react-types/shared";
import { Label } from "../ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Info } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface MultipleSelectorFieldProps {
  id: string;
  label: string;
  tooltipText: string;
  options: SelectOption[];
  onValueChange?: (value: string) => void;
  error?: string;
  className?: string;
}

export default function MultipleSelectorField({
  id,
  label,
  tooltipText,
  options,
}: MultipleSelectorFieldProps) {
  const [values, setValues] = useState<Selection>(new Set());

  const arrayValues =
    values === "all" ? options.map((r) => r.value) : Array.from(values);

  const selectedContent = useMemo(() => {
    if (!arrayValues.length) {
      return null;
    }

    return (
      <div className="w-full h-auto max-h-[155px] mt-2 flex flex-wrap py-0.5 px-2 gap-1 overflow-auto">
        {arrayValues.map((value) => (
          <Chip
            key={value}
            size="md"
            className="bg-blue text-white rounded-full cursor-pointer select-none"
            onClick={() => {
              setValues((prev) => {
                const newSet = new Set(prev);
                newSet.delete(value);
                return newSet;
              });
            }}
          >
            {options.find((op) => op.value === value)?.label}
          </Chip>
        ))}
      </div>
    );
  }, [arrayValues, options]);

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
      <div className="w-full max-h-[200px] border-small px-1 py-2 rounded-2xl border-blueDark/20 dark:border-default-100">
        <p className="text-sm text-muted-foreground pl-2">
          Seleccione los riesgos del reactivo
        </p>
        <div className="grid grid-cols-2">
          <Listbox
            classNames={{
              list: "max-h-[160px] overflow-auto",
            }}
            items={options}
            label="Multiple selection"
            selectionMode="multiple"
            variant="flat"
            selectedKeys={values}
            onSelectionChange={setValues}
          >
            {(item) => (
              <ListboxItem key={item.value} textValue={item.label}>
                <Chip key={item.value} size="md">
                  {item.label}
                </Chip>
              </ListboxItem>
            )}
          </Listbox>
          <div>{selectedContent}</div>
        </div>
      </div>
    </div>
  );
}
