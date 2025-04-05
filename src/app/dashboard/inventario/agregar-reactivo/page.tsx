import InventaryForm from "@/components/inventary-components/inventaryForm";
import Title from "@/components/ui/title";

export default function AgregarReactivo() {
  return (
    <>
      <div className="mb-8 mx-10">
        <Title title="Agregar reactivo"/>
        <p className="text-muted-foreground mt-3 mb-5">
          A continuación podrá agregar un reactivo en el sistema. Por favor
          verifique que la información ingresada es correcta e ingrese todos los
          campos.
        </p>
        <InventaryForm></InventaryForm>
      </div>
    </>
  );
}
