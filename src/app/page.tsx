import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

export default function Home() {
  return (
    <div className="flex gap-2 w-full h-screen p-2">
      <div className="flex flex-col gap-3 items-center justify-center w-1/2">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl text-blueDark font-bold text-center">
            Laboratorio de Ingeniería Ambiental y Sanitaria
          </h1>
        </div>
        <div className="flex flex-col gap-3 w-1/2 py-36">
          <Input placeholder="Usuario" />
          <PasswordInput placeholder="Contraseña" />
          <div className="flex items-center space-x-2 pb-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Recordar por 30 días
            </label>
          </div>
          <Button className="px-5 py-2 rounded-3xl mt-2">Iniciar Sesión</Button>
          <p className="text-gray-700 text-center">
            ó
          </p>
          <Button className="flex gap-2 px-5 py-2 rounded-3xl bg-red-500 text-blueDark hover:text-white group transition-all duration-500">
            <Image src="/google.svg" alt="Google" height={20} width={20} className="block group-hover:hidden" />
            <Image src="/googlewhite.svg" alt="Google" height={20} width={20} className="hidden group-hover:block" />
            <h1>Iniciar Sesión con Google</h1>
          </Button>
        </div>
      </div>
      <div className="bg-[url('/bg.svg')] bg-cover rounded-xl flex flex-col gap-2 w-4/5">
        <div className="flex flex-col gap-5 p-6 items-center justify-center">
          <Image src={"/u.png"} alt="Logo" height={200} width={200} />
        </div>
      </div>
    </div>
  );
}
