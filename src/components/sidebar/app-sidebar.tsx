"use client"

import * as React from "react"
import {
    Sprout,
    Home,
    Skull,
    BookText,
    Siren,
    GraduationCap,
} from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"

const data = {
    user: {
        name: "Mario Perdomo",
        email: "cmperdomo@unicauca.edu.co",
        avatar: "/user.png",
    },
    navMain: [
        {
            title: "Inicio",
            url: "/home",
            icon: Home,
            isActive: true,
            items: [
                {
                    title: "Conoceme",
                    url: "/home",
                },
                {
                    title: "Proyectos",
                    url: "/home",
                }
            ],
        },
        {
            title: "Docente",
            url: '/docente',
            icon: GraduationCap,
            items: [
                {
                    title: "Guías de laboratorio",
                    url: "/docente/guia-laboratorio",
                },
                {
                    title: "Solicitud de práctica",
                    url: "/docente/practica-laboratorio",
                },
                {
                    title: "Manejo de residuos",
                    url: "/docente/manejo-residuos",
                },
                {
                    title: "Resultados test",
                    url: "/docente/resultados-test",
                }
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
            url: "/comunicacion-riesgo",
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
                    url: "#",
                },
                {
                    title: "Evaluacion",
                    url: "/comunicacion-riesgo/evaluacion",
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className="bg-blueDark text-white p-4 items-start">
                <Link href={"/"}>
                    <Image
                        src={"/u.png"}
                        alt="Logo"
                        width={110}
                        height={110}
                        className="group-data-[collapsible=icon]:w-0"
                    />
                </Link>
            </SidebarHeader>
            <SidebarContent className="bg-blueDark text-white pt-10">
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter className="bg-blueDark text-white">
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
