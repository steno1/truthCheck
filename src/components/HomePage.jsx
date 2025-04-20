import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiBell } from "react-icons/fi";
import {
  useCheckTextClaimMutation,
  useCheckImageClaimMutation,
  useGetRecentChecksQuery,
  useSaveClaimResultMutation, // Import the save claim mutation
} from "../api/checkApiSlice";
import GlobalLoader from "../components/GlobalLoader";
import Sidebar from "../components/Sidebar";
import "./Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [textClaim, setTextClaim] = useState("");
  const [imageClaim, setImageClaim] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const [triggerCheckTextClaim, { isLoading: isTextLoading, isError: isTextError }] =
    useCheckTextClaimMutation();
  const [triggerCheckImageClaim, { isLoading: isImageLoading, isError: isImageError }] =
    useCheckImageClaimMutation();

  const { data: recentChecks, isLoading: isRecentLoading, isError: isRecentError } = useGetRecentChecksQuery();

  const [saveClaimResult] = useSaveClaimResultMutation(); // Hook for saving claim results

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImageClaim(file);
  };

  const handleCheck = async () => {
    if (!textClaim.trim() && !imageClaim) return;

    try {
      let resultData = {};

      if (textClaim.trim()) {
        const response = await triggerCheckTextClaim(textClaim).unwrap();
        const claimsResult = response.claims?.[0] || null;

        resultData = {
          claim: textClaim,
          confidence: claimsResult?.claimReview?.[0]?.textualRating || 0,
          explanation:
            claimsResult?.claimReview?.[0]?.text ||
            claimsResult?.claimReview?.[0]?.title ||
            claimsResult?.claimReview?.[0]?.textualRating ||
            "No explanation found.",
          sources: claimsResult?.claimReview?.map((r) => r.url) || ["No sources found"],
          verdict: claimsResult?.claimReview?.[0]?.textualRating || "Unverifiable",
        };

        if (claimsResult?.claimReview?.[0]?.textualRating) {
          resultData.explanation = claimsResult.claimReview[0].textualRating;
        }
      }

      if (imageClaim) {
        const response = await triggerCheckImageClaim(imageClaim).unwrap();
        resultData = {
          claim: "Image Claim",
          confidence: response.confidence || 0,
          explanation: response.explanation || "No explanation found.",
          sources: response.sources || ["No sources found"],
          verdict: response.verdict || "Unverifiable",
        };
      }

      // Use saveClaimResult mutation to save result data to the backend
      await saveClaimResult(resultData).unwrap();  // Call the save mutation

      navigate("/result", { state: resultData });
    } catch (error) {
      console.error("🔥 Error during fact check:", error);
      const fallbackData = {
        claim: textClaim || "Image Claim",
        confidence: 0,
        explanation: "No explanation available.",
        sources: ["No sources provided"],
        verdict: "Unverifiable",
      };
      navigate("/result", { state: fallbackData });
    }
  };

  // Function to shorten claim text to the first 30 words
  const getShortenedClaim = (claimText) => {
    if (!claimText) return "No claim text available"; 
    const words = claimText.split(' ');
    const first30Words = words.slice(0, 30).join(' ');
    return `${first30Words}... see result`;
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

      <div className="image-upload">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imageClaim && <p>Image selected: {imageClaim.name}</p>}
      </div>

      <button
        className="check-btn"
        onClick={handleCheck}
        disabled={isTextLoading || isImageLoading}
      >
        {isTextLoading || isImageLoading ? "Verifying..." : "Check"}
      </button>

      {(isTextLoading || isImageLoading) && <GlobalLoader />}
      {(isTextError || isImageError) && (
        <div className="error-message">
          Error during fact check. Please try again.
        </div>
      )}

      <div className="recent-section">
        <h3>Recent Truth Check</h3>
        <hr />
        {isRecentLoading ? (
          <p>Loading recent claims...</p>
        ) : isRecentError ? (
          <p>Failed to load recent claims.</p>
        ) : recentChecks?.length > 0 ? (
          recentChecks.slice(0, 3).map((claim, index) => (
            <div key={index} className="claim-card">
              <div className="claim-info">
                <p className="claim-date">
                  {new Date(claim.createdAt).toLocaleString()}
                </p>
                <p>
                  <span style={{ color: "#333", fontWeight: "bold" }}>
                    Claim:
                  </span>{" "}
                  <span style={{ color: "#777" }}>
                    {/* Display truncated claim text */}
                    {getShortenedClaim(claim.claim)}
                  </span>
                  <span
                    className="see-results"
                    onClick={() => navigate("/result", { state: claim })}
                  >
                    See Results
                  </span>
                </p>
              </div>
              {claim.image && (
                <img src={claim.image} alt="claim" className="claim-img" />
              )}
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
