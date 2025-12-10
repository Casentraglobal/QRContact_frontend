import React from "react";
import { apiRequest } from "../utils/api.js";

export default function Register() {
  const [form, setForm] = React.useState({
    name: "",
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
      const data = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify(form),
      });
      localStorage.setItem("token", data.token);
      alert("Registered & logged in");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={onChange}
        />
        <br />
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
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}
