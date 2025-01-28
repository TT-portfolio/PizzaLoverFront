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
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-6">
      
      <div className="text-color-text-red font-bold text-lg border-4 border-dotted border-color-text-green px-6 py-4 w-60 h-40 flex flex-col items-center justify-center mx-auto">
      <h3 className="font-bold text-lg text-color-text-red">PIZZA LOVER</h3>
        <p>{settings.properties.streetname || "No Streetname Available"}</p>
        <p>{settings.properties.postalcode || "No Postal Code Available"}</p>
        <p>{settings.properties.phonenumber || "No Phone Number Available"}</p>
      </div>

      {/* Karta */}
      <div className="w-full md:w-2/3 h-[400px]">
        <Map />
      </div>

    </div>
  );
};

export default HittaHitPage;
