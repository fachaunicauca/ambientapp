import { PracticeEducator } from "./educator";

export interface ApiResponse {
    success: boolean;
    message: string;
    data?: PracticeEducator;
    error?: string;
    field?: string;
    statusCode?: number;
}
