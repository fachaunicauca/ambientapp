"use server";

import { cookies } from "next/headers";
import axios, { AxiosError } from "axios";
import { ErrorResponse, LoginResponse } from "./responseType";

const API_URL = process.env.NEXT_PUBLIC_API_AUTH_BASE_URL;

/*export interface LoginData {
  userId: string,
  username: string,
  email: string,
  fullName: string,
  roles: string[],
  access_token: string,
  refresh_token: string,
  expires_in: number
}*/

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

    if (apiResponse.status == 401) {
      return {
        success: false,
        action: "login",
        error: "Credenciales incorrectas. Intente de nuevo.",
        field: "root",
      };
    }

    // Obtener el token de la respuesta
    const access_token = apiResponse.data.access_token;
    const refresh_token = apiResponse.data.refresh_token;

    /*const authStore = useAuthStore.getState();
    authStore.setToken(access_token); // guardar en Zustand
    authStore.setProfile({
      _id: apiResponse.data.userId,
      email: apiResponse.data.email,
      name: apiResponse.data.fullName,
      roles: apiResponse.data.roles,
      //createdAt: new Date(),
      //updatedAt: new Date(),
      //__v: 0
    });*/

    (await cookies()).set({
      name: "auth-token",
      value: access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: "/",
    });

    (await cookies()).set({
      name: "refresh-token",
      value: refresh_token,
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
        user: {
          id: apiResponse.data.userId,
          email: apiResponse.data.email,
          name: apiResponse.data.fullName,
        },
        token: access_token,
        roles: apiResponse.data.roles,
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
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("auth-token")?.value;

    if (!API_URL) {
      return {
        success: false,
        error: "API_URL no está definida en el entorno",
      };
    }

    if (refreshToken) {
      // Enviar la solicitud de cierre de sesión a la API
      await axios.post(
        `${API_URL}/auth/logout`,
        { refresh_token: refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    
    // Eliminar la cookie
    (await cookies()).delete("auth-token");
    (await cookies()).delete("refresh-token");

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
