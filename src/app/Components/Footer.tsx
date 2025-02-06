"use client";
import { useEffect, useState } from "react";
import { useApi } from "@/context/ApiContext";
import { FooterType } from "@/types/footer";
import Link from "next/link";

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
<footer className="bg-background text-color-text-green font-mono font-bold text-lg border-4 border-dotted border-red-500 p-3">
  <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
    
    {/* Left - Adress */}
    <div className="text-left space-y-1">
      <h3 className="font-mono font-bold text-lg">PIZZA LOVER</h3>
      <p>{settings.properties.streetname || "No Streetname Available"}</p>
      <p>{settings.properties.postalcode || "No Postal Code Available"}</p>
      <p>{settings.properties.phonenumber || "No Phone Number Available"}</p>
    </div>

    {/* Middle - Öppettider */}
    <div className="text-left space-y-1">
      <h3 className="font-mono font-bold text-lg">Öppettider</h3>
      <p>Mån-Tors: {settings.properties.moFri || "No Hours Available"}</p>
      <p>Fre-Sön: {settings.properties.frSu || "No Hours Available"}</p>
      <Link href="/hittahit" className="text-color-text-red hover:underline block">
        Hitta hit
      </Link>
    </div>

    {/* Right - Information */}
    <div className="text-left space-y-1 sm:col-span-2 md:col-span-1">
      <h3 className="font-mono font-bold text-lg">Information</h3>
      <p>Rullstolstillgängligt</p>
      <p>Fullständiga rättigheter</p>
      <p>Uteservering</p>
    </div>

  </div>  
</footer>

  );
}

export default Footer;
