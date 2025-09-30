import { TestGuideRequest } from "../interfaces/guide-interfaces";

const baseUrl = process.env.NEXT_PUBLIC_API_TEST_BASE_URL

export const fetchFileData = async () => {
    try {
        
        if (!baseUrl) {
            throw new Error("La URL base no está definida en las variables de entorno.");
        }

        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Token no disponible");
        }

        const response = await fetch(`${baseUrl}/guides` ,
            {method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },}
        );
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data || !data.test_guide_list) {
            return { error: "No se encontraron preguntas." };
        }

        return { success: true, files: data.test_guide_list}

    } catch (error) {
        console.error("Error fetching file: ", error);
        return { error: "Error al obtener los datos del servidor." };
    }
};


export const uploadFile = async (guide: TestGuideRequest) => {
    try {
        if (!baseUrl) {
            throw new Error("La URL base no está definida.");
        }

        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Token no disponible.");
        }

        const formData = new FormData();
        formData.append("test_guide_id", guide.test_guide_id);
        formData.append("test_guide_archive", guide.test_guide_archive);

        const response = await fetch(`${baseUrl}/guides`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        return { success: true };

    } catch (error) {
        console.error("Error en uploadFile:", error);
        return { error: "Error al subir la guía al servidor." };
    }
};


export const deleteFile = async (fileName: string) => {
    try {
        if (!baseUrl) {
            throw new Error("La URL base no está definida.");
        }

        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Token no disponible.");
        }


        const response = await fetch(`${baseUrl}/guides?test_guide_id=${fileName}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        return { success: true };

    } catch (error) {
        console.error("Error en uploadFile:", error);
        return { error: "Error al subir la guía al servidor." };
    }
};