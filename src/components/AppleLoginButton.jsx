import React from "react";
import { apiRequest } from "../utils/api.js";

export default function AppleLoginButton() {
  const handleAppleLogin = async () => {
    // TODO: integrate real Apple JS SDK or native iOS/Android to get idToken
    const idToken = window.appleIdToken; // example placeholder

    if (!idToken) {
      alert("Implement Apple JS SDK & set window.appleIdToken");
      return;
    }

    try {
      const res = await apiRequest("/auth/apple", {
        method: "POST",
        body: JSON.stringify({ idToken }),
      });
      localStorage.setItem("token", res.token);
      alert("Apple login success");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <button type="button" onClick={handleAppleLogin}>
      Sign in with Apple (placeholder)
    </button>
  );
}
