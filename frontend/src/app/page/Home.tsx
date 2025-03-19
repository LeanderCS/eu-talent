import React from "react";
import EuropeMap from "../components/EuropeMap";
import Header from "../components/header"; // Vérifie la casse !
import Category from "../components/Category"

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      {/* Header */}
      <Header />

      {/* Conteneur de la carte */}
      <div className="flex-grow w-[393px] h-[1000px] mt-0 overflow-hidden z-4">
        <EuropeMap />
      
        <div className="absolute bottom-5 w-[393px] flex justify-center z-3">
          <Category />
        </div>
      </div>
    </div>
  );
};

export default Home;


