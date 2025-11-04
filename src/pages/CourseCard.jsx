import React from "react";
import {
  User,
  Clock,
  Users,
  BookOpen,
  DollarSign,
  Star,
  CheckCircle,
} from "lucide-react";
import "./CourseCard.css";

const CourseCard = ({ course, isSelected, isAlreadyRegistered, onSelect }) => {
  const availability =
    ((course.capacity - course.enrolled) / course.capacity) * 100;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} className="star-filled" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" size={16} className="star-half" />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<Star key={i} size={16} className="star-empty" />);
    }
    return stars;
  };

  const getAvailabilityClass = (availability) => {
    if (availability > 50) return "availability-high";
    if (availability > 20) return "availability-medium";
    return "availability-low";
  };

  const getAvailabilityText = (availability) => {
    if (availability > 50) return "Available";
    if (availability > 20) return "Limited";
    return "Almost Full";
  };

  return (
    <div
      className={`course-card ${
        isAlreadyRegistered ? "already-registered" : ""
      }`}
    >
      {/* Already Registered Badge */}
      {isAlreadyRegistered && (
        <div className="registered-badge">
          <CheckCircle size={16} />
          <span>Already Registered</span>
        </div>
      )}

      <div className="course-card-header">
        <div className="course-info">
          <h3 className="course-id">{course.id}</h3>
          <h4 className="course-name">{course.name}</h4>
          <p className="course-description">{course.description}</p>
        </div>
        <div className="course-rating">
          <div className="stars-container">{renderStars(course.rating)}</div>
          <p className="reviews-count">{course.reviews} reviews</p>
        </div>
      </div>

      <div className="course-details">
        <div className="course-details-left">
          <div className="detail-item">
            <User size={14} />
            <span>{course.instructor}</span>
          </div>
          <div className="detail-item">
            <Clock size={14} />
            <span>{course.schedule}</span>
          </div>
        </div>
        <div className="course-details-right">
          <div className="detail-item">
            <Users size={14} />
            <span>
              {course.enrolled}/{course.capacity} enrolled
            </span>
          </div>
          <div className="detail-item">
            <BookOpen size={14} className="credits-icon" />
            <span>{course.credits} credits</span>
          </div>
        </div>
      </div>

      <div className="course-footer">
        <div className="course-footer-left">
          <div className="course-price">
            <DollarSign size={18} className="price-icon" />
            <span className="price-amount">${course.cost}</span>
          </div>
          <div
            className={`availability-badge ${getAvailabilityClass(
              availability
            )}`}
          >
            {getAvailabilityText(availability)}
          </div>
        </div>

        <button
          onClick={() => onSelect(course)}
          className={`course-select-btn ${isSelected ? "selected" : ""} ${
            isAlreadyRegistered ? "disabled-registered" : ""
          }`}
          disabled={isAlreadyRegistered}
        >
          {isAlreadyRegistered
            ? "Registered"
            : isSelected
            ? "Selected"
            : "Select Course"}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
