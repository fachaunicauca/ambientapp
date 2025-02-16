"use client";

import ParticlesBackground from "./background/background";
import InfoContent from "./content/content";

export default function InfoSection() {

    return (
        <div className="relative w-[70%] overflow-hidden bg-[url('/bg.svg')] bg-cover">
            <ParticlesBackground />
            <InfoContent />
        </div>
    );
}