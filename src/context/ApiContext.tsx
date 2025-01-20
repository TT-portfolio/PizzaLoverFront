'use client';
import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { ApiItem } from "@/types/api";

interface ApiContextType {
    fetchSettingsPage: (contentType: string) => Promise<ApiItem | null>; // Ny metod för filtrerade anrop
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

    const fetchSettingsPage = useCallback(async (contentType: string): Promise<ApiItem | null> => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(
                'https://pizzalover-g7fnhxctfsfbe6c7.westeurope-01.azurewebsites.net/umbraco/delivery/api/v1/content?'
            );
            if (!res.ok) throw new Error('Failed to fetch data');
            const json = await res.json();

            // Filtrera och returnera data baserat på contentType
            const filteredItem = json.items.find((item: ApiItem) => item.contentType === contentType);
            return filteredItem || null;
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
        <ApiContext.Provider value={{ fetchSettingsPage, loading, error }}>
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
