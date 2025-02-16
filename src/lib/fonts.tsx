import { Titillium_Web } from "next/font/google";
import { Open_Sans } from "next/font/google";

export const titilliumWeb = Titillium_Web({
    variable: "--font-titillium-web",
    subsets: ["latin"],
    weight: ["200", "300", "400", "600", "700", "900"],
});

export const openSans = Open_Sans({
    variable: "--font-open-sans",
    subsets: ["latin"],
    weight: ["300", "400", "600", "700", "800"],
});