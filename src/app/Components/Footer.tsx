"use client";
import { useEffect, useState } from "react";
import { useApi } from "@/context/ApiContext";
import { ApiItem } from "@/types/api";
import { FooterType } from "@/types/footer";

function Footer() {
  const { fetchPage, loading, error } = useApi();
  const [settings, setSettings] = useState<FooterType | null>(null);

  useEffect(() => {
    async function fetchData() {
      const items = await fetchPage<FooterType>("settingsPage");
      //setSettings(items && items.length > 0 ? items[0] : null);
      if(items)
      {
        setSettings(items[0])
      }
    }
    fetchData();
  }, [fetchPage]);

  if (loading) return null;
  if (error) return <p>Error loading footer settings</p>;
  if (!settings || !settings.properties) return null;

  return (
    <footer className="bg-background text-color-text-green font-semibold text-lg border-4 border-dotted border-red-500 p-4">
  <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left */}
      <div className="space-y-2">
        <p>
          {typeof settings.properties.adress === "string"
            ? settings.properties.adress
            : "No Adress Available"}
        </p>
        <p>
          {typeof settings.properties.streetname === "string"
            ? settings.properties.streetname
            : "No Streetname Available"}
        </p>
        <p>
          {typeof settings.properties.postalcode === "string"
            ? settings.properties.postalcode
            : "No Postal Code Available"}
        </p>
        <p>
          {typeof settings.properties.phonenumber === "string"
            ? settings.properties.phonenumber
            : "No Phone Number Available"}
        </p>
      </div>

      {/* Right */}
      <div className="space-y-2">
        <p>
          {typeof settings.properties.moFri === "string"
            ? settings.properties.moFri
            : "No Opening Hours Available"}
        </p>
        <p>
          {typeof settings.properties.frSu === "string"
            ? settings.properties.frSu
            : "No Opening Hours Available"}
        </p>
       
      </div>
    </div>
  </footer>
  );
}

export default Footer;
