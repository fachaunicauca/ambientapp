"use client";

import InventaryTable from "@/components/inventary-components/inventaryTable";
import Title from "@/components/ui/typography/title";
import { columns } from "@/config/inventaryConfig";
import { ParentHouseProps, ReactiveProps } from "@/types/inventaryTypes";
import React, { useEffect, useState, useMemo } from "react";
import { List, Plus, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/buttons/button";
import { Input } from "@/components/ui/form/input";
import { getReactivesAction } from "@/actions/reactiveAction";
import { getParentHousesAction } from "@/actions/parentHouseAction";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/navigation/dropdown-menu";

export default function Inventario() {
  const [reactivesApi, setReactivesApi] = useState<ReactiveProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [parentHouses, setParentHouses] = useState<ParentHouseProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">(""); // ordenamiento por nombre

  // Fetch inicial
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

  // Debounce del término de búsqueda
  useEffect(() => {
    const handle = setTimeout(() => setDebouncedTerm(searchTerm.trim()), 250);
    return () => clearTimeout(handle);
  }, [searchTerm]);

  // Filtrado de reactivos
  const filteredReactives = useMemo(() => {
    if (!debouncedTerm) return reactivesApi;
    const term = debouncedTerm.toLowerCase();
    return reactivesApi.filter((r) => {
      const name = r.name?.toLowerCase();
      const code = r.code?.toLowerCase();
      const formula = r.formula?.toLowerCase();
      const status = r.status?.toLowerCase();
      const risks = (r.riskTypes || []).map((rt) => rt.toLowerCase()).join(" ");
      // Buscamos también por casa matriz
      const houseName =
        parentHouses.find((h) => h.parentHouseId === r.house)?.name?.toLowerCase() || "";
      return [name, code, formula, status, risks, houseName].some((field) => field?.includes(term));
    });
  }, [debouncedTerm, reactivesApi, parentHouses]);

  // Ordenamiento por nombre según sortOrder
  const sortedReactives = useMemo(() => {
    if (!sortOrder) return filteredReactives;
    const list = [...filteredReactives];
    list.sort((a, b) => {
      const nameA = (a.name || "").toLocaleLowerCase();
      const nameB = (b.name || "").toLocaleLowerCase();
      const comparison = nameA.localeCompare(nameB, "es", { sensitivity: "base" });
      return sortOrder === "asc" ? comparison : -comparison;
    });
    return list;
  }, [filteredReactives, sortOrder]);

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
          <Input
            placeholder="Buscar reactivo (nombre, código, fórmula, estado, casa...)"
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Link href={"/dashboard/inventario/agregar-reactivo"}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Agregar reactivo
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full md:w-auto bg-purple-100 hover:bg-purple-200 text-purple-700">
              <List className="mr-2 h-4 w-4" />
              {sortOrder === "asc"
                ? "Nombre A→Z"
                : sortOrder === "desc"
                ? "Nombre Z→A"
                : "Ordenar"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[12rem]">
            <DropdownMenuLabel>Ordenar por nombre</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSortOrder("asc")}>Nombre A→Z</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOrder("desc")}>Nombre Z→A</DropdownMenuItem>
            {sortOrder && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-redLight" onClick={() => setSortOrder("")}>Quitar orden</DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <InventaryTable
        reactives={sortedReactives}
        parentHouses={parentHouses}
        isLoading={isLoading}
        emptyMessage={debouncedTerm ? `No se encontraron reactivos para "${debouncedTerm}"` : "No se encontraron reactivos"}
        columns={columns}
      />
    </div>
  );
}