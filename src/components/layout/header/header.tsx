import DynamicBreadCrumb from "@/components/navigation/dynamicBreadCrumb";
import { Label } from "@/components/ui/typography/label";
import {
    Breadcrumb,
    BreadcrumbList,
} from "@/components/ui/navigation/breadcrumb";
import { NavUser } from "@/components/sidebar/nav-user";
import { SidebarTrigger } from "@/components/ui/navigation/sidebar";
import { useSidebar } from "@/components/ui/navigation/sidebar";

export default function Header() {
    const { isMobile } = useSidebar()

    const user = {
        name: "Mario Perdomo",
        email: "cmperdomo@unicauca.edu.co",
        avatar: "/user.webp",
        role: "Docente",
    }

    return (
        <>
            <header className="flex flex-col pt-1">
                <div className="flex items-center justify-between border-b-2 border-black/20 w-full">
                    {isMobile ? (
                        <SidebarTrigger className="text-blue size-4 hover:bg-transparent" />
                    ) :
                        <Label className="py-4">
                            Sistema de gestión ambiental
                        </Label>
                    }

                    <div className="w-[25%] flex items-center">

                        <NavUser user={user} />

                    </div>
                </div>
                <div className="flex items-center">
                    <Breadcrumb className="py-4">
                        <BreadcrumbList>
                            <DynamicBreadCrumb />
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
        </>
    );
}