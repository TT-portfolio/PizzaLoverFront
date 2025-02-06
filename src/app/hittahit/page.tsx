"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useApi } from "@/context/ApiContext";
import { FooterType } from "@/types/footer";

const Map = dynamic(() => import("@/app/Components/Map"), { ssr: false });

const HittaHitPage = () => {
  const { fetchPage, loading, error } = useApi();
  const [settings, setSettings] = useState<FooterType | null>(null);

  useEffect(() => {
    async function fetchData() {
      const items = await fetchPage<FooterType>("settingsPage");
      if (items) {
        setSettings(items[0]);
      }
    }
    fetchData();
  }, [fetchPage]);

  if (loading) return <p>Laddar...</p>;
  if (error) return <p>Något gick fel när vi hämtade adressen.</p>;
  if (!settings || !settings.properties) return <p>Ingen data tillgänglig</p>;

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 w-full">
      
      <div className="flex flex-col items-center w-full max-w-3xl gap-4">
        
        {/* Responsive design */}
        <div className="w-full mt-40 sm:mt-30 md:mt-20">
          <Map />
        </div>
        
        <div className="font-mono font-bold text-lg text-color-text-red border-4 border-dotted border-color-text-green px-6 py-4 w-full max-w-3xl flex flex-col items-center justify-center">
          <h3 className="font-mono font-bold text-lg text-color-text-red">PIZZA LOVER</h3>
          <p>{settings.properties.streetname || "No Streetname Available"}</p>
          <p>{settings.properties.postalcode || "No Postal Code Available"}</p>
          <p>{settings.properties.phonenumber || "No Phone Number Available"}</p>
        </div>

      </div>

    </div>
  );
};

export default HittaHitPage;
