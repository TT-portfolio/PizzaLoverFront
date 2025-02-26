//Denna används för att kunna rendera till sidan
"use client";
//Dessa delar används för att kalla på olika funktioner i koden
import { useEffect, useState } from "react";
import { useApi } from "@/context/ApiContext";
import { SettingsPageType } from "@/types/SettingsPage";

function SettingsComponent() {
  //Denna delen kallar på API för att hämta informationen
  const { fetchPage, loading, error } = useApi();
  const [settings, setSettings] = useState<SettingsPageType | null>(null);

  useEffect(() => {
    async function fetchData() {
      const items = await fetchPage<SettingsPageType>("settingsPage");
      if (items){
        setSettings(items[0])
      }
    }
    fetchData();
  }, [fetchPage]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!settings || !settings.properties)
    return <p>No settings data available.</p>;

  return (
    //Här skriver man ut det som kommer ifrån API
    <div>
      <p>
        {typeof settings.properties.copywrite === "string"
          ? settings.properties.copywrite
          : "Default Copywrite"}
      </p>
    </div>
  );
}

export default SettingsComponent;
