"use client";

import DynamicBreadCrumb from "@/components/navigation/dynamicBreadCrumb";
import { Label } from "@/components/ui/typography/label";
import {
  Breadcrumb,
  BreadcrumbList,
} from "@/components/ui/navigation/breadcrumb";
import { NavUser } from "@/components/sidebar/nav-user";
import { SidebarTrigger } from "@/components/ui/navigation/sidebar";
import { useSidebar } from "@/components/ui/navigation/sidebar";
import { useAuthStore } from "@/store/authStore";

export default function Header() {
  const { isMobile } = useSidebar();
  const profile = useAuthStore.getState().profile;

  const rolePriority = [
    "ADMIN",
    "TEACHER",
    "LABORATORY_WORKER",
    "STUDENT",
    "USER",
  ];

  const roleTranslations: Record<string, string> = {
    ADMIN: "Administrador",
    TEACHER: "Docente",
    LABORATORY_WORKER: "Laboratorista",
    STUDENT: "Estudiante",
    USER: "Usuario",
  };

  const getPreferredRole = (roles: string[] = []) => {
    for (const role of rolePriority) {
      if (roles.includes(role)) {
        return roleTranslations[role];
      }
    }
    return "Usuario";
  };

  const user = {
    name: profile?.name || "Default Name",
    email: profile?.email || "Default",
    avatar: "/user.webp",
    role: getPreferredRole(profile?.roles),
  };

  return (
    <>
      <header className="flex flex-col pt-1">
        <div className="flex items-center justify-between border-b-2 border-black/20 w-full">
          {isMobile ? (
            <SidebarTrigger className="text-blue size-4 hover:bg-transparent" />
          ) : (
            <Label className="py-4">Sistema de gestión ambiental</Label>
          )}

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
