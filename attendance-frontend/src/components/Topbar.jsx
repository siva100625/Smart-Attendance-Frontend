import { useState } from "react";
function Topbar() {
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={styles.topbar}>
      <div style={styles.breadcrumb}>
        <span style={styles.roleBadge}>{role} Portal</span>
      </div>
      
      <div style={styles.userSection}>
        <div style={styles.userInfo}>
          <span style={styles.userName}>Active Session</span>
          <span style={styles.userStatus}>● Online</span>
        </div>
        <button onClick={logout} style={styles.logoutBtn}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

const styles = {
  topbar: {
    height: "70px",
    background: "white",
    padding: "0 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #e2e8f0"
  },
  roleBadge: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#64748b",
    background: "#f1f5f9",
    padding: "4px 12px",
    borderRadius: "6px",
    textTransform: "uppercase"
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "24px"
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    textAlign: "right"
  },
  userName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1e293b"
  },
  userStatus: {
    fontSize: "11px",
    color: "#22c55e",
    fontWeight: "500"
  },
  logoutBtn: {
    padding: "8px 16px",
    backgroundColor: "#fff",
    color: "#ef4444",
    border: "1px solid #fee2e2",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease"
  }
};
export default Topbar;
