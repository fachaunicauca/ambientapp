import { NextResponse } from "next/server";

export async function middleware(request: NextResponse) {
    const token = request.cookies.get("auth-token");

    if (!token) return NextResponse.redirect(new URL("/", request.url)); // si el token no existe, mantener al usuario en la página de inicio de sesión

    try {
        return NextResponse.next();
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: ["/dashboard/:path*"],
};