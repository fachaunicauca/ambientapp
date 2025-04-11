import Title from "@/components/ui/typography/title";
import Link from "next/link";
import { Bell, FileText, CalendarClock, Recycle, ClipboardList } from "lucide-react";
import { Card, CardContent } from "@/components/ui/layout/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/navigation/tabs";
import { Badge } from "@/components/ui/typography/badge";

export default function Docente() {
    return (
        <>
            <Title title="Plataforma para docente" />
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <Link href="/dashboard/docente/guia-laboratorio" className="no-underline">
                        <Card className="h-full hover:shadow-md transition-shadow">
                            <CardContent className="p-6 flex flex-col">
                                <div className="flex justify-between items-start">
                                    <h2 className="text-xl font-bold text-blue">Guías de laboratorio</h2>
                                    <FileText className="text-blue h-6 w-6" />
                                </div>
                                <p className="text-sm text-gray-600 mt-2">Gestione documentos y guías</p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/dashboard/docente/practica-laboratorio" className="no-underline">
                        <Card className="h-full hover:shadow-md transition-shadow">
                            <CardContent className="p-6 flex flex-col">
                                <div className="flex justify-between items-start">
                                    <h2 className="text-xl font-bold text-blue">Solicitud de práctica</h2>
                                    <CalendarClock className="text-blue h-6 w-6" />
                                </div>
                                <p className="text-sm text-gray-600 mt-2">Programe actividades</p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/dashboard/docente/manejo-residuos" className="no-underline">
                        <Card className="h-full hover:shadow-md transition-shadow">
                            <CardContent className="p-6 flex flex-col">
                                <div className="flex justify-between items-start">
                                    <h2 className="text-xl font-bold text-blue">Manejo de residuos</h2>
                                    <Recycle className="text-blue h-6 w-6" />
                                </div>
                                <p className="text-sm text-gray-600 mt-2">Protocolos y registros</p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/dashboard/docente/resultados-test" className="no-underline">
                        <Card className="h-full hover:shadow-md transition-shadow">
                            <CardContent className="p-6 flex flex-col">
                                <div className="flex justify-between items-start">
                                    <h2 className="text-xl font-bold text-blue">Resultados test</h2>
                                    <ClipboardList className="text-blue h-6 w-6" />
                                </div>
                                <p className="text-sm text-gray-600 mt-2">Análisis y reportes</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardContent className="p-0">
                                <Tabs defaultValue="resumen" className="w-full">
                                    <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-12">
                                        <TabsTrigger
                                            value="resumen"
                                            className="data-[state=active]:border-b-2 data-[state=active]:border-blue data-[state=active]:text-blue data-[state=active]:shadow-none rounded-none"
                                        >
                                            Resumen
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="actividades"
                                            className="data-[state=active]:border-b-2 data-[state=active]:border-blue data-[state=active]:text-blue data-[state=active]:shadow-none rounded-none"
                                        >
                                            Actividades
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="estadisticas"
                                            className="data-[state=active]:border-b-2 data-[state=active]:border-blue data-[state=active]:text-blue data-[state=active]:shadow-none rounded-none"
                                        >
                                            Estadísticas
                                        </TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="resumen" className="p-4">
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-blue mb-2">Actividades recientes</h3>
                                                <p className="text-sm text-gray-500">Resumen de las últimas actividades en la plataforma</p>
                                            </div>
                                            <ActivityList />
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="actividades">
                                        <div className="p-4">
                                            <h3 className="text-lg font-bold text-blue mb-2">Contenido de Actividades</h3>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="estadisticas">
                                        <div className="p-4">
                                            <h3 className="text-lg font-bold text-blue mb-2">Contenido de Estadísticas</h3>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-blue">Notificaciones</h3>
                                    <Badge className="bg-blue text-white hover:text-blue">4 nuevas</Badge>
                                </div>
                                <NotificationsList />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

function ActivityItem({ time = "1 hora" }: { time?: string }) {
    return (
        <div className="py-4">
            <div className="flex gap-4">
                <div className="mt-1">
                    <FileText className="h-5 w-5 text-blue" />
                </div>
                <div>
                    <h4 className="font-medium text-blue">Guía de laboratorio actualizada</h4>
                    <p className="text-sm text-gray-600">Química orgánica - Guía 3</p>
                    <p className="text-xs text-gray-500 mt-1">Hace {time}</p>
                </div>
            </div>
        </div>
    );
}

function ActivityList() {
    return (
        <div className="divide-y">
            <ActivityItem />
            <ActivityItem />
            <ActivityItem />
            <ActivityItem />
        </div>
    );
}

function NotificationItem() {
    return (
        <div className="py-3">
            <div className="flex gap-3">
                <Bell className="h-5 w-5 text-blue" />
                <div>
                    <p className="font-medium text-blue">Solicitud pendiente</p>
                    <p className="text-xs text-gray-500">Hace 30 minutos</p>
                </div>
            </div>
        </div>
    );
}

function NotificationsList() {
    return (
        <div className="divide-y">
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
        </div>
    );
}