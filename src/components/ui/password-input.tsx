"use client"

import * as React from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const PasswordInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false)
        return (
            <div className="relative flex items-center">
                <input
                    type={showPassword ? "text" : "password"}
                    className={cn(
                        "flex h-9 w-full rounded-2xl border border-blueDark/20 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-blueDark placeholder:text-blueDark/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {showPassword ? (
                    <EyeIcon
                        className="absolute right-3 h-5 w-5 text-blueDark/70 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    />
                ) : (
                    <EyeOffIcon
                        className="absolute right-3 h-5 w-5 text-blueDark/70 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    />
                )}
            </div>
        )
    }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }