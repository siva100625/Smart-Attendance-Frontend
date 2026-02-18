import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Helper to style active links
  const getLinkStyle = (path) => ({
    ...styles.link,
    color: location.pathname === path ? "#ffffff" : "#94a3b8",
    borderBottom: location.pathname === path ? "2px solid #6366f1" : "2px solid transparent",
  });

  return (
    <nav style={styles.nav}>
      <div style={styles.brandSection}>
        <div style={styles.logoSquare}>A</div>
        <h3 style={styles.brandName}>Smart Attendance</h3>
      </div>

      <div style={styles.links}>
        {role === "ADMIN" && (
          <>
            <Link to="/admin" style={getLinkStyle("/admin")}>Dashboard</Link>
            <Link to="/admin/create-user" style={getLinkStyle("/admin/create-user")}>Users</Link>
            <Link to="/admin/manage-courses" style={getLinkStyle("/admin/manage-courses")}>Courses</Link>
            <Link to="/admin/assign-student" style={getLinkStyle("/admin/assign-student")}>Assignments</Link>
          </>
        )}

        {role === "FACULTY" && (
          <>
            <Link to="/faculty" style={getLinkStyle("/faculty")}>Dashboard</Link>
            <Link to="/faculty/attendance" style={getLinkStyle("/faculty/attendance")}>Attendance</Link>
          </>
        )}

        {role === "STUDENT" && (
          <>
            <Link to="/student" style={getLinkStyle("/student")}>Dashboard</Link>
            <Link to="/student/attendance" style={getLinkStyle("/student/attendance")}>My Records</Link>
          </>
        )}

        <div style={styles.divider}></div>

        <button style={styles.logoutButton} onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 40px",
    height: "70px",
    background: "#0f172a", // Deeper professional slate
    color: "#fff",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Inter', sans-serif",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  brandSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  logoSquare: {
    width: "32px",
    height: "32px",
    backgroundColor: "#6366f1",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
    fontSize: "18px",
  },
  brandName: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "700",
    letterSpacing: "-0.5px",
  },
  links: {
    display: "flex",
    gap: "24px",
    alignItems: "center",
    height: "100%",
  },
  link: {
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    height: "100%",
    display: "flex",
    alignItems: "center",
    transition: "all 0.2s ease",
    padding: "0 4px",
  },
  divider: {
    width: "1px",
    height: "24px",
    backgroundColor: "#334155",
    margin: "0 8px",
  },
  logoutButton: {
    padding: "8px 16px",
    backgroundColor: "transparent",
    color: "#f87171", // Soft red
    border: "1px solid #f87171",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    transition: "all 0.2s ease",
    outline: "none",
  },
};

export default Navbar;