"use client"

import React from "react";
import { Button } from "../ui/buttons/button";
import { useRouter } from "next/navigation";

export default function FormActions() {
  const router = useRouter();
  return (
    <div className="flex space-x-4 justify-start">
      <Button
        className="w-1/4"
        variant="secondary"
        type="button"
        onClick={() => router.push("/dashboard/inventario")}
      >Cancelar</Button>
      <Button className="w-1/3 md:w-1/4 px-4" type="submit">Agregar</Button>
    </div>
  );
}
