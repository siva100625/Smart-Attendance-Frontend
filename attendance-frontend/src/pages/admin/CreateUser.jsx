import { useState } from "react";
import Layout from "../../components/Layout";
import { createUser } from "../../api/adminApi";

function CreateUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
    provider: "LOCAL"
  });

  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("user", JSON.stringify(form));
      if (photo) {
        formData.append("photo", photo);
      }

      await createUser(formData);
      alert("User created successfully");
      
      // Reset form
      setForm({ name: "", email: "", password: "", role: "STUDENT", provider: "LOCAL" });
      setPhoto(null);
    } catch (err) {
      console.error(err);
      alert("Error creating user: " + (err.response?.data?.message || "Internal Server Error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div style={styles.pageContainer}>
        <div style={styles.card}>
          <div style={styles.header}>
            <h2 style={styles.title}>Create New User</h2>
            <p style={styles.subtitle}>Fill in the details to register a student, faculty, or administrator.</p>
          </div>

          <form onSubmit={submit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                required
                style={styles.input}
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                required
                type="email"
                style={styles.input}
                placeholder="john@university.edu"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input
                required
                type="password"
                style={styles.input}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Assign Role</label>
              <select
                style={styles.select}
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="STUDENT">Student</option>
                <option value="FACULTY">Faculty</option>
                <option value="ADMIN">Administrator</option>
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Profile Photo (Optional)</label>
              <div style={styles.fileInputWrapper}>
                <input
                  type="file"
                  accept="image/*"
                  style={styles.fileInput}
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
                <div style={styles.filePlaceholder}>
                  {photo ? `📁 ${photo.name}` : "Click to upload user image"}
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              style={{
                ...styles.button,
                backgroundColor: loading ? "#9ca3af" : "#4f46e5"
              }}
            >
              {loading ? "Processing..." : "Register User"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "550px",
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "40px",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    border: "1px solid #f3f4f6",
  },
  header: {
    marginBottom: "30px",
    textAlign: "left",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#111827",
    margin: "0 0 8px 0",
  },
  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    margin: 0,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
  },
  input: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.2s",
  },
  select: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    backgroundColor: "white",
    cursor: "pointer",
  },
  fileInputWrapper: {
    position: "relative",
    width: "100%",
    height: "50px",
    border: "2px dashed #e5e7eb",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
    overflow: "hidden",
  },
  fileInput: {
    position: "absolute",
    opacity: 0,
    width: "100%",
    height: "100%",
    cursor: "pointer",
  },
  filePlaceholder: {
    fontSize: "14px",
    color: "#6b7280",
  },
  button: {
    marginTop: "10px",
    padding: "14px",
    borderRadius: "8px",
    border: "none",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
};

export default CreateUser;