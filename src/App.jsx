// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentInfoPage from "./pages/StudentInfoPage";
import CourseSelectionPage from "./pages/CourseSelectionPage";
import Footer from "./pages/Footer";
import "./App.css";

function App() {
  const [studentInfo, setStudentInfo] = useState(null);

  //  Load from localStorage when the app starts
  useEffect(() => {
    const savedInfo = localStorage.getItem("studentInfo");
    if (savedInfo) {
      setStudentInfo(JSON.parse(savedInfo));
    }
  }, []);

  //  Whenever studentInfo updates, save it to localStorage
  useEffect(() => {
    if (studentInfo) {
      localStorage.setItem("studentInfo", JSON.stringify(studentInfo));
    }
  }, [studentInfo]);

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
