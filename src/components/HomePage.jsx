import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiBell } from "react-icons/fi";
import { useLazyCheckTextClaimQuery } from "../api/checkApiSlice";
import claims from "../data/claimsData";
import GlobalLoader from "../components/GlobalLoader";
import Sidebar from "../components/Sidebar";
import "./Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [textClaim, setTextClaim] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const [triggerCheckTextClaim] = useLazyCheckTextClaimQuery();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleCheck = async () => {
    if (!textClaim.trim()) return;
    setLoading(true);

    try {
      const response = await triggerCheckTextClaim(textClaim).unwrap(); 

      const claimsResult = response.claims && response.claims.length > 0 ? response.claims[0] : null;

      const resultData = {
        claim: textClaim,
        confidence: 70,
        explanation: claimsResult?.text || "No explanation found.",
        sources: claimsResult?.claimReview?.map((review) => review.url) || ["No sources found"],
        verdict: claimsResult?.claimReview?.[0]?.textualRating || "Unverifiable",
      };

      navigate("/result", { state: resultData });
    } catch (error) {
      console.error("🔥 Error during fact check:", error);

      const resultData = {
        claim: textClaim,
        confidence: 0,
        explanation: "No explanation available.",
        sources: ["No sources provided"],
        verdict: "Unverifiable",
      };
      navigate("/result", { state: resultData });
    } finally {
      setLoading(false);
    }
  };

  const handleTextInputChange = (e) => setTextClaim(e.target.value);

  return (
    <div className="home-container">
      <Sidebar
        isOpen={isSidebarOpen}
        selectedLanguage={selectedLanguage}
        onChangeLanguage={setSelectedLanguage}
        onClose={toggleSidebar}
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
        disabled={loading}
      >
        {loading ? "Verifying..." : "Check"}
      </button>

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
                <span
                  className="see-results"
                  onClick={() => navigate(`/result/${claim.id}`)}
                >
                  See Results
                </span>
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
