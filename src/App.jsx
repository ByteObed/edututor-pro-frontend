import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentInfoPage from "./pages/StudentInfoPage";
import CourseSelectionPage from "./pages/CourseSelectionPage";
import Footer from "./pages/Footer";
import "./App.css";

function App() {
  const [studentInfo, setStudentInfo] = useState(
    JSON.parse(localStorage.getItem("studentInfo")) || null
  );

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={<StudentInfoPage setStudentInfo={setStudentInfo} />}
          />
          <Route
            path="/course-selection"
            element={<CourseSelectionPage studentInfo={studentInfo} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
