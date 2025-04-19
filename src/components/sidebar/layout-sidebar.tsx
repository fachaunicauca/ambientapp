import { SidebarProvider } from "@/components/ui/navigation/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"

export default function LayoutSidebar({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className="flex h-full">
            <AppSidebar />
            <main className="flex-1 flex flex-col relative">
                {children}
            </main>
        </SidebarProvider>
    )
}