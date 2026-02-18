import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { createCourse, getCourses } from "../../api/adminApi";

const ManageCourses = () => {
  const [course, setCourse] = useState({ name: "", code: "" });
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await getCourses();
      setCourses(res.data);
    } catch (err) {
      console.error("Failed to load courses", err);
    }
  };

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await createCourse(course.name, course.code);
      setStatus({ type: "success", message: "Course catalog updated successfully!" });
      setCourse({ name: "", code: "" });
      fetchCourses();
    } catch (err) {
      setStatus({ type: "error", message: "Code conflict: This course code may already exist." });
    } finally {
      setLoading(false);
      setTimeout(() => setStatus({ type: "", message: "" }), 4000);
    }
  };

  return (
    <Layout>
      <div style={styles.pageContainer}>
        {/* Header Section */}
        <header style={styles.header}>
          <div>
            <h2 style={styles.title}>Course Management</h2>
            <p style={styles.subtitle}>Define and organize the institution's academic offerings.</p>
          </div>
        </header>

        <div style={styles.contentGrid}>
          {/* Left Side: Creation Form */}
          <div style={styles.formCard}>
            <h3 style={styles.cardTitle}>Add New Course</h3>
            <form onSubmit={handleCreateCourse} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Course Name</label>
                <input
                  name="name"
                  value={course.name}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="e.g., Advanced Mathematics"
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Course Code</label>
                <input
                  name="code"
                  value={course.code}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="e.g., MATH-401"
                  required
                />
              </div>

              {status.message && (
                <div style={{
                  ...styles.alert,
                  backgroundColor: status.type === "success" ? "#f0fdf4" : "#fef2f2",
                  color: status.type === "success" ? "#166534" : "#991b1b"
                }}>
                  {status.message}
                </div>
              )}

              <button type="submit" disabled={loading} style={styles.submitBtn}>
                {loading ? "Processing..." : "Register Course"}
              </button>
            </form>
          </div>

          {/* Right Side: Course List */}
          <div style={styles.listCard}>
            <div style={styles.listHeader}>
              <h3 style={styles.cardTitle}>Active Courses</h3>
              <span style={styles.countBadge}>{courses.length} total</span>
            </div>
            
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.theadRow}>
                    <th style={styles.th}>Code</th>
                    <th style={styles.th}>Course Name</th>
                    <th style={{ ...styles.th, textAlign: 'right' }}>ID</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.length === 0 ? (
                    <tr>
                      <td colSpan="3" style={styles.emptyCell}>No courses registered yet.</td>
                    </tr>
                  ) : (
                    courses.map((c) => (
                      <tr key={c.id} style={styles.tr}>
                        <td style={styles.tdCode}>{c.courseCode}</td>
                        <td style={styles.tdName}>{c.courseName}</td>
                        <td style={styles.tdId}>#{c.id}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  pageContainer: { maxWidth: "1200px", margin: "0 auto", fontFamily: "'Inter', sans-serif" },
  header: { marginBottom: "32px" },
  title: { fontSize: "28px", fontWeight: "800", color: "#111827", margin: 0, letterSpacing: "-0.02em" },
  subtitle: { fontSize: "14px", color: "#64748b", marginTop: "4px" },
  contentGrid: { display: "grid", gridTemplateColumns: "1fr 2fr", gap: "24px", alignItems: "start" },
  formCard: { backgroundColor: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" },
  listCard: { backgroundColor: "white", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", overflow: "hidden" },
  cardTitle: { fontSize: "16px", fontWeight: "700", color: "#1e293b", margin: "0 0 20px 0" },
  form: { display: "flex", flexDirection: "column", gap: "20px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "13px", fontWeight: "600", color: "#475569" },
  input: { padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none" },
  alert: { padding: "10px", borderRadius: "6px", fontSize: "13px", fontWeight: "500" },
  submitBtn: { padding: "12px", backgroundColor: "#4f46e5", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" },
  listHeader: { padding: "20px 24px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" },
  countBadge: { backgroundColor: "#f1f5f9", color: "#64748b", padding: "4px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: "700" },
  tableWrapper: { maxHeight: "500px", overflowY: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  theadRow: { backgroundColor: "#f8fafc", position: "sticky", top: 0 },
  th: { padding: "12px 24px", textAlign: "left", fontSize: "11px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" },
  tr: { borderBottom: "1px solid #f1f5f9" },
  tdCode: { padding: "16px 24px", fontSize: "14px", fontWeight: "700", color: "#4f46e5", fontFamily: "monospace" },
  tdName: { padding: "16px 24px", fontSize: "14px", color: "#1e293b", fontWeight: "500" },
  tdId: { padding: "16px 24px", fontSize: "12px", color: "#94a3b8", textAlign: "right" },
  emptyCell: { padding: "40px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }
};

export default ManageCourses;