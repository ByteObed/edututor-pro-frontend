import React, { useState } from "react";
import { BookOpen, CreditCard, X, CheckCircle } from "lucide-react";
import "./SelectedCoursesPanel.css";

const SelectedCoursesPanel = ({
  selectedCourses,
  studentInfo,
  totalCredits,
  totalCost,
  onRemoveCourse,
  onClearAll,
  onCompleteRegistration,
  isRegistering,
}) => {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const handleProceedToCheckout = () => {
    if (!studentInfo) {
      alert("Student info is missing. Please fill the student form first.");
      return;
    }

    if (selectedCourses.length === 0) {
      alert(
        "⚠️ Please select at least one course before completing registration."
      );
      return;
    }

    setShowCheckoutModal(true);
  };

  const handleConfirmRegistration = () => {
    const payload = {
      studentId: studentInfo.studentId || studentInfo.id,
      name: `${studentInfo.firstName} ${studentInfo.lastName}`,
      major: studentInfo.major,
      courses: selectedCourses.map((course) => ({
        id: course.id,
        name: course.name,
        credits: course.credits,
        cost: course.cost,
      })),
      totalCredits,
      totalCost,
    };

    setShowCheckoutModal(false);
    onCompleteRegistration(payload);
  };

  return (
    <div className="selected-courses-panel">
      <h2 className="panel-title">Selected Courses</h2>

      {selectedCourses.length === 0 ? (
        <div className="empty-state">
          <BookOpen size={48} className="empty-icon" />
          <p className="empty-message">No courses selected yet</p>
          <p className="empty-submessage">
            Choose from the {studentInfo?.major || "available"} courses above
          </p>
        </div>
      ) : (
        <div className="selected-courses-content">
          <div className="courses-list">
            {selectedCourses.map((course) => (
              <div key={course.id} className="selected-course-item">
                <div className="selected-course-info">
                  <h4 className="selected-course-id">{course.id}</h4>
                  <p className="selected-course-name">{course.name}</p>
                  <p className="selected-course-details">
                    {course.credits} credits | ${course.cost}
                  </p>
                </div>
                <button
                  onClick={() => onRemoveCourse(course.id)}
                  className="remove-course-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="panel-summary">
            <div className="summary-card">
              <div className="summary-row">
                <span className="summary-label">Total Credits:</span>
                <span className="summary-value credits-value">
                  {totalCredits}
                </span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Total Cost:</span>
                <span className="summary-value cost-value">${totalCost}</span>
              </div>
            </div>

            <div className="panel-actions">
              <button
                onClick={handleProceedToCheckout}
                className="btn btn-primary complete-btn"
                disabled={isRegistering || selectedCourses.length === 0}
              >
                <CreditCard size={20} />
                {isRegistering ? "Processing..." : "Proceed to Checkout"}
              </button>
              <button
                onClick={onClearAll}
                className="btn btn-gray clear-btn"
                disabled={selectedCourses.length === 0}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="checkout-modal-overlay">
          <div className="checkout-modal">
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="modal-close-btn"
            >
              <X size={24} />
            </button>

            <div className="modal-header">
              <div className="modal-icon">
                <CreditCard size={32} />
              </div>
              <h2 className="modal-title">Payment Required</h2>
              <p className="modal-subtitle">
                Complete your course registration
              </p>
            </div>

            <div className="modal-body">
              <div className="courses-summary">
                {selectedCourses.map((course) => (
                  <div key={course.id} className="summary-course-item">
                    <div className="summary-course-info">
                      <span className="summary-course-id">{course.id}</span>
                      <span className="summary-course-name">{course.name}</span>
                    </div>
                    <span className="summary-course-price">${course.cost}</span>
                  </div>
                ))}
                <div className="summary-total">
                  <span className="summary-total-label">Total Amount</span>
                  <span className="summary-total-value">${totalCost}</span>
                </div>
              </div>

              <div className="payment-info-box">
                <p>
                  <strong>Note:</strong> Payment integration is planned for
                  future implementation. This will connect to
                  Paystack/Flutterwave in production.
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button
                onClick={handleConfirmRegistration}
                className="btn btn-primary modal-confirm-btn"
                disabled={isRegistering}
              >
                <CheckCircle size={20} />
                Confirm Registration (Demo)
              </button>
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="btn btn-gray modal-cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedCoursesPanel;
