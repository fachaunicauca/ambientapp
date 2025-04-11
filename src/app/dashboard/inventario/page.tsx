import InventaryTable from "@/components/inventary-components/inventaryTable";
import Title from "@/components/ui/typography/title";
import { columns } from "@/config/inventaryConfig";
import { ReactiveProps } from "@/types/inventaryTypes";
import React from "react";
import { reactives } from "./data/test-data";
import { Filter, Plus, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/buttons/button";
import { Input } from "@/components/ui/form/input";

export default function Inventario() {
  let localData: ReactiveProps[] = [];
  localData = reactives;

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="flex flex-col w-full md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Title title="Inventario" />
          <p className="text-muted-foreground pt-3">Administra todos los reactivos registrados en el sistema.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 items-center">
        <div className="relative mt-2">
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
        reactives={localData}
        isLoading={false}
        emptyMessage="No se encontraron reactivos"
        columns={columns}
      ></InventaryTable>
    </div>
  );
}
