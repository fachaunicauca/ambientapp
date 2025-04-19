import { PracticeEducator } from "@/interface/educator";
import axios from "axios";

const EDUCATOR_API_BASE_URL = process.env.EDUCATOR_API_URL;
const PRACTICE_API_ENDPOINT = `${EDUCATOR_API_BASE_URL}/EducatorApi/Practice`;

export const getPractices = async (): Promise<{ data: PracticeEducator }> => {
    return await axios.post(`${PRACTICE_API_ENDPOINT}/ListPractice`);
}

export const createPractice = async (practice: PracticeEducator): Promise<{ data: PracticeEducator }> => {
    return await axios.post(`${PRACTICE_API_ENDPOINT}/CreatePractice`, practice);
}