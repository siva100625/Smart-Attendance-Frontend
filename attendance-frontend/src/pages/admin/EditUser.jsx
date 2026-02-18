import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { updateUser, getUserById } from "../../api/adminApi";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadUser();
  }, [id]);

  // Handle photo preview
  useEffect(() => {
    if (!photo) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(photo);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  const loadUser = async () => {
    try {
      const res = await getUserById(id);
      setForm(res.data);
    } catch (err) {
      console.error(err);
      alert("System could not retrieve user data.");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const formData = new FormData();
      // Only send essential fields to the backend
      formData.append("user", JSON.stringify({
        name: form.name,
        email: form.email,
        role: form.role
      }));

      if (photo) {
        formData.append("photo", photo);
      }

      await updateUser(id, formData);
      alert("User profile updated successfully");
      navigate("/admin/users");
    } catch (err) {
      console.error(err);
      alert("Update failed. Please check your connection.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!form) {
    return (
      <Layout>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p>Fetching Profile...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={styles.pageWrapper}>
        <div style={styles.header}>
          <button onClick={() => navigate(-1)} style={styles.backBtn}>
            ← Back to Directory
          </button>
          <h2 style={styles.title}>Update Profile: <span style={styles.titleId}>#{id}</span></h2>
        </div>

        <div style={styles.card}>
          <form onSubmit={submit} style={styles.form}>
            
            <div style={styles.avatarSection}>
              <div style={styles.previewBox}>
                {preview ? (
                  <img src={preview} alt="New Preview" style={styles.imagePreview} />
                ) : (
                  <div style={styles.emptyAvatar}>{form.name?.[0]?.toUpperCase()}</div>
                )}
              </div>
              <div style={styles.uploadInfo}>
                <label style={styles.fileLabel}>
                  Change Profile Photo
                  <input
                    type="file"
                    style={styles.hiddenFile}
                    onChange={(e) => setPhoto(e.target.files[0])}
                    accept="image/*"
                  />
                </label>
                <p style={styles.helpText}>JPEG or PNG. Max 2MB.</p>
              </div>
            </div>

            <div style={styles.divider}></div>

            <div style={styles.inputGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  style={styles.input}
                  value={form.name || ""}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  type="email"
                  style={styles.input}
                  value={form.email || ""}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>System Role</label>
                <select
                  style={styles.select}
                  value={form.role || ""}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option value="STUDENT">Student</option>
                  <option value="FACULTY">Faculty Staff</option>
                  <option value="ADMIN">System Admin</option>
                </select>
              </div>
            </div>

            <div style={styles.footer}>
              <button 
                type="submit" 
                disabled={isSaving} 
                style={{
                  ...styles.submitBtn,
                  backgroundColor: isSaving ? "#94a3b8" : "#4f46e5"
                }}
              >
                {isSaving ? "Saving Changes..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  pageWrapper: { maxWidth: "700px", margin: "0 auto", fontFamily: "'Inter', sans-serif" },
  header: { marginBottom: "24px", textAlign: "left" },
  backBtn: { background: "none", border: "none", color: "#6366f1", fontWeight: "600", cursor: "pointer", marginBottom: "12px", padding: 0 },
  title: { fontSize: "24px", fontWeight: "800", color: "#111827", margin: 0 },
  titleId: { color: "#94a3b8", fontWeight: "400" },
  card: { backgroundColor: "white", borderRadius: "16px", padding: "32px", border: "1px solid #e5e7eb", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)" },
  avatarSection: { display: "flex", alignItems: "center", gap: "24px", marginBottom: "32px" },
  previewBox: { width: "80px", height: "80px", borderRadius: "50%", overflow: "hidden", backgroundColor: "#f3f4f6", border: "2px solid #e5e7eb" },
  imagePreview: { width: "100%", height: "100%", objectFit: "cover" },
  emptyAvatar: { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", fontWeight: "700", color: "#9ca3af" },
  fileLabel: { color: "#4f46e5", fontWeight: "600", cursor: "pointer", fontSize: "14px", textDecoration: "underline" },
  hiddenFile: { display: "none" },
  helpText: { color: "#6b7280", fontSize: "12px", margin: "4px 0 0 0" },
  divider: { height: "1px", backgroundColor: "#f3f4f6", margin: "32px 0" },
  inputGrid: { display: "flex", flexDirection: "column", gap: "20px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "14px", fontWeight: "600", color: "#374151" },
  input: { padding: "12px 16px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "15px", outline: "none" },
  select: { padding: "12px 16px", borderRadius: "8px", border: "1px solid #d1d5db", backgroundColor: "white", fontSize: "15px" },
  footer: { marginTop: "32px", borderTop: "1px solid #f3f4f6", paddingTop: "24px" },
  submitBtn: { width: "100%", padding: "14px", borderRadius: "8px", border: "none", color: "white", fontWeight: "700", fontSize: "16px", cursor: "pointer" },
  loadingContainer: { display: "flex", flexDirection: "column", alignItems: "center", padding: "100px 0", color: "#6b7280" }
};

export default EditUser;