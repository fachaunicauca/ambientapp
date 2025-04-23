"use client";

import { Loader2 } from "lucide-react";
import { PracticeTableProps } from "@/types/practiceType";
import { PracticeEducator } from "@/interface/educator";
import React, { useState, useEffect } from "react";

export default function PracticeTable({
    practices,
    isLoading,
    emptyMessage,
    columns,
}: PracticeTableProps) {
    const [localPractices, setLocalPractices] = useState<PracticeEducator[]>(practices);

    useEffect(() => {
        setLocalPractices(practices);
    }, [practices]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-10">
                <Loader2 className="h-10 w-10 animate-spin text-blue" />
            </div>
        );
    }

    return (
        <div className="overflow-hidden overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
                <thead className="bg-muted">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={String(column.key)}
                                className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue"
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {localPractices.length > 0 ? (
                        localPractices.map((practice) => (
                            <tr key={practice.practiceName} className="hover:bg-muted/50">
                                {columns.map((column) => (
                                    <td
                                        key={`${practice.practiceName}-${String(column.key)}`}
                                        className={
                                            column.key === ("description" as keyof PracticeEducator)
                                                ? "px-4 py-3 max-w-xs truncate"
                                                : "px-4 py-3"
                                        }
                                        title={
                                            column.key === ("description" as keyof PracticeEducator)
                                                ? String(practice[column.key])
                                                : undefined
                                        }
                                    >
                                        {String(practice[column.key])}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="px-4 py-3 text-center">
                                {emptyMessage}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}