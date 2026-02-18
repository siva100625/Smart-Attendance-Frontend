import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update layout when window size changes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={styles.wrapper}>
      {/* Navbar */}
      <nav style={{ 
        ...styles.navbar, 
        padding: isMobile ? "15px 20px" : "20px 80px" 
      }}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>🎓</span> Smart Track
        </div>
        <button style={styles.navBtn} onClick={() => navigate("/login")}>
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <header style={{ 
        ...styles.hero, 
        padding: isMobile ? "60px 20px" : "100px 80px" 
      }}>
        <div style={styles.heroContent}>
          <h1 style={{ 
            ...styles.title, 
            fontSize: isMobile ? "36px" : "56px" 
          }}>
            Smart Attendance <br /> 
            <span style={styles.highlight}>Management</span>
          </h1>
          <p style={{ 
            ...styles.subtitle, 
            fontSize: isMobile ? "16px" : "18px" 
          }}>
            A centralized platform for students, faculty, and administrators to 
            manage course presence in real-time.
          </p>
          <div style={{ 
            ...styles.ctaGroup, 
            flexDirection: isMobile ? "column" : "row" 
          }}>
            <button style={styles.primaryBtn} onClick={() => navigate("/login")}>
              Get Started
            </button>
            {!isMobile && <button style={styles.secondaryBtn}>Learn More</button>}
          </div>
        </div>
      </header>

      {/* Portal Selection Section */}
      <section style={{ 
        ...styles.section, 
        padding: isMobile ? "40px 20px" : "80px 80px" 
      }}>
        <h2 style={{ 
          ...styles.sectionTitle, 
          fontSize: isMobile ? "24px" : "32px" 
        }}>Select Your Portal</h2>
        
        <div style={{ 
          ...styles.grid, 
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)" 
        }}>
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

      <footer style={styles.footer}>
        © 2026 Smart Track 
      </footer>
    </div>
  );
};

const portals = [
  {
    title: "Student Portal",
    description: "Check your attendance and course history.",
    icon: "📖",
    bg: "#eff6ff",
  },
  {
    title: "Faculty Portal",
    description: "Mark attendance and export Excel reports.",
    icon: "👨‍🏫",
    bg: "#f0fdf4",
  },
  {
    title: "Admin Dashboard",
    description: "Manage users and course assignments.",
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
    overflowX: "hidden", // Prevents horizontal scroll on mobile
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #f1f5f9",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "800",
    color: "#4f46e5",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  navBtn: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    backgroundColor: "white",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "14px",
  },
  hero: {
    textAlign: "center",
    background: "radial-gradient(circle at top right, #f8fafc, #ffffff)",
  },
  heroContent: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  title: {
    fontWeight: "900",
    lineHeight: "1.1",
    letterSpacing: "-0.04em",
    margin: "0 0 20px 0",
  },
  highlight: {
    color: "#4f46e5",
  },
  subtitle: {
    color: "#64748b",
    lineHeight: "1.6",
    marginBottom: "30px",
  },
  ctaGroup: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
  },
  primaryBtn: {
    padding: "14px 28px",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
  },
  secondaryBtn: {
    padding: "14px 28px",
    backgroundColor: "white",
    color: "#475569",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
  },
  section: {
    backgroundColor: "#f8fafc",
  },
  sectionTitle: {
    textAlign: "center",
    fontWeight: "800",
    marginBottom: "32px",
  },
  grid: {
    display: "grid",
    gap: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    textAlign: "center",
  },
  iconBox: {
    width: "50px",
    height: "50px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px auto",
    fontSize: "24px",
  },
  cardHeader: {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "8px",
  },
  cardText: {
    fontSize: "14px",
    color: "#64748b",
    lineHeight: "1.5",
  },
  footer: {
    padding: "30px",
    textAlign: "center",
    fontSize: "12px",
    color: "#94a3b8",
  },
};

export default Homepage;