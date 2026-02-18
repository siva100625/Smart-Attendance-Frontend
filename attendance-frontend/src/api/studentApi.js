import axios from "./axiosConfig";

// ✅ Get all courses for the logged-in student
export const getStudentCourses = () => axios.get("/student/attendance/courses");

// ✅ Get attendance for a specific course
export const getAttendance = (courseId) =>
  axios.get(`/student/attendance/${courseId}`);

// ✅ Get attendance percentage for a specific course
export const getAttendancePercentage = (courseId) =>
  axios.get(`/student/attendance/${courseId}/percentage`);
