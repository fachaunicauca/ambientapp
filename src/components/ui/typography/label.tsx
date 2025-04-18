"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/navigation/tooltip"
import { cn } from "@/utils/utils"

const labelVariants = cva(
  "font-bold text-blue text-[12px] md:text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

interface LabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>, VariantProps<typeof labelVariants> {
  required?: boolean;
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, required, ...props }, ref) => (
  <div className="flex items-center gap-2">
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className)}
      {...props}
    />
    {required && <span className="font-semibold text-error">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger type="button">*</TooltipTrigger>
          <TooltipContent className="bg-error">
            <p>Este campo es obligatorio</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </span>}
  </div>
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }