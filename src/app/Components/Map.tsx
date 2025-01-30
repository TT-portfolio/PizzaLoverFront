"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const position: [number, number] = [59.34542361958214, 18.023330097916755]; // Restaurant's coordinates

const Map = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Prevents rendering on the server

  return (
    <div className="relative w-full flex flex-col items-center">
      <MapContainer
        center={position}
        zoom={15}
        className="w-full max-w-3xl h-[60vh] md:h-[50vh] lg:h-[55vh] rounded-lg"
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
