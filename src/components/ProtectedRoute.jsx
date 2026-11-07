
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./LoadingScreen.css";

function LoadingScreen() {
  return (
    <div className="aura-loader">
      <div className="loader-content">

        <div className="loader-logo">
          <span>A</span>
          <div className="logo-orbit"></div>
        </div>

        <h1>AURA<span>.</span></h1>
        <p className="loader-subtitle">
          ACADEMIC INTELLIGENCE PLATFORM
        </p>

        <div className="loader-progress">
          <div className="loader-progress-fill"></div>
        </div>

        <p className="loader-status">
          Preparing your workspace...
        </p>

      </div>

      <div className="loader-footer">
        POWERED BY AURA TECHNOLOGY
      </div>
    </div>
  );
}

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  return user ? children : <Navigate to="/login" replace />;
}

export function GuestRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  return user ? <Navigate to="/" replace /> : children;
}
