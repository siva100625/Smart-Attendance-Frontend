import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import {
  getAllUsers,
  deleteUser,
  getUserPhoto
} from "../../api/adminApi";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [photos, setPhotos] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllUsers();
      const userData = res.data;
      setUsers(userData);

      // Load photos asynchronously
      const photoMap = {};
      const photoPromises = userData.map(async (user) => {
        try {
          const photoUrl = await getUserPhoto(user.id);
          photoMap[user.id] = photoUrl;
        } catch {
          photoMap[user.id] = null;
        }
      });

      await Promise.all(photoPromises);
      setPhotos(photoMap);
    } catch (err) {
      console.error(err);
      alert("Failed to synchronize user records");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanent action: Delete this user account?")) return;

    try {
      await deleteUser(id);
      loadUsers(); 
    } catch (err) {
      console.error(err);
      alert("System could not process deletion.");
    }
  };

  const getInitials = (name) => name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U";

  return (
    <Layout>
      <div style={styles.pageContainer}>
        <header style={styles.header}>
          <div style={styles.titleSection}>
            <h2 style={styles.title}>User Management</h2>
            <p style={styles.subtitle}>Administrative control for all system accounts and permissions.</p>
          </div>
          <button style={styles.addUserBtn} onClick={() => navigate("/admin/create-user")}>
            + New User
          </button>
        </header>

        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.theadRow}>
                <th style={styles.th}>Profile</th>
                <th style={styles.th}>Account Details</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Provider</th>
                <th style={{ ...styles.th, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr><td colSpan="5" style={styles.loadingCell}>Refreshing directory...</td></tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} style={styles.tr}>
                    <td style={styles.td}>
                      {photos[user.id] ? (
                        <img
                          src={photos[user.id]}
                          alt="profile"
                          style={styles.profileImg}
                        />
                      ) : (
                        <div style={styles.initialsCircle}>{getInitials(user.name)}</div>
                      )}
                    </td>

                    <td style={styles.td}>
                      <div style={styles.userName}>{user.name}</div>
                      <div style={styles.userEmail}>{user.email}</div>
                      <div style={styles.userId}>ID: #{user.id}</div>
                    </td>

                    <td style={styles.td}>
                      <span style={{
                        ...styles.roleBadge,
                        color: user.role === 'ADMIN' ? '#991b1b' : user.role === 'FACULTY' ? '#3730a3' : '#065f46',
                        backgroundColor: user.role === 'ADMIN' ? '#fee2e2' : user.role === 'FACULTY' ? '#e0e7ff' : '#dcfce7',
                      }}>
                        {user.role}
                      </span>
                    </td>

                    <td style={styles.td}>
                      <span style={styles.providerText}>{user.provider}</span>
                    </td>

                    <td style={{ ...styles.td, textAlign: "right" }}>
                      <div style={styles.actionGroup}>
                        <button
                          style={styles.editBtn}
                          onClick={() => navigate(`/admin/users/${user.id}`, { state: { user } })}
                        >
                          Edit
                        </button>
                        <button
                          style={styles.deleteBtn}
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
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
  pageContainer: { maxWidth: "1200px", margin: "0 auto", fontFamily: "'Inter', sans-serif" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" },
  titleSection: { textAlign: "left" },
  title: { fontSize: "28px", fontWeight: "800", color: "#111827", margin: 0, letterSpacing: "-0.03em" },
  subtitle: { color: "#6b7280", fontSize: "14px", marginTop: "4px" },
  addUserBtn: {
    backgroundColor: "#4f46e5", color: "white", padding: "10px 20px", borderRadius: "8px",
    border: "none", fontWeight: "600", cursor: "pointer", transition: "all 0.2s"
  },
  card: { backgroundColor: "white", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  theadRow: { backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb" },
  th: { padding: "16px 24px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" },
  tr: { borderBottom: "1px solid #f3f4f6", transition: "background-color 0.2s" },
  td: { padding: "16px 24px" },
  profileImg: { width: "45px", height: "45px", borderRadius: "50%", objectFit: "cover", border: "2px solid #e5e7eb" },
  initialsCircle: {
    width: "45px", height: "45px", borderRadius: "50%", backgroundColor: "#f3f4f6",
    color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "14px", fontWeight: "700", border: "2px solid #e5e7eb"
  },
  userName: { fontSize: "15px", fontWeight: "600", color: "#111827" },
  userEmail: { fontSize: "13px", color: "#6b7280" },
  userId: { fontSize: "11px", color: "#9ca3af", fontFamily: "monospace", marginTop: "2px" },
  roleBadge: { padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", textTransform: "uppercase" },
  providerText: { fontSize: "13px", color: "#374151", fontWeight: "500" },
  actionGroup: { display: "flex", gap: "8px", justifyContent: "flex-end" },
  editBtn: {
    padding: "6px 12px", backgroundColor: "white", color: "#4f46e5", border: "1px solid #e0e7ff",
    borderRadius: "6px", fontSize: "13px", fontWeight: "600", cursor: "pointer"
  },
  deleteBtn: {
    padding: "6px 12px", backgroundColor: "#fef2f2", color: "#dc2626", border: "1px solid #fee2e2",
    borderRadius: "6px", fontSize: "13px", fontWeight: "600", cursor: "pointer"
  },
  loadingCell: { padding: "60px", textAlign: "center", color: "#9ca3af", fontStyle: "italic" }
};

export default UsersList;