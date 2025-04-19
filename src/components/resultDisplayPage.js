import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ResultPage.css';

function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state;

  const [feedback, setFeedback] = useState('');
  const [thought, setThought] = useState('');

  if (!result) {
    console.log("No result passed. Did you reload the result page directly?");
    return (
      <div className="result-page">
        <p style={{ marginTop: "2rem", textAlign: "center" }}>
          No result found. Please try checking a claim first.
        </p>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  console.log("Raw result passed:", location.state);

  const { claim, confidence, explanation, sources, verdict } = result;

  const formattedClaim = claim || "Unknown claim";
  const formattedConfidence = confidence ? `${confidence}%` : "0%";
  const formattedExplanation = explanation || "No explanation available.";
  const formattedSources = sources?.length
    ? sources.join(', ')
    : "No sources provided";
  const formattedVerdict = verdict || "Unverifiable";

  const handleFeedback = (emoji) => {
    setFeedback(emoji);
    // Send feedback to the backend if needed
    console.log("Feedback received:", emoji);
  };

  const handleSubmitThought = () => {
    if (thought.trim()) {
      console.log("User thought:", thought);
      // Send thought to the backend
    }
  };

  return (
    <div className="result-page">
      <button
        onClick={() => navigate('/')}
        style={{
          margin: '20px',
          padding: '8px 16px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        ← Back
      </button>

      <h1 className="title">FactCheck Result</h1>

      <div className="top-loader-container">
        <svg viewBox="0 0 200 100" className="semi-circle">
          <defs>
            <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="red" />
              <stop offset="33%" stopColor="yellow" />
              <stop offset="66%" stopColor="lightgreen" />
              <stop offset="100%" stopColor="green" />
            </linearGradient>
          </defs>
          <path
            d="M10,100 A90,90 0 0,1 190,100"
            stroke="url(#loaderGradient)"
            strokeWidth="15"
            fill="none"
          />
        </svg>
      </div>

      <div className="result-summary">
        <h2 className="verdict">{formattedVerdict}</h2>
        <p className="score">{formattedConfidence}</p>
      </div>

      <div className="claim-box">
        <strong>Claim:</strong> {formattedClaim}
      </div>

      <div className="finding-box">
        <strong>What we found:</strong> {formattedExplanation}
      </div>

      <div className="sources-box">
        <strong>Sources:</strong>
        <ul>
          {formattedSources === "No sources provided" ? (
            <li>{formattedSources}</li>
          ) : (
            formattedSources.split(', ').map((source, index) => (
              <li key={index}><a href={source} target="_blank" rel="noopener noreferrer">{source}</a></li>
            ))
          )}
        </ul>
      </div>

      <button className="check-more-btn" onClick={() => navigate('/')}>
        Check More
      </button>

      <div className="feedback-section">
        <h3>Was this verification helpful?</h3>
        <div className="feedback-options">
          <button onClick={() => handleFeedback('😊')}>
            <div className="emoji">😊</div>
            <div className="label">Good</div>
          </button>
          <button onClick={() => handleFeedback('😐')}>
            <div className="emoji">😐</div>
            <div className="label">Bad</div>
          </button>
          <button onClick={() => handleFeedback('😕')}>
            <div className="emoji">😕</div>
            <div className="label">Confusing</div>
          </button>
          <button onClick={() => handleFeedback('🌟')}>
            <div className="emoji">🌟</div>
            <div className="label">Excellent</div>
          </button>
        </div>

        <div className="thought-box">
          <textarea 
            placeholder="Share your thought..." 
            rows="3" 
            value={thought}
            onChange={(e) => setThought(e.target.value)}
          />
          <button className="submit-thought-btn" onClick={handleSubmitThought}>Send</button>
        </div>

        {/* Displaying the selected feedback */}
        {feedback && (
          <div className="feedback-display">
            <p>You selected: {feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultPage;
