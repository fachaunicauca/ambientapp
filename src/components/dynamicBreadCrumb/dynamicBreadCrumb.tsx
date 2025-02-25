'use client';

import { usePathname } from "next/navigation";
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { routeList } from "@/components/dynamicBreadCrumb/routeList";
import { JSX } from "react";

export default function DynamicBreadCrumb() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbItems: JSX.Element[] = [];
    
    if (pathname !== '/home') {
        breadcrumbItems.push(
            <BreadcrumbItem key="/home">
                <BreadcrumbLink asChild>
                    <Link href="/home">{routeList['/home'] || 'Inicio'}</Link>
                </BreadcrumbLink>
            </BreadcrumbItem>
        );
        if (segments.length > 0) {
            breadcrumbItems.push(<BreadcrumbSeparator key="sep-home" />);
        }
    }

    segments.forEach((segment, index) => {
        const currentPath = `/${segments.slice(0, index + 1).join("/")}`;
        const label = routeList[currentPath] || decodeURIComponent(segment);
        const isLast = index === segments.length - 1;

        breadcrumbItems.push(
            <BreadcrumbItem key={currentPath}>
                {isLast ? (
                    <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                    <BreadcrumbLink asChild>
                        <Link href={currentPath}>{label}</Link>
                    </BreadcrumbLink>
                )}
            </BreadcrumbItem>
        );

        if (!isLast) {
            breadcrumbItems.push(<BreadcrumbSeparator key={`sep-${currentPath}`} />);
        }
    });

    return <>{breadcrumbItems}</>;
}