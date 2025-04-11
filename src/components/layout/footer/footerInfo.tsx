import FooterLegal from "./footerLegal";

export default function FooterInfo() {
    return (
        <div className="flex flex-col gap-20 md:gap-0 justify-between h-full md:h-80 bg-[#eeebeb] text-blue p-8 md:px-20 md:pt-10 md:pb-4">
            <div className="flex justify-between flex-col md:flex-row gap-20">
                <div className="flex flex-col font-titillium-web">
                    <span className="text-xl md:text-3xl font-bold">Universidad del Cauca</span>
                    <span className="text-sm md:text-lg font-semibold">NIT. 891500319-2</span>
                </div>

                <div className="flex gap-5 h-16 items-center text-xs md:text-sm">
                    <div className="flex flex-col gap-2 items-start md:items-end">
                        <p>Oficina de Relaciones Interinstitucionales e Internacionales</p>
                        <p>Vicerrectoría</p>
                        <p>orii@unicauca.edu.co</p>
                    </div>
                    <div className="border border-blue h-full"></div>

                    <div className="flex flex-col gap-2">
                        <span>División de Tecnologías de la Información y las Comunicaciones - TIC</span>
                        <span>Version 1.0</span>
                        <span>2025</span>
                    </div>
                </div>
            </div>
            <FooterLegal />
        </div>
    );
}
