//Denna används för att kunna rendera till sidan
"use client";
//Dessa delar används för att kalla på olika funktioner i koden
import { useEffect, useState } from "react";
import { useApi } from "@/context/ApiContext";
import { ApiItem } from "@/types/api";

function HomePage() {
  //Denna delen kallar på API för att hämta informationen
  const { fetchPage, loading, error } = useApi();
  const [settings, setSettings] = useState<ApiItem | null>(null);

  useEffect(() => {
    async function fetchData() {
      const items = await fetchPage("homePage");
      console.log("Filtered Items:", items); // Filtrera på settingsPage
      setSettings(items && items.length > 0 ? items[0]: null);
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
      <h1 className="text-green-500">
        {typeof settings.properties.test === "string"
          ? settings.properties.test
          : "Default Title"}
      </h1>
    </div>
  );
}

export default HomePage;
