import axios from "./axiosConfig";

// ✅ 1️⃣ Get all courses assigned to logged-in faculty
export const getFacultyCourses = async () => {
  return await axios.get("/faculty/attendance/courses");
};


// ✅ 2️⃣ Get students enrolled in selected course
export const getCourseStudents = async (courseId) => {
  return await axios.get(
    `/faculty/attendance/course/${courseId}/students`
  );
};


// ✅ 3️⃣ Mark attendance for a student
export const markStudentAttendance = async (
  courseId,
  studentId,
  present
) => {
  return await axios.post(
    `/faculty/attendance/${courseId}/student/${studentId}`,
    null,
    {
      params: { present },
    }
  );
};



/* =========================================================
   FACULTY REPORT APIs
========================================================= */

// ✅ 4️⃣ Get attendance report of a course
export const getCourseReport = async (courseId) => {
  return await axios.get(
    `/faculty/course/${courseId}/report`
  );
};


// ✅ 5️⃣ Export attendance report to Excel
export const exportCourseReport = async (courseId) => {
  return await axios.get(
    `/faculty/course/${courseId}/export`,
    {
      responseType: "blob", // important for file download
    }
  );
};
