import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiBell } from "react-icons/fi";
import { useCheckTextClaimMutation } from "../api/checkApiSlice";
import claims from "../data/claimsData";
import GlobalLoader from "../components/GlobalLoader";
import Sidebar from "../components/Sidebar";
import "./Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [textClaim, setTextClaim] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [triggerCheckTextClaim, { isLoading, isError }] = useCheckTextClaimMutation();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleCheck = async () => {
    if (!textClaim.trim()) return;

    try {
      const response = await triggerCheckTextClaim(textClaim).unwrap();
      const claimsResult = response.claims?.[0] || null;

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
    }
  };

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
        onChange={(e) => setTextClaim(e.target.value)}
      />

      <button
        className="check-btn"
        onClick={handleCheck}
        disabled={isLoading}
      >
        {isLoading ? "Verifying..." : "Check"}
      </button>

      {isLoading && <GlobalLoader />}

      {isError && <div className="error-message">Error during fact check. Please try again.</div>}

      <div className="recent-section">
        <h3>Recent Truth Check</h3>
        <hr />
        {claims && claims.length > 0 ? (
          claims.map((claim) => (
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
          ))
        ) : (
          <p>No recent claims available.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
