import MainLayout from "@/components/layout/mainLayout";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <MainLayout>
            {children}
        </MainLayout>
    );
}