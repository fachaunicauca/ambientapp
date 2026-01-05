export function parseStructure<T>(structure: string): T | null {
    try {
        return JSON.parse(structure) as T;
    } catch {
        return null;
    }
}
