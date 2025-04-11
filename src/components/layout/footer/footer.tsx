export default function Footer() {
    return (
        <>
            <div className="flex justify-center w-full">
                <header className="border-b md:border-b-2 border-blue w-2/3 md:w-1/2" />
            </div>
            <div className="flex flex-col items-center justify-center pt-2 md:pt-3 text-center text-xs text-blue">
                <span>
                    2025 | Sistema de gestión de movilidad ORII | Vicerrectoría
                </span>
                <span className="mt-2">
                    División de Tecnologías de la Información y las Comunicaciones | Versión 1.0.0
                </span>
            </div>
        </>
    );
}