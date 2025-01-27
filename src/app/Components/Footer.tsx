"use client";
import { useEffect, useState } from "react";
import { useApi } from "@/context/ApiContext";
import { FooterType } from "@/types/footer";

function Footer() {
  const { fetchPage, loading, error } = useApi();
  const [settings, setSettings] = useState<FooterType | null>(null);

  useEffect(() => {
    async function fetchData() {
      //Skickar in rätt type från start så att det inte kommer några fel
      const items = await fetchPage<FooterType>("settingsPage");
      //setSettings(items && items.length > 0 ? items[0] : null);
      //Byggde den enklare att om det finns så sätter man den, kanske var bättre och säkrare tidigare
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
    <footer className="bg-background text-color-text-green font-semibold text-lg border-4 border-dotted border-red-500 p-6">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
      {/* Left */}
      <div className="text-left space-y-2">
        <h3 className="font-bold text-xl">PIZZA LOVER</h3>
        <p>{settings.properties.streetname || "No Streetname Available"}</p>
        <p>{settings.properties.postalcode || "No Postal Code Available"}</p>
        <p>{settings.properties.phonenumber || "No Phone Number Available"}</p>
      </div>
  
      {/* Middle */}
      <div className="text-left space-y-2">
        <h3 className="font-bold text-xl">Öppettider</h3>
        <p>Mån-Tors: {settings.properties.moFri || "No Hours Available"}</p>
        <p>Fre-Sön: {settings.properties.frSu || "No Hours Available"}</p>
      </div>
  
      {/* Right */}
      <div className="text-left space-y-2">
        <h3 className="font-bold text-xl">Information</h3>
        <p>Rullstolstillgängligt</p>
        <p>Fullständiga rättigheter</p>
        <p>Uteservering</p>
      </div>
    </div>
  </footer>
  

  );
}

export default Footer;
