"use client";
import { useEffect, useState } from "react";
import { useApi } from "@/context/ApiContext";
import { ApiItem } from "@/types/api";

function Footer() {
  const { fetchSettingsPage, loading, error } = useApi();
  const [settings, setSettings] = useState<ApiItem | null>(null);

  useEffect(() => {
    async function fetchData() {
      const items = await fetchSettingsPage("settingsPage");
      setSettings(items && items.length > 0 ? items[0] : null);
    }
    fetchData();
  }, [fetchSettingsPage]);

  if (loading) return null; // Footer visas inte innan datan laddats
  if (error) return <p>Error loading footer settings</p>;
  if (!settings || !settings.properties) return null;

  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
      <p>  {typeof settings.properties.adress === "string"
    ? settings.properties.adress
    : "No Adress Available"}
    </p>
    <p>  {typeof settings.properties.streetname === "string"
    ? settings.properties.streetname
    : "No Adress Available"}
    </p>
    <p>  {typeof settings.properties.postalcode === "string"
    ? settings.properties.postalcode
    : "No Adress Available"}
    </p>
    <p>  {typeof settings.properties.phonenumber === "string"
    ? settings.properties.phonenumber
    : "No Adress Available"}
    </p>
      </div>
    </footer>
  );
}

export default Footer;
