//Denna används för att kunna rendera till sidan
'use client'
//Dessa delar används för att kalla på olika funktioner i koden
import { useEffect, useState } from "react";
import { useApi } from "@/context/ApiContext";
import { ApiItem } from "@/types/api";

function SettingsComponent() {
    //Denna delen kallar på API för att hämta informationen
    const { fetchSettingsPage, loading, error } = useApi();
    const [settings, setSettings] = useState<ApiItem | null>(null);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchSettingsPage("settingsPage"); // Filtrera på settingsPage
            setSettings(data);
        }
        fetchData();
    }, [fetchSettingsPage]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!settings || !settings.properties) return <p>No settings data available.</p>;

    return (
        //Här skriver man ut det som kommer ifrån API
        <div>
            <h1>{typeof settings.properties.pageTitle === 'string' ? settings.properties.pageTitle : 'Default Title'}</h1>
            <p>{typeof settings.properties.copywrite === 'string' ? settings.properties.copywrite : 'Default Copywrite'}</p>
        </div>
    );
}

export default SettingsComponent;
