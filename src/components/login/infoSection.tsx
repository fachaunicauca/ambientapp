import Image from "next/image";

export default function InfoSection() {
    return (
        <div className="bg-[url('/bg.svg')] bg-cover rounded-xl flex flex-col gap-2 w-4/5">
            <div className="flex flex-col gap-5 p-6 items-center justify-center">
                <Image src={"/u.png"} alt="Logo" height={200} width={200} />
            </div>
        </div>
    );
}