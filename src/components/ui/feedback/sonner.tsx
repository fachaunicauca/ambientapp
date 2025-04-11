"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      expand={false}
      duration={4000}
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          
          success:
            "group-[.toaster]:bg-[#D8EFD1] group-[.toaster]:border-l-4 group-[.toaster]:border-l-[#249337] group-[.toast]:text-[#249337] group-[.toast]:shadow-[0_0_10px_rgba(36,147,55,0.2)] [&_svg]:text-[#249337]",
          
          info:
            "group-[.toaster]:bg-[#D6E2FF] group-[.toaster]:border-l-4 group-[.toaster]:border-l-[#0053A0] group-[.toast]:text-[#0053A0] group-[.toast]:shadow-[0_0_10px_rgba(0,83,160,0.2)] [&_svg]:text-[#0053A0]",
          
          error:
            "group-[.toaster]:bg-[#FFE6E6] group-[.toaster]:border-l-4 group-[.toaster]:border-l-[#D03838] group-[.toast]:text-[#D03838] group-[.toast]:shadow-[0_0_10px_rgba(208,56,56,0.2)] [&_svg]:text-[#D03838]",
          
          warning:
            "group-[.toaster]:bg-[#FFF4D6] group-[.toaster]:border-l-4 group-[.toaster]:border-l-[#D97706] group-[.toast]:text-[#D97706] group-[.toast]:shadow-[0_0_10px_rgba(217,119,6,0.2)] [&_svg]:text-[#D97706]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }