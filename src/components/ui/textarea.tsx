import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/utils";

const Textarea = forwardRef<
    ElementRef<"textarea">,
    ComponentPropsWithoutRef<"textarea">
>(({ className, ...props }, ref) => {
    return (
        <textarea
            className={cn(
                "flex h-32 w-full rounded-md border border-blueDark/20 bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-blueDark/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Textarea.displayName = "Textarea";

export { Textarea };
