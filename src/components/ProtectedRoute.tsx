import { ReactNode, useEffect, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { supabase } from "../supabaseClient"

type Role = "student" | "faculty" | "admin"

interface ProtectedRouteProps {
  children: ReactNode
  allowedRole: Role
}

export default function ProtectedRoute({
  children,
  allowedRole,
}: ProtectedRouteProps) {
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    let mounted = true

    const checkAccess = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (!mounted) return

      if (error || !session) {
        setAllowed(false)
        setLoading(false)
        return
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .maybeSingle()

      if (!mounted) return

      if (profileError || !profile?.role) {
        setAllowed(false)
        setLoading(false)
        return
      }

      setAllowed(profile.role === allowedRole)
      setLoading(false)
    }

    checkAccess()

    return () => {
      mounted = false
    }
  }, [allowedRole])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Checking access…
      </div>
    )
  }

  if (!allowed) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}