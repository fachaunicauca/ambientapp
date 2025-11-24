"use client";

import {
  QuantityUnits,
  ReactiveTypes,
  RiskTypes,
  StatusTypes,
} from "@/config/inventaryConfig";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/layout/card";
import FormField from "./formField";
import SelectField from "./selectField";
import MultipleSelectField from "./multipleSelectField";
import { useEffect, useState } from "react";
import { getParentHousesAction } from "@/actions/parentHouseAction";
import { Loader2, FlaskConical, ClipboardCheck, Ban } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import {
  ReactiveFormValues,
  reactiveSchemaFactory,
} from "@/validations/reactiveSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useReactiveFormHandlers } from "@/handlers/reactiveHandlers";
import { Button } from "../ui/buttons/button";
import {
  ReactiveProps,
  ReactiveType,
  RiskType,
  Status,
  Unit,
} from "@/types/inventaryTypes";

interface SelectOption {
  value: string;
  label: string;
}

interface ReactiveFormProps {
  editedReactive?: ReactiveProps;
}

export default function InventaryForm({ editedReactive }: ReactiveFormProps) {
  const [parentHouses, setParentHouses] = useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    handleCreateReactive,
    handleUpdateReactive,
    handleCancel,
    isSubmitting,
  } = useReactiveFormHandlers();

  const schema = useMemo(() => reactiveSchemaFactory(), []);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ReactiveFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: editedReactive?.name,
      code: editedReactive?.code,
      formula: editedReactive?.formula,
      quantity: editedReactive?.quantity,
      minimumQuantity: editedReactive?.minimumQuantity,
      type: editedReactive?.type,
      house: editedReactive?.house,
      measureUnit: editedReactive?.measureUnit,
      status: editedReactive?.status,
      riskTypes: editedReactive?.riskTypes ?? [],
      safetySheetExpiration: editedReactive?.safetySheetExpiration
        ? editedReactive.safetySheetExpiration.split("T")[0]
        : undefined,
    },
  });

  // Cuando llega el reactivo a editar (async) reseteamos para que RHF considere los valores como iniciales y no marque errores.
  useEffect(() => {
    if (editedReactive) {
      reset({
        name: editedReactive.name,
        code: editedReactive.code,
        formula: editedReactive.formula,
        quantity: editedReactive.quantity,
        minimumQuantity: editedReactive.minimumQuantity,
        type: editedReactive.type,
        house: editedReactive.house,
        measureUnit: editedReactive.measureUnit,
        status: editedReactive.status,
        riskTypes: editedReactive.riskTypes,
        safetySheetExpiration:
          editedReactive.safetySheetExpiration.split("T")[0],
      });
    }
  }, [editedReactive, reset]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const parentHousesData = await getParentHousesAction();
      const transformedParentHouses = parentHousesData.map((item) => ({
        value: String(item.parentHouseId),
        label: item.name,
      }));
      setParentHouses(transformedParentHouses);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleTypeChange = (value: string) => {
    setValue("type", value as ReactiveType, { shouldValidate: true });
  };

  const handleMeasureUnitChange = (value: string) => {
    setValue("measureUnit", value as Unit, { shouldValidate: true });
  };

  const handleHouseChange = (value: string) => {
    setValue("house", Number(value), { shouldValidate: true });
  };

  const handleStatusChange = (value: string) => {
    setValue("status", value as Status, { shouldValidate: true });
  };

  const handleRiskTypesChange = (value: string[]) => {
    setValue("riskTypes", value as RiskType[], { shouldValidate: true });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-10 w-10 animate-spin text-blue" />
      </div>
    );
  }

  return (
    <div className="container">
      <Card className="max-w-[45rem] border-l-4 border-l-blue border-r-0 border-t-0 border-b-0 rounded-l-none shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue/10 to-transparent pb-6">
          <div className="flex items-center gap-3">
            <FlaskConical className="h-6 w-6 text-blue" />
            <CardTitle className="text-blueDark text-2xl">
              Información del Reactivo
            </CardTitle>
          </div>
          <CardDescription className="text-blueDark/70 mt-2">
            {editedReactive
              ? "Modifique los campos que desea editar"
              : "Complete todos los campos requeridos para agregar el reactivo."}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6 px-8">
          <form
            className="grid grid-cols-1 xl:grid-cols-2 items-start justify-center gap-5"
            onSubmit={handleSubmit((data) => {
              // Si estamos editando, usamos la acción de actualización
              if (editedReactive?.reactiveId) {
                handleUpdateReactive(editedReactive.reactiveId, data);
              } else {
                handleCreateReactive(data);
              }
            })}
          >
            <FormField
              id="name"
              label="Nombre"
              type="text"
              tooltipText="Nombre del reactivo"
              placeholder="Ingrese el nombre del reactivo"
              register={register("name")}
              error={errors.name?.message}
              className="col-span-1 xl:col-span-2"
            ></FormField>

            <FormField
              id="code"
              label="Código"
              type="text"
              tooltipText="Código del reactivo"
              placeholder="Ingrese el código del reactivo"
              register={register("code")}
              error={errors.code?.message}
            ></FormField>

            <SelectField
              id="type"
              label="Tipo"
              defaultValue={editedReactive?.type}
              tooltipText="Tipo del reactivo"
              options={ReactiveTypes}
              placeholder="Seleccione el tipo del reactivo"
              onValueChange={handleTypeChange}
              error={errors.type?.message}
            ></SelectField>

            <FormField
              id="formula"
              label="Fórmula"
              type="text"
              tooltipText="Fórmula del reactivo"
              placeholder="Ingrese la fórmula del reactivo"
              register={register("formula")}
              error={errors.formula?.message}
            ></FormField>

            <FormField
              id="quantity"
              label="Cantidad"
              type="number"
              tooltipText="Cantidad del reactivo"
              placeholder="Ingrese la cantidad del reactivo"
              register={register("quantity")}
              error={errors.quantity?.message}
            ></FormField>

            <SelectField
              id="measureUnit"
              label="Unidad"
              defaultValue={editedReactive?.measureUnit}
              tooltipText="Unidad de medida"
              options={QuantityUnits}
              placeholder="Seleccione la unidad de medida"
              onValueChange={handleMeasureUnitChange}
              error={errors.measureUnit?.message}
            ></SelectField>

            <FormField
              id="minimumQuantity"
              label="Cantidad mínima"
              type="number"
              tooltipText="Cantidad mínima del reactivo"
              placeholder="Ingrese la cantidad mínima del reactivo"
              register={register("minimumQuantity")}
              error={errors.minimumQuantity?.message}
            ></FormField>

            <SelectField
              id="house"
              label="Casa matriz"
              defaultValue={editedReactive?.house.toString()}
              tooltipText="Casa matriz del reactivo"
              options={parentHouses}
              placeholder="Seleccione una casa matriz"
              onValueChange={handleHouseChange}
              error={errors.house?.message}
            ></SelectField>

            <SelectField
              id="status"
              label="Estado"
              defaultValue={editedReactive?.status}
              tooltipText="Estado del reactivo"
              options={StatusTypes}
              placeholder="Seleccione el estado del reactivo"
              onValueChange={handleStatusChange}
              error={errors.status?.message}
            ></SelectField>

            <div>
              <FormField
                id="safetySheet"
                label="Hoja de seguridad"
                type="file"
                tooltipText="Adjunte la hoja de seguridad del reactivo (PDF o imagen)"
                placeholder="Seleccione un archivo"
                onFileChange={(file) => {
                  if (file) {
                    setValue("safetySheet", file, { shouldValidate: true });
                  }
                }}
                error={errors.safetySheet?.message}
              />

              {editedReactive?.safetySheet && (
                <p className="text-xs text-amber-700 mt-2 bg-amber-50 p-2 rounded text-balance">
                  Este reactivo ya tiene una hoja de seguridad registrada (
                  <a
                    href={editedReactive.safetySheet}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue underline"
                  >
                    {editedReactive.safetySheet.split("/").pop()}
                  </a>
                  ). Para guardar cambios debe volver a subir el archivo
                  actualizado o el mismo.
                </p>
              )}
            </div>

            <FormField
              id="safetySheetExpiration"
              label="Fecha de expiración de la HS"
              type="date"
              placeholder="Seleccione la fecha de expiración"
              tooltipText="Seleccione la fecha de expiración de la hoja de seguridad"
              register={register("safetySheetExpiration")}
              error={errors.safetySheetExpiration?.message}
            ></FormField>

            <MultipleSelectField
              id="riskTypes"
              label="Riesgos del reactivo"
              defaultValues={editedReactive?.riskTypes}
              tooltipText="Seleccione todos los riesgos que apliquen"
              options={RiskTypes}
              placeholder="Seleccione los riesgos del reactivo"
              onValueChange={handleRiskTypesChange}
              error={errors.riskTypes?.message}
              classname="col-span-1 xl:col-span-2"
            ></MultipleSelectField>

            <div className="pt-4 flex gap-4 justify-center">
              <Button type="submit" variant={"default"} disabled={isSubmitting}>
                <ClipboardCheck className="h-4 w-4 mr-2" />
                {isSubmitting
                  ? editedReactive
                    ? "Editando..."
                    : "Agregando..."
                  : editedReactive
                  ? "Editar reactivo"
                  : "Crear reactivo"}
              </Button>
              <Button
                type="button"
                variant={"delete"}
                className="w-2/4"
                onClick={handleCancel}
              >
                <Ban className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
