/**
 * Interfaces para manejar credenciales guardadas
 */
export interface SavedCredentials {
    email: string;
    password: string;
    expiry: number;
}

const STORAGE_KEY = "rememberedAuth";

/**
 * Guarda las credenciales en localStorage con expiración
 */
export function saveCredentials(email: string, password: string): void {
    const expiryDate = Date.now() + (30 * 24 * 60 * 60 * 1000); // 30 días en milisegundos

    const credentials: SavedCredentials = {
        email,
        password,
        expiry: expiryDate
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
}

/**
 * Carga las credenciales guardadas si existen y no han expirado
 * @returns Las credenciales guardadas o null si no existen o han expirado
 */
export function loadCredentials(): SavedCredentials | null {
    try {
        const savedAuth = localStorage.getItem(STORAGE_KEY);

        if (!savedAuth) return null;

        const credentials: SavedCredentials = JSON.parse(savedAuth);

        // Verificar si las credenciales no han expirado
        if (credentials.expiry > Date.now()) {
            return credentials;
        } else {
            // Limpiar credenciales expiradas
            clearCredentials();
            return null;
        }
    } catch (error) {
        console.error("Error al cargar credenciales guardadas:", error);
        clearCredentials();
        return null;
    }
}

/**
 * Elimina las credenciales guardadas
 */
export function clearCredentials(): void {
    localStorage.removeItem(STORAGE_KEY);
}