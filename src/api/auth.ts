'use server';

import { User } from "@/interface/user";
import axios from "@/lib/axios";

export const loginRequest = async (email: string, password: string) => {
    try {
        return axios.post("/api/auth/login", {
            email,
            password,
        });
    } catch (error) {
        console.error("Error en loginRequest:", error);
        throw error;
    }
};

export const registerRequest = async (data: User) =>
    axios.post("/api/auth/register", data);

export const profileRequest = async () => axios.get("/api/auth/profile");