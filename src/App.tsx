import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Student from "@/pages/Student"
import Faculty from "@/pages/Faculty"
import Admin from "@/pages/Admin"
import AuthCallback from "@/pages/AuthCallback"

import ProtectedRoute from "@/components/ProtectedRoute"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* SUPABASE OAUTH CALLBACK */}
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* PROTECTED */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <Student />
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty"
          element={
            <ProtectedRoute role="faculty">
              <Faculty />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}