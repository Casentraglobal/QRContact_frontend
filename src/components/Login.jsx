import React from "react";
import { apiRequest } from "../utils/api.js";

export default function Login() {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
      });
      localStorage.setItem("token", data.token);
      alert("Logged in");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login (email/password)</h2>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
        />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
        />
        <br />
        <button disabled={loading} type="submit">
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
