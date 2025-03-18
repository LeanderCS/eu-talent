import React from "react";
import EuropeMap from "../components/EuropeMap";
import Header from "../components/header"; // Vérifie la casse !

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      {/* Header */}
      <Header />

      {/* Conteneur de la carte */}
      <div className="flex-grow w-[393px] h-[750px] mt-4 border rounded-lg overflow-hidden">
        <EuropeMap />
      </div>
    </div>
  );
};

export default Home;


