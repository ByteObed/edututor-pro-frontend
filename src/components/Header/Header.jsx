// src/components/Header/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, ArrowLeft } from "lucide-react";
import "./Header.css";

const Header = ({
  title,
  subtitle,
  showBackButton = false,
  backTo = "/",
  selectedCoursesCount = 0,
  majorDescription = null,
}) => {
  return (
    <header className="header">
      <div className="header-content">
        {showBackButton ? (
          <div className="header-with-back">
            {/* Left: Back Button */}
            <div className="header-left">
              <Link to={backTo} className="back-button">
                <ArrowLeft size={20} />
              </Link>
            </div>

            {/* Center: Title and Icon */}
            <div className="header-center">
              <div className="header-title-group">
                <BookOpen size={32} />
                <div>
                  <h1>{title}</h1>
                  {subtitle && <p className="header-subtitle">{subtitle}</p>}
                </div>
              </div>
            </div>

            {/* Right: Selected Courses Count */}
            <div className="header-right">
              <p className="courses-count-label">Selected Courses</p>
              <p className="courses-count">{selectedCoursesCount}</p>
            </div>
          </div>
        ) : (
          <div className="header-centered">
            <div className="header-title-group">
              <BookOpen size={32} />
              <div>
                <h1>{title}</h1>
                {subtitle && <p className="header-subtitle">{subtitle}</p>}
              </div>
            </div>
          </div>
        )}

        {majorDescription && (
          <div className="major-description">
            <p>{majorDescription}</p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
