import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Subjects from './pages/Subjects';
import Tasks from './pages/Tasks';
import Assistant from './pages/Assistant';
import NotFound from './pages/NotFound';
import { AcademicProvider } from './context/AcademicContext';
import { TaskProvider } from './context/TaskContext';
import './styles/global.css';

function AppLayout() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AcademicProvider>
        <TaskProvider>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="subjects" element={<Subjects />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="assistant" element={<Assistant />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </TaskProvider>
      </AcademicProvider>
    </BrowserRouter>
  );
}

export default App;