'use client';
import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { ApiItem } from "@/types/api";


interface ApiContextType {
    fetchPage: <T = ApiItem>(contentType?: string) => Promise<T[] | null>; // Generisk funktion
    loading: boolean;
    error: string | null;
  }

const ApiContext = createContext<ApiContextType | undefined>(undefined);

interface ApiProviderProps {
    children: ReactNode;
}

export function ApiProvider({ children }: ApiProviderProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPage = useCallback(
        async <T = ApiItem>(contentType?: string): Promise<T[] | null> => {
          setLoading(true);
          setError(null);

        try {
            const baseUrl = 'https://pizzalover-g7fnhxctfsfbe6c7.westeurope-01.azurewebsites.net/umbraco/delivery/api/v1/content';
            const url = contentType
                ? `${baseUrl}?filter=contentType:${encodeURIComponent(contentType)}`
                : baseUrl;

            const res = await fetch(url);
            if (!res.ok) throw new Error('Failed to fetch data');
            const json = await res.json();

            return json.items || null;
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <ApiContext.Provider value={{ fetchPage, loading, error }}>
            {children}
        </ApiContext.Provider>
    );
}

export function useApi() {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error('useApi must be used within an ApiProvider');
    }
    return context;
}
