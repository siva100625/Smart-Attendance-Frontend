import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import {
  getFacultyCourses,
  getCourseStudents,
  markStudentAttendance,
  getCourseReport,
  exportCourseReport,
} from "../../api/facultyApi";

const FacultyAttendancePage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [students, setStudents] = useState([]);
  const [report, setReport] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [markingId, setMarkingId] = useState(null); // Track which student is being updated

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await getFacultyCourses();
      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleCourseChange = async (courseId) => {
    setSelectedCourseId(courseId);
    setReport([]);
    if (!courseId) {
      setStudents([]);
      return;
    }
    setLoadingStudents(true);
    try {
      const res = await getCourseStudents(courseId);
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleMarkAttendance = async (studentId, present) => {
    setMarkingId(`${studentId}-${present}`);
    try {
      await markStudentAttendance(selectedCourseId, studentId, present);
      // Small visual feedback without a jarring alert if possible, 
      // but keeping alert as per your logic:
      alert(`${present ? "Present" : "Absent"} marked successfully`);
    } catch (error) {
      alert("Failed to mark attendance");
    } finally {
      setMarkingId(null);
    }
  };

  const handleLoadReport = async () => {
    try {
      const res = await getCourseReport(selectedCourseId);
      setReport(res.data);
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  const handleExportExcel = async () => {
    try {
      const res = await exportCourseReport(selectedCourseId);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Attendance_Report_${selectedCourseId}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error exporting report:", error);
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        <header style={styles.header}>
          <div>
            <h2 style={styles.title}>Faculty Command Center</h2>
            <p style={styles.subtitle}>Manage student presence and generate academic reports.</p>
          </div>
        </header>

        {/* Course Selection */}
        <div style={styles.card}>
          <label style={styles.label}>Active Course Session</label>
          <select
            style={styles.select}
            value={selectedCourseId}
            onChange={(e) => handleCourseChange(e.target.value)}
          >
            <option value="">-- Select Course to Start Marking --</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.courseName} • {course.courseCode}
              </option>
            ))}
          </select>
        </div>

        {selectedCourseId && (
          <div style={styles.mainGrid}>
            {/* Mark Attendance Section */}
            <section style={styles.listSection}>
              <div style={styles.sectionHeader}>
                <h3 style={styles.sectionTitle}>Roll Call</h3>
                <span style={styles.countBadge}>{students.length} Students</span>
              </div>

              <div style={styles.tableWrapper}>
                {loadingStudents ? (
                  <div style={styles.infoBox}>Fetching class list...</div>
                ) : students.length === 0 ? (
                  <div style={styles.infoBox}>No students enrolled in this course.</div>
                ) : (
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.theadRow}>
                        <th style={styles.th}>Student Details</th>
                        <th style={{ ...styles.th, textAlign: "center" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student) => (
                        <tr key={student.id} style={styles.tr}>
                          <td style={styles.td}>
                            <div style={styles.nameText}>{student.name}</div>
                            <div style={styles.emailText}>{student.email}</div>
                          </td>
                          <td style={{ ...styles.td, textAlign: "center" }}>
                            <div style={styles.btnGroup}>
                              <button
                                style={{ ...styles.btn, ...styles.btnPresent }}
                                onClick={() => handleMarkAttendance(student.id, true)}
                                disabled={markingId === `${student.id}-true`}
                              >
                                P
                              </button>
                              <button
                                style={{ ...styles.btn, ...styles.btnAbsent }}
                                onClick={() => handleMarkAttendance(student.id, false)}
                                disabled={markingId === `${student.id}-false`}
                              >
                                A
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </section>

            {/* Reports Section */}
            <section style={styles.reportSection}>
              <div style={styles.sectionHeader}>
                <h3 style={styles.sectionTitle}>Course Insights</h3>
                <div style={styles.btnGroup}>
                  <button onClick={handleLoadReport} style={styles.secondaryBtn}>View Report</button>
                  <button onClick={handleExportExcel} style={styles.exportBtn}>Excel</button>
                </div>
              </div>

              {report.length > 0 ? (
                <div style={styles.tableWrapper}>
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.theadRow}>
                        <th style={styles.th}>Student</th>
                        <th style={styles.th}>Ratio</th>
                        <th style={styles.th}>%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.map((r, index) => (
                        <tr key={index} style={styles.tr}>
                          <td style={styles.td}>{r.studentName}</td>
                          <td style={styles.td}>{r.presentCount}/{r.totalClasses}</td>
                          <td style={styles.td}>
                            <span style={{
                              ...styles.percentBadge,
                              color: r.percentage >= 75 ? "#166534" : "#991b1b"
                            }}>
                              {r.percentage}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={styles.emptyReport}>
                  Click "View Report" to see performance analytics.
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </Layout>
  );
};

const styles = {
  container: { maxWidth: "1200px", margin: "0 auto", fontFamily: "'Inter', sans-serif" },
  header: { marginBottom: "24px" },
  title: { fontSize: "26px", fontWeight: "800", color: "#0f172a", margin: 0 },
  subtitle: { color: "#64748b", fontSize: "14px", marginTop: "4px" },
  card: { backgroundColor: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0", marginBottom: "24px" },
  label: { display: "block", fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", marginBottom: "8px", letterSpacing: "0.025em" },
  select: { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#f8fafc", cursor: "pointer", fontSize: "15px" },
  mainGrid: { display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "24px", alignItems: "start" },
  listSection: { backgroundColor: "white", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" },
  reportSection: { backgroundColor: "white", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" },
  sectionHeader: { padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" },
  sectionTitle: { fontSize: "16px", fontWeight: "700", color: "#1e293b", margin: 0 },
  countBadge: { fontSize: "11px", fontWeight: "700", backgroundColor: "#eff6ff", color: "#2563eb", padding: "4px 8px", borderRadius: "6px" },
  tableWrapper: { maxHeight: "60vh", overflowY: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  theadRow: { backgroundColor: "#f8fafc", position: "sticky", top: 0, zIndex: 1 },
  th: { padding: "12px 20px", textAlign: "left", fontSize: "11px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" },
  tr: { borderBottom: "1px solid #f1f5f9" },
  td: { padding: "12px 20px" },
  nameText: { fontSize: "14px", fontWeight: "600", color: "#1e293b" },
  emailText: { fontSize: "12px", color: "#64748b" },
  btnGroup: { display: "flex", gap: "8px", justifyContent: "center" },
  btn: { width: "36px", height: "36px", borderRadius: "8px", border: "none", color: "white", fontWeight: "800", cursor: "pointer", transition: "transform 0.1s" },
  btnPresent: { backgroundColor: "#10b981", boxShadow: "0 2px 4px rgba(16, 185, 129, 0.2)" },
  btnAbsent: { backgroundColor: "#ef4444", boxShadow: "0 2px 4px rgba(239, 68, 68, 0.2)" },
  secondaryBtn: { padding: "6px 12px", fontSize: "13px", fontWeight: "600", backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "6px", cursor: "pointer" },
  exportBtn: { padding: "6px 12px", fontSize: "13px", fontWeight: "600", backgroundColor: "#1e293b", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" },
  percentBadge: { fontWeight: "700", fontSize: "14px" },
  infoBox: { padding: "40px", textAlign: "center", color: "#94a3b8", fontSize: "14px" },
  emptyReport: { padding: "60px 40px", textAlign: "center", color: "#94a3b8", fontSize: "14px", fontStyle: "italic" }
};

export default FacultyAttendancePage;