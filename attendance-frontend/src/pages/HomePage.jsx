import React from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.wrapper}>
      {/* Simple Navigation Bar */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>🎓</span> EduTrack
        </div>
        <button style={styles.navBtn} onClick={() => navigate("/login")}>
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <header style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>
            Smart Attendance <br /> 
            <span style={styles.highlight}>Management System</span>
          </h1>
          <p style={styles.subtitle}>
            A centralized platform for students, faculty, and administrators to 
            track academic progress and manage course presence in real-time.
          </p>
          <div style={styles.ctaGroup}>
            <button style={styles.primaryBtn} onClick={() => navigate("/login")}>
              Get Started
            </button>
            <button style={styles.secondaryBtn}>Learn More</button>
          </div>
        </div>
      </header>

      {/* Portal Selection Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Select Your Portal</h2>
        <div style={styles.grid}>
          {portals.map((portal, idx) => (
            <div key={idx} style={styles.card} onClick={() => navigate("/login")}>
              <div style={{ ...styles.iconBox, backgroundColor: portal.bg }}>
                {portal.icon}
              </div>
              <h3 style={styles.cardHeader}>{portal.title}</h3>
              <p style={styles.cardText}>{portal.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Simple Footer */}
      <footer style={styles.footer}>
        © 2026 EduTrack Systems • Streamlining Academic Excellence
      </footer>
    </div>
  );
};

const portals = [
  {
    title: "Student Portal",
    description: "Check your attendance percentage and view course-wise history.",
    icon: "📖",
    bg: "#eff6ff",
  },
  {
    title: "Faculty Portal",
    description: "Mark daily attendance, manage course lists, and export Excel reports.",
    icon: "👨‍🏫",
    bg: "#f0fdf4",
  },
  {
    title: "Admin Dashboard",
    description: "Manage users, assign students to courses, and system configuration.",
    icon: "🛡️",
    bg: "#fef2f2",
  },
];

const styles = {
  wrapper: {
    fontFamily: "'Inter', sans-serif",
    color: "#1e293b",
    backgroundColor: "#ffffff",
    minHeight: "100vh",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 80px",
    borderBottom: "1px solid #f1f5f9",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#4f46e5",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  navBtn: {
    padding: "8px 20px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    backgroundColor: "white",
    fontWeight: "600",
    cursor: "pointer",
  },
  hero: {
    padding: "100px 80px",
    textAlign: "center",
    background: "radial-gradient(circle at top right, #f8fafc, #ffffff)",
  },
  heroContent: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  title: {
    fontSize: "56px",
    fontWeight: "900",
    lineHeight: "1.1",
    letterSpacing: "-0.04em",
    margin: "0 0 24px 0",
  },
  highlight: {
    color: "#4f46e5",
  },
  subtitle: {
    fontSize: "18px",
    color: "#64748b",
    lineHeight: "1.6",
    marginBottom: "40px",
  },
  ctaGroup: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
  },
  primaryBtn: {
    padding: "16px 32px",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.3)",
  },
  secondaryBtn: {
    padding: "16px 32px",
    backgroundColor: "white",
    color: "#475569",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
  section: {
    padding: "80px 80px",
    backgroundColor: "#f8fafc",
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "800",
    marginBottom: "48px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "20px",
    border: "1px solid #e2e8f0",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
  iconBox: {
    width: "64px",
    height: "64px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 24px auto",
    fontSize: "30px",
  },
  cardHeader: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "12px",
  },
  cardText: {
    fontSize: "15px",
    color: "#64748b",
    lineHeight: "1.5",
  },
  footer: {
    padding: "40px",
    textAlign: "center",
    fontSize: "14px",
    color: "#94a3b8",
    borderTop: "1px solid #f1f5f9",
  },
};

export default Homepage;