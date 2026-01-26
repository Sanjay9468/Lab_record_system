import { Routes, Route, Navigate } from "react-router-dom";

import Login from "@/pages/Login";
import AuthCallback from "@/pages/AuthCallback";

import StudentDashboard from "@/pages/Student/Studentdashboard";
import FacultyDashboard from "@/pages/Faculty/Facultydashboard";
import AdminDashboard from "@/pages/Admin/Admindashboard";

import ProtectedRoute from "@/routes/ProtectedRoute";
import FacultySettings from "@/pages/Faculty/FacultySettings";

export default function App() {
  return (
    <Routes>
      {/* DEFAULT */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* PUBLIC */}
      <Route path="/login" element={<Login />} />
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* STUDENT */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      {/* FACULTY */}
      <Route
        path="/faculty"
        element={
          <ProtectedRoute allowedRole="faculty">
            <FacultyDashboard />
          </ProtectedRoute>
        }
      />
      <Route
  path="/faculty/settings"
  element={
    <ProtectedRoute allowedRole="faculty">
      <FacultySettings />
    </ProtectedRoute>
  }
/>

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}