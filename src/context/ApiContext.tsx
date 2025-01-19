'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ApiItem } from "@/types/api";

interface ApiContextType {
    settings: unknown | null; // Settings-objekt
    loading: boolean;
    error: string | null;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

interface ApiProviderProps {
    children: ReactNode;
}

export function ApiProvider({ children }: ApiProviderProps) {
    //const [data, setData] = useState<unknown>(null);
    const [settings, setSettings] = useState<ApiItem | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(
                    'https://pizzalover-g7fnhxctfsfbe6c7.westeurope-01.azurewebsites.net/umbraco/delivery/api/v1/content?'
                );
                if (!res.ok) throw new Error('Failed to fetch data');
                const json = await res.json();
                //setData(json);

                // Filtrera och organisera data
                const settingsItem = json.items.find((item: ApiItem) => item.contentType === 'settingsPage');
                console.log(settingsItem);
                setSettings(settingsItem || null);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                }else {
                    setError('An unknown error occured')
                }
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <ApiContext.Provider value={{ settings, loading, error }}>
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
