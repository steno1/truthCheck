// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ResultDisplay from './components/resultDisplayPage';
import './styles.css';

function App() {
  const [language, setLanguage] = useState('en');
  const [result, setResult] = useState('');  // Result state to store the result

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage language={language} onLanguageChange={handleLanguageChange} setResult={setResult} />} />
        <Route path="/result" element={<ResultDisplay result={result} />} />
      </Routes>
    </Router>
  );
}

export default App;
