import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import claims from "../data/claimsData";
import "./Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCheck = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/result");
    }, 1500);
  };

  return (
    <div className="home-container">
      
      <div className="top-bar">
        <div className="dropdown-icon">☰</div>
        <div className="notification-icon">🔔</div>
      </div>

      {/* Language Selector */}
      <div className="lang-section">
        <label htmlFor="language">Language:</label>
        <select id="language" defaultValue="english">
          <option value="english">English</option>
          <option value="igbo">Igbo</option>
          <option value="yoruba">Yoruba</option>
          <option value="hausa">Hausa</option>
        </select>
      </div>

      
      <textarea
        className="claim-input"
        placeholder="type text/paste url"
      ></textarea>

      
      <button
        className="check-btn"
        style={{
          width: "auto",
          padding: "8px 15px",
          marginLeft: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px"
        }}
        onClick={handleCheck}
        disabled={loading}
      >
        {loading ? <ClipLoader size={18} color="#ffffff" /> : "Check"}
      </button>

      {/* Upload Image */}
      <div className="upload-section">
        <input
          type="file"
          id="upload-image"
          className="upload-input"
          accept=".jpg,.png"
        />
      </div>

      
      <div className="recent-section">
        <h3>Recent Truth Check</h3>
        <hr />
        {claims.map((claim) => (
          <div key={claim.id} className="claim-card">
            <div className="claim-info">
              <p className="claim-date">{claim.date}</p>
              <p>
                <span style={{ color: "#333", fontWeight: "bold" }}>Claim:</span>
                <span style={{ color: "#777" }}>{claim.text}</span>
                <span className="see-results">See Results</span>
              </p>
            </div>
            <img src={claim.image} alt="claim" className="claim-img" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
