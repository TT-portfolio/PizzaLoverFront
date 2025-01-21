import { ApiItem, ApiResponse } from "@/types/api";

// Funktion för att hämta lista med innehåll baserat på contentType
export async function fetchContentFromApi(contentType: string): Promise<ApiItem[] | null> {
    try {
        const res = await fetch(
            `https://pizzalover-g7fnhxctfsfbe6c7.westeurope-01.azurewebsites.net/umbraco/delivery/api/v1/content?contentType=${contentType}`
        );
        if (!res.ok) throw new Error("Failed to fetch content");
        const json: ApiResponse = await res.json();
        return json.items || [];
    } catch (err) {
        console.error("Error fetching content:", err);
        return null;
    }
}

// Funktion för att hämta en specifik item baserat på contentType och id
export async function fetchSingleContentFromApi(contentType: string, id: string): Promise<ApiItem | null> {
    try {
        const res = await fetch(
            `https://pizzalover-g7fnhxctfsfbe6c7.westeurope-01.azurewebsites.net/umbraco/delivery/api/v1/content/${id}?contentType=${contentType}`
        );
        if (!res.ok) throw new Error("Failed to fetch single content");
        const json: ApiItem = await res.json();
        return json || null;
    } catch (err) {
        console.error("Error fetching single content:", err);
        return null;
    }
}  //Kan lägga till för att hämta meny, pris m.m. Eller lägga i egen service
