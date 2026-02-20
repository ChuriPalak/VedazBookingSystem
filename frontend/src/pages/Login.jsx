import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/vedaz.css";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
  try {
    setLoading(true);
    setError("");

    // ✅ IMPORTANT: clear old auth first
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    const res = await api.post("/auth/login", form);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    if (res.data.user.role === "expert") {
      navigate("/expert-dashboard");
    } else {
      navigate("/home");
    }
  } catch (err) {
    console.log(err);
    setError(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Vedaz Login</h2>

        {error && <p className="error-text">{error}</p>}

        <label>Email</label>
        <input
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
        />

        <button
          className="confirm-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="demo-box">
          <p><strong>Customer:</strong> customer@vedaz.com / 123456</p>
          <p><strong>Expert:</strong> expert@vedaz.com / 123456</p>
        </div>
      </div>
    </div>
  );
}