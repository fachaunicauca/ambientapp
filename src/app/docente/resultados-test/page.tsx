'use client';

import { useState } from 'react';
import SearchBar from '@/components/ui/search-bar';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/mainLayout/mainLayout';
import Title from '@/components/ui/title';

const data = Array(8).fill({
    codigo: '11111',
    nombre: 'Estudiante 1',
    correo: 'example@unicauca.edu.co',
    materia: 'Lab 1',
    resultado: '75/100',
});

export default function TablaPaginada() {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    const filteredData = data.filter((item) =>
        item.nombre.toLowerCase().includes(search.toLowerCase())
    );

    const paginatedData = filteredData.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <MainLayout>
            <Title title="Resultados Test" />
            <div className="p-4">
                <div className="w-full flex justify-between mb-4">
                    <Button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                        disabled={currentPage === 0}
                        variant="secondary"
                        className='w-md rounded-full'
                    >
                        Anterior
                    </Button>
                    <SearchBar search={search} setSearch={setSearch} />
                    <Button
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.min(prev + 1, Math.ceil(filteredData.length / itemsPerPage) - 1)
                            )
                        }
                        disabled={
                            currentPage >= Math.ceil(filteredData.length / itemsPerPage) - 1
                        }
                        className='w-md rounded-full'
                        variant="secondary"
                    >
                        Siguiente
                    </Button>
                </div>
                <div className="flex overflow-x-auto">
                    <table className="w-full border-collapse text-center border-b border-b-blue">
                        <thead className="bg-blue text-white">
                            <tr>
                                <th className="border-l border-r-blue border-l-blue p-2 text-base tracking-normal leading-tight font-normal">Código del Estudiante</th>
                                <th className="p-2 text-base tracking-normal leading-tight font-normal">Nombre</th>
                                <th className="p-2 text-base tracking-normal leading-tight font-normal">Correo Institucional</th>
                                <th className="p-2 text-base tracking-normal leading-tight font-normal">Materia</th>
                                <th className="border-r border-r-blue p-2 text-base tracking-normal leading-tight font-normal">Resultado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((row, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}>
                                    <td className="border-l border-l-blue p-2">{row.codigo}</td>
                                    <td className="border-l border-l-blue border-r border-r-blue p-2">{row.nombre}</td>
                                    <td className="border-r border-r-blue p-2">{row.correo}</td>
                                    <td className="border-r border-r-blue p-2">{row.materia}</td>
                                    <td className="border-r border-r-blue p-2">{row.resultado}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
}
