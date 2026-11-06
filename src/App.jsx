
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet
} from "react-router-dom";

import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import Subjects from "./pages/Subjects.jsx";
import Tasks from "./pages/Tasks.jsx";
import Assistant from "./pages/Assistant.jsx";
import NotFound from "./pages/NotFound.jsx";
import AboutAyu from "./pages/AboutAyu.jsx";
import Community from "./pages/community.jsx";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

import ProtectedRoute, {
  GuestRoute
} from "./components/ProtectedRoute.jsx";

import { AcademicProvider } from "./context/AcademicContext.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";

import "./styles/global.css";

function AppLayout() {
  return (
    <AcademicProvider>
      <TaskProvider>
        <div className="app-container">
          <Sidebar />
          <div className="main-wrapper">
            <Navbar />
            <Outlet />
          </div>
        </div>
      </TaskProvider>
    </AcademicProvider>
  );
}

function App() {
  return (
    <BrowserRouter basename="/AuraPLATINUMx1.0">
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <GuestRoute>
              <Signup />
            </GuestRoute>
          }
        />

        {/* Protected application */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/about" element={<AboutAyu />} />
          <Route path="/community" element={<Community />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
