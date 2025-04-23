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
import {
  ReactiveFormValues,
  reactiveSchema,
} from "@/validations/reactiveSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useReactiveFormHandlers } from "@/handlers/reactiveHandlers";
import { Button } from "../ui/button";
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

  const { handleCreateReactive, handleCancel, isSubmitting } =
    useReactiveFormHandlers();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ReactiveFormValues>({
    resolver: zodResolver(reactiveSchema),
    defaultValues: {
      name: editedReactive?.name,
      code: editedReactive?.code,
      formula: editedReactive?.formula,
      quantity: editedReactive?.quantity,
      minimumQuantity: editedReactive?.minimumQuantity,
      safetySheet: editedReactive?.safetySheet,
    },
  });

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
      <Card className="w-full border-l-4 border-l-blue border-r-0 border-t-0 border-b-0 rounded-l-none shadow-md">
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
            className="space-y-6"
            onSubmit={handleSubmit(handleCreateReactive)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                id="name"
                label="Nombre"
                type="text"
                tooltipText="Nombre del reactivo"
                placeholder="Ingrese el nombre del reactivo"
                register={register("name")}
                error={errors.name?.message}
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <FormField
                id="safetySheet"
                label="Hoja de seguridad"
                type="text"
                tooltipText="Hoja de seguridad del reactivo"
                placeholder="Ingrese la hoja de seguridad del reactivo"
                register={register("safetySheet")}
                error={errors.safetySheet?.message}
              ></FormField>
            </div>

            <div>
              <MultipleSelectField
                id="riskTypes"
                label="Riesgos del reactivo"
                defaultValues={editedReactive?.riskTypes}
                tooltipText="Seleccione todos los riesgos que apliquen"
                options={RiskTypes}
                placeholder="Seleccione los riesgos del reactivo"
                onValueChange={handleRiskTypesChange}
                error={errors.riskTypes?.message}
              ></MultipleSelectField>
            </div>

            <div className="pt-4 flex gap-4 justify-center">
              <Button type="submit" variant={"default"} disabled={isSubmitting}>
                <ClipboardCheck className="h-4 w-4 mr-2" />
                {isSubmitting ? "Creando..." : "Crear convenio"}
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
