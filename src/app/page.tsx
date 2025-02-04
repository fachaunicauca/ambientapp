import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex gap-5 w-full h-screen p-5">
      <div className="flex flex-col gap-3 items-center justify-center w-1/2 border-r-2 border-blueDark">
        <h1 className="text-2xl font-bold text-blueDark">
          Pasantia Ambiental
        </h1>
        <Button
          className="px-5 py-2 rounded-3xl"
        >
          Login
        </Button>
      </div>
      <div className="bg-blueDark rounded-3xl w-1/2 flex items-center justify-center">
        <Image
          src={"/ambiental.png"}
          alt="Pasantia Ambiental"
          height={500}
          width={500}
          className="rounded-3xl"
        />
      </div>
    </div>
  );
}
