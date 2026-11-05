import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Subjects from './pages/Subjects.jsx';
import Tasks from './pages/Tasks.jsx';
import Assistant from './pages/Assistant.jsx';
import NotFound from './pages/NotFound.jsx';
import { AcademicProvider } from './context/AcademicContext.jsx';
import { TaskProvider } from './context/TaskContext.jsx';
import AboutAyu from './pages/AboutAyu.jsx';
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
    <BrowserRouter basename="/AuraPLATINUMx1.0">
      <AcademicProvider>
        <TaskProvider>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="subjects" element={<Subjects />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="assistant" element={<Assistant />} />
              <Route path="about" element={<AboutAyu />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </TaskProvider>
      </AcademicProvider>
    </BrowserRouter>
  );
}

export default App;