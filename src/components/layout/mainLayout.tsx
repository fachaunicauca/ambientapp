"use client";

import React, { ReactNode } from 'react';
import Footer from '@/components/layout/footer/footer';
import Header from "@/components/layout/header/header";
import LayoutSidebar from "@/components/sidebar/layout-sidebar";

const MemoizedLayoutSidebar = React.memo(LayoutSidebar);
const MemoizedHeader = React.memo(Header);
const MemoizedFooter = React.memo(Footer);

export default function MainLayout({ children }: { children: ReactNode }) {

    return (
        <div className="flex w-full">
            <MemoizedLayoutSidebar>
                <div className="flex flex-col flex-1 w-full">
                    <div className="pt-4 px-4 w-full">
                        <MemoizedHeader />
                    </div>
                    <div className="flex-1 px-4 w-full">
                        {children}
                    </div>
                    <div className="p-4 w-full">
                        <MemoizedFooter />
                    </div>
                </div>
            </MemoizedLayoutSidebar>
        </div>
    );
}