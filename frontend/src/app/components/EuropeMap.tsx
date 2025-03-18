"use client";

import React from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import europeGeoJson from "../data/europe.json"; 

// Définir les limites de l'Europe
const europeBounds: L.LatLngBoundsExpression = [
  [71.2, -25.0], // Nord-Ouest (Islande, Norvège)
  [34.5, 45.0], // Sud-Est (Grèce, Turquie)
];

// Fonction pour styliser les pays
const onEachCountry = (feature: any, layer: any) => {
  layer.setStyle({
    fillColor: "#004080", // Bleu foncé pour les pays
    color: "#FFFFFF", // Bordure blanche
    weight: 1,
    opacity: 1,
    fillOpacity: 1, // Full bleu sans transparence
  });

  // Ajouter le nom du pays en tooltip (survol)
  if (feature.properties && feature.properties.name) {
    layer.bindTooltip(feature.properties.name, { permanent: false, direction: "center" });
  }

  // Effet au survol
  layer.on("mouseover", function () {
    layer.setStyle({ fillOpacity: 0.8 });
  });

  layer.on("mouseout", function () {
    layer.setStyle({ fillOpacity: 1 });
  });
};


const EuropeMap: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#B3D9FF" }}> 
      <MapContainer
  center={[50, 10]}
  zoom={4}
  scrollWheelZoom={true}
  style={{
    width: "100%",
    height: "100%",
    backgroundColor: "#77B5FE", // Mettre le fond bleu clair de la carte ici
  }}
  maxBounds={europeBounds}
  maxBoundsViscosity={1.0}
>
        {/* Couleurs des pays via GeoJSON */}
        <GeoJSON data={europeGeoJson} onEachFeature={onEachCountry} />
      </MapContainer>
    </div>
  );
};

export default EuropeMap;


