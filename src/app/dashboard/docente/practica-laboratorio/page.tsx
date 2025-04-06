import { Search, Filter, ArrowUpFromLine, Eye, Pencil, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Title from "@/components/ui/title";

export default function PracticaLaboratorio() {
    return (
        <>
            <Title
                title="Practica de laboratorio"
            />
            <div className="container mx-auto p-4">
                <div className="flex flex-col">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div className="flex flex-col w-full">
                            <h1 className="text-2xl font-bold text-blue mb-1">Lista de solicitudes del docente</h1>
                            <p className="text-gray-500">Gestione sus solicitudes de prácticas de laboratorio</p>
                        </div>
                        <Button className="bg-blue hover:bg-blue/90 text-white mt-4 md:mt-0 w-1/5">
                            <Plus className="h-4 w-4 mr-2" />
                            Nueva Solicitud
                        </Button>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input placeholder="Buscar solicitudes..." className="pl-10" />
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-shrink-0 text-blue hover:bg-white hover:text-blue">
                                <Filter className="h-4 w-4 mr-2" />
                                Filtrar
                            </Button>
                            <Button variant="outline" className="flex-shrink-0 text-blue hover:bg-white hover:text-blue">
                                <ArrowUpFromLine className="h-4 w-4 mr-2" />
                                Exportar
                            </Button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="border rounded-md overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className="text-blue font-medium">Nombre de la práctica</TableHead>
                                    <TableHead className="text-blue font-medium">Docente</TableHead>
                                    <TableHead className="text-blue font-medium">Estado</TableHead>
                                    <TableHead className="text-blue font-medium">Fecha</TableHead>
                                    <TableHead className="text-blue font-medium">Laboratorio</TableHead>
                                    <TableHead className="text-blue font-medium text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow className="hover:bg-gray-50">
                                    <TableCell className="text-blue font-medium">Suelos</TableCell>
                                    <TableCell className="text-blue">Carlos Pérez</TableCell>
                                    <TableCell>
                                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprobado</Badge>
                                    </TableCell>
                                    <TableCell className="text-blue">15/03/2025</TableCell>
                                    <TableCell className="text-blue">Lab 101</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue hover:bg-white hover:text-blue">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue hover:bg-white hover:text-blue">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-red-500 hover:bg-white hover:text-red-500"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="hover:bg-gray-50">
                                    <TableCell className="text-blue font-medium">Fósforo y fosfatos</TableCell>
                                    <TableCell className="text-blue">Carlos Pérez</TableCell>
                                    <TableCell>
                                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprobado</Badge>
                                    </TableCell>
                                    <TableCell className="text-blue">22/03/2025</TableCell>
                                    <TableCell className="text-blue">Lab 203</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue hover:bg-white hover:text-blue">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue hover:bg-white hover:text-blue">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-red-500 hover:bg-white hover:text-red-500"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="hover:bg-gray-50">
                                    <TableCell className="text-blue font-medium">Sólidos</TableCell>
                                    <TableCell className="text-blue">Carlos Pérez</TableCell>
                                    <TableCell>
                                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprobado</Badge>
                                    </TableCell>
                                    <TableCell className="text-blue">29/03/2025</TableCell>
                                    <TableCell className="text-blue">Lab 101</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue hover:bg-white hover:text-blue">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue hover:bg-white hover:text-blue">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-red-500 hover:bg-white hover:text-red-500"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="hover:bg-gray-50">
                                    <TableCell className="text-blue font-medium">DBO y DBO</TableCell>
                                    <TableCell className="text-blue">Carlos Pérez</TableCell>
                                    <TableCell>
                                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprobado</Badge>
                                    </TableCell>
                                    <TableCell className="text-blue">05/04/2025</TableCell>
                                    <TableCell className="text-blue">Lab 305</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue hover:bg-white hover:text-blue">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue hover:bg-white hover:text-blue">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-red-500 hover:bg-white hover:text-red-500"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </>

    )
}

