import Image from "next/image";
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-10">
      <h1 className="text-6xl font-bold">
        Ambientapp
      </h1>
      <p>Pasantía Empresarial para el Desarrollo de una Plataforma Tecnológica en el Departamento de Ingeniería Ambiental de la FIC</p>
      <Image
        src="/ambiental.png"
        alt="Ambientapp"
        width={200}
        height={200}
      />
      <Link href="/login">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
      </Link>
      <Link href="/docente">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Docente
        </button>
      </Link>
    </div>
  );
}
