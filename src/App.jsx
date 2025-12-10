import React from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import GoogleLoginButton from "./components/GoogleLoginButton.jsx";
import AppleLoginButton from "./components/AppleLoginButton.jsx";
import { apiRequest } from "./utils/api.js";

function Home() {
  const [me, setMe] = React.useState(null);

  const fetchMe = async () => {
    try {
      const data = await apiRequest("/auth/me");
      setMe(data.user);
    } catch (err) {
      console.log(err.message);
      setMe(null);
    }
  };

  React.useEffect(() => {
    fetchMe();
  }, []);

  return (
    <div>
      <h1>MERN Auth Demo</h1>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <a href="http://localhost:5000/api/auth/sso/redirect">Login with SSO</a>
      </nav>

      <h3>Social Login</h3>
      <GoogleLoginButton />
      <AppleLoginButton />

      <h3>Current user</h3>
      {me ? (
        <pre>{JSON.stringify(me, null, 2)}</pre>
      ) : (
        <p>No user / not logged in</p>
      )}
    </div>
  );
}

function SsoSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
    }
    navigate("/");
  }, [location, navigate]);

  return <p>Completing SSO...</p>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sso-success" element={<SsoSuccess />} />
    </Routes>
  );
}
