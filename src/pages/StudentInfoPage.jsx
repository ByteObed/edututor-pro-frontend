// src/pages/StudentInfoPage.jsx - Remove error messages and adjust spacing
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import Header from "../components/Header/Header";
import apiService, { handleApiError } from "../services/api";
import "./StudentInfoPage.css";

const StudentInfoPage = ({ setStudentInfo }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    email: "",
    major: "",
  });
  const [majors, setMajors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [majorsLoading, setMajorsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [backendStatus, setBackendStatus] = useState("checking");

  // Check backend connection and load majors on component mount
  useEffect(() => {
    const initializeComponent = async () => {
      try {
        // Check backend health
        setBackendStatus("checking");
        await apiService.healthCheck();
        setBackendStatus("connected");

        // Load available majors from backend
        setMajorsLoading(true);
        const response = await apiService.getMajors();

        if (response.success) {
          setMajors(response.data);
        } else {
          throw new Error(response.message || "Failed to load majors");
        }
      } catch (err) {
        console.error("Failed to initialize component:", err);
        setBackendStatus("disconnected");

        // Fallback to hardcoded majors if backend is not available
        setMajors([
          "Computer Science",
          "Mathematics",
          "Physics",
          "Chemistry",
          "Biology",
          "Engineering",
          "Business Administration",
          "Psychology",
        ]);

        //  REMOVED: setError() - Don't show error message to user
      } finally {
        setMajorsLoading(false);
      }
    };

    initializeComponent();
  }, []);

  //  NEW: Input validation functions
  const validateInput = (field, value) => {
    switch (field) {
      case "studentId":
        // Only numbers allowed
        return value.replace(/[^0-9]/g, "");

      case "firstName":
      case "lastName":
        // Only letters and spaces allowed
        return value.replace(/[^a-zA-Z\s]/g, "");

      case "email":
        // Allow letters, numbers, @, ., _, -
        return value.replace(/[^a-zA-Z0-9@._-]/g, "");

      default:
        return value;
    }
  };

  // Handle input changes with validation
  const handleInputChange = (field, value) => {
    //  Validate input before setting state
    const validatedValue = validateInput(field, value);

    setFormData((prev) => ({ ...prev, [field]: validatedValue }));

    // Clear errors when user starts typing
    if (error) setError("");
    if (success) setSuccess("");
  };

  // Form validation
  const validateForm = () => {
    const { studentId, firstName, lastName, email, major } = formData;

    if (!studentId.trim()) {
      setError("Student ID is required");
      return false;
    }

    //  Check if Student ID is numeric
    if (!/^\d+$/.test(studentId)) {
      setError("Student ID must contain only numbers");
      return false;
    }

    if (!firstName.trim()) {
      setError("First name is required");
      return false;
    }

    //  Check if first name contains only letters
    if (!/^[a-zA-Z\s]+$/.test(firstName)) {
      setError("First name must contain only letters");
      return false;
    }

    if (!lastName.trim()) {
      setError("Last name is required");
      return false;
    }

    //  Check if last name contains only letters
    if (!/^[a-zA-Z\s]+$/.test(lastName)) {
      setError("Last name must contain only letters");
      return false;
    }

    if (!email.trim()) {
      setError("Email is required");
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (!major) {
      setError("Please select a major");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleContinue = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (backendStatus === "connected") {
        // Register student with backend
        const response = await apiService.registerStudent(formData);

        if (response.success) {
          setSuccess(
            "Registration successful! Redirecting to course selection..."
          );

          const studentData = response.data;

          if (setStudentInfo) {
            setStudentInfo(studentData);
          }

          // Navigate to course selection after short delay
          setTimeout(() => {
            navigate("/course-selection");
          }, 1500);
        } else {
          throw new Error(response.message || "Registration failed");
        }
      } else {
        // Fallback: store data in state only (offline mode)
        const studentData = {
          ...formData,
          id: Date.now(),
          registrationDate: new Date().toISOString(),
          status: "active",
        };

        if (setStudentInfo) {
          setStudentInfo(studentData);
        }

        setSuccess(
          "Registration successful! Proceeding to course selection..."
        );

        setTimeout(() => {
          navigate("/course-selection");
        }, 1000);
      }
    } catch (err) {
      console.error("Registration failed:", err);
      const errorInfo = handleApiError(err);

      // Handle specific error cases
      if (err.response?.status === 409) {
        setError(
          "A student with this ID or email already exists. Please use different credentials."
        );
      } else if (err.response?.status === 400) {
        setError(errorInfo.message || "Please check your input and try again.");
      } else {
        setError(`Registration failed: ${errorInfo.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Check if form is valid for enabling submit button
  const isFormValid = () => {
    return (
      formData.studentId.trim() &&
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.email.trim() &&
      formData.major &&
      !loading
    );
  };

  return (
    <div className="student-info-page">
      <Header
        title="Course Registration System"
        subtitle="Professional Tutoring & Education"
      />

      <div className="page-content">
        {/*  REMOVED: Backend Status Indicator - No more red messages */}

        <div className="form-container">
          <div className="student-info-header">
            <User size={48} className="user-icon" />
            <h2 className="student-info-title">Student Information</h2>
            <p className="student-info-description">
              Please provide your details to begin course registration
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="alert alert-success">
              <CheckCircle size={20} />
              <span>{success}</span>
            </div>
          )}

          {/* Error Message - Only shows validation errors */}
          {error && (
            <div className="alert alert-error">
              <AlertCircle size={20} />
              <span>{error}</span>
              <button
                onClick={() => setError("")}
                className="alert-close"
                aria-label="Close error message"
              ></button>
            </div>
          )}

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="studentId">
                Student ID <span className="required">*</span>
              </label>
              <input
                id="studentId"
                type="text"
                value={formData.studentId}
                onChange={(e) => handleInputChange("studentId", e.target.value)}
                placeholder="Enter your student ID (numbers only)"
                maxLength={11}
                disabled={loading}
                className={error && !formData.studentId.trim() ? "error" : ""}
              />
              <small className="form-help">
                Numbers only, up to 11 digits (e.g., 12345678901)
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="firstName">
                First Name <span className="required">*</span>
              </label>
              <input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="Enter your first name (letters only)"
                disabled={loading}
                className={error && !formData.firstName.trim() ? "error" : ""}
              />
              <small className="form-help">Letters only (e.g., John)</small>
            </div>

            <div className="form-group">
              <label htmlFor="lastName">
                Last Name <span className="required">*</span>
              </label>
              <input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Enter your last name (letters only)"
                disabled={loading}
                className={error && !formData.lastName.trim() ? "error" : ""}
              />
              <small className="form-help">Letters only (e.g., Doe)</small>
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email Address <span className="required">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email address"
                disabled={loading}
                className={error && !formData.email.trim() ? "error" : ""}
              />
              <small className="form-help">
                Valid email format (e.g., john@example.com)
              </small>
            </div>

            <div className="form-group form-group-full">
              <label htmlFor="major">
                Major <span className="required">*</span>
              </label>
              {majorsLoading ? (
                <div className="select-loading">
                  <Loader2 size={16} className="spinner" />
                  <span>Loading majors...</span>
                </div>
              ) : (
                <select
                  id="major"
                  value={formData.major}
                  onChange={(e) => handleInputChange("major", e.target.value)}
                  disabled={loading}
                  className={error && !formData.major ? "error" : ""}
                >
                  <option value="">Select your major</option>
                  {majors.map((major) => (
                    <option key={major} value={major}>
                      {major}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={handleContinue}
              disabled={!isFormValid()}
              className={`btn btn-primary continue-button ${
                !isFormValid() ? "disabled" : ""
              }`}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="spinner" />
                  Processing Registration...
                </>
              ) : (
                "Continue to Course Selection"
              )}
            </button>
          </div>

          <div className="form-footer">
            <p className="form-note">
              <span className="required">*</span> Required fields
            </p>
            <p className="privacy-note">
              Your information is secure and will only be used for course
              registration purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInfoPage;
