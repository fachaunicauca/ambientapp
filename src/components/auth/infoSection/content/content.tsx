import Image from "next/image";
import SplitText from "@/components/splitText/splitText";

export default function InfoContent() {
    return (
        <div className="relative z-10 flex gap-12 p-6 items-center justify-center animate-slide-down">
            <Image src={"/u.png"} alt="Logo" height={180} width={180} />
            <SplitText
                text="Sistema de gestión ambiental"
                className="text-2xl font-semibold text-center text-white animate-slide-down"
                delay={80}
                animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                easing="easeOutCubic"
                threshold={0.2}
                rootMargin="-50px"
            />
        </div>
    );
}