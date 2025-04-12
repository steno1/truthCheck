import React from "react";
import { FiGlobe, FiX } from "react-icons/fi";
import "./Sidebar.css";

const Sidebar = ({ isOpen, selectedLanguage, onChangeLanguage, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose}></div>}

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-icon-label">
            <FiGlobe size={24} />
            <span className="sidebar-title">Language</span>
          </div>
          <FiX size={24} className="close-icon" onClick={onClose} />
        </div>

        <div className="sidebar-content">
          <select value={selectedLanguage} onChange={onChangeLanguage}>
            <option value="english">English</option>
            <option value="igbo">Igbo</option>
            <option value="yoruba">Yoruba</option>
            <option value="hausa">Hausa</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
