import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getCourses, getAllFaculty, assignFaculty } from "../../api/adminApi";

const AssignFaculty = () => {
  const [courses, setCourses] = useState([]);
  const [facultyList, setFacultyList] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isUpdating, setIsUpdating] = useState(null);

  useEffect(() => {
    fetchCourses();
    fetchFaculty();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await getCourses();
      setCourses(res.data);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    }
  };

  const fetchFaculty = async () => {
    try {
      const res = await getAllFaculty();
      setFacultyList(res.data);
    } catch (err) {
      console.error("Failed to fetch faculty:", err);
    }
  };

  const handleAssignFaculty = async (courseId, facultyId) => {
    setIsUpdating(courseId);
    try {
      await assignFaculty(courseId, facultyId);
      await fetchCourses(); 
      setMessage({ text: "Faculty assigned successfully!", type: "success" });
    } catch (err) {
      console.error("Failed to assign faculty:", err);
      setMessage({ text: "Failed to assign faculty.", type: "error" });
    } finally {
      setIsUpdating(null);
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.title}>Faculty Assignment</h1>
            <p style={styles.subtitle}>Manage and link faculty members to active academic courses.</p>
          </div>
          {message.text && (
            <div style={{
              ...styles.toast,
              backgroundColor: message.type === "success" ? "#ecfdf5" : "#fef2f2",
              color: message.type === "success" ? "#065f46" : "#991b1b",
              border: `1px solid ${message.type === "success" ? "#a7f3d0" : "#fecaca"}`
            }}>
              {message.type === "success" ? "✓" : "✕"} {message.text}
            </div>
          )}
        </header>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.theadRow}>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Course Name</th>
                <th style={styles.th}>Current Status</th>
                <th style={styles.th}>Assign New Faculty</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} style={styles.tr}>
                  <td style={styles.tdId}>#{course.id}</td>
                  <td style={styles.tdName}>{course.courseName}</td>
                  <td style={styles.td}>
                    {course.faculty ? (
                      <div style={styles.facultyBadge}>
                        <span style={styles.facultyIcon}>👤</span>
                        {course.faculty.name}
                      </div>
                    ) : (
                      <span style={styles.unassignedBadge}>Unassigned</span>
                    )}
                  </td>
                  <td style={styles.td}>
                    <select
                      disabled={isUpdating === course.id}
                      defaultValue=""
                      onChange={(e) => handleAssignFaculty(course.id, e.target.value)}
                      style={{
                        ...styles.select,
                        opacity: isUpdating === course.id ? 0.5 : 1
                      }}
                    >
                      <option value="" disabled>Change Assignment...</option>
                      {facultyList.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.name}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#111827",
    margin: 0,
    letterSpacing: "-0.02em",
  },
  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginTop: "4px",
  },
  toast: {
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    animation: "fadeIn 0.3s ease",
  },
  tableWrapper: {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    border: "1px solid #f3f4f6",
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  theadRow: {
    backgroundColor: "#f9fafb",
    borderBottom: "1px solid #f3f4f6",
  },
  th: {
    padding: "16px 24px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#4b5563",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  tr: {
    borderBottom: "1px solid #f9fafb",
    transition: "background-color 0.2s",
  },
  tdId: {
    padding: "16px 24px",
    fontSize: "13px",
    color: "#9ca3af",
    fontFamily: "monospace",
  },
  tdName: {
    padding: "16px 24px",
    fontSize: "15px",
    fontWeight: "600",
    color: "#111827",
  },
  td: {
    padding: "16px 24px",
  },
  facultyBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 12px",
    backgroundColor: "#f5f3ff",
    color: "#5b21b6",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "500",
  },
  facultyIcon: {
    fontSize: "12px",
    opacity: 0.7,
  },
  unassignedBadge: {
    padding: "6px 12px",
    backgroundColor: "#fff7ed",
    color: "#9a3412",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "500",
    fontStyle: "italic",
  },
  select: {
    width: "100%",
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    backgroundColor: "#fff",
    fontSize: "14px",
    color: "#374151",
    cursor: "pointer",
    outline: "none",
  }
};

export default AssignFaculty;