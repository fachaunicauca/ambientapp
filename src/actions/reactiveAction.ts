"use server";

import { ReactiveProps } from "@/types/inventaryTypes";
import { ReactiveFormValues } from "@/validations/reactiveSchema";
import microsApi from '@/lib/axios';

interface PromiseSuccess {
    success: boolean;
    error?: string;
    field?: string,
}

export async function getReactivesAction(): Promise<ReactiveProps[]> {
    try {
        const response = await microsApi.get(`/reactive`);
        return response.data;
    } catch (error) {
        console.log("Error al obtener los reactivos: ", error);
        return [];
    }
}

export async function getReactiveAction(id: string): Promise<ReactiveProps> {
    try {
        const response = await microsApi.get(`/reactive/${id}`)
        return response.data;
    } catch (error) {
        console.log("Error al obtener el reactivo con: ", error)
        throw new Error("No se pudo obtener el reactivo");
    }
}

export async function postReactiveAction(data: ReactiveFormValues): Promise<PromiseSuccess> {
    try {
        console.log("Datos enviados:", JSON.stringify(data, null, 2));
        await microsApi.post(`/reactive`, data);
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

