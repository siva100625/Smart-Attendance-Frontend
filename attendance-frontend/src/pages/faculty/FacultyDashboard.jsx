import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const facultyName = "Professor"; // This can be dynamic later

  return (
    <Layout>
      <div style={styles.pageContainer}>
        {/* Welcome Section */}
        <header style={styles.header}>
          <div style={styles.welcomeText}>
            <h1 style={styles.title}>Welcome, {facultyName}</h1>
            <p style={styles.subtitle}>
              University Management System | Faculty Portal
            </p>
          </div>
          <div style={styles.dateBadge}>
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </header>

        {/* Action Grid */}
        <div style={styles.grid}>
          <div 
            style={styles.actionCard} 
            onClick={() => navigate("/faculty/attendance")}
          >
            <div style={{ ...styles.iconBox, backgroundColor: "#eef2ff" }}>
              <span style={styles.icon}>📝</span>
            </div>
            <h3 style={styles.cardTitle}>Mark Attendance</h3>
            <p style={styles.cardDescription}>
              Select your active course sessions and log student presence for today's classes.
            </p>
            <span style={styles.linkText}>Launch Tracker →</span>
          </div>

          <div 
            style={styles.actionCard} 
            onClick={() => navigate("/faculty/attendance")} // Or a specific reports route if you have one
          >
            <div style={{ ...styles.iconBox, backgroundColor: "#f0fdf4" }}>
              <span style={styles.icon}>📊</span>
            </div>
            <h3 style={styles.cardTitle}>View Reports</h3>
            <p style={styles.cardDescription}>
              Analyze attendance trends and export course records to Excel spreadsheets.
            </p>
            <span style={styles.linkText}>Open Analytics →</span>
          </div>
        </div>

        {/* System Note */}
        <div style={styles.footerNote}>
          <span style={styles.statusDot}></span>
          Your sessions are synchronized with the central administrative database.
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  pageContainer: {
    maxWidth: "1100px",
    margin: "0 auto",
    fontFamily: "'Inter', sans-serif",
    paddingTop: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "40px",
    borderBottom: "1px solid #e2e8f0",
    paddingBottom: "24px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#1e293b",
    margin: 0,
    letterSpacing: "-0.025em",
  },
  subtitle: {
    fontSize: "16px",
    color: "#64748b",
    marginTop: "4px",
  },
  dateBadge: {
    padding: "8px 16px",
    backgroundColor: "white",
    borderRadius: "20px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    fontWeight: "600",
    color: "#475569",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
    marginBottom: "40px",
  },
  actionCard: {
    backgroundColor: "white",
    padding: "32px",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    ":hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    }
  },
  iconBox: {
    width: "56px",
    height: "56px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  },
  icon: {
    fontSize: "24px",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "12px",
  },
  cardDescription: {
    fontSize: "14px",
    color: "#64748b",
    lineHeight: "1.6",
    marginBottom: "24px",
  },
  linkText: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#4f46e5",
  },
  footerNote: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "13px",
    color: "#94a3b8",
    justifyContent: "center",
  },
  statusDot: {
    width: "8px",
    height: "8px",
    backgroundColor: "#10b981",
    borderRadius: "50%",
  }
};

export default FacultyDashboard;