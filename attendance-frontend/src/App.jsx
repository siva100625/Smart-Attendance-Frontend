import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import OAuthSuccess from "./pages/OAuthSuccess";

import ProtectedRoute from "./components/ProtectedRoute";

/* Admin Pages */
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateUser from "./pages/admin/CreateUser";
import ManageCourses from "./pages/admin/ManageCourses";
import AssignStudent from "./pages/admin/AssignStudent";
import UsersList from "./pages/admin/UserList";
import StudentsList from "./pages/admin/StudentList";
import EditUser from "./pages/admin/EditUser";
import FacultyList from "./pages/admin/FacultyList";
import AssignFaculty from "./pages/admin/AssignFaculty";

/* Faculty Pages */
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import FacultyAttendancePage from "./pages/faculty/FacultyAttendancePage";


/* Student Pages */
import StudentDashboard from "./pages/student/StudentDashboard";
import ViewAttendance from "./pages/student/ViewAttendance";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route path="/login" element={<Login />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create-user"
          element={
            <ProtectedRoute role="ADMIN">
              <CreateUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/manage-courses"
          element={
            <ProtectedRoute role="ADMIN">
              <ManageCourses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/assign-student"
          element={
            <ProtectedRoute role="ADMIN">
              <AssignStudent />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/users" element={<ProtectedRoute role="ADMIN"><UsersList /></ProtectedRoute>} />
        <Route path="/admin/students" element={<ProtectedRoute role="ADMIN"><StudentsList /></ProtectedRoute>} />
        <Route path="/admin/users/:id" element={<ProtectedRoute role="ADMIN"><EditUser /></ProtectedRoute>} />
        <Route path="/admin/faculty" element={<ProtectedRoute role="ADMIN"><FacultyList /></ProtectedRoute>} />
        <Route path="/admin/assign-faculty" element={<ProtectedRoute role="ADMIN"><AssignFaculty /></ProtectedRoute>} />
        {/* ================= FACULTY ROUTES ================= */}
        <Route
          path="/faculty"
          element={
            <ProtectedRoute role="FACULTY">
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
      path="/faculty/attendance"
      element={
        <ProtectedRoute role="FACULTY">
          <FacultyAttendancePage />
        </ProtectedRoute>
      }
/>

        {/* ================= STUDENT ROUTES ================= */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="STUDENT">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/attendance"
          element={
            <ProtectedRoute role="STUDENT">
              <ViewAttendance />
            </ProtectedRoute>
          }
        />

        {/* Catch All Route */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
