import React from "react";
import Layout from "../../components/Layout";

const StudentDashboard = () => {
  // In a real application, you would grab the user's name from your Auth Context or LocalStorage
  const studentName = "Student"; 

  return (
    <Layout>
      <div style={styles.pageContainer}>
        <div style={styles.welcomeCard}>
          <div style={styles.content}>
            <span style={styles.emoji}>🎓</span>
            <h1 style={styles.title}>Welcome, {studentName}!</h1>
            <p style={styles.subtitle}>
              You are currently logged into the Student Portal. Here you can 
              track your academic progress and monitor your course attendance.
            </p>
          </div>
          
          <div style={styles.footer}>
            <div style={styles.statusIndicator}>
              <div style={styles.dot}></div>
              System Active
            </div>
            <div style={styles.dateDisplay}>
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "70vh", // Centers the welcome card visually in the main area
    fontFamily: "'Inter', sans-serif",
  },
  welcomeCard: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "white",
    borderRadius: "20px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
    overflow: "hidden",
  },
  content: {
    padding: "48px 40px",
    textAlign: "center",
  },
  emoji: {
    fontSize: "48px",
    display: "block",
    marginBottom: "20px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#1e293b",
    margin: "0 0 16px 0",
    letterSpacing: "-0.025em",
  },
  subtitle: {
    fontSize: "16px",
    color: "#64748b",
    lineHeight: "1.6",
    margin: 0,
  },
  footer: {
    backgroundColor: "#f8fafc",
    padding: "16px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #f1f5f9",
  },
  statusIndicator: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#059669",
  },
  dot: {
    width: "8px",
    height: "8px",
    backgroundColor: "#10b981",
    borderRadius: "50%",
    boxShadow: "0 0 0 4px rgba(16, 185, 129, 0.1)",
  },
  dateDisplay: {
    fontSize: "13px",
    color: "#94a3b8",
    fontWeight: "500",
  },
};

export default StudentDashboard;