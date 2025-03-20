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
    //Afficher la notifcation après 10 secondes
    const timer = setTimeout(() => {
      setIsPopupVisible(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen bg-black">
      <Header />

      <div className="w-[393px] h-[750px] overflow-hidden">
        <EuropeMap isPopupVisible={isPopupVisible} />
      </div>

      <button
        onClick={() => router.push("../connecteMessage")}
        className="w-[393px] p-3 bg-blue-600 text-white text-lg font-bold cursor-pointer mb-5"
      >
        Accéder au Chat
      </button>

      {isPopupVisible && <NotificationPopup onClose={() => setIsPopupVisible(false)} />}
    </div>
  );
};

export default Home;
