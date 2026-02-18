import axios from "./axiosConfig";

export const getUsers = () => axios.get("/admin/users");

export const createUser = (data) =>
  axios.post("/admin/users", data);

export const createCourse = (name, code) =>
  axios.post("/admin/courses", null, { params: { name, code } });

export const assignFaculty = (courseId, facultyId) =>
  axios.put(`/admin/courses/${courseId}/assign-faculty/${facultyId}`);

export const assignStudentToCourse = (studentId, courseId) =>
  axios.post(`/admin/enrollments/${courseId}/assign-student/${studentId}`);

export const getAllUsers = () =>
  axios.get("admin/users");

export const getAllStudents = () =>
  axios.get("/admin/students");

// Get all courses
export const getCourses = () => axios.get("/admin/courses");

// Delete course
export const deleteCourse = (courseId) =>
  axios.delete(`/admin/courses/${courseId}`);

export const updateUser = (id, formData) =>
  axios.put(`admin/users/${id}`, formData);

export const getUserById = (id) =>
  axios.get(`admin/users/${id}`);

// Delete user
export const deleteUser = (id) =>
  axios.delete(`admin/users/${id}`);

// Get photo
export const getUserPhoto = async (id) => {
  const res = await axios.get(`/admin/users/${id}/photo`, {
    responseType: "blob", // important
  });
  return URL.createObjectURL(res.data);
};

export const getAllFaculty = () =>
  axios.get("/admin/faculty");
