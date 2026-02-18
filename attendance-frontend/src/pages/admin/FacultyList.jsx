import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getAllFaculty } from "../../api/adminApi";

function FacultyList() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFaculty();
  }, []);

  const loadFaculty = async () => {
    try {
      const res = await getAllFaculty();
      setFaculty(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Helper to get initials for avatar
  const getInitials = (name) => name?.split(" ").map(n => n[0]).join("").toUpperCase() || "?";

  return (
    <Layout>
      <div style={styles.pageContainer}>
        <header style={styles.header}>
          <div style={styles.titleGroup}>
            <h2 style={styles.title}>Faculty Directory</h2>
            <p style={styles.subtitle}>Manage and view all registered academic staff members.</p>
          </div>
          <div style={styles.countBadge}>{faculty.length} Total Members</div>
        </header>

        <div style={styles.tableCard}>
          {loading ? (
            <div style={styles.loadingArea}>
              <div className="spinner" style={styles.spinner}></div>
              <p style={styles.loadingText}>Synchronizing directory...</p>
            </div>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr style={styles.theadRow}>
                  <th style={styles.th}>Faculty Member</th>
                  <th style={styles.th}>Email Address</th>
                  <th style={styles.th}>Role</th>
                  <th style={styles.th}>Auth Provider</th>
                  <th style={{ ...styles.th, textAlign: 'right' }}>ID</th>
                </tr>
              </thead>

              <tbody>
                {faculty.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={styles.emptyState}>
                      <div style={styles.emptyIcon}>📂</div>
                      <p>No faculty members found in the system.</p>
                    </td>
                  </tr>
                ) : (
                  faculty.map((user) => (
                    <tr key={user.id} style={styles.tr}>
                      <td style={styles.td}>
                        <div style={styles.userProfile}>
                          <div style={styles.avatar}>{getInitials(user.name)}</div>
                          <span style={styles.userName}>{user.name}</span>
                        </div>
                      </td>
                      <td style={styles.tdEmail}>{user.email}</td>
                      <td style={styles.td}>
                        <span style={styles.roleBadge}>{user.role}</span>
                      </td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.providerBadge,
                          backgroundColor: user.provider === 'GOOGLE' ? '#e0f2fe' : '#f3f4f6',
                          color: user.provider === 'GOOGLE' ? '#0369a1' : '#374151'
                        }}>
                          {user.provider === 'GOOGLE' && <span style={{marginRight: '4px'}}>🌐</span>}
                          {user.provider}
                        </span>
                      </td>
                      <td style={styles.tdId}>#{user.id}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  pageContainer: {
    maxWidth: "1100px",
    margin: "0 auto",
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  title: {
    fontSize: "24px",
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
  countBadge: {
    backgroundColor: "#f3f4f6",
    color: "#4b5563",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },
  tableCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  theadRow: {
    backgroundColor: "#f9fafb",
    borderBottom: "1px solid #e5e7eb",
  },
  th: {
    padding: "16px 24px",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: "600",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  tr: {
    borderBottom: "1px solid #f3f4f6",
    transition: "background-color 0.2s",
  },
  td: {
    padding: "16px 24px",
  },
  userProfile: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#6366f1",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    fontWeight: "700",
  },
  userName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#111827",
  },
  tdEmail: {
    padding: "16px 24px",
    fontSize: "14px",
    color: "#6b7280",
  },
  roleBadge: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#4f46e5",
    backgroundColor: "#eef2ff",
    padding: "4px 10px",
    borderRadius: "6px",
  },
  providerBadge: {
    fontSize: "11px",
    fontWeight: "600",
    padding: "4px 10px",
    borderRadius: "6px",
    display: "inline-flex",
    alignItems: "center",
  },
  tdId: {
    padding: "16px 24px",
    fontSize: "13px",
    color: "#9ca3af",
    textAlign: "right",
    fontFamily: "monospace",
  },
  loadingArea: {
    padding: "60px",
    textAlign: "center",
  },
  loadingText: {
    color: "#9ca3af",
    fontSize: "14px",
    marginTop: "12px",
  },
  emptyState: {
    padding: "80px",
    textAlign: "center",
    color: "#9ca3af",
  },
  emptyIcon: {
    fontSize: "40px",
    marginBottom: "12px",
  }
};

export default FacultyList;