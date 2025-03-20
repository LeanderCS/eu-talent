"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EuropeMap from "../components/EuropeMap";
import Header from "../components/header";
import NotificationPopup from "../components/NotificationsPopup";

const Home: React.FC = () => {
  const router = useRouter();
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

  useEffect(() => {
    // Afficher la notification après 10 secondes
    const timer = setTimeout(() => {
      setIsPopupVisible(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen bg-black">
      <Header />

<<<<<<< HEAD
      {/* Conteneur de la carte */}
      <div className="w-[393px] h-[750px] overflow-hidden">
        <EuropeMap isPopupVisible={isPopupVisible} />
=======
      <div className="w-[393px] h-[750px] overflow-hidden relative z-10">
        <EuropeMap />
>>>>>>> 44d9480291317659205a2a4a14c9b7dd9f02e084
      </div>

      {/* Bouton d'accès au chat */}
      <button
        onClick={() => router.push("../connecteMessage")}
        className="w-[393px] p-3 bg-blue-600 text-white text-lg font-bold cursor-pointer mb-5"
      >
        Accéder au Chat
      </button>

      {/* Afficher la popup et son overlay flou */}
      {isPopupVisible && <NotificationPopup onClose={() => setIsPopupVisible(false)} />}
    </div>
  );
};

export default Home;
