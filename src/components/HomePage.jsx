import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiBell } from "react-icons/fi";
import { useCheckImageClaimMutation, useCheckTextClaimMutation } from "../api/checkApiSlice";
import claims from "../data/claimsData";
import GlobalLoader from "../components/GlobalLoader";
import Sidebar from "../components/Sidebar"; 
import "./Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [textClaim, setTextClaim] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const [checkTextClaim, { isLoading: isTextLoading }] = useCheckTextClaimMutation();
  const [checkImageClaim, { isLoading: isImageLoading }] = useCheckImageClaimMutation();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

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
  const handleLanguageChange = (e) => setSelectedLanguage(e.target.value);

  return (
    <div className="home-container">
      {/* Sidebar for Language Selection */}
      <Sidebar
        isOpen={isSidebarOpen}
        selectedLanguage={selectedLanguage}
        onChangeLanguage={handleLanguageChange}
        onClose={toggleSidebar} // 🛠️ This was missing
      />

      <div className="top-bar">
        <div className="dropdown-icon" onClick={toggleSidebar}>
          <FiMenu size={24} />
        </div>
        <div className="notification-icon">
          <FiBell size={24} />
        </div>
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
