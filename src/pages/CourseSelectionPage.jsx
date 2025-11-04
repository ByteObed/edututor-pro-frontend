// src/pages/CourseSelectionPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, AlertCircle } from "lucide-react";
import Header from "../components/Header/Header";
import CourseCard from "./CourseCard";
import SelectedCoursesPanel from "./SelectedCoursesPanel";
import apiService from "../services/api";
import "./CourseSelectionPage.css";

const CourseSelectionPage = ({ studentInfo: propStudentInfo }) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [studentInfo, setStudentInfo] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [isRegistering, setIsRegistering] = useState(false);
  const [duplicateAlert, setDuplicateAlert] = useState("");
  const navigate = useNavigate();

  /* ========= Load student info ========= */
  useEffect(() => {
    let storedStudentInfo = propStudentInfo;

    // Retrieve from sessionStorage if not passed as prop
    if (!storedStudentInfo) {
      const sessionData = sessionStorage.getItem("studentInfo");
      if (sessionData) {
        storedStudentInfo = JSON.parse(sessionData);
      }
    } else {
      sessionStorage.setItem("studentInfo", JSON.stringify(propStudentInfo));
    }

    if (!storedStudentInfo || !storedStudentInfo.major) {
      alert(" Please complete student information first.");
      navigate("/");
      return;
    }

    setStudentInfo(storedStudentInfo);

    // Fetch available courses by major
    apiService
      .getCoursesByMajor(storedStudentInfo.major)
      .then((data) => {
        setCourses(data);
        setFilteredCourses(data);
      })
      .catch((error) => {
        console.error(" Error fetching courses:", error);
      });

    // Fetch already registered courses
    fetchRegisteredCourses(storedStudentInfo.email);
  }, [propStudentInfo, navigate]);

  /* ========= Fetch registered courses ========= */
  const fetchRegisteredCourses = async (email) => {
    try {
      //  1. Check if stored locally
      const localData = localStorage.getItem(`registered_${email}`);
      if (localData) {
        setRegisteredCourses(JSON.parse(localData));
        return;
      }

      //  2. Otherwise, fetch from backend
      const student = await apiService.getStudentByEmail(email);
      if (student && student.selectedCourses) {
        setRegisteredCourses(student.selectedCourses);
        localStorage.setItem(
          `registered_${email}`,
          JSON.stringify(student.selectedCourses)
        );
      }
    } catch (err) {
      console.error(" Error fetching registered courses:", err);
    }
  };

  /* ========= Search filter ========= */
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter((course) =>
          course.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, courses]);

  /* ========= Check if course is already registered ========= */
  const isCourseAlreadyRegistered = (courseId) =>
    registeredCourses.some((course) => course.id === courseId);

  /* ========= Select / Deselect Course ========= */
  const handleCourseSelect = (course) => {
    if (isCourseAlreadyRegistered(course.id)) {
      setDuplicateAlert(
        ` You have already registered for ${course.id} - ${course.name}`
      );
      setTimeout(() => setDuplicateAlert(""), 4000);
      return;
    }

    setSelectedCourses((prevSelected) =>
      prevSelected.some((c) => c.id === course.id)
        ? prevSelected.filter((c) => c.id !== course.id)
        : [...prevSelected, course]
    );
  };

  const handleRemoveCourse = (courseId) => {
    setSelectedCourses(selectedCourses.filter((c) => c.id !== courseId));
  };

  const handleClearAll = () => setSelectedCourses([]);

  /* ========= Totals ========= */
  const totalCredits = selectedCourses.reduce(
    (sum, course) => sum + course.credits,
    0
  );
  const totalCost = selectedCourses.reduce(
    (sum, course) => sum + course.cost,
    0
  );

  /* ========= Complete Registration ========= */
  const handleCompleteRegistration = async (payload) => {
    if (!payload.name || !payload.courses || payload.courses.length === 0) {
      alert(" Please select at least one course.");
      return;
    }

    const duplicates = payload.courses.filter((course) =>
      isCourseAlreadyRegistered(course.id)
    );

    if (duplicates.length > 0) {
      const duplicateNames = duplicates.map((c) => c.id).join(", ");
      alert(
        ` You have already registered for: ${duplicateNames}\n\nPlease remove these courses before proceeding.`
      );
      return;
    }

    setIsRegistering(true);

    try {
      const response = await apiService.completeRegistration({
        name: payload.name,
        email: studentInfo.email || "student@example.com",
        selectedCourses: payload.courses,
      });

      console.log(" Registration successful:", response);

      const updatedCourses = [...registeredCourses, ...payload.courses];
      setRegisteredCourses(updatedCourses);
      setSelectedCourses([]);
      setShowSuccess(true);

      //  Save permanently in localStorage
      localStorage.setItem(
        `registered_${studentInfo.email}`,
        JSON.stringify(updatedCourses)
      );

      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error(" Registration error:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsRegistering(false);
    }
  };

  /* ========= UI ========= */
  return (
    <div className="course-selection-page">
      <div className="container">
        <Header
          title="Course Selection"
          subtitle="Choose your preferred courses"
          showBackButton={true}
          backTo="/"
          selectedCoursesCount={selectedCourses.length}
        />

        {showSuccess && (
          <div className="success-message">
            <div className="success-content">
              <span className="success-icon"></span>
              <div>
                <h3>Registration Successful!</h3>
                <p>
                  Your courses have been saved and will remain even after
                  logout.
                </p>
              </div>
            </div>
          </div>
        )}

        {duplicateAlert && (
          <div className="duplicate-alert-message">
            <div className="duplicate-alert-content">
              <AlertCircle size={24} className="alert-icon" />
              <p>{duplicateAlert}</p>
              <button
                onClick={() => setDuplicateAlert("")}
                className="alert-close-btn"
              ></button>
            </div>
          </div>
        )}

        {registeredCourses.length > 0 && (
          <div className="registered-courses-section">
            <h2 className="registered-title">My Registered Courses</h2>
            <div className="registered-courses-list">
              {registeredCourses.map((course, index) => (
                <div
                  key={`${course.id}-${index}`}
                  className="registered-course-item"
                >
                  <div className="registered-course-badge">✓</div>
                  <div className="registered-course-info">
                    <h4>
                      {course.id} - {course.name}
                    </h4>
                    <p>
                      {course.credits} credits | ${course.cost}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="search-container">
          <div className="search-box">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="courses-container">
          <h2 className="courses-title">Select Your Courses</h2>
          <div className="courses-grid">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isSelected={selectedCourses.some((c) => c.id === course.id)}
                isAlreadyRegistered={isCourseAlreadyRegistered(course.id)}
                onSelect={handleCourseSelect}
              />
            ))}
          </div>
        </div>

        <SelectedCoursesPanel
          selectedCourses={selectedCourses}
          studentInfo={studentInfo}
          totalCredits={totalCredits}
          totalCost={totalCost}
          onRemoveCourse={handleRemoveCourse}
          onClearAll={handleClearAll}
          onCompleteRegistration={handleCompleteRegistration}
          isRegistering={isRegistering}
        />
      </div>
    </div>
  );
};

export default CourseSelectionPage;
