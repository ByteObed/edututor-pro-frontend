// src/services/api.js - Frontend API service using axios
/*import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
*/
// Request interceptor for logging
/*api.interceptors.request.use(
  (config) => {
    console.log(
      `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`,
      config.data || ""
    );
    return config;
  },
  (error) => {
    console.error("❌ API Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(
      `✅ API Response: ${response.config.method?.toUpperCase()} ${
        response.config.url
      }`,
      response.data
    );
    return response;
  },
  (error) => {
    console.error(
      "❌ API Response Error:",
      error.response?.data || error.message
    );

    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 404:
          console.error("Resource not found");
          break;
        case 409:
          console.error("Conflict:", data.message);
          break;
        case 400:
          console.error("Bad Request:", data.message);
          break;
        case 500:
          console.error("Server Error:", data.message);
          break;
        default:
          console.error("API Error:", data.message || "Unknown error");
      }
    } else if (error.request) {
      console.error("Network Error: No response received");
    } else {
      console.error("Request Setup Error:", error.message);
    }

    return Promise.reject(error);
  }
);

// ✅ API service methods
const apiService = {
  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get("/health");
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Register student
  registerStudent: async (studentData) => {
    try {
      const response = await api.post("/students/register", studentData);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get student by ID
  getStudent: async (studentId) => {
    try {
      const response = await api.get(`/students/${studentId}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get majors
  getMajors: async () => {
    try {
      const response = await api.get("/majors");
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get courses by major
  getCoursesByMajor: async (major, searchTerm = "") => {
    try {
      const params = searchTerm ? { search: searchTerm } : {};
      const response = await api.get(`/courses/${encodeURIComponent(major)}`, {
        params,
      });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get single course
  getCourse: async (courseId) => {
    try {
      const response = await api.get(`/course/${courseId}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Enroll in course
  enrollInCourse: async (courseId, studentId) => {
    try {
      const response = await api.post(`/courses/${courseId}/enroll`, {
        studentId,
        action: "enroll",
      });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Unenroll from course
  unenrollFromCourse: async (courseId, studentId) => {
    try {
      const response = await api.post(`/courses/${courseId}/enroll`, {
        studentId,
        action: "unenroll",
      });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // ✅ Complete registration - now accepts full payload
  completeRegistration: async (payload) => {
    try {
      const response = await api.post(
        `/students/complete-registration`,
        payload
      );
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get statistics
  getStats: async () => {
    try {
      const response = await api.get("/stats");
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
};

// ✅ Centralized error handler
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
*/
// src/services/api.js - Frontend API service using axios
import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// ✅ Log requests
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

// ✅ Log responses
api.interceptors.response.use(
  (response) => {
    console.log(
      `✅ Response: ${response.config.method?.toUpperCase()} ${
        response.config.url
      }`,
      response.data
    );
    return response;
  },
  (error) => {
    console.error("❌ API Error:", error.response?.data || error.message);
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

  // ✅ Get all majors
  getMajors: async () => {
    const res = await api.get("/majors");
    return res.data;
  },

  // ✅ Get courses by major
  getCoursesByMajor: async (majorName) => {
    const res = await api.get(`/courses/${encodeURIComponent(majorName)}`);
    return res.data;
  },

  // ✅ Get all courses (optional)
  getAllCourses: async () => {
    const res = await api.get("/courses");
    return res.data;
  },

  // ✅ Complete student registration (new or existing)
  completeRegistration: async (payload) => {
    const res = await api.post("/students/complete-registration", payload);
    return res.data;
  },

  // ✅ Get student by email
  getStudentByEmail: async (email) => {
    const res = await api.get(`/students/email/${encodeURIComponent(email)}`);
    return res.data;
  },

  // ✅ Get all students
  getAllStudents: async () => {
    const res = await api.get("/students");
    return res.data;
  },

  // ✅ Delete student
  deleteStudent: async (id) => {
    const res = await api.delete(`/students/${id}`);
    return res.data;
  },

  // ✅ Update student courses
  updateStudentCourses: async (id, selectedCourses) => {
    const res = await api.put(`/students/${id}/update-courses`, {
      selectedCourses,
    });
    return res.data;
  },

  // ✅ Register one course manually (if used)
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
