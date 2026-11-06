
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await signup(username, password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Account creation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-logo">AURA</div>
        <p className="auth-tagline">Start building your future.</p>

        <h1>Create Account</h1>
        <p className="auth-subtitle">Join your academic universe.</p>

        <label>Username</label>
        <input
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength={3}
          maxLength={20}
          required
          autoComplete="username"
        />

        <small className="auth-hint">
          Use 3–20 letters, numbers or underscores.
        </small>

        <label>Password</label>
        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
          autoComplete="new-password"
        />

        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Enter password again"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          autoComplete="new-password"
        />

        {error && <p className="auth-error">{error}</p>}

        <button className="auth-button" disabled={loading}>
          {loading ? "Creating account..." : "Create AURA Account"}
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
