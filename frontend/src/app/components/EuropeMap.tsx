"use client";

import React from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import europeGeoJson from "../data/europe.json";

const europeBounds = [
  [71.2, -25.0], // Nord-Ouest
  [34.5, 45.0],  // Sud-Est
];

interface EuropeMapProps {
  isPopupVisible: boolean;
}

const EuropeMap: React.FC<EuropeMapProps> = ({ isPopupVisible }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#b6f3ff",
        pointerEvents: isPopupVisible ? "none" : "auto", // Désactive les interactions si le popup est visible
        position: "relative",
        zIndex: 0, // Assure que la carte reste sous la popup
      }}
    >
      <MapContainer
        center={[50, 10]}
        zoom={4}
        minZoom={3}
        maxZoom={10}
        scrollWheelZoom={!isPopupVisible} // Désactive le zoom quand la popup est affichée
        style={{ width: "100%", height: "100%" }}
        maxBounds={europeBounds}
        maxBoundsViscosity={1.0}
        attributionControl={false}
      >
        <GeoJSON data={europeGeoJson} />
      </MapContainer>
    </div>
  );
};

export default EuropeMap;
