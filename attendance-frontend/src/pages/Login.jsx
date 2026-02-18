import { useState } from "react";
import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(null); // Track hover for buttons
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page refresh
    setLoading(true);
    try {
      const res = await login(email, password);
      const data = res.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      navigate("/" + data.role.toLowerCase());
    } catch (error) {
      console.error("ERROR:", error.response);
      alert(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <header style={styles.header}>
          <div style={styles.logoCircle}>🎓</div>
          <h2 style={styles.title}>Smart Attendance</h2>
          <p style={styles.subtitle}>Welcome back! Please enter your details.</p>
        </header>

        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              required
              style={styles.input}
              type="email"
              placeholder="name@company.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              required
              style={styles.input}
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            onMouseEnter={() => setIsHovered('login')}
            onMouseLeave={() => setIsHovered(null)}
            style={{
              ...styles.loginButton,
              backgroundColor: loading ? "#a5b4fc" : (isHovered === 'login' ? "#4f46e5" : "#6366f1"),
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div style={styles.dividerContainer}>
          <div style={styles.line}></div>
          <span style={styles.dividerText}>OR</span>
          <div style={styles.line}></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          onMouseEnter={() => setIsHovered('google')}
          onMouseLeave={() => setIsHovered(null)}
          style={{
            ...styles.googleButton,
            backgroundColor: isHovered === 'google' ? "#f9fafb" : "white",
          }}
        >
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google" 
            style={styles.googleIcon} 
          />
          Continue with Google
        </button>
        

      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    fontFamily: "'Inter', -apple-system, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    padding: "40px",
    borderRadius: "16px",
    backgroundColor: "white",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  header: {
    textAlign: "center",
    marginBottom: "32px",
  },
  logoCircle: {
    fontSize: "40px",
    marginBottom: "10px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#111827",
    margin: "0 0 8px 0",
  },
  subtitle: {
    color: "#6b7280",
    fontSize: "14px",
    margin: 0,
  },
  inputGroup: {
    marginBottom: "20px",
    textAlign: "left",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  loginButton: {
    width: "100%",
    padding: "12px",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    transition: "all 0.2s",
    marginTop: "10px",
  },
  dividerContainer: {
    display: "flex",
    alignItems: "center",
    margin: "24px 0",
  },
  line: {
    flex: 1,
    height: "1px",
    backgroundColor: "#e5e7eb",
  },
  dividerText: {
    margin: "0 12px",
    color: "#9ca3af",
    fontSize: "12px",
    fontWeight: "600",
  },
  googleButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "11px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "500",
    color: "#374151",
    transition: "background-color 0.2s",
  },
  googleIcon: {
    width: "18px",
    height: "18px",
  },
  footerText: {
    marginTop: "24px",
    fontSize: "13px",
    color: "#6b7280",
    textAlign: "center",
  },
  link: {
    color: "#4f46e5",
    fontWeight: "600",
    cursor: "pointer",
  }
};

export default Login;