import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const role = localStorage.getItem("role");
  const location = useLocation();
  const [hoveredPath, setHoveredPath] = useState(null);

  // Helper function to handle link styles dynamically
  const getLinkStyle = (path) => {
    const isActive = location.pathname === path;
    const isHovered = hoveredPath === path;

    return {
      ...styles.link,
      backgroundColor: isActive ? "#334155" : isHovered ? "#1e293b" : "transparent",
      color: isActive ? "#60a5fa" : "#94a3b8",
      paddingLeft: isActive || isHovered ? "20px" : "16px",
    };
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.header}>
        <div style={styles.logoBadge}>A</div>
        <h3 style={styles.brandName}>Attendance CMS</h3>
      </div>

      <div style={styles.navContainer}>
        <p style={styles.sectionLabel}>Menu</p>

        {role === "ADMIN" && (
          <div style={styles.linkGroup}>
            <Link to="/admin" style={getLinkStyle("/admin")} onMouseEnter={() => setHoveredPath("/admin")} onMouseLeave={() => setHoveredPath(null)}>Dashboard</Link>
            <Link to="/admin/create-user" style={getLinkStyle("/admin/create-user")} onMouseEnter={() => setHoveredPath("/admin/create-user")} onMouseLeave={() => setHoveredPath(null)}>Create User</Link>
            <Link to="/admin/manage-courses" style={getLinkStyle("/admin/manage-courses")} onMouseEnter={() => setHoveredPath("/admin/manage-courses")} onMouseLeave={() => setHoveredPath(null)}>Courses</Link>
            <Link to="/admin/assign-student" style={getLinkStyle("/admin/assign-student")} onMouseEnter={() => setHoveredPath("/admin/assign-student")} onMouseLeave={() => setHoveredPath(null)}>Assign</Link>
            <Link to="/admin/users" style={getLinkStyle("/admin/users")} onMouseEnter={() => setHoveredPath("/admin/users")} onMouseLeave={() => setHoveredPath(null)}>Users</Link>
            <Link to="/admin/students" style={getLinkStyle("/admin/students")} onMouseEnter={() => setHoveredPath("/admin/students")} onMouseLeave={() => setHoveredPath(null)}>Students</Link>
            <Link to="/admin/faculty" style={getLinkStyle("/admin/faculty")} onMouseEnter={() => setHoveredPath("/admin/faculty")} onMouseLeave={() => setHoveredPath(null)}>Faculty List</Link>
            <Link to="/admin/assign-faculty" style={getLinkStyle("/admin/assign-faculty")} onMouseEnter={() => setHoveredPath("/admin/assign-faculty")} onMouseLeave={() => setHoveredPath(null)}>Assign Faculty</Link>
          </div>
        )}

        {role === "FACULTY" && (
          <div style={styles.linkGroup}>
            <Link to="/faculty" style={getLinkStyle("/faculty")} onMouseEnter={() => setHoveredPath("/faculty")} onMouseLeave={() => setHoveredPath(null)}>Dashboard</Link>
            <Link to="/faculty/attendance" style={getLinkStyle("/faculty/attendance")} onMouseEnter={() => setHoveredPath("/faculty/attendance")} onMouseLeave={() => setHoveredPath(null)}>Mark Attendance</Link>
          </div>
        )}

        {role === "STUDENT" && (
          <div style={styles.linkGroup}>
            <Link to="/student" style={getLinkStyle("/student")} onMouseEnter={() => setHoveredPath("/student")} onMouseLeave={() => setHoveredPath(null)}>Dashboard</Link>
            <Link to="/student/attendance" style={getLinkStyle("/student/attendance")} onMouseEnter={() => setHoveredPath("/student/attendance")} onMouseLeave={() => setHoveredPath(null)}>My Attendance</Link>
          </div>
        )}
      </div>

      <div style={styles.footer}>
        <div style={styles.statusDot}></div>
        <span style={styles.statusText}>{role} Mode</span>
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "240px",
    background: "#0f172a", // Darker, more professional slate
    color: "white",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "4px 0 10px rgba(0,0,0,0.05)",
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    padding: "30px 24px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    borderBottom: "1px solid #1e293b",
  },
  logoBadge: {
    width: "32px",
    height: "32px",
    backgroundColor: "#6366f1",
    borderRadius: "8px",
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
  navContainer: {
    padding: "24px 12px",
    flex: 1,
  },
  sectionLabel: {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "#475569",
    fontWeight: "700",
    padding: "0 16px",
    marginBottom: "16px",
  },
  linkGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  link: {
    display: "block",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    padding: "12px 16px",
    borderRadius: "8px",
    transition: "all 0.2s ease",
  },
  footer: {
    padding: "20px 24px",
    borderTop: "1px solid #1e293b",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  statusDot: {
    width: "8px",
    height: "8px",
    backgroundColor: "#22c55e",
    borderRadius: "50%",
  },
  statusText: {
    fontSize: "12px",
    color: "#94a3b8",
    fontWeight: "500",
  },
};

export default Sidebar;