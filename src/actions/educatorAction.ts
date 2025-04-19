'use server'

import { createPractice, getPractices } from "@/api/educator";
import { ApiResponse } from "@/interface/api";
import { PracticeEducator } from "@/interface/educator";

export async function fetchPractices(): Promise<ApiResponse> {
    try {
        await getPractices();
        return {
            success: true,
            message: "Practices fetched successfully",
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            success: false,
            message: "Error al obtener las prácticas",
        };
    }
}

export async function createPracticeAction(data: PracticeEducator): Promise<ApiResponse> {
    console.log("Creating practice with data:", data);
    
    try {
        await createPractice(data);
        return {
            success: true,
            message: "La práctica se ha creado correctamente",
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            success: false,
            message: "Error al crear la práctica",
        };
    }
}