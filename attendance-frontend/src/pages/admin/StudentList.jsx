import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getAllStudents } from "../../api/adminApi";

function StudentsList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const res = await getAllStudents();
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => name?.split(" ").map(n => n[0]).join("").toUpperCase() || "S";

  return (
    <Layout>
      <div style={styles.pageWrapper}>
        <header style={styles.header}>
          <div>
            <h2 style={styles.title}>Student Directory</h2>
            <p style={styles.subtitle}>View and manage all enrolled students across the institution.</p>
          </div>
          <div style={styles.statsBadge}>{students.length} Enrolled</div>
        </header>

        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.theadRow}>
                <th style={styles.th}>Student Info</th>
                <th style={styles.th}>Email Address</th>
                <th style={styles.th}>Provider</th>
                <th style={{ ...styles.th, textAlign: "right" }}>Student ID</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" style={styles.loadingCell}>Fetching records...</td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan="4" style={styles.emptyCell}>No students found in the database.</td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} style={styles.tr}>
                    <td style={styles.td}>
                      <div style={styles.profileBox}>
                        <div style={styles.avatar}>{getInitials(student.name)}</div>
                        <span style={styles.nameText}>{student.name}</span>
                      </div>
                    </td>
                    <td style={styles.emailText}>{student.email}</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.badge,
                        backgroundColor: student.provider === "GOOGLE" ? "#f0f9ff" : "#f8fafc",
                        color: student.provider === "GOOGLE" ? "#0369a1" : "#64748b",
                        border: `1px solid ${student.provider === "GOOGLE" ? "#bae6fd" : "#e2e8f0"}`
                      }}>
                        {student.provider}
                      </span>
                    </td>
                    <td style={styles.idText}>#{student.id}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  pageWrapper: {
    maxWidth: "1100px",
    margin: "0 auto",
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "24px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#0f172a",
    margin: 0,
    letterSpacing: "-0.02em",
  },
  subtitle: {
    color: "#64748b",
    fontSize: "14px",
    marginTop: "4px",
  },
  statsBadge: {
    backgroundColor: "#eff6ff",
    color: "#2563eb",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "700",
    border: "1px solid #dbeafe",
  },
  tableCard: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  theadRow: {
    backgroundColor: "#f8fafc",
    borderBottom: "1px solid #e2e8f0",
  },
  th: {
    padding: "16px 24px",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: "600",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  tr: {
    borderBottom: "1px solid #f1f5f9",
    transition: "background-color 0.2s ease",
  },
  td: {
    padding: "14px 24px",
  },
  profileBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "#3b82f6",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "700",
  },
  nameText: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1e293b",
  },
  emailText: {
    padding: "14px 24px",
    fontSize: "14px",
    color: "#64748b",
  },
  badge: {
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  idText: {
    padding: "14px 24px",
    textAlign: "right",
    fontSize: "13px",
    color: "#94a3b8",
    fontFamily: "monospace",
  },
  loadingCell: {
    padding: "40px",
    textAlign: "center",
    color: "#64748b",
    fontStyle: "italic",
  },
  emptyCell: {
    padding: "40px",
    textAlign: "center",
    color: "#94a3b8",
  },
};

export default StudentsList;