import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const baseURL = process.env.NEXT_PUBLIC_API_URL

const authApi = axios.create({
    baseURL,
    withCredentials: true,
});

authApi.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
});

export default authApi;