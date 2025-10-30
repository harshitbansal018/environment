import React, { useState } from "react";
import "./EcoTipUpload.css";

const EcoTipUpload = ({ addPoints }) => {
  const [tip, setTip] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tip.trim() || !file) {
      alert("Please enter a tip and upload an image!");
      return;
    }

    const formData = new FormData();
    formData.append("tip", tip.trim());
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/tips", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.verified) {
        addPoints(tip.toLowerCase().trim());
        alert("✅ Verified and saved!");
      } else {
        alert("❌ Not verified.");
      }
    } catch (err) {
      console.error("Error submitting:", err);
      alert("⚠️ Error sending to backend.");
    }

    setTip("");
    setFile(null);
  };

  return (
    <div className="eco-tip-upload">
      <h2 className="upload-title">Share Your Eco-Friendly Tips 🌱</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <textarea
          className="eco-input"
          placeholder="Write your eco-friendly tip..."
          value={tip}
          onChange={(e) => setTip(e.target.value)}
        />
        <input
          type="file"
          className="file-input"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" className="upload-btn">
          Send
        </button>
      </form>
    </div>
  );
};

export default EcoTipUpload;
