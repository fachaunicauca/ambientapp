import Image from "next/image";

export default function LogoU ({ width, height }: { width: number, height: number }) {
    return (
        <Image
            src={"/logoUniversidad.svg"}
            alt="Logo"
            height={height}
            width={width}
        />
    )
}