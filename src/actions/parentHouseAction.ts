"use server";

import { ParentHouseProps } from "@/types/inventaryTypes";
import microsApi from '@/lib/axios';

export async function getParentHousesAction(): Promise<ParentHouseProps[]> {
    try {
        const response = await microsApi.get(`/parent-house`);
        return response.data;
    } catch (error) {
        console.log("Error al obtener las casas matrices: ", error);
        return [];
    }
}