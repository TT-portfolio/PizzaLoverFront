'use client'; 
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { fetchContentFromApi, fetchSingleContentFromApi } from "@/services/contentService";
import { ApiItem } from "@/types/api";

interface ContentContextType {
    fetchContent: (contentType: string) => Promise<ApiItem[] | null>; // Hämtar flera objekt baserat på contentType
    fetchSingleContent: (contentType: string, id: string) => Promise<ApiItem | null>; // Hämtar ett specifikt objekt baserat på contentType och id
    loading: boolean; // Anger om en API-förfrågan pågår
    error: string | null; // Felhatering vid API-anrop
}

// Skapar context-objektet med en undefined-typ
const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Definierar props för ContentProvider, där children är React-komponenter som kommer omslutas av denna provider
interface ContentProviderProps {
    children: ReactNode; // Komponent kickas in som barn till denna provider
}

// Skapar/exporterar ContentProvider,  hanterar API-logik och exponerar funktioner och state
export function ContentProvider({ children }: ContentProviderProps) {
    const [loading, setLoading] = useState(false); // State för att hantera laddningstillstånd
    const [error, setError] = useState<string | null>(null); // State för att hantera felmeddelanden

    // Funktion för att hämta flera objekt baserat på contentType
    const fetchContent = useCallback(async (contentType: string): Promise<ApiItem[] | null> => {
        setLoading(true); // Startar laddningsindikator
        setError(null); // Nollställer tidigare fel
        const data = await fetchContentFromApi(contentType); // Anropar fetchContentFromApi för att hämta data
        setLoading(false); // Stänger av laddningsindikator
        if (!data) setError("Failed to fetch content"); // Sätter felmeddelande om ingen data returneras
        return data;
    }, []);

    // Funktion för att hämta ett specifikt objekt baserat på contentType och id
    const fetchSingleContent = useCallback(async (contentType: string, id: string): Promise<ApiItem | null> => {
        setLoading(true); // Startar laddningsindikator
        setError(null); // Nollställer tidigare fel
        const data = await fetchSingleContentFromApi(contentType, id); // Anropar fetchSingleContentFromApi
        setLoading(false); // Stänger av laddningsindikator
        if (!data) setError("Failed to fetch single content"); // Sätter felmeddelande om ingen data returneras
        return data;
    }, []);

    // Return context-värden till child-component som använder denna provider
    return (
        <ContentContext.Provider value={{ fetchContent, fetchSingleContent, loading, error }}>
            {children} {}
        </ContentContext.Provider>
    );
}

// Hook för att använda ContentContext i andra komponenter
export function useContent() {
    const context = useContext(ContentContext); // Hämtar context
    if (!context) {
        throw new Error("useContent must be used within a ContentProvider");
    }
    return context; 
}
