"use server";

import { cookies } from "next/headers";
import axios, { AxiosError } from "axios";
import { ErrorResponse, LoginResponse } from "./responseType";

const API_URL = process.env.NEXT_PUBLIC_API_AUTH_BASE_URL;

export async function loginAction(data: {
  email: string;
  password: string;
}): Promise<LoginResponse> {
  try {
    // Verificar si la URL de la API está definida
    if (!API_URL) {
      return {
        success: false,
        action: "login",
        error: "API_URL no está definida en el entorno",
        field: "root",
      };
    }

    // Realizar la solicitud a la API
    const apiResponse = await axios.post(`${API_URL}/auth/login`, {
      //action: "login",
      username: data.email,
      password: data.password,
    });

    // Obtener el token de la respuesta
    const apiToken = apiResponse.data.token || apiResponse.data.access_token;

    if (!apiToken) {
      return {
        success: false,
        action: "login",
        error: "Credenciales incorrectas. Intente de nuevo.",
        field: "root",
      };
    }

    // Establecer la cookie usando la API de cookies de Next.js
    (await cookies()).set({
      name: "auth-token",
      value: apiToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: "/",
    });

    // Devolver la respuesta exitosa
    return {
      success: true,
      action: "login",
      data: {
        ...apiResponse.data,
        token: apiToken,
      },
    };
  } catch (error) {
    const axiosError = error as AxiosError;

    // Manejo de errores específicos
    let field: "email" | "password" | "root" = "root";
    let errorMessage = "Error al iniciar sesión. Inténtelo nuevamente.";

    if (axiosError.response?.status === 401) {
      errorMessage = "Credenciales incorrectas. Intente de nuevo.";
      const responseData = axiosError.response?.data as ErrorResponse;

      if (
        responseData?.detail?.includes("email") ||
        responseData?.message?.includes("email") ||
        responseData?.error?.includes("email")
      ) {
        field = "email";
      } else if (
        responseData?.detail?.includes("password") ||
        responseData?.message?.includes("password") ||
        responseData?.error?.includes("password")
      ) {
        field = "password";
      }
    }

    // Devolver la respuesta de error
    return {
      success: false,
      action: "login",
      error: errorMessage,
      field: field,
    };
  }
}

export async function logoutAction(): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    // Eliminar la cookie
    (await cookies()).delete("auth-token");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return {
      success: false,
      error: "Error al cerrar sesión",
    };
  }
}
