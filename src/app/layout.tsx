import "./globals.css";
import { titilliumWeb } from "@/lib/fonts";
import { metadata } from "@/lib/metadata";

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${titilliumWeb.className} bg-slate-100`}
      >
        {children}
      </body>
    </html>
  );
}
