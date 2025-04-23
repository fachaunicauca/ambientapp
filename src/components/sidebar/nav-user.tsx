"use client"

import {
    ChevronDown,
    LogOut,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/navigation/dropdown-menu"

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/navigation/sidebar"

import { logoutAction } from "@/actions/authAction"
import { useRouter } from "next/navigation"

export function NavUser({
    user,
}: {
    user: {
        name: string
        email: string
        avatar: string
        role: string
    }
}) {
    const router = useRouter();
    const { isMobile } = useSidebar()

    const handleLogout = async () => {
        try {
            const res = await logoutAction();

            if (res.success) {
                setTimeout(() => {
                    router.push('/');
                    router.refresh();
                }, 100);
            } else {
                router.push('/');
            }
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            router.push('/');
        }
    }

    return (
        <>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="rounded-lg"></AvatarFallback>
                                    <AvatarFallback className="rounded-lg"></AvatarFallback>
                                </Avatar>
                                {!isMobile && (
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold text-blue">{user.name}</span>
                                        <span className="truncate text-xs text-blue">{user.role}</span>
                                    </div>
                                )}
                                <ChevronDown className="size-4" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                            side="bottom"
                            align="end"
                            sideOffset={4}
                        >
                            <DropdownMenuGroup>
                                <span className="mx-2 mb-2 mt-1 text-blue text-xs md:text-sm">
                                    {user.email}
                                </span>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-blue font-semibold" onClick={handleLogout}>
                                <LogOut />
                                Cerrar sesión
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </>
    )
}