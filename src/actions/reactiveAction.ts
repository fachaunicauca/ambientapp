'use server'

import { ReactiveProps } from "@/types/inventaryTypes";
import { ReactiveFormValues } from "@/validations/reactiveSchema";
import axios from "axios";

const apiUrl = process.env.INVENTORY_API_URL;

interface PromiseSuccess {
    success: boolean;
    error?: string;
    field?: string,
}

export async function getReactivesAction(): Promise<ReactiveProps[]> {
    try {
        const response = await axios.get(`${apiUrl}/reactive`);
        return response.data;
    } catch (error) {
        console.log("Error al obtener los reactivos: ", error);
        return [];
    }
}

export async function getReactiveAction(id: string): Promise<ReactiveProps> {
    try {
        const response = await axios.get(`${apiUrl}/reactive/${id}`)
        return response.data;
    } catch (error) {
        console.log("Error al obtener el reactivo con: ", error)
        throw new Error("No se pudo obtener el reactivo");
    }
}

export async function postReactiveAction(data: ReactiveFormValues): Promise<PromiseSuccess> {
    try {
        console.log("Datos enviados:", JSON.stringify(data, null, 2));
        await axios.post(`${apiUrl}/reactive`, data);
        return {
            success: true,
        };
    } catch (error) {
        console.log("Error al crear el reactivo: ", error);
        return {
            success: false,
        }
    }
}

