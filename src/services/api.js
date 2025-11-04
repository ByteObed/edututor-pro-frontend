// src/services/api.js - Frontend API service using axios
import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

//  Log requests
api.interceptors.request.use(
  (config) => {
    console.log(
      `🚀 Request: ${config.method?.toUpperCase()} ${config.url}`,
      config.data || ""
    );
    return config;
  },
  (error) => Promise.reject(error)
);

//  Log responses
api.interceptors.response.use(
  (response) => {
    console.log(
      ` Response: ${response.config.method?.toUpperCase()} ${
        response.config.url
      }`,
      response.data
    );
    return response;
  },
  (error) => {
    console.error(" API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/* ========= API METHODS ========= */
const apiService = {
  // Health check
  healthCheck: async () => {
    const res = await api.get("/health");
    return res.data;
  },

  //  Get all majors
  getMajors: async () => {
    const res = await api.get("/majors");
    return res.data;
  },

  //  Get courses by major
  getCoursesByMajor: async (majorName) => {
    const res = await api.get(`/courses/${encodeURIComponent(majorName)}`);
    return res.data;
  },

  //  Get all courses (optional)
  getAllCourses: async () => {
    const res = await api.get("/courses");
    return res.data;
  },

  //  Complete student registration (new or existing)
  completeRegistration: async (payload) => {
    const res = await api.post("/students/complete-registration", payload);
    return res.data;
  },

  //  Get student by email
  getStudentByEmail: async (email) => {
    const res = await api.get(`/students/email/${encodeURIComponent(email)}`);
    return res.data;
  },

  //  Get all students
  getAllStudents: async () => {
    const res = await api.get("/students");
    return res.data;
  },

  //  Delete student
  deleteStudent: async (id) => {
    const res = await api.delete(`/students/${id}`);
    return res.data;
  },

  //  Update student courses
  updateStudentCourses: async (id, selectedCourses) => {
    const res = await api.put(`/students/${id}/update-courses`, {
      selectedCourses,
    });
    return res.data;
  },

  //  Register one course manually (if used)
  registerCourse: async (email, course) => {
    const res = await api.post("/students/register-course", { email, course });
    return res.data;
  },
};

/* ========= ERROR HANDLER ========= */
export const handleApiError = (error) => {
  if (error.response) {
    return {
      success: false,
      message: error.response.data?.message || "Server error occurred",
      status: error.response.status,
      data: error.response.data || null,
    };
  } else if (error.request) {
    return {
      success: false,
      message: "Network error - please check your connection",
      status: 0,
      data: null,
    };
  } else {
    return {
      success: false,
      message: error.message || "Unknown error occurred",
      status: -1,
      data: null,
    };
  }
};

export default apiService;
