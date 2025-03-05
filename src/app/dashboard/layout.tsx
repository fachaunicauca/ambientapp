import MainLayout from "@/components/mainLayout/mainLayout";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <MainLayout>{children}</MainLayout>;
}