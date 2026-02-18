import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { assignStudentToCourse, getAllStudents, getCourses } from "../../api/adminApi";

const AssignStudent = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await getAllStudents();
      setStudents(res.data);
    } catch (err) {
      console.error("Fetch Students Error:", err);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await getCourses();
      setCourses(res.data);
    } catch (err) {
      console.error("Fetch Courses Error:", err);
    }
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!studentId || !courseId) {
      setStatus({ type: "error", message: "Please select both a student and a course." });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await assignStudentToCourse(studentId, courseId);
      setStatus({ type: "success", message: "Enrollment successful!" });
      setStudentId("");
      setCourseId("");
      
      // Auto-clear success message
      setTimeout(() => setStatus({ type: "", message: "" }), 4000);
    } catch (err) {
      console.error(err);
      setStatus({ 
        type: "error", 
        message: err.response?.data?.message || "Student is already enrolled in this course." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div style={styles.pageWrapper}>
        <div style={styles.card}>
          <div style={styles.header}>
            <div style={styles.iconCircle}>🔗</div>
            <div>
              <h2 style={styles.title}>Course Enrollment</h2>
              <p style={styles.subtitle}>Link a student to a specific course to enable attendance tracking.</p>
            </div>
          </div>

          <form onSubmit={handleAssign} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Select Student</label>
              <select
                style={styles.select}
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              >
                <option value="">Choose a student...</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} (ID: {s.id})
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Target Course</label>
              <select
                style={styles.select}
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
              >
                <option value="">Choose a course...</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.courseName}
                  </option>
                ))}
              </select>
            </div>

            {status.message && (
              <div style={{
                ...styles.alert,
                backgroundColor: status.type === "success" ? "#f0fdf4" : "#fef2f2",
                color: status.type === "success" ? "#166534" : "#991b1b",
                border: `1px solid ${status.type === "success" ? "#bbf7d0" : "#fecaca"}`
              }}>
                {status.type === "success" ? "✓ " : "⚠ "} {status.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                ...styles.button,
                backgroundColor: isSubmitting ? "#94a3b8" : "#4f46e5",
                cursor: isSubmitting ? "not-allowed" : "pointer"
              }}
            >
              {isSubmitting ? "Processing..." : "Confirm Enrollment"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  pageWrapper: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "40px",
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
    border: "1px solid #f1f5f9",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "32px",
  },
  iconCircle: {
    width: "48px",
    height: "48px",
    backgroundColor: "#eff6ff",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#0f172a",
    margin: 0,
    letterSpacing: "-0.02em",
  },
  subtitle: {
    fontSize: "13px",
    color: "#64748b",
    margin: "4px 0 0 0",
    lineHeight: "1.5",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#334155",
  },
  select: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    backgroundColor: "#f8fafc",
    fontSize: "15px",
    color: "#1e293b",
    outline: "none",
    transition: "border-color 0.2s ease",
    cursor: "pointer",
  },
  alert: {
    padding: "12px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
  },
  button: {
    padding: "14px",
    borderRadius: "8px",
    border: "none",
    color: "white",
    fontSize: "16px",
    fontWeight: "700",
    transition: "all 0.2s ease",
    marginTop: "8px",
  },
};

export default AssignStudent;