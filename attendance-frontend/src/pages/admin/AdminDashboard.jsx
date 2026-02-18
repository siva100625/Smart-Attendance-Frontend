import React from "react";
import Layout from "../../components/Layout";

function AdminDashboard() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
  
  const adminName = "Administrator"; // This can later be replaced with data.name from your API

  return (
    <Layout>
      <div style={styles.wrapper}>
        <div style={styles.content}>
          <header style={styles.header}>
            <div style={styles.badge}>
              <span style={styles.dot}></span>
              System Active
            </div>
            
            <h1 style={styles.greeting}>
              {greeting}, <br />
              <span style={styles.name}>{adminName}</span>
            </h1>
            
            <div style={styles.divider}></div>
            
            <p style={styles.statusMessage}>
              Welcome to the <strong>Smart Attendance Management System</strong>. 
              Your administrative session is secure and all modules are ready for operation.
            </p>

            <p style={styles.timestamp}>
              Session initiated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </header>
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  wrapper: {
    height: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    fontFamily: "'Inter', -apple-system, sans-serif",
  },
  content: {
    textAlign: "center",
    maxWidth: "600px",
    padding: "20px",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  badge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#f0fdf4",
    color: "#166534",
    padding: "6px 16px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    marginBottom: "32px",
    border: "1px solid #dcfce7",
  },
  dot: {
    width: "8px",
    height: "8px",
    backgroundColor: "#22c55e",
    borderRadius: "50%",
    boxShadow: "0 0 8px #22c55e",
  },
  greeting: {
    fontSize: "48px",
    fontWeight: "800",
    color: "#111827",
    lineHeight: "1.1",
    margin: 0,
    letterSpacing: "-0.04em",
  },
  name: {
    background: "linear-gradient(to right, #4f46e5, #7c3aed)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  divider: {
    width: "60px",
    height: "1px",
    backgroundColor: "#e5e7eb",
    margin: "40px 0",
  },
  statusMessage: {
    fontSize: "18px",
    color: "#6b7280",
    lineHeight: "1.6",
    margin: 0,
  },
  timestamp: {
    marginTop: "24px",
    fontSize: "14px",
    color: "#9ca3af",
    fontStyle: "italic",
  },
};

export default AdminDashboard;