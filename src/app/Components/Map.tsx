"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { useLoading } from '@/context/LoadingContext'; // Lägg till denna import
import "leaflet/dist/leaflet.css";

const position: [number, number] = [59.34542361958214, 18.023330097916755]; // Restaurant's coordinates

const Map = () => {
  const { setIsPageLoading } = useLoading(); // Använd useLoading-hooken
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Hantera både client-side rendering och laddningstillstånd
    const startTime = Date.now();
    setIsPageLoading(true);
    
    setIsClient(true);
    
    // Efter att kartan har laddats, stäng av laddningsindikatorn
    const elapsedTime = Date.now() - startTime;
    const minDisplayTime = 500;
    
    if (elapsedTime < minDisplayTime) {
      setTimeout(() => {
        setIsPageLoading(false);
      }, minDisplayTime - elapsedTime);
    } else {
      setIsPageLoading(false);
    }
  }, [setIsPageLoading]);

  if (!isClient) return null; // Prevents rendering on the server

  return (
    <div className="relative w-full flex flex-col items-center">
      <MapContainer
        center={position}
        zoom={15}
        className="w-full max-w-3xl h-[60vh] md:h-[50vh] lg:h-[55vh] rounded-lg"
        whenReady={() => {
          // Detta körs när kartan är redo, vilket kan vara ett bra ställe att stänga av laddningen
          // Men eftersom vi redan hanterar detta i useEffect ovan, behövs det kanske inte
        }}
      >
        {/* Map from Carto */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">Carto</a>'
        />

        {/* Red dot marker */}
        <CircleMarker
          center={position}
          radius={5}
          color="red"
          fillColor="red"
          fillOpacity={1}
        >
          <Popup>Här ligger vår restaurang! 🍕</Popup>
        </CircleMarker>
      </MapContainer>
    </div>
  );
};

export default Map;