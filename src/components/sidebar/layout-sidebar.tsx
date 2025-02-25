import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"

export default function LayoutSidebar({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className="flex h-screen">
            <AppSidebar />
            <main className="flex-1 flex flex-col overflow-auto">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}