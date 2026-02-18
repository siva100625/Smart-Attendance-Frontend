import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
function Layout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar />
        <main style={{ padding: "32px", flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
export default Layout;