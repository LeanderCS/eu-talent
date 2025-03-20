"use client";

import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaHeart, FaCommentDots, FaShare, FaLink, FaWhatsapp,
  FaTwitter, FaSnapchatGhost, FaArrowLeft
} from "react-icons/fa";

// Définition des styles AVANT utilisation
const buttonStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "60px",
  height: "60px",
  backgroundColor: "rgba(214, 213, 213, 0.9)",
  borderRadius: "50%",
  textDecoration: "none",
};

const labelStyle: React.CSSProperties = {
  color: "black",
  fontSize: "12px",
  marginTop: "5px",
};

interface VideoCardProps {
  video: { url: string; description: string };
  isActive: boolean;
  isLiked: boolean;
  likesCount: number;
  onLike: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, isActive, isLiked, likesCount, onLike }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch((error) => console.log("Playback failed", error));
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isActive]);

  // Ajouter un commentaire
  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  // Copier le lien
  const handleCopyLink = () => {
    navigator.clipboard.writeText(video.url);
    alert("✅ Lien copié !");
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "393px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        scrollSnapAlign: "start",
        position: "relative",
        backgroundColor: "black",
      }}
    >
      {/* 🔙 Bouton Retour */}
      <button
        onClick={() => router.push("/")}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.6)",
          zIndex: 999,
        }}
      >
        <FaArrowLeft size={20} />
      </button>

      {/* 🎥 Vidéo */}
      <video
        ref={videoRef}
        src={video.url}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "10px",
        }}
        loop
        muted
        playsInline
        autoPlay={isActive}
      />

      {/* 📌 Section des boutons Like, Commentaire, Partage */}
      <div
        style={{
          position: "absolute",
          right: "20px",
          bottom: "150px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* ❤️ Like */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={onLike}
            style={{
              border: "none",
              borderRadius: "50%",
              width: "55px",
              height: "55px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              filter: "drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.6))",
              cursor: "pointer",
              backgroundColor: "transparent",
            }}
          >
            <FaHeart size={30} color={isLiked ? "red" : "white"} />
          </button>
          <span style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}>{likesCount}</span>
        </div>

        {/* 💬 Commentaire */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => setShowComments(!showComments)}
            style={buttonStyle}
          >
            <FaCommentDots size={30} color="white" />
          </button>
          <span style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}>{comments.length}</span>
        </div>

        {/* 📤 Partage */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => setShowShareOptions(!showShareOptions)}
            style={buttonStyle}
          >
            <FaShare size={30} color="white" />
          </button>
        </div>
      </div>

      {/* 📤 Section de Partage */}
      {showShareOptions && (
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            padding: "15px",
            textAlign: "center",
          }}
        >
          <div style={{ color: "black", fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
            Partager la vidéo
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "10px" }}>
            <button onClick={handleCopyLink} style={buttonStyle}>
              <FaLink size={24} color="gray" />
              <span style={labelStyle}>Copier</span>
            </button>
            <a href={`https://api.whatsapp.com/send?text=${video.url}`} target="_blank" rel="noopener noreferrer" style={buttonStyle}>
              <FaWhatsapp size={24} color="green" />
              <span style={labelStyle}>WhatsApp</span>
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${video.url}`} target="_blank" rel="noopener noreferrer" style={buttonStyle}>
              <FaTwitter size={24} color="blue" />
              <span style={labelStyle}>Twitter</span>
            </a>
            <a href={`https://www.snapchat.com/scan?attachmentUrl=${video.url}`} target="_blank" rel="noopener noreferrer" style={buttonStyle}>
              <FaSnapchatGhost size={24} color="yellow" />
              <span style={labelStyle}>Snapchat</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCard;
