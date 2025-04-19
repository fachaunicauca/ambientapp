"use client"

import * as React from "react"
import {
    Sprout,
    Home,
    Skull,
    BookText,
    Siren,
    GraduationCap,
    TableProperties,
    X,
} from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main"

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/navigation/sidebar"
import Image from "next/image"
import { SidebarTrigger, useSidebar } from "@/components/ui/navigation/sidebar";

const data = {
    navMain: [
        {
            title: "Inicio",
            url: "/dashboard/home",
            icon: Home,
            isActive: true,
            items: [
                {
                    title: "Conoceme",
                    url: "/dashboard/home",
                },
                {
                    title: "Proyectos",
                    url: "/dashboard/home",
                }
            ],
        },
        {
            title: "Docente",
            url: '/dashboard/docente',
            icon: GraduationCap,
            items: [
                {
                    title: "Guías de laboratorio",
                    url: "/dashboard/docente/guia-laboratorio",
                },
                {
                    title: "Solicitud de práctica",
                    url: "/dashboard/docente/practica-laboratorio",
                },
                {
                    title: "Manejo de residuos",
                    url: "/dashboard/docente/manejo-residuos",
                },
                {
                    title: "Resultados test",
                    url: "/dashboard/docente/resultados-test",
                }
            ],
        },
        {
            title: "Inventario",
            url: '/dashboard/inventario',
            icon: TableProperties,
            items: [
                {
                    title: "Agregar un reactivo",
                    url: "/dashboard/inventario/agregar-reactivo",
                },
            ],
        },
        {
            title: "Inventario",
            url: '/dashboard/inventario',
            icon: TableProperties,
            items: [
                {
                    title: "Agregar un reactivo",
                    url: "/dashboard/inventario/agregar-reactivo",
                },
            ],
        },
        {
            title: "Sistema de gestión ambiental",
            url: "#",
            icon: Sprout,
            items: [
                {
                    title: "Contexto de la organización",
                    url: "#",
                },
                {
                    title: "Política ambiental",
                    url: "#",
                },
                {
                    title: "Planificación",
                    url: "#",
                },
                {
                    title: "Apoyo",
                    url: "#",
                }
            ],
        },
        {
            title: "Comunicación de riesgo",
            url: "/dashboard/comunicacion-riesgo",
            icon: Skull,
            items: [
                {
                    title: "Sustancias químicas",
                    url: "#",
                },
                {
                    title: "Residuos químicos",
                    url: "#",
                },
                {
                    title: "Capacitación",
                    url: "/dashboard/comunicacion-riesgo/capacitacion",
                },
                {
                    title: "Evaluacion",
                    url: "/dashboard/comunicacion-riesgo/evaluacion",
                },
            ],
        },
        {
            title: "Guías de laboratorio",
            url: "#",
            icon: BookText,
            items: [
                {
                    title: "Química general",
                    url: "#",
                },
                {
                    title: "Química analítica",
                    url: "#",
                },
                {
                    title: "Fisicoquímica",
                    url: "#",
                },
                {
                    title: "Química sanitaria",
                    url: "#",
                },
                {
                    title: "Química ambiental",
                    url: "#",
                },
                {
                    title: "Operaciones unitarias",
                    url: "#",
                },
                {
                    title: "Procesos unitarios",
                    url: "#",
                },
            ],
        },
        {
            title: "Plan de emergencia",
            url: "#",
            icon: Siren,
            items: [
                {
                    title: "Procedimiento",
                    url: "#",
                },
            ],
        }
    ]
}

export const AppSidebar = React.memo(function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { isMobile } = useSidebar();
    const { toggleSidebar } = useSidebar()

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className="bg-blueDark text-white p-4 items-start">
                <div className="flex justify-between w-full">
                    <Image
                        src={"/u.png"}
                        alt="Logo"
                        width={120}
                        height={120}
                        className="group-data-[collapsible=icon]:w-0 uni-logo"
                        priority
                    />
                    {isMobile ? (
                        <button onClick={toggleSidebar}>
                            <X className="text-white size-4 hover:bg-transparent hover:text-white" />
                        </button>
                    ) :
                        <SidebarTrigger className="text-white size-4 hover:bg-transparent hover:text-white" />
                    }
                </div>
            </SidebarHeader>
            <SidebarContent className="bg-blueDark text-white pt-8">
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
});

