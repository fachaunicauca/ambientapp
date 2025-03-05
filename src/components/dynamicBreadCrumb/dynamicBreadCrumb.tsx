'use client';

import { usePathname } from "next/navigation";
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { routeList } from "@/components/dynamicBreadCrumb/routeList";
import { JSX } from "react";

export default function DynamicBreadCrumb() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(segment => segment && segment !== "dashboard");
    const breadcrumbItems: JSX.Element[] = [];
    
    if (pathname !== '/dashboard/home') {
        breadcrumbItems.push(
            <BreadcrumbItem key="/home">
                <BreadcrumbLink asChild>
                    <Link href="/dashboard/home">{routeList['/dashboard/home'] || 'Inicio'}</Link>
                </BreadcrumbLink>
            </BreadcrumbItem>
        );
        if (segments.length > 0) {
            breadcrumbItems.push(<BreadcrumbSeparator key="sep-home" />);
        }
    }

    segments.forEach((segment, index) => {
        const displaySegments = segments.slice(0, index + 1);
        const navigationPath = `/dashboard/${displaySegments.join("/")}`;
        const label = routeList[navigationPath] || decodeURIComponent(segment);
        const isLast = index === segments.length - 1;

        breadcrumbItems.push(
            <BreadcrumbItem key={navigationPath}>
                {isLast ? (
                    <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                    <BreadcrumbLink asChild>
                        <Link href={navigationPath}>{label}</Link>
                    </BreadcrumbLink>
                )}
            </BreadcrumbItem>
        );

        if (!isLast) {
            breadcrumbItems.push(<BreadcrumbSeparator key={`sep-${navigationPath}`} />);
        }
    });

    return <>{breadcrumbItems}</>;
}