
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiBell } from "react-icons/fi"; 
import { useCheckImageClaimMutation, useCheckTextClaimMutation } from "../api/checkApiSlice";
import claims from "../data/claimsData";
import GlobalLoader from "../components/GlobalLoader"; 
import "./Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [textClaim, setTextClaim] = useState("");
  const [imageFile, setImageFile] = useState(null);

  
  const [checkTextClaim, { data: textData, error: textError, isLoading: isTextLoading }] = useCheckTextClaimMutation();
  const [checkImageClaim, { data: imageData, error: imageError, isLoading: isImageLoading }] = useCheckImageClaimMutation();

  const handleCheck = async () => {
    setLoading(true); 

    if (textClaim) {
      try {
        await checkTextClaim({ claim: textClaim }).unwrap();
      } catch (error) {
        console.error("Text claim verification failed", error);
      }
    } else if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      try {
        await checkImageClaim(formData).unwrap();
      } catch (error) {
        console.error("Image claim verification failed", error);
      }
    }

    setTimeout(() => {
      setLoading(false); 
      navigate("/result");
    }, 1500);
  };

  const handleTextInputChange = (e) => setTextClaim(e.target.value);
  const handleImageInputChange = (e) => setImageFile(e.target.files[0]);

  return (
    <div className="home-container">
      <div className="top-bar">
        <div className="dropdown-icon">
          <FiMenu size={24} />
        </div>
        <div className="notification-icon">
          <FiBell size={24} />
        </div>
      </div>

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
        placeholder="Type text/paste URL"
        value={textClaim}
        onChange={handleTextInputChange}
      />

      <button
        className="check-btn"
        onClick={handleCheck}
        disabled={loading || (isTextLoading || isImageLoading)}
      >
        Check
      </button>

      <div className="upload-section">
        <input
          type="file"
          id="upload-image"
          className="upload-input"
          accept=".jpg,.png"
          onChange={handleImageInputChange}
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

      
      {loading && <GlobalLoader />} 
    </div>
  );
};

export default HomePage;
