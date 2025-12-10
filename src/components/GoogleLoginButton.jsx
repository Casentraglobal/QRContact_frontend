import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { apiRequest } from "../utils/api.js";

export default function GoogleLoginButton() {
  const handleSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    try {
      const res = await apiRequest("/auth/google", {
        method: "POST",
        body: JSON.stringify({ idToken }),
      });
      localStorage.setItem("token", res.token);
      alert("Google login success");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleError = () => {
    alert("Google login error");
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
}
