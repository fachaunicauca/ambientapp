import { cookies } from "next/headers";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_TEST_BASE_URL;

export const microsApiServer = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  const instance = axios.create({
    baseURL,
    withCredentials: true,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  return instance;
};
