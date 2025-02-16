import MainFooter from "../mainFooter/mainFooter";

export default function Footer() {
    return (
        <div className="flex flex-col justify-between h-80 bg-security text-[#73737e] p-8">
            <div className="flex justify-between">
                <div className="flex flex-col gap-3 font-bold">
                    <span className="text-2xl">Universidad del Cauca</span>
                    <span>NIT. 891500319-2</span>
                </div>

                <div className="flex gap-5 h-16 items-center text-sm">
                    <div className="flex flex-col gap-2 items-end">
                        <p>Laboratorio de ingenieria ambiental y sanitaria</p>
                        <p>Vicerrectoría</p>
                        <p>d-civil@unicauca.edu.co</p>
                    </div>
                    <div className="border border-[#73737e] h-full"></div>
                    
                    <div className="flex flex-col gap-2">
                        <span>División de Tecnologías de la Información y las Comunicaciones - TIC</span>
                        <span>Version 1.0</span>
                        <span>2025</span>
                    </div>
                </div>
            </div>
            <MainFooter />
        </div>

    );
}
