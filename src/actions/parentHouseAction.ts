'use server'

import { ParentHouseProps } from "@/types/inventaryTypes";
import axios from "axios";

const apiUrl = process.env.INVENTORY_API_URL;

export async function getParentHousesAction(): Promise<ParentHouseProps[]> {
    try {
        const response = await axios.get(`${apiUrl}/parent-house`);
        return response.data;
    } catch (error) {
        console.log("Error al obtener las casas matrices: ", error);
        return [];
    }
}