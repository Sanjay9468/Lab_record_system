import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";

interface ProtectedRouteProps {
  allowedRole: "student" | "faculty" | "admin";
  children: React.ReactNode; // ✅ NO JSX.Element
}

export default function ProtectedRoute({
  allowedRole,
  children,
}: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (profileError || !profile?.role) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      setAuthorized(profile?.role === allowedRole);
      setLoading(false);
    };

    checkRole();
  }, [allowedRole]);

  if (loading) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Loading…</div>;
  }

  return authorized ? <>{children}</> : <Navigate to="/login" replace />;
}