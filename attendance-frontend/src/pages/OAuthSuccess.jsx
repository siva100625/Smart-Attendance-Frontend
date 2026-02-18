import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const role = params.get("role");

  if (token && role) {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    // Use replace to avoid history loop
if (role === "ADMIN") {
  window.location.href = "/admin";
}
else if (role === "FACULTY") {
  window.location.href = "/faculty";
}
else {
  window.location.href = "/student";
}

  } else {
    navigate("/login", { replace: true });
  }
}, [navigate]);

  return <h3>Logging you in...</h3>;
};

export default OAuthSuccess;
