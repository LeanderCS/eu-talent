"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { FaTimes, FaRedo, FaStop, FaPaperPlane, FaVideo } from "react-icons/fa";

const CameraRecorder = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const recordTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraBlocked, setCameraBlocked] = useState(false);

  // Demander l'autorisation d'accéder à la caméra et au micro
  const requestCameraAccess = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
      setCameraBlocked(false); // Caméra autorisée
    } catch (error) {
      console.error("❌ Accès refusé à la caméra :", error);
      setCameraBlocked(true); // La caméra a été bloquée par l'utilisateur
    }
  };

  // Gérer l'enregistrement de la vidéo
  const startRecording = () => {
    if (!stream) return;

    const mediaRecorder = new MediaRecorder(stream);
    const chunks: BlobPart[] = [];

    mediaRecorder.ondataavailable = (event) => {
      chunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/mp4" });
      setVideoBlob(blob);
      stopCamera(); // Éteindre la caméra après l'enregistrement
    };

    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setRecording(true);

    // ⏳ Arrêter l'enregistrement après 30 secondes
    recordTimeoutRef.current = setTimeout(() => {
      stopRecording();
    }, 30000);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    if (recordTimeoutRef.current) {
      clearTimeout(recordTimeoutRef.current);
      recordTimeoutRef.current = null;
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const uploadVideo = async () => {
    if (!videoBlob) return;

    const formData = new FormData();
    formData.append("video", videoBlob, "video.mp4");

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Vidéo envoyée avec succès !");
      } else {
        console.error("Erreur lors de l'envoi de la vidéo");
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  // Effectue une demande de caméra dès que le composant se monte
  useEffect(() => {
    requestCameraAccess();
  }, []);

  // Gérer l'affichage en fonction de l'état de la caméra
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-black relative max-w-[393px] mx-auto">
      {/* Bouton retour à l'accueil */}
      <Link href="/home">
        <button className="absolute top-5 right-5 px-4 py-2 z-50 font-extrabold text-3xl">
<<<<<<< HEAD
          X
=======
          <FaTimes />
>>>>>>> main
        </button>
      </Link>

      {!videoBlob ? (
        <>
          {/* Affichage de la vidéo de la caméra */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-10 flex gap-4">
            {recording ? (
              <button
                onClick={stopRecording}
                className="px-6 py-3 text-white rounded-full text-3xl"
              >
                ⏹️
              </button>
            ) : (
              <button
                onClick={startRecording}
                className="px-6 py-3 text-white rounded-full text-3xl font-extrabold"
              >
                <FaVideo />
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-black">
          <video
            src={URL.createObjectURL(videoBlob)}
            controls
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-10 flex gap-4">
            <button
              onClick={() => setVideoBlob(null)}
              className="px-6 py-3 text-white text-3xl"
            >
              <FaRedo />
            </button>
            <Link href="/home">
              <button
                onClick={uploadVideo}
                className="px-6 py-3 text-white text-3xl"
              >
                <FaPaperPlane />
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Affichage du message si la caméra est bloquée */}
      {cameraBlocked && (
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded">
          <p>Accès à la caméra refusé. <br/> Veuillez activer la caméra dans les réglages de votre navigateur.</p>
          <button
            onClick={requestCameraAccess}
            className="mt-2 px-4 py-2 bg-green-600 rounded"
          >
            Réessayer
          </button>
        </div>
      )}
    </div>
  );
};

export default CameraRecorder;
