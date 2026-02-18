import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getStudentCourses, getAttendance, getAttendancePercentage } from "../../api/studentApi";

const ViewAttendance = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStudentCourses()
      .then(res => setCourses(res.data))
      .catch(err => console.error("Error fetching courses:", err));
  }, []);

  useEffect(() => {
    if (!selectedCourse) return;
    setLoading(true);

    Promise.all([
      getAttendance(selectedCourse.id),
      getAttendancePercentage(selectedCourse.id)
    ])
      .then(([attRes, percRes]) => {
        setAttendance(attRes.data);
        setPercentage(percRes.data);
      })
      .catch(err => console.error("Error updating view:", err))
      .finally(() => setLoading(false));
  }, [selectedCourse]);

  // Determine color based on attendance health
  const getHealthColor = (perc) => {
    if (perc >= 75) return "#10b981"; // Green
    if (perc >= 60) return "#f59e0b"; // Orange
    return "#ef4444"; // Red
  };

  return (
    <Layout>
      <div style={styles.container}>
        <header style={styles.header}>
          <div>
            <h2 style={styles.title}>Attendance Records</h2>
            <p style={styles.subtitle}>Select a course to analyze your presence and track progress.</p>
          </div>
        </header>

        <div style={styles.selectionCard}>
          <label style={styles.label}>Choose Course</label>
          <select
            style={styles.select}
            onChange={e => {
              const course = courses.find(c => c.id === +e.target.value);
              setSelectedCourse(course);
            }}
          >
            <option value="">Select a course...</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>{c.courseName}</option>
            ))}
          </select>
        </div>

        {selectedCourse && (
          <div style={styles.statsGrid}>
            {/* Percentage Card */}
            <div style={styles.percentageCard}>
              <h3 style={styles.cardTitle}>Attendance Summary</h3>
              <div style={styles.visualContainer}>
                <div style={{
                  ...styles.percentageCircle,
                  borderColor: getHealthColor(percentage)
                }}>
                  <span style={styles.percentText}>{percentage}%</span>
                </div>
                <div style={styles.statusText}>
                  Status: <span style={{ color: getHealthColor(percentage), fontWeight: '700' }}>
                    {percentage >= 75 ? "Excellent" : percentage >= 60 ? "At Risk" : "Low"}
                  </span>
                </div>
              </div>
            </div>

            {/* Log Card */}
            <div style={styles.logCard}>
              <h3 style={styles.cardTitle}>Session History</h3>
              <div style={styles.logWrapper}>
                {attendance.length === 0 ? (
                  <p style={styles.emptyText}>No sessions recorded for this course.</p>
                ) : (
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.theadRow}>
                        <th style={styles.th}>Date</th>
                        <th style={styles.th}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendance.map(a => (
                        <tr key={a.id} style={styles.tr}>
                          <td style={styles.tdDate}>{new Date(a.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}</td>
                          <td style={styles.td}>
                            <span style={{
                              ...styles.statusBadge,
                              backgroundColor: a.status === 'PRESENT' ? '#dcfce7' : '#fee2e2',
                              color: a.status === 'PRESENT' ? '#166534' : '#991b1b'
                            }}>
                              {a.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

const styles = {
  container: { maxWidth: "1000px", margin: "0 auto", fontFamily: "'Inter', sans-serif" },
  header: { marginBottom: "24px" },
  title: { fontSize: "26px", fontWeight: "800", color: "#0f172a", margin: 0 },
  subtitle: { color: "#64748b", fontSize: "14px", marginTop: "4px" },
  selectionCard: { backgroundColor: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0", marginBottom: "24px" },
  label: { display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "8px" },
  select: { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", cursor: "pointer" },
  statsGrid: { display: "grid", gridTemplateColumns: "1fr 2fr", gap: "24px" },
  percentageCard: { backgroundColor: "white", padding: "30px", borderRadius: "12px", border: "1px solid #e2e8f0", textAlign: "center" },
  visualContainer: { display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" },
  percentageCircle: { width: "120px", height: "120px", borderRadius: "50%", border: "8px solid", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.4s ease" },
  percentText: { fontSize: "28px", fontWeight: "800", color: "#1e293b" },
  logCard: { backgroundColor: "white", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" },
  cardTitle: { fontSize: "16px", fontWeight: "700", color: "#1e293b", padding: "20px", margin: 0, borderBottom: "1px solid #f1f5f9" },
  logWrapper: { maxHeight: "400px", overflowY: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  theadRow: { backgroundColor: "#f8fafc" },
  th: { padding: "12px 20px", textAlign: "left", fontSize: "11px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" },
  tr: { borderBottom: "1px solid #f1f5f9" },
  tdDate: { padding: "14px 20px", fontSize: "14px", color: "#1e293b", fontWeight: "500" },
  td: { padding: "14px 20px" },
  statusBadge: { padding: "4px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "700" },
  emptyText: { padding: "40px", color: "#94a3b8", textAlign: "center" }
};

export default ViewAttendance;