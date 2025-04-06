import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function LoginHeader () {
    return (
        <div className="flex items-center gap-2 h-[50px]">
            <Image
                src="/u blue.png"
                alt="Logo"
                width={50}
                height={50}
            />
            <div className="border border-blue h-full"></div>
            <Label>Sistema de gestión ambiental</Label>
        </div>
    )
}