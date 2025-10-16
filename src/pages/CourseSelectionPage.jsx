/*import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header/Header";
import CourseCard from "./CourseCard";
import SelectedCoursesPanel from "./SelectedCoursesPanel";
import { Search } from "lucide-react";
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
  const navigate = useNavigate();
  */

/* ========= Fetch student info & courses ========= */
/*useEffect(() => {
    const storedStudentInfo =
      propStudentInfo ||
      JSON.parse(localStorage.getItem("studentInfo") || "{}");

    if (!storedStudentInfo || !storedStudentInfo.major) {
      alert("⚠️ Please complete student information first.");
      navigate("/");
      return;
    }

    setStudentInfo(storedStudentInfo);

    // Fetch all courses
    axios
      .get("http://localhost:5000/api/courses")
      .then((response) => {
        const majorCourses = response.data.filter(
          (course) => course.major === storedStudentInfo.major
        );
        setCourses(majorCourses);
        setFilteredCourses(majorCourses);
      })
      .catch((error) => {
        console.error("❌ Error fetching courses:", error);
      });

    // Fetch already registered courses
    fetchRegisteredCourses(storedStudentInfo.email);
  }, [propStudentInfo, navigate]);
*/
/* ========= Fetch registered courses ========= */
/*const fetchRegisteredCourses = async (email) => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      const foundStudent = res.data.find((s) => s.email === email);
      if (foundStudent) {
        setRegisteredCourses(foundStudent.selectedCourses);
      }
    } catch (err) {
      console.error("❌ Error fetching registered courses:", err);
    }
  };
*/
/* ========= Search filter ========= */
/*useEffect(() => {
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
*/
/* ========= Course selection handlers ========= */
/*const handleCourseSelect = (course) => {
    if (selectedCourses.some((c) => c.id === course.id)) {
      setSelectedCourses(selectedCourses.filter((c) => c.id !== course.id));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const handleRemoveCourse = (courseId) => {
    setSelectedCourses(selectedCourses.filter((c) => c.id !== courseId));
  };

  const handleClearAll = () => {
    setSelectedCourses([]);
  };
*/
/* ========= Totals ========= */
/*const totalCredits = selectedCourses.reduce(
    (sum, course) => sum + course.credits,
    0
  );
  const totalCost = selectedCourses.reduce(
    (sum, course) => sum + course.cost,
    0
  );

  const handleCompleteRegistration = async (payload) => {
    // Validation before sending
    if (!payload.name || !payload.courses || payload.courses.length === 0) {
      alert("⚠️ Please select at least one course and enter your name.");
      return;
    }

    setIsRegistering(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/students/complete-registration",
        {
          name: payload.name,
          email: studentInfo.email || "student@example.com",
          selectedCourses: payload.courses,
        }
      );

      console.log("Registration successful:", response.data);

      // Show success message
      setShowSuccess(true);

      // Add to registered courses list (keeps history)
      setRegisteredCourses([...registeredCourses, ...payload.courses]);

      // ✅ Reset selection for next time
      setSelectedCourses([]);

      // Hide success message after 5s
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Registration error:", error);
      alert("❌ Registration failed. Please try again.");
    } finally {
      setIsRegistering(false);
    }
  };
*/
/* ========= UI ========= */
/*return (
    <div className="course-selection-page">
      <div className="container">
        <Header
          title="Course Selection"
          subtitle="Choose your preferred courses"
          showBackButton={true}
          backTo="/"
          selectedCoursesCount={selectedCourses.length}
        />
*/
//{/* Success Message */}
/*{showSuccess && (
          <div className="success-message">
            <div className="success-content">
              <span className="success-icon">✅</span>
              <div>
                <h3>Registration Successful!</h3>
                <p>Your courses have been registered successfully.</p>
              </div>
            </div>
          </div>
        )}
*/
//{/* Registered Courses Section */}
/*{registeredCourses.length > 0 && (
          <div className="registered-courses-section">
            <h2 className="registered-title">My Registered Courses</h2>
            <div className="registered-courses-list">
              {registeredCourses.map((course) => (
                <div key={course.id} className="registered-course-item">
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
*/
//{/* Search box */}
/*<div className="search-container">
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
*/
//{/* Courses Grid */}
/* <div className="courses-container">
          <h2 className="courses-title">Select Your Courses</h2>
          <div className="courses-grid">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isSelected={selectedCourses.some((c) => c.id === course.id)}
                onSelect={handleCourseSelect}
              />
            ))}
          </div>
        </div>
*/
// {/* Selected Courses Panel */}
/* <SelectedCoursesPanel
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
*/
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header/Header";
import CourseCard from "./CourseCard";
import SelectedCoursesPanel from "./SelectedCoursesPanel";
import { Search, AlertCircle } from "lucide-react";
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

  /* ========= Fetch student info & courses ========= */
  useEffect(() => {
    const storedStudentInfo =
      propStudentInfo ||
      JSON.parse(localStorage.getItem("studentInfo") || "{}");

    if (!storedStudentInfo || !storedStudentInfo.major) {
      alert("⚠️ Please complete student information first.");
      navigate("/");
      return;
    }

    setStudentInfo(storedStudentInfo);

    // Fetch all courses
    axios
      .get("http://localhost:5000/api/courses")
      .then((response) => {
        const majorCourses = response.data.filter(
          (course) => course.major === storedStudentInfo.major
        );
        setCourses(majorCourses);
        setFilteredCourses(majorCourses);
      })
      .catch((error) => {
        console.error("❌ Error fetching courses:", error);
      });

    // Fetch already registered courses
    fetchRegisteredCourses(storedStudentInfo.email);
  }, [propStudentInfo, navigate]);

  /* ========= Fetch registered courses ========= */
  const fetchRegisteredCourses = async (email) => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      const foundStudent = res.data.find((s) => s.email === email);
      if (foundStudent && foundStudent.selectedCourses) {
        setRegisteredCourses(foundStudent.selectedCourses);
      }
    } catch (err) {
      console.error("❌ Error fetching registered courses:", err);
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
  const isCourseAlreadyRegistered = (courseId) => {
    return registeredCourses.some((course) => course.id === courseId);
  };

  /* ========= Course selection handlers ========= */
  const handleCourseSelect = (course) => {
    // Check if course is already registered
    if (isCourseAlreadyRegistered(course.id)) {
      setDuplicateAlert(
        `⚠️ You have already registered for ${course.id} - ${course.name}`
      );

      // Auto-hide alert after 5 seconds
      setTimeout(() => {
        setDuplicateAlert("");
      }, 5000);

      return;
    }

    // Toggle selection for current session
    if (selectedCourses.some((c) => c.id === course.id)) {
      setSelectedCourses(selectedCourses.filter((c) => c.id !== course.id));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const handleRemoveCourse = (courseId) => {
    setSelectedCourses(selectedCourses.filter((c) => c.id !== courseId));
  };

  const handleClearAll = () => {
    setSelectedCourses([]);
  };

  /* ========= Totals ========= */
  const totalCredits = selectedCourses.reduce(
    (sum, course) => sum + course.credits,
    0
  );
  const totalCost = selectedCourses.reduce(
    (sum, course) => sum + course.cost,
    0
  );

  const handleCompleteRegistration = async (payload) => {
    // Validation before sending
    if (!payload.name || !payload.courses || payload.courses.length === 0) {
      alert("⚠️ Please select at least one course.");
      return;
    }

    // Double-check for duplicates before submitting
    const duplicates = payload.courses.filter((course) =>
      isCourseAlreadyRegistered(course.id)
    );

    if (duplicates.length > 0) {
      const duplicateNames = duplicates.map((c) => c.id).join(", ");
      alert(
        `⚠️ You have already registered for: ${duplicateNames}\n\nPlease remove these courses before proceeding.`
      );
      return;
    }

    setIsRegistering(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/students/complete-registration",
        {
          name: payload.name,
          email: studentInfo.email || "student@example.com",
          selectedCourses: payload.courses,
        }
      );

      console.log("Registration successful:", response.data);

      // Show success message
      setShowSuccess(true);

      // Add to registered courses list (keeps history)
      setRegisteredCourses([...registeredCourses, ...payload.courses]);

      // ✅ Reset selection for next time
      setSelectedCourses([]);

      // Hide success message after 5s
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Registration error:", error);
      alert("❌ Registration failed. Please try again.");
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

        {/* Success Message */}
        {showSuccess && (
          <div className="success-message">
            <div className="success-content">
              <span className="success-icon">✅</span>
              <div>
                <h3>Registration Successful!</h3>
                <p>Your courses have been registered successfully.</p>
              </div>
            </div>
          </div>
        )}

        {/* Duplicate Alert Message */}
        {duplicateAlert && (
          <div className="duplicate-alert-message">
            <div className="duplicate-alert-content">
              <AlertCircle size={24} className="alert-icon" />
              <div>
                <p>{duplicateAlert}</p>
              </div>
              <button
                onClick={() => setDuplicateAlert("")}
                className="alert-close-btn"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Registered Courses Section */}
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

        {/* Search box */}
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

        {/* Courses Grid */}
        <div className="courses-container">
          <h2 className="courses-title">Select Your Courses</h2>
          <div className="courses-grid">
            {filteredCourses.map((course) => {
              const isAlreadyRegistered = isCourseAlreadyRegistered(course.id);
              const isCurrentlySelected = selectedCourses.some(
                (c) => c.id === course.id
              );

              return (
                <CourseCard
                  key={course.id}
                  course={course}
                  isSelected={isCurrentlySelected}
                  isAlreadyRegistered={isAlreadyRegistered}
                  onSelect={handleCourseSelect}
                />
              );
            })}
          </div>
        </div>

        {/* Selected Courses Panel */}
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
