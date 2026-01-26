import { Navigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

export default function RoleRedirect() {
  const { role, loading } = useAuth()

  if (loading) return <div>Redirecting...</div>

  if (role === "admin") return <Navigate to="/admin" replace />
  if (role === "faculty") return <Navigate to="/faculty" replace />
  if (role === "student") return <Navigate to="/student" replace />

  return <Navigate to="/login" replace />
}