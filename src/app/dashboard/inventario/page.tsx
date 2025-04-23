"use client";

import InventaryTable from "@/components/inventary-components/inventaryTable";
import Title from "@/components/ui/title";
import { columns } from "@/config/inventaryConfig";
import { ParentHouseProps, ReactiveProps } from "@/types/inventaryTypes";
import React, { useEffect, useState } from "react";
import { Filter, Plus, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getReactivesAction } from "@/actions/reactiveAction";
import { getParentHousesAction } from "@/actions/parentHouseAction";

export default function Inventario() {
  const [reactivesApi, setReactivesApi] = useState<ReactiveProps[]>([]);
  const [parentHouses, setParentHouses] = useState<ParentHouseProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const reactivesData = await getReactivesAction();
      const parentHousesData = await getParentHousesAction();
      setReactivesApi(reactivesData);
      setParentHouses(parentHousesData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="flex flex-col w-full md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Title title="Inventario" />
          <p className="text-muted-foreground pt-3">
            Administra todos los reactivos registrados en el sistema.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar reactivo" className="pl-10 w-full" />
        </div>

        <Link href={"/dashboard/inventario/agregar-reactivo"}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Agregar reactivo
          </Button>
        </Link>

        <Button className="w-full md:w-auto bg-purple-100 hover:bg-purple-200 text-purple-700">
          <Filter className="mr-2 h-4 w-4" />
          Filtrar
        </Button>
      </div>

      <InventaryTable
        reactives={reactivesApi}
        parentHouses={parentHouses}
        isLoading={isLoading}
        emptyMessage="No se encontraron reactivos"
        columns={columns}
      ></InventaryTable>
    </div>
  );
}