import "./globals.css";
import { openSans } from "@/utils/fonts";
import { metadata } from "@/utils/metadata";
import { Toaster } from "@/components/ui/feedback/sonner"

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.className}`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
