import Link from "next/link"
import { FileText, Search, Filter, Download, Share2, Upload, ArrowUpFromLine, Plus } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { Input } from "@/components/ui/form/input"
import { Badge } from "@/components/ui/typography/badge"
import { Card, CardContent } from "@/components/ui/layout/card"
import Title from "@/components/ui/typography/title";

export default function GuiaLaboratorio() {
    return (
        <>
            <Title title="Guía de laboratorio" />
            <div className="container mx-auto p-4">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-72 flex-shrink-0">
                        <Card className="h-full">
                            <CardContent className="p-6">
                                <h2 className="text-lg font-bold text-blue mb-1">Categorías</h2>
                                <p className="text-sm text-gray-500 mb-4">Seleccione una categoría para ver sus guías</p>

                                <div className="space-y-1">
                                    <CategoryItem name="Química general" count={5} />
                                    <CategoryItem name="Química analítica" count={3} />
                                    <CategoryItem name="Físico - química" count={4} />
                                    <CategoryItem name="Química sanitaria" count={6} />
                                    <CategoryItem name="Química ambiental" count={4} active />
                                    <CategoryItem name="Operaciones unitarias" count={3} />
                                    <CategoryItem name="Procesos unitarios" count={2} />
                                </div>

                                <Button variant="outline" className="w-full mt-6 border-dashed text-blue">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Nueva categoría
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="flex flex-col">
                            {/* Header */}
                            <div className="flex justify-between mb-6">
                                <div className="flex flex-col w-full">
                                    <h1 className="text-2xl font-bold text-blue">Química ambiental</h1>
                                    <p className="text-gray-500">4 guías de laboratorio disponibles</p>
                                </div>
                                <Button className="bg-blue hover:bg-blue/90 w-1/5">
                                    <Upload className="h-4 w-4 mr-2" />
                                    Subir guía
                                </Button>
                            </div>

                            {/* Search and Filters */}
                            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input placeholder="Buscar guías..." className="pl-10" />
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="outline" className="flex-shrink-0 text-blue">
                                        <Filter className="h-4 w-4 mr-2" />
                                        Filtrar
                                    </Button>
                                    <Button variant="outline" className="flex-shrink-0 text-blue">
                                        <ArrowUpFromLine className="h-4 w-4 mr-2" />
                                        Exportar
                                    </Button>
                                </div>
                            </div>

                            {/* Document List */}
                            <div className="space-y-4">
                                <DocumentItem
                                    title="Manual de laboratorio de química ambiental.pdf"
                                    size="2.5 MB"
                                    date="10/03/2025"
                                    author="Carlos Cabezas"
                                />

                                <DocumentItem title="DBO Y DQO.pdf" size="2.5 MB" date="10/03/2025" author="Carlos Cabezas" />

                                <DocumentItem
                                    title="Determinación de aniones y nitrógeno en aguas.pdf"
                                    size="2.5 MB"
                                    date="10/03/2025"
                                    author="Carlos Cabezas"
                                />

                                <DocumentItem
                                    title="Determinación de fósforo y fosfato en aguas.pdf"
                                    size="2.5 MB"
                                    date="10/03/2025"
                                    author="Carlos Cabezas"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

            <div className="container mx-auto p-4">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-72 flex-shrink-0">
                        <Card className="h-full">
                            <CardContent className="p-6">
                                <h2 className="text-lg font-bold text-blue mb-1">Categorías</h2>
                                <p className="text-sm text-gray-500 mb-4">Seleccione una categoría para ver sus guías</p>

                                <div className="space-y-1">
                                    <CategoryItem name="Química general" count={5} />
                                    <CategoryItem name="Química analítica" count={3} />
                                    <CategoryItem name="Físico - química" count={4} />
                                    <CategoryItem name="Química sanitaria" count={6} />
                                    <CategoryItem name="Química ambiental" count={4} active />
                                    <CategoryItem name="Operaciones unitarias" count={3} />
                                    <CategoryItem name="Procesos unitarios" count={2} />
                                </div>

                                <Button variant="outline" className="w-full mt-6 border-dashed text-blue">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Nueva categoría
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="flex flex-col">
                            {/* Header */}
                            <div className="flex justify-between mb-6">
                                <div className="flex flex-col w-full">
                                    <h1 className="text-2xl font-bold text-blue">Química ambiental</h1>
                                    <p className="text-gray-500">4 guías de laboratorio disponibles</p>
                                </div>
                                <Button className="bg-blue hover:bg-blue/90 w-1/5">
                                    <Upload className="h-4 w-4 mr-2" />
                                    Subir guía
                                </Button>
                            </div>

                            {/* Search and Filters */}
                            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input placeholder="Buscar guías..." className="pl-10" />
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="outline" className="flex-shrink-0 text-blue">
                                        <Filter className="h-4 w-4 mr-2" />
                                        Filtrar
                                    </Button>
                                    <Button variant="outline" className="flex-shrink-0 text-blue">
                                        <ArrowUpFromLine className="h-4 w-4 mr-2" />
                                        Exportar
                                    </Button>
                                </div>
                            </div>

                            {/* Document List */}
                            <div className="space-y-4">
                                <DocumentItem
                                    title="Manual de laboratorio de química ambiental.pdf"
                                    size="2.5 MB"
                                    date="10/03/2025"
                                    author="Carlos Cabezas"
                                />

                                <DocumentItem title="DBO Y DQO.pdf" size="2.5 MB" date="10/03/2025" author="Carlos Cabezas" />

                                <DocumentItem
                                    title="Determinación de aniones y nitrógeno en aguas.pdf"
                                    size="2.5 MB"
                                    date="10/03/2025"
                                    author="Carlos Cabezas"
                                />

                                <DocumentItem
                                    title="Determinación de fósforo y fosfato en aguas.pdf"
                                    size="2.5 MB"
                                    date="10/03/2025"
                                    author="Carlos Cabezas"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

interface CategoryItemProps {
    name: string
    count: number
    active?: boolean
}

function CategoryItem({ name, count, active = false }: CategoryItemProps) {
    return (
        <Link
            href="#"
            className={`flex justify-between items-center p-2 rounded-md hover:bg-gray-100 hover:text-blue ${active ? "bg-blue text-white hover:bg-blue" : ""
                }`}
        >
            <span>{name}</span>
            <Badge
                className={`${active ? "bg-white text-blue" : "bg-blue text-white"
                    } rounded-full h-6 w-6 flex items-center justify-center p-0`}
            >
                {count}
            </Badge>
        </Link>
    )
}

interface DocumentItemProps {
    title: string
    size: string
    date: string
    author: string
}

function DocumentItem({ title, size, date, author }: DocumentItemProps) {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
                <div className="flex items-start gap-4">
                    <FileText className="h-6 w-6 text-blue flex-shrink-0 mt-1" />

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-blue truncate">{title}</h3>
                            <Badge className="bg-blue text-white hover:text-blue">PDF</Badge>
                        </div>

                        <div className="flex flex-wrap text-sm text-gray-500 gap-x-4">
                            <span>{size}</span>
                            <span>•</span>
                            <span>Actualizada el {date}</span>
                            <span>•</span>
                            <span>{author}</span>
                        </div>
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4 text-blue" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Share2 className="h-4 w-4 text-blue" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


}

interface CategoryItemProps {
    name: string
    count: number
    active?: boolean
}

function CategoryItem({ name, count, active = false }: CategoryItemProps) {
    return (
        <Link
            href="#"
            className={`flex justify-between items-center p-2 rounded-md hover:bg-gray-100 hover:text-blue ${active ? "bg-blue text-white hover:bg-blue" : ""
                }`}
        >
            <span>{name}</span>
            <Badge
                className={`${active ? "bg-white text-blue" : "bg-blue text-white"
                    } rounded-full h-6 w-6 flex items-center justify-center p-0`}
            >
                {count}
            </Badge>
        </Link>
    )
}

interface DocumentItemProps {
    title: string
    size: string
    date: string
    author: string
}

function DocumentItem({ title, size, date, author }: DocumentItemProps) {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
                <div className="flex items-start gap-4">
                    <FileText className="h-6 w-6 text-blue flex-shrink-0 mt-1" />

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-blue truncate">{title}</h3>
                            <Badge className="bg-blue text-white hover:text-blue">PDF</Badge>
                        </div>

                        <div className="flex flex-wrap text-sm text-gray-500 gap-x-4">
                            <span>{size}</span>
                            <span>•</span>
                            <span>Actualizada el {date}</span>
                            <span>•</span>
                            <span>{author}</span>
                        </div>
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4 text-blue" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Share2 className="h-4 w-4 text-blue" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

