import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import LabeledInput from "@/components/ui/labeledInput";
import LoginHeader from "./header/header";

export default function LoginForm() {

    return (
        <div className="flex flex-col items-center gap-3 w-full md:w-1/2">
            <div className="w-full p-2">
                <LoginHeader />
            </div>
            <div className="flex flex-col justify-center items-center w-full h-full py-10 md:py-0">
                <div className="flex flex-col items-start w-1/2">
                    <h1 className="text-3xl text-blue font-bold">
                        Inicio de sesión
                    </h1>
                </div>
                <form className="flex flex-col gap-3 w-1/2 py-10">
                    <LabeledInput
                        label="Correo institucional"
                        id="email"
                        placeholder="Correo institucional"
                        required
                    />
                    <LabeledInput
                        label="Contraseña"
                        id="password"
                        placeholder="Contraseña"
                        type="password"
                        required
                    />
                    <div className="flex items-center space-x-2 pb-2">
                        <Checkbox id="terms" />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Recordar por 30 días
                        </label>
                    </div>
                    <Button variant="default" type="submit">
                        Iniciar sesión
                    </Button>
                    <span className="text-gray-700 text-center">ó</span>
                    <Link href="/home">
                        <Button variant="secondary" type="button">
                            <Image src="/google.svg" alt="Google" height={20} width={20} className="block group-hover:hidden" />
                            <Image src="/googlewhite.svg" alt="Google" height={20} width={20} className="hidden group-hover:block" />
                            <span className="text-[12px] md:text-sm">Iniciar sesión con Google</span>
                        </Button>
                    </Link>
                </form>
            </div>
        </div>
    );
}