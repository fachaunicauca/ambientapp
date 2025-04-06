import {
  QuantityUnits,
  ReactiveTypes,
  RiskTypes,
} from "@/config/inventaryConfig";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import FormField from "./formField";
import SelectField from "./selectField";
import MultipleSelectorField from "./multipleSelectorField";
import FormActions from "./formActions";

export default function InventaryForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información del Reactivo</CardTitle>
        <CardDescription>
          Complete todos los campos requeridos para agregar el reactivo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action="" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              id="reactiveName"
              label="Nombre"
              type="text"
              tooltipText="Nombre del reactivo"
              placeholder="Ingrese el nombre del reactivo"
            ></FormField>

            <FormField
              id="reactiveCode"
              label="Código"
              type="text"
              tooltipText="Código del reactivo"
              placeholder="Ingrese el código del reactivo"
            ></FormField>

            <SelectField
              id="reactiveType"
              label="Tipo"
              tooltipText="Tipo del reactivo"
              options={ReactiveTypes}
              placeholder="Seleccione el tipo del reactivo"
            ></SelectField>

            <FormField
              id="reactiveFormula"
              label="Fórmula"
              type="text"
              tooltipText="Fórmula del reactivo"
              placeholder="Ingrese la fórmula del reactivo"
            ></FormField>

            <div className="row-span-3">
              <MultipleSelectorField
                id="reactiveRisk"
                label="Riesgos"
                tooltipText="Riesgos del reactivo"
                options={RiskTypes}
              ></MultipleSelectorField>
            </div>

            <FormField
              id="reactiveQuantity"
              label="Cantidad"
              type="number"
              tooltipText="Cantidad del reactivo"
              placeholder="Ingrese la cantidad del reactivo"
            ></FormField>

            <SelectField
              id="reactiveUnid"
              label="Unidad"
              tooltipText="Unidad de medida"
              options={QuantityUnits}
              placeholder="Seleccione la unidad de medida"
            ></SelectField>

            <SelectField
              id="reactiveParentHouse"
              label="Casa matriz"
              tooltipText="Casa matriz del reactivo"
              options={QuantityUnits}
              placeholder="Seleccione una casa matriz"
            ></SelectField>


            <FormActions></FormActions>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
