import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import LayoutSidebar from "@/components/sidebar/layout-sidebar";
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex w-full">
            <LayoutSidebar>
                <div className="flex flex-col flex-1 w-full">
                    <div className="pt-4 px-4 w-full">
                        <Header />
                    </div>
                    <div className="flex-1 px-4 w-full">
                        {children}
                    </div>
                    <div className="p-4 w-full">
                        <Footer />
                    </div>
                </div>
            </LayoutSidebar>
        </div>
    );
}
